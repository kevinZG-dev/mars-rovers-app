import logging
from ..domain import Plateau

logging.basicConfig(level=logging.DEBUG)
log = logging.getLogger()


def test_create_plateau():
    plateau = Plateau(5, 5)
    assert plateau.max_x == 5
    assert plateau.max_y == 5
    log.info("Test passed to create plateau")
