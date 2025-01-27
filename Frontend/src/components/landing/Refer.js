import React, { useState } from "react";
import "./refer.css";
import { Col, Row } from "react-bootstrap";
import image1 from "../Images/refer-a-friend-hd.png";
import Image2 from "../Images/bgrem.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Input } from "antd";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Refer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subCategory, categoryTitle } = location.state || {};
  const [contactNumber, setContactNumber] = useState("");
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  
  const submitReferral = async () => {
    if (!contactNumber) {
      alert("Please enter a contact number.");
      return;
    }
  
    const userId = localStorage.getItem("id");
    console.log("Submitting referral with data:", {
      category: categoryTitle,
      subCategory: subCategory.title,
      reward: subCategory.rewards,
      userId,
      contactNumber,
    });
  
    try {
      const response = await fetch(`${API_URL}/api/referrals/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: categoryTitle,
          subCategory: subCategory.title,
          reward: subCategory.rewards,
          userId,
          contactNumber,
        }),
      });
  
      if (response.ok) {
        console.log("API response:", await response.json());
        alert("Referral submitted successfully!");
        navigate("/user/rewards"); 
      } else {
        const errorData = await response.json();
        console.error("API failed with status:", response.status, errorData);
        alert("Failed to submit referral.");
      }
    } catch (error) {
      console.error("Error submitting referral:", error);
      alert("Error: Unable to submit referral.");
    }
  };
  

  return (
    <div>
      <Header />
      <div className="refer-parent">
        <div className="refer-container">
          <div className="refer-card">
            <Row className="refer-firstrow px-5 py-2">
              <Col
                className="refer-firstcol px-1 py-2"
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <div className="referral-left animate-slide-in-left">
                  <h1 className="refer-heading">Refer a Friend</h1>
                  <p>
                    Share the benefits you enjoy with your friends and family.
                    For every successful referral, earn exciting rewards as a
                    token of our appreciation.
                  </p>
                  {subCategory?.title && (<p>
        Refer for {subCategory?.title} and get reward worth Rs. {subCategory.rewards} per referral.
      </p>)}
                  <div>
                    <TextField
                      id="number-input"
                      label="Enter the Number"
                      variant="outlined"
                      type="nunber"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      size="small"
                      // fullWidth
                      // className="inputcolumn-refer"
                    />
                    <br />
                    <button type="submit" className="learn-more-button" onClick={submitReferral}>
                      Submit
                    </button>
                  </div>
                </div>
              </Col>
              <Col
                className="refer-secondcol px-3 py-2"
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <img
                  // src={Image2}
                  src="https://dsazhl88swmg2.cloudfront.net/sublime-referral/refer-a-friend.png"
                ></img>
              </Col>
            </Row>
            <div className="refer-svgpath">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 650 300"
                preserveAspectRatio="none"
                className="svg-path"
              >
                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="50%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#3b82f6" />{" "}
                  </linearGradient>
                </defs>

                <path
                  d="M 650 0 L 650 300 L 225 300 Q 235 200 295 180 C 395 130 310 80 445 0 L 650 0 Z"
                  fill="url(#gradient)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Refer;
