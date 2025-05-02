import React from "react";
import RequestedToolTableRow from "../tables/RequestedToolTableRow";
import { Request } from "../../models/Request.model";

const ToolTable: React.FC<{ requests: Request[] }> = ({ requests }) => {
  return (
    <table className="w-1/2">
      <thead>
        <tr>
          <td>Tool ID</td>
          <td>Tool type</td>
          <td>Tool name</td>
          <td>Quantity</td>
          <td>Location</td>
        </tr>
      </thead>

      <tbody>
        {requests.map((request, idx) => (
          <RequestedToolTableRow tool={request} key={idx} />
        ))}
      </tbody>
    </table>
  );
};

export default ToolTable;
