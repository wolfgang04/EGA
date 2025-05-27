import React from "react";
import { Tool } from "../../../models/Tool.model";
import { Table, TableProps } from "antd";

const tableColumns: TableProps<Tool>["columns"] = [
  { title: "ID", dataIndex: "publicID", key: "publicID" },
  { title: "Tool Name", dataIndex: "name", key: "name" },
  { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  { title: "Location", dataIndex: "location", key: "location" },
];

const ToolTable: React.FC<{ tools: Tool[] }> = ({ tools }) => {
  return (
    <Table<Tool>
      columns={tableColumns}
      dataSource={tools.map((tool) => ({ ...tool, key: tool.publicID }))}
      components={{
        body: {
          cell: (props) => <td {...props} className="w-52" />,
        },
      }}
    />
  );
};

export default ToolTable;
