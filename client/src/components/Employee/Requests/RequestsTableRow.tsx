import React from "react";
import { CurrReq } from "../../../models/Request.model";
import { useNavigate } from "react-router";

const CurrRequestsTableRow: React.FC<{ request: CurrReq }> = ({ request }) => {
  const navigate = useNavigate();

  const formattedDate = new Date(request.changed_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  });

  return (
    <tr onClick={() => navigate(`/request/rq-${request.request_id}`)}>
      <td>rq-{request.request_id}</td>
      <td>{request.status}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};

export default CurrRequestsTableRow;
