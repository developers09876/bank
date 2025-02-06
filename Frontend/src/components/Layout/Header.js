import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal, Card, Button, Badge } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  FaHome,
  FaInfoCircle,
  FaClipboardList,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import Api from "../../Api";
import Imageh1 from "../Images/WhatsApp Image 2024-10-05 at 15.28.34_a0e3c4a5.jpg";
import "./Header.css";
import { generateToken, messaging } from "../notification/fireBase";
import { onMessage } from "firebase/messaging";

const menuItems = [
  { path: "/", label: "Home", icon: <FaHome /> },
  { path: "/about", label: "About", icon: <FaInfoCircle /> },
  { path: "/personalplan", label: "Subscription", icon: <FaClipboardList /> },
  { path: "/carrier", label: "Career", icon: <FaBriefcase /> },
  // { path: "/refer", label: "Referral", icon: <FaEnvelope /> },
  { path: "/contact", label: "Contact Us", icon: <FaEnvelope /> },
];

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
    });
  }, []);
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const userType = localStorage.getItem("userType");
  const userId = localStorage.getItem("id");
  const employeeCategory = localStorage.getItem("employeeCategory");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      const response = await Api.get(`/signup/getby/${userId}`);
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleMenuClick = (key) => {
    setSelectedKey(key);
    window.scrollTo(0, 0);
    setIsOpen(false);
  };

  const handlenavigate = () => {
    const routes = {
      employee: "/employee",
      user: "/user",
      // LoanEmployee: "/adminLoan",
      LoanEmployee: employeeCategory ? "/loanEmp" : "/adminLoan",
      // TaxEmployee: "/employeeTax",
      TaxEmployee: employeeCategory ? "/taxEmp" : "/employeeTax",
      // InsuranceEmployee: "/employeeInsurance",
      InsuranceEmployee: employeeCategory
        ? "/insuranceEmply"
        : "/employeeInsurance",
    };
    navigate(routes[userType] || "/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("userType");
    localStorage.removeItem("employeeCategory");
    localStorage.removeItem("loanType");
    localStorage.removeItem("referCode");
    localStorage.removeItem("referType");
    localStorage.removeItem("loanApplicationId");
    localStorage.removeItem("email");
    localStorage.removeItem("referralCode");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <nav className="flex justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center">
          <img src={Imageh1} alt="Logo" className="header-logo" />
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
            {isLoggedIn && userType === "user" && (
              <Badge count={notificationCount} size="small" offset={[-5, 5]}>
                <IoNotifications
                  style={{ fontSize: "24px" }}
                  onClick={() => setIsOpen(true)}
                />
              </Badge>
            )}

            {!isLoggedIn ? (
              <li>
                <button className="bg-[#00397f] text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-3">
                  <Link to="/login" className="no-underline text-white">
                    Login
                  </Link>
                </button>
              </li>
            ) : (
              <UserDropdown
                handlenavigate={handlenavigate}
                handleLogout={handleLogout}
                dropdownVisible={dropdownVisible}
                setDropdownVisible={setDropdownVisible}
              />
            )}
          </ul>
        </div>
      </nav>
      <NotificationModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setNotificationCount={setNotificationCount}
      />
    </header>
  );
};

const UserDropdown = ({
  handlenavigate,
  handleLogout,
  dropdownVisible,
  setDropdownVisible,
}) => {
  useEffect(() => {
    if (dropdownVisible) {
      const timer = setTimeout(() => {
        setDropdownVisible(false);
      }, 5000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount or visibility change
    }
  }, [dropdownVisible, setDropdownVisible]);
  return (
    <li className="relative">
      <div
        className="live-icon cursor-pointer"
        onClick={() => setDropdownVisible(true)}
        // onMouseLeave={() => setDropdownVisible(false)}
      >
        <img
          src="https://media.istockphoto.com/id/1406197730/photo/portrait-of-a-young-handsome-indian-man.jpg?s=612x612&w=0&k=20&c=CncNUTbw6mzGsbojks2Vt0kV85N_pQaI3zaSkBQJFTc="
          alt="User Avatar"
          className="avatar"
        />
        <div className="live-badge">100%</div>
        {dropdownVisible && (
          <div className="absolute right-0 w-40 mt-2 bg-white shadow-lg rounded">
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
  );
};

const NotificationModal = ({ isOpen, setIsOpen, setNotificationCount }) => {
  const email = localStorage.getItem("email");
  const userId = localStorage.getItem("id");

  const [notifications, setNotifications] = useState([]);
  const [userNotificationId, setUserNotificationId] = useState(null);
  const [notificationsStatus, setNotificationsStatus] = useState(null);

  useEffect(() => {
    if (email) {
      fetchNotifications();
    }
  }, [email, notificationsStatus]);

  // Trigger API when modal opens
  useEffect(() => {
    if (isOpen && userNotificationId) {
      updateNotificationStatus();
    }
  }, [isOpen, userNotificationId]);

  const fetchNotifications = async () => {
    try {
      const response = await Api.get(`/lead/getByMail/${email}`);
      const remarks = response.data.data.addremarks || [];

      // Filter notifications: Include only those with no `notiFicatioinStauts` or where it is "false"
      const unreadNotifications = remarks.filter(
        (remark) =>
          !remark.notiFicatioinStauts || remark.notiFicatioinStauts === "false"
      );

      setNotifications(remarks);
      setUserNotificationId(response.data.data._id);
      setNotificationCount(unreadNotifications.length); // Set count based on filtered notifications
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const updateNotificationStatus = async () => {
    try {
      await Api.put(`/lead/notification-status/${userNotificationId}`).then(
        (res) => {
          setNotificationsStatus(res);
        }
      );
      console.log("Notification status updated successfully");
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Api.delete(`/lead/delete/${userNotificationId}/remark/${id}`);
      setNotifications((prev) => prev.filter((item) => item._id !== id));
      setNotificationCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <Modal
      title="Notifications"
      visible={isOpen}
      onCancel={() => setIsOpen(false)}
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
              key={notification._id}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(17, 219, 226, 0.1)",
                height: "125px",
                marginBottom: "16px",
              }}
              actions={[
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(notification._id)}
                  style={{ color: "red" }}
                />,
              ]}
            >
              <p>
                <strong className="notification-heading">Date:</strong>{" "}
                {notification.date}
              </p>
              <p>
                <strong className="notification-heading">Subject:</strong>{" "}
                {notification.remarks}
              </p>
            </Card>
          ))
        )}
      </div>
    </Modal>
  );
};

export default Header;
