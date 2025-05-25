import React from "react";
import type { StatusDetails as StatusData } from "../../models/Request.model";
import { Table, TableProps } from "antd";

const tableColumns: TableProps<StatusData>["columns"] = [
  {
    title: "Changed by",
    dataIndex: "changedByProfile",
    render: ({ name }) => `${name.last}, ${name.first} ${name.middle}`,
    key: "changedByProfile",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Changed at",
    dataIndex: "changedAt",
    render: (date: string) =>
      new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
      }),
    key: "changed at",
  },
];

const StatusTable: React.FC<{ statuses: StatusData[] }> = ({ statuses }) => (
  <Table<StatusData>
    components={{
      body: {
        cell: (props) => <td {...props} className="w-52 hover:bg-black/10" />,
      },
    }}
    columns={tableColumns}
    dataSource={statuses.map((request) => ({
      ...request,
      key: request.status,
    }))}
  />
);

export default StatusTable;
