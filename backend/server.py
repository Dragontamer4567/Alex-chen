from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from database import connect_to_mongo, close_mongo_connection
from seed_data import check_and_seed
import os
import logging
from pathlib import Path
from routes.portfolio import router as portfolio_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app without a prefix
app = FastAPI(title="Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Add routes to the API router
@api_router.get("/")
async def root():
    return {"message": "Portfolio API is running", "version": "1.0.0"}

# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API is operational"}

# Include portfolio routes
api_router.include_router(portfolio_router, tags=["portfolio"])

# Include the router in the main app
app.include_router(api_router)

@app.on_event("startup")
async def startup_db_client():
    """Initialize database connection and seed data on startup"""
    try:
        logger.info("Starting up Portfolio API...")
        await connect_to_mongo()
        await check_and_seed()
        logger.info("Portfolio API startup completed successfully")
    except Exception as e:
        logger.error(f"Failed to startup API: {e}")
        raise

@app.on_event("shutdown")
async def shutdown_db_client():
    """Close database connection on shutdown"""
    try:
        await close_mongo_connection()
        logger.info("Portfolio API shutdown completed")
    except Exception as e:
        logger.error(f"Error during API shutdown: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)