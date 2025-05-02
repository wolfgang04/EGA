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
    <div className="mb-5 flex justify-center gap-2">
      <NavLink to="/profile">
        <p className="cursor-pointer hover:underline">profile</p>
      </NavLink>
      <NavLink to="/history">
        <p className="cursor-pointer hover:underline">requests history</p>
      </NavLink>
      <NavLink to="/tools">
        <p className="cursor-pointer hover:underline">tools</p>
      </NavLink>
      <NavLink to="/users">
        <p className="cursor-pointer hover:underline">users</p>
      </NavLink>
      <p className="cursor-pointer hover:underline" onClick={handleLogout}>
        logout
      </p>
    </div>
  );
};

export default AdminNavbar;
