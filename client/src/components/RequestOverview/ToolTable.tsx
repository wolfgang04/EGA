import React from "react";
import RequestedToolTableRow from "../tables/RequestedToolTableRow";
import { Request } from "../../models/Request.model";

const ToolTable: React.FC<{ requests: Request[] }> = ({ requests }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Tool ID</th>
          <th>Tool type</th>
          <th>Tool name</th>
          <th>Quantity</th>
          <th>Location</th>
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
