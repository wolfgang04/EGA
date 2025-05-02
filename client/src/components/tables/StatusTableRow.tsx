import React from "react";
import { StatusDetails } from "../../models/Request.model";

const StatusTableRow: React.FC<{ changes: StatusDetails }> = ({ changes }) => {
  const formattedDate = new Date(changes.changedAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  });

  return (
    <tr>
      <td>{`${changes.changedByProfile.name.last}, ${changes.changedByProfile.name.first} ${changes.changedByProfile.name.middle}`}</td>
      <td>{changes.status}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};

export default StatusTableRow;
