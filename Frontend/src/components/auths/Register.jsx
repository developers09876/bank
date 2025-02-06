import React, { useState } from "react";
import "./Register.scss";
import { Grid, Typography, Button, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import Header from "../Layout/Header";
import { Col, Row } from "react-bootstrap";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    userType: "user",
    firstname: "",
    lastname: "",
    email: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({ contactNumber: "" });
  const navigate = useNavigate();

  const { userType, firstname, lastname, contactNumber, email } = inputs; 

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        userType,
        firstname,
        lastname,
        contactNumber,
        email,
      };

      const response = await axios.post(
        "http://localhost:5000/signup/register",
        body
      );

      toast.success("Registration successful!", {
        autoClose: 2000, 
      });

    
      setTimeout(() => {
        navigate("/login");
      }, 2000); 
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <Header />
      <ToastContainer />
      <Grid container style={{ marginTop: "6%" }}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h4"
            fontWeight="bold"
            style={{ textAlign: "center", marginTop: "60px" }}
          >
            Easy. Quick. Efficient.
          </Typography>
          <Box
            sx={{
              display: "Grid",
              alignItems: "center",
              height: "80%",
              flexWrap: "wrap",
              marginLeft: "50px",
            }}
          >
            <div>
              <img
                className="image-reduced1"
                src="https://img.freepik.com/premium-photo/professional-bill-design-money-banking-finance-commerce-market_1316704-24000.jpg?uid=R154751350&ga=GA1.1.1985983126.1725981835&semt=ais_hybrid"
                alt="Personalized loans"
              />
            </div>
            <Button
              onClick={() => navigate("/")}
              style={{ marginLeft: "-100px" }}
            >
              Get Started
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <form onSubmit={onSubmit} className="register-form">
            <div className="register-form__row">
              <div className="register-form__group">
                <label htmlFor="firstname" className="register-form__label">
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={firstname}
                  onChange={onChange}
                  className="register-form__input"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="register-form__group">
                <label htmlFor="lastname" className="register-form__label">
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={lastname}
                  onChange={onChange}
                  className="register-form__input"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div className="register-form__row">
              <div className="register-form__group">
                <label htmlFor="contactNumber" className="register-form__label">
                  Contact Number:
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={contactNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value) && value.length <= 10) {
                      onChange(e); 
                      setErrors({ ...errors, contactNumber: "" });
                    } else {
                      setErrors({ ...errors, contactNumber: "Enter a valid 10-digit number" });
                    }
                  }}
                  maxLength="10" 
                  className="register-form__input"
                  placeholder="Contact Number"
                  required
                />
                {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}
              </div>

              <div className="register-form__group">
                <label htmlFor="email" className="register-form__label">
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange} 
                  className="register-form__input"
                  placeholder="Input your email address"
                  required
                />
              </div>
            </div>

            <button type="submit" className="register-form__submit">
              Create Account
            </button>
            <div className="register-form__redirect">
              <span className="register-form__text">
                Already have an account?{" "}
              </span>
              <a href="/login" className="register-form__link">
                Sign in
              </a>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
