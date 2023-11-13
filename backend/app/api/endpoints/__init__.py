from fastapi import APIRouter

from . import mission

api_router = APIRouter()
api_router.include_router(mission.router, prefix="/mission", tags=["mission"])
