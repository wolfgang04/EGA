import React from "react";
import { Tool } from "../../../models/Tool.model";
import { Button, Table, TableProps } from "antd";

const ToolTable: React.FC<{
  tools: Tool[];
  onEdit: (
    id: string,
    quantity: number,
    location: string,
    name: string,
  ) => void;
  loading: boolean;
}> = ({ tools, onEdit, loading }) => {
  const tableColumns: TableProps<Tool>["columns"] = [
    { title: "ID", dataIndex: "public_id", key: "publicID" },
    { title: "Tool Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Available", dataIndex: "total_available", key: "totalAvailable" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      render: (record) => {
        const handleAdd = () => {
          onEdit(record.id, record.quantity, record.location, record.name);
        };

        return (
          <Button variant="solid" color="default" onClick={handleAdd}>
            Edit
          </Button>
        );
      },
    },
  ];

  return (
    <Table<Tool>
      loading={loading}
      columns={tableColumns}
      dataSource={tools.map((tool) => ({ ...tool, key: tool.public_id }))}
      components={{
        body: {
          cell: (props) => <td {...props} className="w-52" />,
        },
      }}
    />
  );
};

export default ToolTable;
