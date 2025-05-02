import React from "react";
import { StatusDetails } from "../../models/Request.model";
import StatusTableRow from "../tables/StatusTableRow";

const StatusTable: React.FC<{ statusChanges: StatusDetails[] }> = ({
  statusChanges,
}) => {
  return (
    <table className="w-1/2">
      <thead>
        <tr>
          <td>Changed by</td>
          <td>Status</td>
          <td>Changed at</td>
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
