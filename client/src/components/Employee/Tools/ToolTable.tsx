import { Button, Table, TableProps } from "antd";
import React from "react";
import Cart from "./Cart";

interface ToolData {
  name: string;
  id: string;
  available_quantity: number;
  category_name: string;
  location: string;
  total_quantity: number;
}

const ToolTable: React.FC<{
  tools: ToolData[];
  loading: boolean;
  onAdd: (tool: Cart) => void;
}> = ({ tools, loading, onAdd }) => {
  const tableColumns: TableProps<ToolData>["columns"] = [
    { title: "Tool Name", dataIndex: "name", key: "name" },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "categoryName",
    },
    {
      title: "Total",
      dataIndex: "total_quantity",
      key: "total",
    },
    {
      title: "Available",
      dataIndex: "available_quantity",
      key: "available",
    },
    {
      title: "Action",
      key: "action",
      render: (_text, record) => (
        <Button
          color="default"
          variant="solid"
          onClick={() =>
            onAdd({
              quantity: 1,
              note: "",
              id: record.id,
              name: record.name,
            })
          }
        >
          Add to Cart
        </Button>
      ),
    },
  ];

  return (
    <Table<ToolData>
      loading={loading}
      columns={tableColumns}
      dataSource={tools.map((tool) => ({ ...tool, key: tool.id }))}
    />
  );
};

export default ToolTable;
