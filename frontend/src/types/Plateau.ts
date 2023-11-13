import { MarsRoverBase } from "./MarsRover"

export interface PlateauBase {
  max_x: number
  max_y: number
}

export interface Plateau extends PlateauBase {
  rover_list: MarsRoverBase[]
}

