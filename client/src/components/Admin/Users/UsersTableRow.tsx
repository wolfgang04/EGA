import React from "react";
import { UserRecord } from "../../../models/User.model";

const UsersTableRow: React.FC<{ user: UserRecord }> = ({ user }) => {
  const formattedDate = new Date(user.created_at).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
  });

  return (
    <tr>
      <td>{user.public_id}</td>
      <td>{`${user.userProfile.name.first} ${user.userProfile.name.middle} ${user.userProfile.name.last}`}</td>
      <td>{user.userProfile.email}</td>
      <td>{user.userType}</td>
      <td>{user.created_by}</td>
      <td>{formattedDate}</td>
    </tr>
  );
};

export default UsersTableRow;
