import { Card, Flex, Space } from "antd";
import React from "react";
import { useNavigate } from "react-router";

interface Props {
  name: string;
  totalTools: number;
  available: number;
  totalQuantity: number;
  id: number;
}

const CategoryCard: React.FC<Props> = ({
  name,
  totalTools,
  available,
  totalQuantity,
  id,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      onClick={() => navigate(`${name}`, { state: { categoryID: id } })}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <h3>{name}</h3>
        <Flex justify="space-between" gap="small">
          <Space
            direction="vertical"
            className="flex-1 items-center rounded-xl bg-gray-100 py-3"
          >
            <p>Total Tools</p>
            <h3>{totalTools}</h3>
          </Space>
          <Space
            direction="vertical"
            className="flex-1 items-center rounded-xl bg-gray-100 py-3"
          >
            <p>Available</p>
            <h3>{available}</h3>
          </Space>
        </Flex>
        <Flex justify="space-between">
          <p>Total Quantity</p> <p>{totalQuantity} tools</p>
        </Flex>
      </Space>
    </Card>
  );
};

export default CategoryCard;
