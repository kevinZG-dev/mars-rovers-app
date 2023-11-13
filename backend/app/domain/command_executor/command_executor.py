from ..plateau import Plateau
from ..exceptions import RoverNotValidCommands


class CommandExecutor:
    def execute_commands(self, commands: str, plateau: Plateau, rover_index):
        if not self.is_valid_commands(commands):
            raise RoverNotValidCommands
        for command in commands:
            match command:
                case "L":
                    plateau.rover_list[rover_index].turn_left()
                case "R":
                    plateau.rover_list[rover_index].turn_right()
                case "M":
                    new_x, new_y = plateau.rover_list[rover_index].get_new_coordinates()
                    if not plateau.is_rover_will_collide(new_x, new_y):
                        plateau.rover_list[rover_index].move(new_x, new_y)

    def is_valid_commands(self, commands: str):
        return all([command in ["L", "R", "M"] for command in commands])
