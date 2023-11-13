import axios from 'axios';
import { MissionRequest } from '../../types/Mission';

const apiBaseUrl = "http://localhost:8000/api"

const missionService = {

  createMission: async (mission_in: MissionRequest) => {
    const response = await axios.post(`${apiBaseUrl}/mission`, mission_in);
    return response.data;
  },

};

export default missionService;