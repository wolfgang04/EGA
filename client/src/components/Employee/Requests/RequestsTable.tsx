import React from "react";
import { CurrReq } from "../../../models/Request.model";
import CurrRequestsTableRow from "./RequestsTableRow";

const RequestsTable: React.FC<{ requests: CurrReq[] }> = ({ requests }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Changed at</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request) => (
            <CurrRequestsTableRow
              request={request}
              key={request.request_id + request.changed_at}
            />
          ))}
        </tbody>
      </table>
      {requests.length < 1 && <p>No requests</p>}
    </>
  );
};

export default RequestsTable;
