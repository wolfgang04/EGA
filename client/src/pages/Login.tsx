import axios from "axios";
import React, { useState } from "react";
import SERVER from "../SERVER";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    try {
      const { status, data } = await axios.post(
        `${SERVER}/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      if (status === 200) {
        if (data.accType === "admin") navigate("/history");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="p-1" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username"
        className="block border outline-none"
        value={username}
        onChange={(e) => handleChangeUsername(e)}
      />
      <input
        type="password"
        placeholder="password"
        className="block border outline-none"
        value={password}
        onChange={(e) => handleChangePassword(e)}
      />
      <button className="cursor-pointer">submit</button>
    </form>
  );
};

export default Login;
