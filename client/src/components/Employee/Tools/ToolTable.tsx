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
  onNavigate: (page: string) => void;
  page: number;
}> = ({ tools, loading, onAdd, onNavigate, page }) => {
  const tableColumns: TableProps<ToolData>["columns"] = [
    {
      title: "Tool Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Category",
      dataIndex: "category_name",
      key: "categoryName",
    },
    { title: "Location", dataIndex: "location", key: "location" },
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
              max: record.available_quantity,
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
      components={{
        body: {
          cell: (props) => <td {...props} className="w-52 hover:bg-black/10" />,
        },
      }}
      dataSource={tools.map((tool) => ({ ...tool, key: tool.id }))}
      pagination={{
        current: page,
        pageSize: 10,
        total: tools.length,
        onChange: (page) => onNavigate(page.toString()),
        showQuickJumper: true,
      }}
    />
  );
};

export default ToolTable;
