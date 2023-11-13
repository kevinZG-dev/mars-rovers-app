import { Plateau, PlateauBase } from "./Plateau"
import { MarsRoverToSend } from "./MarsRover"

export interface MissionRequest {
  plateau_in: PlateauBase,
  rover_list_in: MarsRoverToSend[]
}

export interface MissionsResponse {
  plateau: Plateau
}