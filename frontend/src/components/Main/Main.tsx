import React, { useState } from "react";
import "./Main.scss";
// MUI
import { Divider } from "@mui/material";
// Components
import MissionForm from "../MissionForm/MissionForm";
import PlateauRovers from "../PlateauRovers/PlateauRovers";
// Types
import { MissionRequest, MissionsResponse } from "../../types/Mission";
// Services
import missionService from "../../services/mission/missionAPI";
// Utils
import { handleApiError } from "../../utils/handleApiError";

const Main = () => {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false);
  const [mission, setMission] = useState<MissionsResponse | null>(null)

  const handleSubmitMission = async (formData: MissionRequest) => {
    try {
      const response = await missionService.createMission(formData)
      setMission(response)
      setError("")
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (error) {
      const errMessage = handleApiError(error);
      setError(errMessage)
    }

  }
  return (
    <main className="main-container">
      <MissionForm
        error={error}
        success={success}
        handleSubmitMission={handleSubmitMission}
      />
      <Divider
        orientation="vertical"
        variant="middle"
        sx={{
          margin: "5px 0",
          borderColor: "gray",
          height: "100%",
          width: "5px",
        }}
      />
      <PlateauRovers mission={mission!} />
    </main>
  );
};

export default Main;
