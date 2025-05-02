import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import Login from "./pages/Login";
import { useEffect } from "react";
import axios from "axios";
import AdminDashboard from "./pages/AdminDasboard";
import IsAuth from "./components/IsAuth";
import RequestOverview from "./pages/RequestOverview";
import Categories from "./pages/Categories";
import Tool from "./pages/Tool";

export default function App() {
  const navigate = useNavigate();

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
      <Route path="/history" element={<AdminDashboard />} />
      <Route path="/request/:requestID" element={<RequestOverview />} />
      <Route path="/tools" element={<Categories />} />
      <Route path="/tools/:tool" element={<Tool />} />
    </Routes>
  );
}
