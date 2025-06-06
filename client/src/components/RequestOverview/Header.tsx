import { ArrowLeftOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router";

interface Props {
  id: string;
}

const Header: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 flex h-20 w-full items-center border-b border-gray-200 bg-white px-50">
      <div className="flex items-center gap-5">
        <div
          className="flex h-fit w-fit cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-200"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined />
          <p>Back to Requests</p>
        </div>
        |<h3>Request #{id}</h3>
      </div>
    </div>
  );
};

export default Header;
