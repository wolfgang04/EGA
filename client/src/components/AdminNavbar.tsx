import axios from "axios";
import React from "react";
import SERVER from "../SERVER";
import { NavLink, useNavigate } from "react-router";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { status } = await axios.post(`${SERVER}/auth/logout`, {
        withCredentials: true,
      });

      if (status === 200) navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="nav flex justify-center gap-2">
      <NavLink to="/profile">
        <p>profile</p>
      </NavLink>
      <NavLink to="/history">
        <p>requests history</p>
      </NavLink>
      <NavLink to="/tools">
        <p>tools</p>
      </NavLink>
      <NavLink to="/users">
        <p>users</p>
      </NavLink>
      <p onClick={handleLogout}>logout</p>
    </div>
  );
};

export default AdminNavbar;
