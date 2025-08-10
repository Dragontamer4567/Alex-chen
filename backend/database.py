from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional, List, Dict, Any
import os
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class Database:
    client: Optional[AsyncIOMotorClient] = None
    db = None

database = Database()

async def get_database() -> AsyncIOMotorClient:
    return database.db

# Database connection functions
async def connect_to_mongo():
    """Create database connection"""
    try:
        database.client = AsyncIOMotorClient(os.environ['MONGO_URL'])
        database.db = database.client[os.environ['DB_NAME']]
        
        # Test the connection
        await database.client.admin.command('ping')
        logger.info("Successfully connected to MongoDB")
        
        # Create indexes for better performance
        await create_indexes()
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

async def close_mongo_connection():
    """Close database connection"""
    if database.client:
        database.client.close()
        logger.info("Disconnected from MongoDB")

async def create_indexes():
    """Create database indexes for better performance"""
    try:
        # Profiles collection - ensure single profile
        await database.db.profiles.create_index("email", unique=True)
        
        # Services collection - order index
        await database.db.services.create_index([("order", 1), ("is_active", 1)])
        
        # Projects collection - order index
        await database.db.projects.create_index([("order", 1), ("is_active", 1)])
        
        # Testimonials collection - order index  
        await database.db.testimonials.create_index([("order", 1), ("is_active", 1)])
        
        # Contacts collection - created_at index
        await database.db.contacts.create_index([("created_at", -1)])
        
        logger.info("Database indexes created successfully")
    except Exception as e:
        logger.error(f"Failed to create indexes: {e}")

# Generic CRUD operations
async def create_document(collection_name: str, document: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new document in the specified collection"""
    try:
        result = await database.db[collection_name].insert_one(document)
        if result.inserted_id:
            created_doc = await database.db[collection_name].find_one({"_id": result.inserted_id})
            # Convert ObjectId to string for JSON serialization
            created_doc["_id"] = str(created_doc["_id"])
            return created_doc
        return None
    except Exception as e:
        logger.error(f"Error creating document in {collection_name}: {e}")
        raise

async def get_document(collection_name: str, document_id: str) -> Optional[Dict[str, Any]]:
    """Get a document by ID"""
    try:
        document = await database.db[collection_name].find_one({"id": document_id})
        if document:
            document["_id"] = str(document["_id"])
        return document
    except Exception as e:
        logger.error(f"Error fetching document from {collection_name}: {e}")
        raise

async def get_documents(collection_name: str, filter_dict: Optional[Dict] = None, sort_dict: Optional[List] = None, limit: Optional[int] = None) -> List[Dict[str, Any]]:
    """Get multiple documents with optional filtering and sorting"""
    try:
        filter_dict = filter_dict or {}
        cursor = database.db[collection_name].find(filter_dict)
        
        if sort_dict:
            cursor = cursor.sort(sort_dict)
            
        if limit:
            cursor = cursor.limit(limit)
            
        documents = await cursor.to_list(length=None)
        
        # Convert ObjectId to string for all documents
        for doc in documents:
            doc["_id"] = str(doc["_id"])
            
        return documents
    except Exception as e:
        logger.error(f"Error fetching documents from {collection_name}: {e}")
        raise

async def update_document(collection_name: str, document_id: str, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Update a document by ID"""
    try:
        # Add updated_at timestamp
        update_data["updated_at"] = datetime.utcnow()
        
        result = await database.db[collection_name].update_one(
            {"id": document_id},
            {"$set": update_data}
        )
        
        if result.modified_count > 0:
            updated_doc = await database.db[collection_name].find_one({"id": document_id})
            if updated_doc:
                updated_doc["_id"] = str(updated_doc["_id"])
            return updated_doc
        return None
    except Exception as e:
        logger.error(f"Error updating document in {collection_name}: {e}")
        raise

async def delete_document(collection_name: str, document_id: str) -> bool:
    """Delete a document by ID"""
    try:
        result = await database.db[collection_name].delete_one({"id": document_id})
        return result.deleted_count > 0
    except Exception as e:
        logger.error(f"Error deleting document from {collection_name}: {e}")
        raise

# Specific database functions
async def get_profile() -> Optional[Dict[str, Any]]:
    """Get the single profile document"""
    documents = await get_documents("profiles", limit=1)
    return documents[0] if documents else None

async def upsert_profile(profile_data: Dict[str, Any]) -> Dict[str, Any]:
    """Create or update the profile"""
    try:
        existing_profile = await get_profile()
        
        if existing_profile:
            # Update existing profile
            profile_data["updated_at"] = datetime.utcnow()
            result = await database.db.profiles.update_one(
                {"id": existing_profile["id"]},
                {"$set": profile_data}
            )
            if result.modified_count > 0:
                updated_profile = await get_profile()
                return updated_profile
        else:
            # Create new profile
            profile_data["created_at"] = datetime.utcnow()
            profile_data["updated_at"] = datetime.utcnow()
            return await create_document("profiles", profile_data)
            
    except Exception as e:
        logger.error(f"Error upserting profile: {e}")
        raise