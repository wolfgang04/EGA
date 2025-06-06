import React, { useState } from "react";
import { Tool } from "../../../models/Tool.model";
import { Button, Modal, Space, Table, TableProps } from "antd";
import { useNavigate } from "react-router";

interface Borrower {
  name: { first: string; middle?: string | undefined; last: string };
  request_id: number;
}

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
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const tableColumns: TableProps<Tool>["columns"] = [
    { title: "ID", dataIndex: "public_id", key: "publicID" },
    { title: "Tool Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Available",
      dataIndex: "total_available",
      key: "totalAvailable",
      render: (available) => (available < 0 ? 0 : available),
    },
    {
      title: "Borrowers",
      key: "borrowers",
      dataIndex: "borrowers",
      render: (borrower) => (
        <span
          onClick={() => {
            if (!borrower) return;
            setBorrowers(borrower);
            setIsVisible(true);
          }}
          className={borrower && "cursor-pointer"}
        >
          {borrower !== null ? `${borrower.length} borrowers` : "No borrowers"}
        </span>
      ),
    },
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
    <>
      <Modal
        title="Borrowed By"
        open={isVisible}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          {borrowers.map((borrower) => (
            <div
              className="flex w-full cursor-pointer justify-between rounded-md p-2 hover:bg-gray-200"
              onClick={() => navigate(`/request/rq-${borrower.request_id}`)}
            >
              <p>
                {borrower.name.first} {borrower.name.last}
              </p>
              <p>request #{borrower.request_id}</p>
            </div>
          ))}
        </Space>
      </Modal>

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
    </>
  );
};

export default ToolTable;
