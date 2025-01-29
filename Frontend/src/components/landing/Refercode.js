import React, { useState, useRef } from "react";
import "./refer.css";
import { Col, Row } from "react-bootstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const ReferCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subCategory, categoryTitle } = location.state || {};
  const [referCode, setReferCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Restrict to one digit per box

    const newCode = [...referCode];
    newCode[index] = value.replace(/\D/, ""); // Allow only numbers
    setReferCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus(); // Move to next input
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !referCode[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Move back on delete
    }
  };

  const submitReferralCode = async () => {
    const finalCode = referCode.join("");
    if (finalCode.length !== 6) {
      alert("Please enter a 6-digit referral code.");
      return;
    }

    const userId = localStorage.getItem("id");

    try {
      const response = await fetch(`${API_URL}/api/referrals/addCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: categoryTitle,
          subCategory: subCategory?.title,
          reward: subCategory?.rewards,
          userId,
          referCode: finalCode,
        }),
      });

      if (response.ok) {
        alert("Referral code submitted successfully!");
        navigate("/user/rewards");
      } else {
        alert("Failed to submit referral code.");
      }
    } catch (error) {
      alert("Error: Unable to submit referral code.");
    }
  };

  return (
    <div>
      <Header />
      <div className="refer-parent">
        <div className="refer-container">
          <div className="refer-card">
            <Row className="refer-firstrow px-5 py-2">
              <Col className="refer-firstcol px-1 py-2" lg={6} md={12} sm={12} xs={12}>
                <div className="referral-left animate-slide-in-left">
                  <h1 className="refer-heading">Referral Code</h1>
                  <p>Please enter your 6-digit referral code below:</p>
                  
                  <div className="refer-input-boxes">
                    {referCode.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        className="refer-digit-input"
                        value={digit}
                        maxLength={1}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    ))}
                  </div>

                  <button className="learn-more-button" onClick={submitReferralCode}>
                    Submit Code
                  </button>
                </div>
              </Col>
              <Col className="refer-secondcol px-3 py-2" lg={6} md={12} sm={12} xs={12}>
                <img src="https://img.freepik.com/premium-vector/mobile-shopping-concept-with-people-buy-things-online-store-via-smartphone_138260-1287.jpg" alt="Refer Code" />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReferCode;
