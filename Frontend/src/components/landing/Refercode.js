import React, { useState, useEffect } from "react";
import "./refercode.css";
import { Col, Row } from "react-bootstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ReferCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subCategory, categoryTitle } = location.state || {};
  const [referCode, setReferCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [referType, setReferType] = useState("Loan");
  const [loanType, setLoanType] = useState("");
  const [insuranceType, setInsuranceType] = useState("");
  const [cibilType, setCibilType] = useState("");
  const { id } = useParams();
  console.log("id", id);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  useEffect(() => {
    if (id) {
      setReferCode(id);
    }
  }, [id]);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const alphanumericValue = inputValue.replace(/[^A-Za-z0-9]/g, "");
    setReferCode(alphanumericValue.slice(0, 11));
  };

  const handleSubmit = async () => {
    if (referCode.length < 11) {
      alert("Please enter at least a 6-character referral code.");
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
          referCode,
          firstName,
          lastName,
          contactNumber,
          email,
          referType,
          loanType,
          insuranceType,
          cibilType,
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
        <div className="refer-containers">
          <div className="refer-cards">
            <Row className="refer-firstrow px-5 py-2">
              <Col
                className="refer-firstcol px-1 py-2"
                lg={6}
                md={12}
                sm={12}
                xs={12}
              >
                <div className="referral-left animate-slide-in-left">
                  <h1 className="refer-headings">
                    Login Here with Your Referral Code
                  </h1>

                  {/* First and Last Name */}
                  <Row style={{ marginBottom: "15px" }}>
                    <Col lg={6} md={6} sm={12}>
                      <label>First Name</label>
                      <input
                        type="text"
                        className="refer-input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="refer-input"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                      />
                    </Col>
                  </Row>

                  {/* Contact and Email */}
                  <Row style={{ marginBottom: "15px" }}>
                    <Col lg={6} md={6} sm={12}>
                      <label>Contact Number</label>
                      <input
                        type="text"
                        className="refer-input"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Contact Number"
                      />
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <label>Email</label>
                      <br />
                      <input
                        type="email"
                        className="refer-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                      />
                    </Col>
                  </Row>

                  {/* Referral Type Based on Refer Type */}
                  <Row>
                    <Col lg={6} md={6} sm={12}>
                      <label>Referral Type</label>
                      <select
                        style={{ width: "180px" }}
                        className="refer-input"
                        value={referType}
                        onChange={(e) => setReferType(e.target.value)}
                      >
                        {/* <option value="">Select Here</option> */}

                        <option value="Loan">Loan</option>
                        <option value="Insurance">Insurance</option>
                        <option value="CIBIL">CIBIL</option>
                      </select>
                    </Col>

                    {/* Loan, Insurance, or CIBIL Type Based on Refer Type */}
                    {referType === "Loan" && (
                      <Col lg={6} md={6} sm={12}>
                        <label>Loan Type</label>
                        <select
                          style={{ width: "180px" }}
                          className="refer-input"
                          value={loanType}
                          onChange={(e) => setLoanType(e.target.value)}
                        >
                          {/* <option value="">Loan Type</option> */}
                          <option value="Home Loan">Home Loan</option>
                          <option value="Business Loan">Business Loan</option>
                          <option value="Vechile Loan">Vechile Loan</option>
                        </select>
                      </Col>
                    )}

                    {referType === "Insurance" && (
                      <Col lg={6} md={6} sm={12}>
                        <label>Insurance Type</label>
                        <select
                          style={{ width: "180px" }}
                          className="refer-input"
                          value={insuranceType}
                          onChange={(e) => setInsuranceType(e.target.value)}
                        >
                          <option value="">Insurance Type</option>
                          <option value="Health Insurance">
                            Health Insurance
                          </option>
                          <option value="Life Insurance">Life Insurance</option>
                          <option value="Vehicle Insurance">
                            Life Insurance
                          </option>
                        </select>
                      </Col>
                    )}

                    {referType === "CIBIL" && (
                      <Col lg={6} md={6} sm={12}>
                        <label>CIBIL Type</label>
                        <select
                          style={{ width: "180px" }}
                          className="refer-input"
                          value={cibilType}
                          onChange={(e) => setCibilType(e.target.value)}
                        >
                          <option value="">CIBIL Type</option>
                          <option value="Monthly Plan">Monthly Plan</option>
                          <option value="Quarterly Plan">Quarterly Plan</option>
                          <option value="Annual Plan">Annual Plan</option>
                        </select>
                      </Col>
                    )}
                  </Row>

                  {/* Referral Code Input */}
                  <Row style={{ marginBottom: "15px" }}>
                    <Col lg={6} md={6} sm={12}>
                      <label>Referral Code</label>
                      <input
                        type="text"
                        className="refer-input"
                        value={referCode}
                        maxLength={11}
                        onChange={handleInputChange}
                        placeholder="Enter code"
                      />
                    </Col>

                    <Col lg={6} md={6} sm={12}>
                      <button
                        className="learn-more-button"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </Col>
                  </Row>
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
                  src="https://cdni.iconscout.com/illustration/premium/thumb/online-file-sharing-illustration-download-in-svg-png-gif-formats--document-business-meeting-activities-pack-people-illustrations-5858310.png"
                  alt="Refer Code"
                />
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
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 650 0 L 650 300 L 225 300 Q 450 300 265 300 C 395 130 310 80 445 0 L 650 0 Z"
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

export default ReferCode;
