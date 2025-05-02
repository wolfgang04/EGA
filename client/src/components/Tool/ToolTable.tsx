import React from "react";
import { Tool } from "../../models/Tool.model";
import ToolTableRow from "./ToolTableRow";

const ToolTable: React.FC<{ Tools: Tool[] }> = ({ Tools }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Tool ID</th>
          <th>Tool Name</th>
          <th>Quantity</th>
          <th>Location</th>
        </tr>
      </thead>

      <tbody>
        {Tools.map((tool, idx) => (
          <ToolTableRow toolDetails={tool} key={idx} />
        ))}
      </tbody>
    </table>
  );
};

export default ToolTable;
