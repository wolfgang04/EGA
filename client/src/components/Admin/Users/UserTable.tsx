import { Table, TableProps } from "antd";
import React from "react";
import { UserRecord } from "../../../models/User.model";

const tableColumns: TableProps<UserRecord>["columns"] = [
  { title: "ID", dataIndex: "public_id", key: "public_id" },
  {
    title: "Name",
    render: (_, record) => {
      const { first, middle, last } = record.userProfile.name;

      return `${last}, ${first} ${middle}`;
    },
  },
  {
    title: "Email",
    dataIndex: ["userProfile", "email"],
    key: "email",
  },
  {
    title: "Type",
    dataIndex: "userType",
    key: "userType",
  },
  {
    title: "Created By",
    key: "createdBy",
    render: (_, record) => {
      const name = record.creator?.userProfile.name;

      return `${name?.last}, ${name?.first}, ${name?.middle}`;
    },
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "createdAt",
    render: (date: string) =>
      new Date(date).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
  },
];

const UserTable: React.FC<{ users: UserRecord[] }> = ({ users }) => {
  return (
    <Table<UserRecord>
      components={{
        body: {
          cell: (props) => <td {...props} className="w-52 hover:bg-black/10" />,
        },
      }}
      columns={tableColumns}
      dataSource={users.map((user) => ({
        ...user,
        key: user.public_id,
      }))}
    />
  );
};

export default UserTable;
