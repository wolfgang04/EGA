import React from "react";
import InfoItem from "./InfoItem";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";

interface Name {
  first: string;
  middle?: string | undefined;
  last: string;
}

const Information: React.FC<{
  name: Name | undefined;
  created: string | undefined;
  lastUpdated: string | undefined;
}> = ({ name, created, lastUpdated }) => {
  const { first, middle, last } = name!;

  return (
    <div className="mx-50 rounded-md border border-gray-200 bg-white p-5">
      <h3>Request Information</h3>

      <div className="mt-5 flex items-center gap-50">
        <InfoItem
          label="Requested By"
          data={`${first} ${middle} ${last}`}
          icon={<UserOutlined style={{ fontSize: 26 }} />}
        />
        <InfoItem
          label="Created"
          data={new Date(created!).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          })}
          icon={<CalendarOutlined style={{ fontSize: 26 }} />}
        />
        <InfoItem
          label="Last Updated"
          data={new Date(lastUpdated!).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          })}
          icon={<ClockCircleOutlined style={{ fontSize: 26 }} />}
        />
      </div>
    </div>
  );
};

export default Information;
