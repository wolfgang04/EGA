import React from "react";
import { Card, Space, Button, Flex } from "antd";

interface Tool {
  name: string;
  id: string;
  available_quantity: number;
  category_name: string;
  location: string;
  total_quantity: number;
}

interface CART {
  quantity: number;
  note: string;
  id: string;
  name: string;
}

interface Props {
  tool: Tool;
  isLoading: boolean;
  onAdd: (tool: CART) => void;
}

const ToolCard: React.FC<Props> = ({ tool, isLoading, onAdd }) => {
  return (
    <Card
      hoverable
      loading={isLoading}
      style={{ width: 240 }}
      actions={[
        <Button
          color="default"
          variant="solid"
          className="w-40"
          onClick={() =>
            onAdd({
              quantity: 1,
              note: "",
              id: tool.id,
              name: tool.name,
            })
          }
        >
          Add to Cart
        </Button>,
      ]}
      size="small"
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space direction="vertical">
          <h3>{tool.name}</h3>
          <h4>{tool.category_name}</h4>
        </Space>
        <Flex justify="space-between" gap="small">
          <Space
            direction="vertical"
            className="flex-1 rounded-xl bg-gray-100 py-3"
          >
            <p>Total</p>
            <h3>{tool.total_quantity}</h3>
          </Space>
          <Space
            direction="vertical"
            className="flex-1 rounded-xl bg-gray-100 py-3"
          >
            <p>Available</p>
            <h3>{tool.available_quantity}</h3>
          </Space>
        </Flex>
      </Space>
    </Card>
  );
};

export default ToolCard;
