import React from "react";
import "./PlateauRovers.scss";
import { MissionsResponse } from "../../types/Mission";
import orientation from "../../assets/orientations.png";
import rover from "../../assets/rover-icon.png";
interface PlateauRoversProps {
  mission: MissionsResponse;
}
const PlateauRovers: React.FC<PlateauRoversProps> = ({ mission }) => {
  const getRotation = (orientation: string) => {
    switch (orientation) {
      case "E":
        return "rotate(90deg)";
      case "S":
        return "rotate(180deg)";
      case "W":
        return "rotate(270deg)";
      default:
        return "rotate(0)";
    }
  };
  const renderTable = () => {
    let table = [];

    // Ajoutez les lignes
    for (let i = mission.plateau.max_y + 1; i >= 0; i--) {
      let children = [];

      // Ajoutez les colonnes
      for (let j = 0; j <= mission.plateau.max_x + 1; j++) {
        if (i === 0 && j === 0) {
          children.push(<td key={j}></td>);
        } else if (i === 0) {
          children.push(<td key={j}>{j - 1}</td>);
        } else if (j === 0) {
          children.push(<td key={j}>{i - 1}</td>);
        } else {
          const roverIndex = mission.plateau.rover_list.findIndex(
            (rover) => rover.x === j - 1 && rover.y === i - 1
          );
          children.push(
            <td className="cellule-box" key={j}>
              {roverIndex !== -1 && (
                <>
                  <img
                    src={rover}
                    alt="river-icon"
                    style={{
                      transform: getRotation(
                        mission.plateau.rover_list[roverIndex].orientation
                      ),
                    }}
                  />
                  <span>{roverIndex + 1}</span>
                </>
              )}
            </td>
          );
        }
      }

      // Ajoutez la ligne au tableau
      table.push(<tr key={i}>{children}</tr>);
    }

    return table;
  };

  return (
    <div className="plateau-rovers-container">
      <h4>Plateau MARS</h4>
      <div className="orientation-logo-box">
        <img src={orientation} alt="orientations" />
      </div>
      <table>
        <tbody>{!!mission && renderTable()}</tbody>
      </table>
    </div>
  );
};

export default PlateauRovers;
