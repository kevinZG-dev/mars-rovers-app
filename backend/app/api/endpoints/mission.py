from fastapi import Depends, HTTPException, APIRouter
import logging
from ...domain import Plateau, CommandExecutor
from ..models import MarsMissionSetup, MarsMissionSchema
from app.domain.exceptions import (
    RoverOutOfWorldError,
    RoverNotAvailableSpotError,
    RoverNotValidOrientation,
    RoverNotValidCommands,
)
from ...infrastructure import ErrorMessages

log = logging.getLogger("MISSION API")
logging.basicConfig(level=logging.INFO)

router = APIRouter()


def get_command_executor():
    return CommandExecutor()


@router.post("/", response_model=MarsMissionSchema)
async def setup_and_launch_mission(
    mission: MarsMissionSetup, command_executor=Depends(get_command_executor)
):
    plateau = Plateau(mission.plateau_in.max_x, mission.plateau_in.max_y)
    log.info(
        f"plateau with upper-right coordinates({plateau.max_x}, {plateau.max_y}) was created"
    )
    for i in range(len(mission.rover_list_in)):
        try:
            plateau.add_rover(
                mission.rover_list_in[i].x,
                mission.rover_list_in[i].y,
                mission.rover_list_in[i].orientation,
            )
            log.info(f"Rover n°{i} was added")
            command_executor.execute_commands(
                mission.rover_list_in[i].move_commands, plateau, i
            )
            log.info(f"Commands executed to move rover n°{i}")
        except RoverOutOfWorldError:
            log.error("Rover is not in the plateau")
            raise HTTPException(
                status_code=400, detail=ErrorMessages.ROVER_NOT_IN_PLATEAU
            )
        except RoverNotAvailableSpotError:
            log.error("A rover is already on this spot")
            raise HTTPException(
                status_code=400, detail=ErrorMessages.ROVER_NOT_AVAILABLE_SPOT
            )
        except RoverNotValidOrientation:
            log.error("Rover orientation must be N, E, S or W")
            raise HTTPException(
                status_code=400, detail=ErrorMessages.ROVER_NOT_VALID_ORIENTATION
            )
        except RoverNotValidCommands:
            log.error("Rover commands must be a sequence of L, R, M")
            raise HTTPException(
                status_code=400, detail=ErrorMessages.ROVER_NOT_VALID_COMMANDS
            )

    return {"plateau": plateau}
