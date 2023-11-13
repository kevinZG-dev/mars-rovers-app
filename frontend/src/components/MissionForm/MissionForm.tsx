import React, { useState } from "react";
import "./MissionForm.scss";
// MUI
import { Alert, Button, Collapse, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// Types
import { MarsRoverToSend } from "../../types/MarsRover";
import { MissionRequest } from "../../types/Mission";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface MisssionFormProps {
  error: string;
  success: boolean;
  handleSubmitMission: (formData: MissionRequest) => void;
}
const MissionForm: React.FC<MisssionFormProps> = ({
  error,
  success,
  handleSubmitMission,
}) => {
  const [maxX, setMaxX] = useState<string>("");
  const [maxY, setMaxY] = useState<string>("");
  const [roverX, setRoverX] = useState<string>("");
  const [roverY, setRoverY] = useState<string>("");
  const [orientation, setOrientation] = useState<string>("");
  const [moveCommands, setMoveCommands] = useState<string>("");
  const [listOfRover, setListOfRovers] = useState<MarsRoverToSend[]>([]);

  const handleChangeMaxX = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxX(event.target.value);
  };
  const handleChangeMaxY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxY(event.target.value);
  };
  const handleChangeRoverX = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoverX(event.target.value);
  };
  const handleChangeRoverY = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoverY(event.target.value);
  };
  const handleChangeOrientation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOrientation(event.target.value);
  };
  const handleChangeMoveCommands = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMoveCommands(event.target.value);
  };

  const handleDeleteRover = (index: number) => {
    const newList = [...listOfRover];
    newList.splice(index, 1);
    setListOfRovers(newList);
  };

  const onClickAdd = () => {
    const rover: MarsRoverToSend = {
      x: parseInt(roverX),
      y: parseInt(roverY),
      orientation: orientation,
      move_commands: moveCommands,
    };

    setListOfRovers([...listOfRover, rover]);
    cleanRoverField();
  };

  const cleanRoverField = () => {
    setRoverX("");
    setRoverY("");
    setOrientation("");
    setMoveCommands("");
  };

  const isNumber = (char: string) => {
    return /^\d+$/.test(char);
  };

  const isOrientation = (char: string) => {
    return char === "N" || char === "E" || char === "S" || char === "W";
  };

  const isCommand = (seq: string) => {
    const seqList = seq.split("");

    if (!seq) {
      return false;
    }
    return seqList.every(
      (value) => value === "L" || value === "R" || value === "M"
    );
  };

  const isRoverValid = () => {
    return (
      !isNumber(roverX) ||
      !isNumber(roverY) ||
      !isOrientation(orientation) ||
      !isCommand(moveCommands)
    );
  };

  const isPlateauValid = () => {
    return !isNumber(maxX) || !isNumber(maxY);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: MissionRequest = {
      plateau_in: {
        max_x: parseInt(maxX),
        max_y: parseInt(maxY),
      },
      rover_list_in: listOfRover,
    };
    handleSubmitMission(formData);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="mission-form-container">
        <Collapse in={!!error} sx={{ maxWidth: "800px", width: "100%" }}>
          <Alert severity="error">{error}</Alert>
        </Collapse>
        <Collapse in={success} sx={{ maxWidth: "800px", width: "100%" }}>
          <Alert severity="success">
            "The mission has been successfully launched"
          </Alert>
        </Collapse>
        <form className="form-container" onSubmit={handleSubmit}>
          <h4 className="plateau-form-title">Paramètres du plateau Mars</h4>
          <div className="plateau-form-box">
            <TextField
              id="outlined-basic"
              label="Max X"
              value={maxX}
              onChange={handleChangeMaxX}
              variant="outlined"
              size="small"
              color="primary"
              sx={{
                color: "white",
                maxWidth: "200px",
                minWidth: "15%",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Max Y"
              value={maxY}
              onChange={handleChangeMaxY}
              variant="outlined"
              size="small"
              color="primary"
              sx={{
                color: "white",
                maxWidth: "200px",
                minWidth: "15%",
              }}
            />
          </div>
          <h4 className="rover-form-title">Ajouter un rover</h4>

          <div className="rover-form-box">
            <TextField
              id="outlined-basic"
              label="X"
              value={roverX}
              onChange={handleChangeRoverX}
              variant="outlined"
              size="small"
              color="primary"
              sx={{
                color: "white",
                maxWidth: "200px",
                minWidth: "15%",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Y"
              value={roverY}
              onChange={handleChangeRoverY}
              variant="outlined"
              size="small"
              color="primary"
              sx={{
                color: "white",
                maxWidth: "200px",
                minWidth: "15%",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Orientation (N, E, S, W)"
              value={orientation}
              onChange={handleChangeOrientation}
              variant="outlined"
              size="small"
              color="primary"
              sx={{
                color: "white",
                maxWidth: "200px",
                minWidth: "15%",
              }}
            />
            <TextField
              id="outlined-basic"
              label="Commande"
              value={moveCommands}
              onChange={handleChangeMoveCommands}
              variant="outlined"
              size="small"
              color="primary"
              sx={{
                color: "white",
                maxWidth: "200px",
                minWidth: "15%",
              }}
            />
          </div>
          <Button
            variant="contained"
            disabled={isRoverValid()}
            onClick={onClickAdd}
            sx={{
              margin: "10px 0",
            }}
          >
            +
          </Button>

          <h4 className="rover-list-title">Liste des rovers</h4>

          <table className="rover-list-box">
            <thead>
              <tr>
                <th>Rover</th>
                <th>Coordonnées (x, y)</th>
                <th>Orientation</th>
                <th>Séquence de commandes</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {listOfRover.map((rover, i) => {
                return (
                  <tr key={i}>
                    <td>Rover {i + 1}</td>
                    <td>{`(${rover.x}, ${rover.y})`}</td>
                    <td>{rover.orientation}</td>
                    <td>{rover.move_commands}</td>
                    <td>
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteRover(i)}
                        color="warning"
                        size="small"
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
            disabled={isPlateauValid() || listOfRover.length === 0}
            sx={{ textTransform: "none", margin: "30px 0" }}
          >
            Envoyer
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default MissionForm;
