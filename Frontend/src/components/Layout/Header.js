import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Imageh1 from "../Images/WhatsApp Image 2024-10-05 at 15.28.34_a0e3c4a5.jpg";
import "./Header.css";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Effect to check if user is logged in on component mount
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true); // Set logged-in state if username is found
    }
  }, []);

  const handleLoginSuccess = (name) => {
    localStorage.setItem("username", name); // Store username in localStorage
    setIsLoggedIn(true); // Update state on successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update state on logout
    localStorage.removeItem("username"); // Clear username from localStorage
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <nav className="flex justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <img
            src={Imageh1}
            alt="logo-img"
            style={{ width: "100px", height: "95px", position: "absolute" }}
          />
        </div>
        <div>
          <ul className="flex flex-col font-medium lg:flex-row lg:space-x-6 lg:mt-0 items-center">
            <li className="px-2 py-4">
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 rounded text-gray-700 no-underline lg:hover:text-white lg:hover:bg-[#00397f] font-light lg:text-x"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 rounded text-gray-700 no-underline lg:hover:text-white lg:hover:bg-[#00397f] font-light lg:text-x"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 pl-3 pr-4 rounded text-gray-700 no-underline lg:hover:text-white lg:hover:bg-[#00397f] font-light lg:text-x"
              >
                Contact Us
              </Link>
            </li>
            {!isLoggedIn ? (
              <li>
                <button className="bg-[#00397f] text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-3">
                  <Link
                    to="/login"
                    className="no-underline text-white"
                    onClick={() => handleLoginSuccess("User Name")}
                  >
                    Login
                  </Link>
                </button>
              </li>
            ) : (
              <li className="relative">
                <div
                  className="live-icon cursor-pointer"
                  onMouseEnter={() => setDropdownVisible(true)}
                  //
                >
                  <img
                    src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=612x612&w=0&k=20&c=CncNUTbw6mzGsbojks2Vt0kV85N_pQaI3zaSkBQJFTc="
                    alt="Live Icon"
                    className="avatar"
                    style={{ width: "40px", height: "40px" }} // Style the icon
                  />
                  <div className="live-badge">100%</div>{" "}
                  {/* Badge for live status */}
                  {dropdownVisible && (
                    <div
                      className="absolute right-0 w-40 mt-2 bg-white shadow-lg rounded"
                      onMouseLeave={() => setDropdownVisible(false)}
                    >
                      <Link
                        to="#"
                        className="block px-4 py-2 text-gray-700 no-underline hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
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
        </div>
      </nav>
    </header>
  );
}

export default Header;
