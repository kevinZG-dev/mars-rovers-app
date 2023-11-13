from pydantic import BaseModel

class MarsRoverBase(BaseModel):
    x: int
    y: int
    orientation: str

class MarsRoverIn(MarsRoverBase):
    move_commands: str