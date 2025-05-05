import React from "react";
import { UserRecord } from "../../models/User.model";
import UsersTableRow from "./UsersTableRow";

const UsersTable: React.FC<{ users: UserRecord[] }> = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Type</th>
          <th>Created by</th>
          <th>Created at</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, idx) => (
          <UsersTableRow key={idx} user={user} />
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
