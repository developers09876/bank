import React, { useState } from "react";
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
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel CSS
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();
console.log('firstsss', first)
  const validate = () => {

    let tempErrors = { email: "", password: "" };
    let valid = true;
  console.log('')
    if (!email) {  
      tempErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is not valid";
      valid = false;
    }

    if (!password) {
      tempErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Show success toast
      toast.success("Logged in successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      toast.error("Please fix the errors in the form", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  return (
    <Container
      maxWidth="lg"
      style={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Grid container>
        {/* Left Side - Login Form */}
        <Grid item xs={12} md={6}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
            px={4}
          >
            {/* Logo or Icon */}
            <Box mb={4}>
              <Typography variant="h4" fontWeight="bold">
                Welcome back!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Enter to get unlimited access to data & information.
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />

              {/* Password Input */}
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />

              {/* Remember me and Forgot password */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                mt={1}
              >
                <Box display="flex" alignItems="center">
                  <Checkbox />
                  <Typography>Remember me</Typography>
                </Box>
                <Link href="#" variant="body2">
                  Forgot your password?
                </Link>
              </Box>

              {/* Log In Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>

              {/* Or divider */}
              <Divider>Or, Login with</Divider>

              {/* Google Sign In Button */}
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                fullWidth
                size="large"
                sx={{ mt: 2 }}
              >
                Sign up with Google
              </Button>

              {/* Register Link */}
              <Box mt={2}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link href="/register">Register here</Link>
                </Typography>
              </Box>
            </form>
          </Box>

          {/* Toast Container */}
        </Grid>

        {/* Right Side - Carousel */}
        <Grid item xs={false} md={6}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={3000}
              style={{ width: "100%", height: "100%" }}
            >
              {/* Slide 1 */}
              <div>
                <img
                  src="https://buddyloan-wordpress-blog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2024/09/06171839/side1.jpg "
                  style={{ width: "100%", height: "90vh", objectFit: "cover" }}
                  alt="Slide 1"
                />
              </div>
              {/* Slide 2 */}
              <div>
                <img
                  src="https://www.shutterstock.com/shutterstock/photos/2426984001/display_1500/stock-photo-businessman-using-laptop-in-data-management-with-a-networked-copy-space-vertical-2426984001.jpg"
                  style={{ width: "100%", height: "90vh", objectFit: "cover" }}
                  alt="Slide 2"
                />
              </div>
              {/* Slide 3 */}
              <div>
                <img
                  src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2stczE5LWljZS0zNjQ5LWx5ajIwNTQtMDktaW5jb21ldGF4cmV0dXJuLmpwZw.jpg"
                  style={{ width: "100%", height: "90vh", objectFit: "fill" }}
                  alt="Slide 3"
                />
              </div>
            </Carousel>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
