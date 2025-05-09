import React from "react";
import { StatusDetails } from "../../../models/Request.model";
import StatusTableRow from "./StatusTableRow";

const StatusTable: React.FC<{ statusChanges: StatusDetails[] }> = ({
  statusChanges,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Changed by</th>
          <th>Status</th>
          <th>Changed at</th>
        </tr>
      </thead>

      <tbody>
        {statusChanges.map((statusChange, idx) => (
          <StatusTableRow changes={statusChange} key={idx} />
        ))}
      </tbody>
    </table>
  );
};

export default StatusTable;
