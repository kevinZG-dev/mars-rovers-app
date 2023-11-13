from ..mars_rover import MarsRover
from ..exceptions import (
    RoverOutOfWorldError,
    RoverNotAvailableSpotError,
    RoverNotValidOrientation,
)


class Plateau:
    def __init__(self, max_x, max_y) -> None:
        self.max_x = max_x
        self.max_y = max_y
        self.rover_list: list[MarsRover] = []

    def add_rover(self, rover_x, rover_y, rover_orientation):
        if not self.is_valid_position(rover_x, rover_y):
            raise RoverOutOfWorldError
        if self.is_spot_occupied(rover_x, rover_y):
            raise RoverNotAvailableSpotError
        if not self.is_valid_orientation(rover_orientation):
            raise RoverNotValidOrientation
        self.rover_list.append(MarsRover(rover_x, rover_y, rover_orientation))

    def is_valid_position(self, rover_x, rover_y):
        if 0 <= rover_x <= self.max_x and 0 <= rover_y <= self.max_y:
            return True
        return False

    def is_spot_occupied(self, rover_x, rover_y):
        if (rover_x, rover_y) in [(rover.x, rover.y) for rover in self.rover_list]:
            return True
        return False

    def is_valid_orientation(self, orientation):
        if orientation in ["N", "E", "S", "W"]:
            return True
        return False

    def is_rover_will_collide(self, rover_x, rover_y):
        if self.is_valid_position(rover_x, rover_y) and not self.is_spot_occupied(
            rover_x, rover_y
        ):
            return False
        return True
