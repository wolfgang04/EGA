import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Login from "./pages/Login";
import { useEffect } from "react";
import axios from "axios";
import AdminDashboard from "./pages/Admin/AdminDasboard";
import IsAuth from "./components/IsAuth";
import RequestOverview from "./pages/RequestOverview";
import Categories from "./pages/Admin/Categories";
import Tool from "./pages/Admin/Tool";
import Users from "./pages/Admin/Users";
import AdminNavbar from "./components/Admin/AdminNavbar";
import Navbar from "./components/Employee/Navbar";
import Requests from "./pages/Employee/Requests";
import Tools from "./pages/Employee/Tools";

export default function App() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<IsAuth />} />
      <Route path="/login" element={<Login />} />
      <Route path="request/:requestID" element={<RequestOverview />} />
      {/* ADMIN CONTENTS */}
      {role === "admin" ? (
        <Route path="/admin" element={<AdminNavbar />}>
          <Route path="history" element={<AdminDashboard />} />
          <Route path="tools" element={<Categories />} />
          <Route path="tools/:tool" element={<Tool />} />
          <Route path="users" element={<Users />} />
          {/* <Route path="/users/:user" element={<Tool />} /> */}
        </Route>
      ) : (
        <Route path="/user" element={<Navbar />}>
          {/* EMPLOYEE CONTENTS */}
          <Route path="requests" element={<Requests />} />
          <Route path="tools" element={<Tools />} />
        </Route>
      )}
    </Routes>
  );
}
