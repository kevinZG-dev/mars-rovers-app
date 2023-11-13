from typing import List
from pydantic import BaseModel
from .plateau import PlateauBase, Plateau
from .mars_rover import MarsRoverIn


class MarsMissionSetup(BaseModel):
    plateau_in: PlateauBase
    rover_list_in: List[MarsRoverIn]

class MarsMissionSchema(BaseModel):
    plateau: Plateau
