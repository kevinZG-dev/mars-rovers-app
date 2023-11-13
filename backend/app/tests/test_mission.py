import logging
from fastapi.testclient import TestClient
from main import app
from ..infrastructure import ErrorMessages

log = logging.getLogger()

client = TestClient(app)
MISSION_API = "/api/mission/"


def test_launch_mission():
    test_payload = {
        "plateau_in": {"max_x": 5, "max_y": 5},
        "rover_list_in": [
            {"x": 1, "y": 2, "orientation": "N", "move_commands": "LMLMLMLMM"},
            {"x": 3, "y": 3, "orientation": "E", "move_commands": "MMRMMRMRRM"},
        ],
    }
    response = client.post(MISSION_API, json=test_payload)
    assert response.status_code == 200
    assert response.json() == {
        "plateau": {
            "max_x": 5,
            "max_y": 5,
            "rover_list": [
                {"x": 1, "y": 3, "orientation": "N"},
                {"x": 5, "y": 1, "orientation": "E"},
            ],
        }
    }


def test_add_rover_out_of_world():
    test_payload = {
        "plateau_in": {"max_x": 5, "max_y": 5},
        "rover_list_in": [
            {"x": 7, "y": 9, "orientation": "N", "move_commands": "LMLMLMLMM"},
            {"x": 3, "y": 3, "orientation": "E", "move_commands": "MMRMMRMRRM"},
        ],
    }
    response = client.post(MISSION_API, json=test_payload)
    assert response.status_code == 400
    assert response.json()["detail"] == ErrorMessages.ROVER_NOT_IN_PLATEAU


def test_add_rover_not_available_spot():
    test_payload = {
        "plateau_in": {"max_x": 7, "max_y": 8},
        "rover_list_in": [
            {"x": 1, "y": 4, "orientation": "E", "move_commands": "LMMRMMRM"},
            {"x": 3, "y": 5, "orientation": "N", "move_commands": "MMRMMRMRRM"},
        ],
    }
    response = client.post(MISSION_API, json=test_payload)
    assert response.status_code == 400
    assert response.json()["detail"] == ErrorMessages.ROVER_NOT_AVAILABLE_SPOT


def test_add_rover_not_valid_orientation():
    test_payload = {
        "plateau_in": {"max_x": 7, "max_y": 8},
        "rover_list_in": [
            {"x": 1, "y": 4, "orientation": "g", "move_commands": "LMMRMMRM"},
            {"x": 3, "y": 5, "orientation": "N", "move_commands": "MMRMMRMRRM"},
        ],
    }
    response = client.post(MISSION_API, json=test_payload)
    assert response.status_code == 400
    assert response.json()["detail"] == ErrorMessages.ROVER_NOT_VALID_ORIENTATION


def test_add_rover_not_valid_commands():
    test_payload = {
        "plateau_in": {"max_x": 7, "max_y": 8},
        "rover_list_in": [
            {"x": 1, "y": 4, "orientation": "E", "move_commands": "iiiiooop"},
            {"x": 3, "y": 5, "orientation": "N", "move_commands": "MMRMMRMRRM"},
        ],
    }
    response = client.post(MISSION_API, json=test_payload)
    assert response.status_code == 400
    assert response.json()["detail"] == ErrorMessages.ROVER_NOT_VALID_COMMANDS
