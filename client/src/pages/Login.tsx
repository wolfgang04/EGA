import axios from "axios";
import React, { useState } from "react";
import SERVER from "../SERVER";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
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
      await axios.post(
        `${SERVER}/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true },
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      setHasError(true);
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
      {hasError && (
        <div id="name-error" className={`text-red-600`}>
          Invalid username or password
        </div>
      )}

      <button className="cursor-pointer">submit</button>
    </form>
  );
};

export default Login;
