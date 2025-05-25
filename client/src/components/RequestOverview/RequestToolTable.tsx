import { Table, TableProps } from "antd";
import React from "react";

interface RequestData {
  quantity: number;
  note: string | null;
  requestedTool: {
    name: string;
    location: string;
    categoryID: string;
    publicID: string;
    categoryTool: { name: string };
  };
}

const tableColumns: TableProps<RequestData>["columns"] = [
  {
    title: "tool ID",
    dataIndex: ["requestedTool", "publicID"],
    key: "tool id",
  },
  {
    title: "Tool Type",
    dataIndex: ["requestedTool", "categoryTool"],
    render: (name) => name.name,
    key: "requestedToolType",
  },
  {
    title: "Tool Name",
    dataIndex: ["requestedTool", "name"],
    key: "requestedToolName",
  },
  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  {
    title: "Location",
    dataIndex: ["requestedTool", "location"],
    key: "requestedToolLocation",
  },
];

const RequestToolTable: React.FC<{ requests: RequestData[] }> = ({
  requests,
}) => (
  <Table<RequestData>
    columns={tableColumns}
    components={{
      body: {
        cell: (props) => <td {...props} className="w-52 hover:bg-black/10" />,
      },
    }}
    dataSource={requests.map((req) => ({
      ...req,
      key: req.requestedTool.publicID,
    }))}
    pagination={{ pageSize: 5, total: requests.length }}
  />
);

export default RequestToolTable;
