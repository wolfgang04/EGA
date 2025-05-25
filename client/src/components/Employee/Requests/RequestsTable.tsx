import React from "react";
import { CurrReq as currentRequestsData } from "../../../models/Request.model";
import { Table, TableProps } from "antd";
import { useNavigate } from "react-router";

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
}> = ({ requests, setPage }) => {
  const navigate = useNavigate();

  return (
    <Table<currentRequestsData>
      components={{
        body: {
          cell: (props) => <td {...props} className="w-52 hover:bg-black/10" />,
        },
      }}
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
      onRow={(record) => {
        return {
          onClick: () => {
            navigate("/request/rq-" + record.request_id);
          },
        };
      }}
    />
  );
};

export default RequestsTable;
