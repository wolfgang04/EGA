import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Space } from "antd";
import React from "react";

interface Props {
  name: { first: string; middle: string; last: string };
  loading: boolean;
}

const Header: React.FC<Props> = ({ name, loading }) => {
  return (
    <Card className="w-full shadow-sm" loading={loading}>
      <div className="flex items-center justify-between">
        <div className="flex gap-5">
          <div className="h-24 w-24 rounded-full bg-gray-200"></div>

          <div className="flex items-center gap-2">
            <Space>
              <h1>{name.first}</h1>
              <h1>{name.middle}</h1>
              <h1>{name.last}</h1>
            </Space>
          </div>
        </div>

        <Button variant="solid" color="default" style={{ height: "40px" }}>
          <EditOutlined style={{ fontSize: 20 }} />
          <p className="">Edit Profile</p>
        </Button>
      </div>
    </Card>
  );
};

export default Header;
