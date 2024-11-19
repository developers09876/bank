import React, { useState } from "react";
import "../../dashboard/admin/AdminLogin.css";
import { IoMdMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/admin/adminlogin", { email, password })
      .then((response) => {
        console.log("response", response);
        if (response.data.message) {
          toast.success(response.data.message, {
            onClose: () => navigate("/admin"),
          });
        } else {
          toast.error(response.data.message); // Display error toast
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        toast.error(error.response.data.message); // Handle error
      });
  };

  return (
    <div className="adminlogin">
      <ToastContainer />
      <div className="container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input">
            <IoMdMail className="icon" />
            <input
              type="email"
              placeholder="Email Id"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <RiLockPasswordFill className="icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="visible-icon" />
              ) : (
                <AiOutlineEye className="visible-icon" />
              )}
            </span>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
