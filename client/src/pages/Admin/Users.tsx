import { useEffect, useState } from "react";
import axios from "axios";
import SERVER from "../../SERVER";
import { NewUser, UserRecord } from "../../models/User.model";
import AddUser from "../../components/Admin/Users/AddUser";
import UserTable from "../../components/Admin/Users/UserTable";
import { Button } from "antd";

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
          creator: {
            public_id: "",
            userProfile: { name: { first: "", middle: "", last: "" } },
          },
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

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    const { data } = await axios.get(`${SERVER}/user/users`, {
      withCredentials: true,
    });

    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Button onClick={() => setIsVisible(true)}>add</Button>
      {isVisible && (
        <AddUser
          isOpen={isVisible}
          onClose={() => setIsVisible(false)}
          onAdd={handleAddUser}
        />
      )}

      <UserTable users={users} />
    </div>
  );
};

export default Users;
