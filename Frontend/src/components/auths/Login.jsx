import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Checkbox,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Header from "../Layout/Header";
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { MdVerified } from "react-icons/md";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setstep] = useState("first");

  const navigate = useNavigate();

  const validateInputs = () => {
    let tempErrors = { email: "", mobile: "" };
    let isValid = true;

    if (!email && !mobile) {
      tempErrors.email = "Either Email or Phone Number is required.";
      tempErrors.mobile = "Either Email or Phone Number is required.";
      isValid = false;
    } else {
      if (email && !/\S+@\S+\.\S+/.test(email)) {
        tempErrors.email = "Invalid email format.";
        isValid = false;
      }
      if (mobile && !/^\d{10}$/.test(mobile)) {
        tempErrors.mobile = "Phone Number must be 10 digits.";
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleFormSubmit = async (e) => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/nodemailer/forgetpassword",
        {
          email,
        }
      );

      localStorage.setItem("userType", response.data.data.userType);
      localStorage.setItem("id", response.data.data._id);
      console.log('response.data.data', response.data.data)
      

      toast.success("OTP sent successfully!", {
        position: "top-center",
        autoClose: 3000,
      });

      setstep("second");
    } catch (error) {
      console.error("Login error:", error.response?.data);
      toast.error(
        error.response?.data?.error || "Login failed. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };
  const [otp, setOtp] = useState("");

  const onSubmit = (data) => {
    handleFormSubmit();
    console.log("formState", getValues());
  };

  const onSubmit1 = async (data) => {
    // checkCode();
    console.log("OTP", otp);
    const code = otp;
    try {
      const response = await axios.post(
        "http://localhost:5000/nodemailer/checkverification",
        {
          email,
          code,
        }
      );
      console.log("response", response);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("email", response.data.data.checkEmail.email);
      if( response.data.data.checkEmail?.employeeCategory){
        localStorage.setItem("employeeCategory", response.data.data.checkEmail.employeeCategory)
      }
      toast.success("Verification successfull!", {
        position: "top-center",
        autoClose: 3000,
      });
      const userType = localStorage.getItem("userType");
      const employeeCategory = localStorage.getItem("employeeCategory");
      console.log("userType", userType);

      setTimeout(() => {
        const routes = {
          employee: "/employee",
          user: "/user",
          // LoanEmployee: "/adminLoan",
          LoanEmployee: employeeCategory ? "/loanEmp" : "/adminLoan",
          // TaxEmployee: "/employeeTax",
          TaxEmployee: employeeCategory ? "/taxEmp" : "/employeeTax",
          // InsuranceEmployee: "/employeeInsurance",
          InsuranceEmployee: employeeCategory ? "/insuranceEmply":"/employeeInsurance",
          stockMarket: "/employeeStockMarket",
        };
        const route = routes[userType] || "/login";
        navigate(route);
      }, 3000);

      // console.log("first", response);
      // setstep("second");
    } catch (error) {
      console.error("Login error:", error.response?.data);
      toast.error(
        error.response?.data?.error || "Login failed. Please try again.",
        {
          position: "top-center",
          autoClose: 3000,
        }
      );
    }
  };
  const { register, handleSubmit, getValues } = useForm();
  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        style={{
          height: "88vh",
          display: "flex",
          alignItems: "center",
          marginTop: "5%",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height="95%"
              px={4}
            >
              {step === "first" ? (
                <form>
                  <Box mb={4}>
                    <Typography variant="h4" fontWeight="bold">
                      Welcome back!
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Welcome back! Please enter your details
                    </Typography>
                  </Box>

                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (e.target.value) setErrors({ email: "", mobile: "" });
                    }}
                    // onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <Divider>Or</Divider>

                  <TextField
                    label="Phone Number"
                    type="tel"
                    variant="outlined"
                    fullWidth
                    required
                    margin="normal"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (e.target.value) setErrors({ email: "", mobile: "" });
                    }}
                    // onChange={(e) => setMobile(e.target.value)}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Send OTP
                  </Button>

                  {/* <Button
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    fullWidth
                    size="large"
                    sx={{ mt: 2 }}
                  >
                    Sign up with Google
                  </Button> */}

                  <Box mt={2}>
                    <Typography variant="body2">
                      Don't have an account?{" "}
                      <Link href="/register">Register here</Link>
                    </Typography>
                  </Box>
                </form>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <Box mb={4}>
                    <div
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        display: "flex",
                        color: "#00397f",
                        fontSize: "60px",
                      }}
                    >
                      <MdVerified />
                    </div>
                    <br />
                    <Typography variant="h4" fontWeight="bold">
                      Verification Code
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Enter the 4 digit verification code that was sent to your
                      Email or PhoneNumber
                    </Typography>
                  </Box>
                  <div
                    className="otp"
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={{
                        width: "3rem",
                        justifyContent: "center",
                        height: "3rem",
                        margin: "0 0.5rem",
                        fontSize: "1.5rem",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        textAlign: "center",
                      }}
                    />
                  </div>
                  <p
                    className="resend-otp"
                    // onClick={handleSubmit(onSubmit1)}
                  >
                    Resend OTP
                  </p>
                  <Button
                    className="forget_button mt-3 justify-content-center"
                    onClick={handleSubmit(onSubmit1)}
                    style={{ backgroundColor: "#00397f", color: "white" }}
                  >
                    Verify OTP
                  </Button>
                </div>
              )}
            </Box>
          </Grid>

          <Grid item xs={false} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: "95%",
              }}
            >
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                interval={3000}
                style={{ width: "100%", height: "50%" }}
              >
                <div>
                  <img
                    src="https://fundingguru.com/wp-content/uploads/2024/03/business-loans-tax-implications.jpg"
                    style={{ width: "100%", height: "65vh", objectFit: "fill" }}
                    alt="Slide 1"
                  />
                </div>
                <div>
                  <img
                    src="https://www.shutterstock.com/shutterstock/photos/2426984001/display_1500/stock-photo-businessman-using-laptop-in-data-management-with-a-networked-copy-space-vertical-2426984001.jpg"
                    style={{
                      width: "100%",
                      height: "65vh",
                      objectFit: "cover",
                    }}
                    alt="Slide 2"
                  />
                </div>
                <div>
                  <img
                    src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2stczE5LWljZS0zNjQ5LWx5ajIwNTQtMDktaW5jb21ldGF4cmV0dXJuLmpwZw.jpg"
                    style={{ width: "100%", height: "65vh", objectFit: "fill" }}
                    alt="Slide 3"
                  />
                </div>
              </Carousel>
            </Box>
          </Grid>
        </Grid>
        <ToastContainer />
      </Container>
    </>
  );
};

export default LoginPage;
