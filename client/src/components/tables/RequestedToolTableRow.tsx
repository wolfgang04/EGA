import React from "react";
import { Request } from "../../models/Request.model";

const RequestedToolTableRow: React.FC<{ tool: Request }> = ({ tool }) => {
  return (
    <tr>
      <td>{tool.requestedTool.publicID}</td>
      <td>{tool.requestedTool.categoryTool.name}</td>
      <td>{tool.requestedTool.name}</td>
      <td>{tool.quantity}</td>
      <td>{tool.requestedTool.location}</td>
    </tr>
  );
};

export default RequestedToolTableRow;
