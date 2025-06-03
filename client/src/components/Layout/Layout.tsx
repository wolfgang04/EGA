import { Outlet } from "react-router";
import AdminNavbar from "../Admin/AdminNavbar";
import Navbar from "../Employee/Navbar";

export const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export const EmployeeLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
