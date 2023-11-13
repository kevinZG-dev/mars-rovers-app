from pydantic import BaseModel
from typing import List
from .mars_rover import MarsRoverBase


class PlateauBase(BaseModel):
    max_x: int
    max_y: int


class Plateau(PlateauBase):
    rover_list: List[MarsRoverBase]
