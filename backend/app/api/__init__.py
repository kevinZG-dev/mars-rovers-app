from fastapi import APIRouter

from .endpoints import mission

api_router = APIRouter()
api_router.include_router(
    mission.router, prefix="/mission", tags=["mission"]
)