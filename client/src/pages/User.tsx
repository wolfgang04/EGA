import axios from "axios";
import React, { useEffect } from "react";
import SERVER from "../SERVER";

const User = () => {
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(SERVER + "/user");
    };

    fetchUser();
  }, []);

  return <></>;
};

export default User;
