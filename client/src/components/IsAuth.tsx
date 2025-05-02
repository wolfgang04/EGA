import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
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
          if (res.data.accType === "admin") navigate("/history");
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
