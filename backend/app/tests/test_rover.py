import logging
from ..domain import Plateau, CommandExecutor

log = logging.getLogger()


def test_add_rover():
    plateau = Plateau(5, 5)
    plateau.add_rover(1, 2, "N")
    assert len(plateau.rover_list) == 1
    assert plateau.rover_list[0].x == 1
    assert plateau.rover_list[0].y == 2
    assert plateau.rover_list[0].orientation == "N"
    log.info("Test passed to add a rover")


def test_move_rover():
    plateau = Plateau(5, 5)
    plateau.add_rover(1, 2, "N")
    command_executor = CommandExecutor()
    command_executor.execute_commands("M", plateau, 0)
    assert plateau.rover_list[0].x == 1
    assert plateau.rover_list[0].y == 3
    log.info("Test passed to move a rover")
