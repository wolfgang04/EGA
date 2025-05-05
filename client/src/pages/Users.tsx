import React, { useEffect, useState } from "react";
import axios from "axios";
import SERVER from "../SERVER";
import { NewUser, UserRecord } from "../models/User.model";
import UsersTable from "../components/Admin/Users/UsersTable";
import AddUser from "../components/Admin/Users/AddUser";

const Users = () => {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleAddUser = async (user: NewUser) => {
    const userData = {
      firstName: user.userProfile.name.first,
      middleName: user.userProfile.name.middle,
      lastName: user.userProfile.name.last,
      email: user.userProfile.email,
      address: user.address,
      contact: user.contact,
      birthday: user.birthday,
      userType: user.userType,
    };

    try {
      await axios.post(`${SERVER}/auth/create`, userData, {
        withCredentials: true,
      });

      setUsers((prevUsers) => [
        ...prevUsers,
        {
          public_id: "",
          userType: user.userType,
          created_by: null,
          created_at: new Date().toISOString(),
          userProfile: {
            name: {
              first: user.userProfile.name.first,
              middle: user.userProfile.name.middle,
              last: user.userProfile.name.last,
            },
            email: user.userProfile.email,
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(`${SERVER}/user/users`, {
        withCredentials: true,
      });

      setUsers(data);
    };

    fetchUsers();
  }, [users]);

  return (
    <div className="flex flex-col items-center justify-center">
      <button onClick={() => setIsVisible(true)}>add</button>
      {isVisible && (
        <AddUser onClose={() => setIsVisible(false)} onAdd={handleAddUser} />
      )}

      <UsersTable users={users} />
    </div>
  );
};

export default Users;
