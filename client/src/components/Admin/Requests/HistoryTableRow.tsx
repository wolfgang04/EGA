import React from "react";
import { useNavigate } from "react-router";
import { History } from "../../../models/History.model";

const HistoryTableRow: React.FC<{ history: History }> = ({ history }) => {
  const navigate = useNavigate();

  const viewRequestDetails = () => {
    navigate(`../request/${history.request.public_id}`);
  };

  const formattedDate = new Date(history.changed_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  });

  return (
    <tr className="text-center" onClick={viewRequestDetails}>
      <td>{history.request.public_id}</td>
      <td>{history.request.requestByProfile?.name.first}</td>
      <td>{history.status}</td>
      <td>{`${history.changedByProfile.name.last}, ${history.changedByProfile.name.first} ${history.changedByProfile.name.middle}`}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};

export default HistoryTableRow;
