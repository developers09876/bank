import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Imageh1 from "../Images/WhatsApp Image 2024-10-05 at 15.28.34_a0e3c4a5.jpg";
import villuLogo from "../Images/villu-logo-png.png";
import { Modal, Card, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
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
import { Badge } from "antd";
import Api from "../../Api";
import { Divider } from "antd";

function Header() {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [notificationCount, setNotificationCount] = useState(1); 
  const navigate = useNavigate();

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    window.scrollTo(0, 0);
    setIsOpen(false);
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
              <Badge count={notificationCount} size="small" offset={[-5, 5]}>
                <IoNotifications  style={{ fontSize: '24px' }}  onClick={() => setIsOpen(true)} />
              </Badge>
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
        </div>
      </nav>

      {/* Notification Modal */}
      <NotificationModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
}
const NotificationModal = ({ isOpen, setIsOpen }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      date: "2025-01-10",
      message: "Your request has been deleted.",
    },
    // {
    //   id: 2,
    //   date: "2025-01-09",
    //   message: "Your product has been shipped.",
    // },
    // {
    //   id: 3,
    //   date: "2025-01-08",
    //   message: "You have a new message from admin.",
    // },
  ]);

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <Modal
      title="Notifications"
      visible={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={400}
      className="notification-modal"
    >
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {notifications.length === 0 ? (
          <p>No notifications available.</p>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              style={{
                // marginBottom: "16px",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(17, 219, 226, 0.1)",
                height: "125px",
              }}
              actions={[
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(notification.id)}
                  style={{ color: "red" }}
                ></Button>,
              ]}
            >
              <p>
                <strong className="notification-heading">Date:</strong>{" "}
                {notification.date}
              </p>
              <p>
                <strong className="notification-heading">Message:</strong>{" "}
                {notification.message}
              </p>
            </Card>
          ))
        )}
      </div>
    </Modal>
  );
};

export default Header;
