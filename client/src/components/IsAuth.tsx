import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import SERVER from "../SERVER";

const IsAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${SERVER}/auth/authCheck`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          localStorage.setItem("role", res.data.accType);
          if (res.data.accType === "admin") navigate("/admin/history");
          else navigate("/user/requests");
        } else if (res.status === 401) {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="">
      <p>Loading...</p>
    </div>
  );
};

export default IsAuth;
