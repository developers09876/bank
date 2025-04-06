import React from "react";
import { useForm } from "react-hook-form";
import "./Register.scss";
import { Grid, Typography, Button, Box } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Header from "../Layout/Header";
import Api from "../../Api";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const details = {
      userType: "user",
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      contactNumber: data.contactNumber,
    };

    try {
      await Api.post("signup/register", details);
      toast.success("Registration successful!", { autoClose: 2000 });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="register-container">
      <Header />
      <ToastContainer />
      <Row className="mt-5 registerpageRow">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Typography
              className="typoheading"
              variant="h4"
              fontWeight="bold"
              align="center"
              mt={6}
            >
              Easy. Quick. Efficient.
            </Typography>
            <Box
              sx={{
                display: "grid",
                alignItems: "center",
                height: "80%",
                marginLeft: "50px",
              }}
            >
              <img
                className="image-reduced1"
                src="https://img.freepik.com/premium-photo/professional-bill-design-money-banking-finance-commerce-market_1316704-24000.jpg"
                alt="Personalized loans"
              />
              <div>
                <Button
                  onClick={() => navigate("/")}
                  className="getstart"
                  style={{ marginLeft: "45px", marginBottom: "49px" }}
                >
                  Get Started
                </Button>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} style={{ marginTop: "5%" }}>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
              <div className="register-form__row">
                <div className="register-form__group">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    {...register("firstname", {
                      required: "First name is required",
                    })}
                    className="register-form__input"
                    placeholder="Enter your first name"
                  />
                  {errors.firstname && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className="register-form__group">
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    {...register("lastname", {
                      required: "Last name is required",
                    })}
                    className="register-form__input"
                    placeholder="Enter your last name"
                  />
                  {errors.lastname && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="register-form__row">
                <div className="register-form__group">
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input
                    {...register("contactNumber", {
                      required: "Contact number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit number",
                      },
                    })}
                    className="register-form__input"
                    placeholder="Contact Number"
                    maxLength="10"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9]/g, "")
                        .slice(0, 10);
                    }}
                  />
                  {errors.contactNumber && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {errors.contactNumber.message}
                    </p>
                  )}
                </div>
                <div className="register-form__group">
                  <label htmlFor="email">Email:</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="register-form__input"
                    placeholder="Input your email address"
                  />
                  {errors.email && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <button type="submit" className="register-form__submit">
                Create Account
              </button>
              <div className="register-form__redirect">
                <span>Already have an account? </span>
                <a href="/login">Sign in</a>
              </div>
            </form>
          </Grid>
        </Grid>
      </Row>
    </div>
  );
};

export default Register;
