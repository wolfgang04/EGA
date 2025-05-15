import React from "react";
import { CurrReq as currentRequestsData } from "../../../models/Request.model";
import { Table, TableProps } from "antd";

export interface CurrReq {
  changed_at: Date;
  status: string;
  request_id: string;
}

const tableColumns: TableProps<currentRequestsData>["columns"] = [
  {
    title: "Request ID",
    dataIndex: "request_id",
    key: "request id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Changed at",
    dataIndex: "changed_at",
    render: (date: string) =>
      new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    key: "changed at",
  },
];

const RequestsTable: React.FC<{
  requests: currentRequestsData[];
  setPage: (page: number) => void;
}> = ({ requests, setPage }) => (
  <Table<currentRequestsData>
    columns={tableColumns}
    dataSource={requests.map((request) => ({
      ...request,
      key: request.changed_at,
    }))}
    pagination={{
      pageSize: 10,
      onChange: (page) => setPage(page),
      showQuickJumper: true,
    }}
  />
);

export default RequestsTable;
