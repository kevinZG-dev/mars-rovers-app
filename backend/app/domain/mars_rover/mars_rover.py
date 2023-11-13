class ElementInPlateau:
    def __init__(self, x, y) -> None:
        self.x = x
        self.y = y


class MarsRover(ElementInPlateau):
    DIRECTION = ["N", "E", "S", "W"]

    def __init__(self, x, y, orientation) -> None:
        super().__init__(x, y)
        self.orientation = orientation

    def turn_left(self):
        self.orientation = self.DIRECTION[
            (self.DIRECTION.index(self.orientation) - 1) % 4
        ]

    def turn_right(self):
        self.orientation = self.DIRECTION[
            (self.DIRECTION.index(self.orientation) + 1) % 4
        ]

    def get_new_coordinates(self):
        new_x = self.x
        new_y = self.y

        match self.orientation:
            case "N":
                return new_x, new_y + 1
            case "E":
                return new_x + 1, new_y
            case "S":
                return new_x, new_y - 1
            case "W":
                return new_x - 1, new_y

    def move(self, new_x, new_y):
        self.x, self.y = new_x, new_y
