import React from "react";
import { Request } from "../../../models/Request.model";
import { NavLink } from "react-router";

const RequestedToolTableRow: React.FC<{ tool: Request }> = ({ tool }) => {
  return (
    <tr>
      <td>{tool.requestedTool.publicID}</td>
      <td>
        <NavLink
          to={`../tools/${tool.requestedTool.categoryTool.name}`}
          state={{ categoryID: tool.requestedTool.categoryID }}
        >
          <p className="hover:underline">
            {tool.requestedTool.categoryTool.name}
          </p>
        </NavLink>
      </td>
      <td>{tool.requestedTool.name}</td>
      <td>{tool.quantity}</td>
      <td>{tool.requestedTool.location}</td>
    </tr>
  );
};

export default RequestedToolTableRow;
