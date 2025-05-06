import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router";
import SERVER from "../../SERVER";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${SERVER}/auth/logout`, {
        withCredentials: true,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-5 flex justify-center gap-2">
        <NavLink to="profile">
          <p className="cursor-pointer hover:underline">profile</p>
        </NavLink>
        <NavLink to="requests">
          <p className="cursor-pointer hover:underline">my requests</p>
        </NavLink>
        <NavLink to="tools">
          <p className="cursor-pointer hover:underline">tools</p>
        </NavLink>
        <p className="cursor-pointer hover:underline" onClick={handleLogout}>
          logout
        </p>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
