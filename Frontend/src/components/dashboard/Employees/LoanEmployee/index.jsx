import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiUserCircle } from "react-icons/hi";
import Sidebar from "./Sidebar";
import Imageh1 from "../../../Images/WhatsApp Image 2024-10-05 at 15.28.34_a0e3c4a5.jpg";

import '../../HeaderNavbar.scss';
import "../../Sidebar.scss";

const LoanEmployeesIndex = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 720) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setCollapsed((prev) => !prev);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
    localStorage.removeItem("employeeCategory");

    navigate("/login");
  };

  return (
    <div>
      <header className="dashboards__headerNavs">
        <div className="dashboards__headerNavs--container">
          <span className="navMenu p-2" onClick={toggleSidebar}>
            {collapsed ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </span>
          <span className="navName" onClick={() => navigate("/")}>
          <img
            src={Imageh1}
            alt="logo-img"
            style={{ width: "100px", height: "95px"}}
          />
          </span>
          <button className="bg-[#00397f] text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <Sidebar collapsed={collapsed} />
      <main className={collapsed ? "main-content open" : "main-content"}>
        <Outlet />
      </main>
    </div>
  );
};

export default LoanEmployeesIndex;
