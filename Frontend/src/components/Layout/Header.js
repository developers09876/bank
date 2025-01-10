import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Imageh1 from "../Images/WhatsApp Image 2024-10-05 at 15.28.34_a0e3c4a5.jpg";
import villuLogo from "../Images/villu-logo-png.png";
import "./Header.css";
import {
  FaHome,
  FaAddressBook,
  FaInfoCircle,
  FaArrowCircleRight,
  FaClipboardList,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

import Api from "../../Api";
import { Divider } from "antd";

function Header() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    window.scrollTo(0, 0);
    setIsOpen(false); // Close the mobile menu on link click
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("token");
    if (storedUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await Api.get(
        `http://localhost:5000/signup/getby/${userId}`
      );
      setUserDetail(response.data);
      console.log("response", response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const handlenavigate = () => {
    const routes = {
      employee: "/employee",
      user: "/user",
      LoanEmployee: "/adminLoan",
      TaxEmployee: "/employeeTax",
      InsuranceEmployee: "/employeeInsurance",
    };
    const route = routes[userType] || "/login";
    navigate(route);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };
  const menuItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/about", label: "About", icon: <FaInfoCircle /> },
    { path: "/personalplan", label: "Subscription", icon: <FaClipboardList /> },
    { path: "/carrier", label: "Career", icon: <FaBriefcase /> },
    { path: "/refer", label: "Referral", icon: <FaEnvelope /> },
    { path: "/contact", label: "Contact Us", icon: <FaEnvelope /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <nav className=" flex justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <img src={Imageh1} alt="logo-img" className="header-logo" />
        </div>
        <div>
          <ul className="hidden lg:flex lg:space-x-3 lg:mt-0 items-center desktop-menu">
            {menuItems.map((item) => (
              <li key={item.path} className="px-2 py-4">
                <Link
                  onClick={() => handleMenuClick(item.path)}
                  to={item.path}
                  className={`block py-2 pl-3 pr-4 rounded no-underline lg:hover:text-white lg:hover:bg-[#00397f] font-light lg:text-x ${
                    selectedKey === item.path
                      ? "bg-[#00397f] text-white"
                      : "text-gray-700"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <div>
              <IoNotifications />
            </div>
            {!isLoggedIn ? (
              <li>
                <button className="bg-[#00397f] text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-3">
                  <Link to="/login" className="no-underline text-white">
                    Login
                  </Link>
                </button>
              </li>
            ) : (
              <li className="relative">
                <div
                  className="live-icon cursor-pointer"
                  onMouseEnter={() => setDropdownVisible(true)}
                >
                  <img
                    src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=612x612&w=0&k=20&c=CncNUTbw6mzGsbojks2Vt0kV85N_pQaI3zaSkBQJFTc="
                    alt="Live Icon"
                    className="avatar"
                  />
                  <div className="live-badge">100%</div>
                  {dropdownVisible && (
                    <div
                      className="absolute right-0 w-40 mt-2 bg-white shadow-lg rounded"
                      onMouseLeave={() => setDropdownVisible(false)}
                    >
                      <button
                        onClick={handlenavigate}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>

          <button
            className="hamburger lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            &#9776;
          </button>
          {isOpen && (
            <div className="offcanvas show">
              <button className="close-button" onClick={() => setIsOpen(false)}>
                &times;
              </button>
              <div className="nav-links flex flex-col items-start space-y-1">
                {isLoggedIn ? (
                  // <div className="flex flex-row items-center w-full">
                  //   <div><img
                  //     src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=612x612&w=0&k=20&c=CncNUTbw6mzGsbojks2Vt0kV85N_pQaI3zaSkBQJFTc="
                  //     alt="Profile"
                  //     className="w-16 h-16 rounded-full"
                  //   /></div>
                  //    <div className="px-2 text-gray">
                  //   <p style={{justifyContent:'flex-start'}}>{userDetail.firstname}</p>
                  //   <p style={{justifyContent:'flex-start'}}>{userDetail.email}</p>
                  //   </div>
                  // </div>
                  <div className="flex flex-col items-center w-full">
                    <img
                      onClick={handlenavigate}
                      src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=612x612&w=0&k=20&c=CncNUTbw6mzGsbojks2Vt0kV85N_pQaI3zaSkBQJFTc="
                      alt="Profile"
                      className="w-16 h-16 rounded-full"
                    />
                    <p style={{ justifyContent: "flex-start" }}>
                      {userDetail.firstname} {userDetail.lastname}
                    </p>
                  </div>
                ) : (
                  <img
                    src={Imageh1}
                    alt="logo-img"
                    className="w-16 h-16 mb-2"
                  />
                )}
                <div style={{ alignSelf: "flex-start", marginLeft: "20px" }}>
                  {menuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="navlink py-1 pl-3 pr-4 rounded no-underline text-gray-700 "
                      onClick={() => handleMenuClick(item.path)}
                    >
                      <span className="flex rounded flex-row nav-link">
                        <span
                          style={{
                            alignSelf: "center",
                            paddingRight: "20px",
                            color: "#1a2a41",
                            display: "inline-block",
                          }}
                        >
                          {item.icon}
                        </span>
                        {item.label}
                      </span>
                    </Link>
                  ))}
                  <div>
                    <IoNotifications />
                  </div>

                  {!isLoggedIn ? (
                    <Link
                      to="/login"
                      className="navlink  py-1 rounded no-underline text-gray-700 "
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex rounded flex-row nav-link">
                        <span
                          style={{
                            alignSelf: "center",
                            paddingRight: "20px",
                            color: "#1a2a41",
                            display: "inline-block",
                          }}
                        >
                          <FaArrowCircleRight />
                        </span>
                        Login
                      </span>
                    </Link>
                  ) : (
                    <div
                      style={{
                        alignSelf: "flex-start",
                        display: "flex",
                        flexDirection: "column",
                        textAlignLast: "justify",
                      }}
                    >
                      <button
                        style={{ padding: "0.25rem 0 !important" }}
                        onClick={handlenavigate}
                        className="navlink  block  rounded no-underline text-gray-700 "
                      >
                        <span className="flex rounded flex-row nav-link">
                          <span
                            style={{
                              alignSelf: "center",
                              paddingRight: "20px",
                              color: "#1a2a41",
                              display: "inline-block",
                            }}
                          >
                            <FaAddressBook />
                          </span>
                          My Profile
                        </span>
                      </button>
                      <button
                        style={{ padding: "0.25rem 0 !important" }}
                        onClick={handleLogout}
                        className="navlink py-3 block rounded no-underline text-gray-700 "
                      >
                        <span className="flex rounded flex-row nav-link">
                          <span
                            style={{
                              alignSelf: "center",
                              paddingRight: "20px",
                              color: "#1a2a41",
                              display: "inline-block",
                            }}
                          >
                            <FaArrowCircleRight />
                          </span>
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
