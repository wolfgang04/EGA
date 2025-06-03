import axios from "axios";
import SERVER from "../../SERVER";
import { NavLink, useNavigate } from "react-router";
import {
  HistoryOutlined,
  LogoutOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { status } = await axios.post(`${SERVER}/auth/logout`, {
        withCredentials: true,
      });

      localStorage.clear();
      if (status === 200) navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-6 flex items-center justify-between border-b border-gray-300 p-3">
      <div className="flex items-center gap-5">
        <h3>Tool Request Management</h3>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `flex gap-2 rounded-md p-2 hover:bg-gray-100 ${isActive && "bg-[#f3f4f6]"}`
          }
        >
          <UserOutlined />
          <p>Profile</p>
        </NavLink>
        <NavLink
          to="history"
          className={({ isActive }) =>
            `flex gap-2 rounded-md p-2 hover:bg-gray-100 ${isActive && "bg-gray-100"}`
          }
        >
          <HistoryOutlined />
          <p>Requests History</p>
        </NavLink>
        <NavLink
          to="tools"
          className={({ isActive }) =>
            `flex gap-2 rounded-md p-2 hover:bg-gray-100 ${isActive && "bg-gray-100"}`
          }
        >
          <SettingOutlined />
          <p>Tools</p>
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `flex gap-2 rounded-md p-2 hover:bg-gray-100 ${isActive && "bg-gray-100"}`
          }
        >
          <UsergroupAddOutlined />
          <p>Users</p>
        </NavLink>
      </div>

      <Button variant="solid" color="default" onClick={handleLogout}>
        <LogoutOutlined style={{ fontSize: 16 }} />
        Logout
      </Button>
    </div>
  );
};

export default AdminNavbar;
