import React from "react";
import { Tool } from "../../../models/Tool.model";

const ToolTableRow: React.FC<{ toolDetails: Tool }> = ({ toolDetails }) => {
  return (
    <tr>
      <td>{toolDetails.publicID}</td>
      <td>{toolDetails.name}</td>
      <td>{toolDetails.quantity}</td>
      <td>{toolDetails.location}</td>
    </tr>
  );
};

export default ToolTableRow;
