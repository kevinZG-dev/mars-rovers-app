export interface MarsRoverBase {
  x: number
  y: number
  orientation: string
}

export interface MarsRoverToSend extends MarsRoverBase{
  move_commands: string
}