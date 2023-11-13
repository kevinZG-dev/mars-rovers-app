class RoverOutOfWorldError(Exception):
    def __init__(self, message="Rover is not within the plateau boundaries"):
        self.message = message
        super().__init__(self.message)


class RoverNotAvailableSpotError(Exception):
    def __init__(self, message="There is already a rover in the desired spot"):
        self.message = message
        super().__init__(self.message)


class RoverNotValidOrientation(Exception):
    def __init__(self, message="Rover orientation must be N, E, S or W"):
        self.message = message
        super().__init__(self.message)


class RoverNotValidCommands(Exception):
    def __init__(self, message="Rover commands must be a sequence of L, R or M"):
        self.message = message
        super().__init__(self.message)
