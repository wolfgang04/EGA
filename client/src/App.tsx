import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Login from "./pages/Login";
import { lazy, Suspense, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";
import RoleGuard from "./components/RoleGuard";
import { AdminLayout, EmployeeLayout } from "./components/Layout/Layout";

const AdminDashboard = lazy(() => import("./pages/Admin/AdminDasboard"));
const IsAuth = lazy(() => import("./components/IsAuth"));
const RequestOverview = lazy(() => import("./pages/RequestOverview"));
const Categories = lazy(() => import("./pages/Admin/Categories"));
const Tool = lazy(() => import("./pages/Admin/Tool"));
const Users = lazy(() => import("./pages/Admin/Users"));
const Requests = lazy(() => import("./pages/Employee/Requests"));
const Tools = lazy(() => import("./pages/Employee/Tools"));
const User = lazy(() => import("./pages/User"));
const Profile = lazy(() => import("./pages/Profile"));

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
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<IsAuth />} />
        <Route path="/login" element={<Login />} />
        <Route path="request/:requestID" element={<RequestOverview />} />
        <Route path="/:user" element={<User />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <RoleGuard allowed={["admin"]} role={role}>
              <AdminLayout />
            </RoleGuard>
          }
        >
          <Route path="history" element={<AdminDashboard />} />
          <Route path="tools" element={<Categories />} />
          <Route path="tools/:tool" element={<Tool />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* EMPLOYEE ROUTES */}
        <Route
          path="/user"
          element={
            <RoleGuard role={role} allowed={["employee"]}>
              <EmployeeLayout />
            </RoleGuard>
          }
        >
          <Route path="requests" element={<Requests />} />
          <Route path="tools" element={<Tools />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
