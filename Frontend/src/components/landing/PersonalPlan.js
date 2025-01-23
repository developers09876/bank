import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "antd";
import "./PersonalPlan.css";
import {
  FaCheckCircle,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { FaUserCheck, FaMoneyCheck, FaHeadset } from "react-icons/fa6";
import {
  TbCircleNumber1Filled,
  TbCircleNumber2Filled,
  TbCircleNumber3Filled,
  TbCircleNumber4Filled,
  TbCircleNumber5Filled,
  TbCircleNumber6Filled,
} from "react-icons/tb";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Api from "../../Api";

function PersonalPlan() {

  const [fetchedData, setfetchedData] = useState([]);
  
  const fetchSubscriptionPlan = async () => {
    try {
      const response = await Api.get("/subscription/getall");
      setfetchedData(response.data[0]);
      console.log("fetchedData", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  
  useEffect(() => {
  fetchSubscriptionPlan();
}, []);

  return (
    <div>
      <Header />
      <Row className="personal-plan-container">
        <Col lg={2}></Col>
        <Col lg={20} className="personal-plan-content">
          <h1>
          Give Wings to Your Dreams with a Personal Subscription Plan!
</h1>
          <h3>
            Get Super Financial Consultation & Services By Industry Experts
          </h3>
          <img
            src="https://finableindia.com/assets/img/banner/personal-subscription.jpg"
            alt="Business Success"
            className="personal-plan-image"
          />
        </Col>
        <Col lg={2}></Col>
      </Row>
      <Row className="personal-plan-container2">
        <Col lg={2}></Col>
        <Col lg={12}>
          <Row>
            <Col lg={22}>
              <div className="personal-plan-content2">
                <h2>
                  Financial Consultation for <br></br>Individuals!
                </h2>
                <h5>
                  Just by making a few clicks, receive sublime financial{" "}
                  <br></br>services and advice.
                </h5>
                <p>
                  With an extremely easy & online process, your journey of
                  financial consultation<br></br> will be initiated instantly
                </p>
              </div>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </Col>
        <Col lg={8}>
          <div className="personal-plan-box">
            <h2>Personal Subscription Plan</h2>
            <p className="price">
              <span className="discounted-price">Rs. {fetchedData.offerPrice}</span>
              <span className="original-price"> {fetchedData.subsriptionPrice}</span> Only
            </p>
            <ul className="features-list">
              <li>
                <FaCheckCircle className="icon" /> Best for Salaried Individuals
              </li>
              <li>
                <FaCheckCircle className="icon" /> Special Personal Loan Expert
                Assigned
              </li>
              <li>
                <FaCheckCircle className="icon" /> Loan Process in Multiple
                NBFCs
              </li>
              <li>
                <FaCheckCircle className="icon" /> Get Your Personalized
                Tracking Portal
              </li>
              <li>
                <FaCheckCircle className="icon" /> 100% Paperless Process
              </li>
              <li>
                <FaCheckCircle className="icon" /> Loan Processing Time: 48
                Hours
              </li>
              <li>
                <FaCheckCircle className="icon" /> CIBIL Remains Unimpacted
              </li>
              <li>
                <FaCheckCircle className="icon" /> On-Call Expert Support
              </li>
              <li>
                <FaCheckCircle className="icon" /> Plan Validity: 3 Months
              </li>
            </ul>
            <Button type="primary" className="apply-now-btn">
              Apply Now
            </Button>
          </div>
        </Col>
        <Col lg={2}></Col>
      </Row>
      <div className="personal-plan-container3">
        <h1>Imperative Benefits of Personal Subscription Plan</h1>
        <p>
          This plan is heavily studded with some superlative benefits, ensuring
          you the smoothest financial consultation & service experience. Curated
          with a pure customer-
          <br />
          oriented approach, this plan offers the entire gamut of benefits &
          pluses!
        </p>
        <Row gutter={[16, 32]}>
          <Col lg={8} md={12} sm={24}>
            <div className="benefit-item">
              <FaUserCheck className="benefit-icon" />
              <div className="benefit-content">
                <h4>Special Loan Expert Assigned</h4>
                <p>
                  Our expert will dedicatedly analyse your requirements &
                  strategize accordingly.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <div className="benefit-item">
              <FaMoneyCheckAlt className="benefit-icon" />
              <div className="benefit-content">
                <h4>Loan Process in Multiple NBFCs</h4>
                <p>
                  We ensure you have access to a wide network of financial
                  institutions.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <div className="benefit-item">
              <FaMoneyCheck className="benefit-icon" />
              <div className="benefit-content">
                <h4>Personalized Tracking Portal</h4>
                <p>
                  Track your loan process effortlessly through a dedicated
                  portal.
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 32]} style={{ marginTop: "20px" }}>
          <Col lg={8} md={12} sm={24}>
            <div className="benefit-item">
              <FaHeadset className="benefit-icon" />
              <div className="benefit-content">
                <h4>On-Call Expert Support</h4>
                <p>
                  Taking query-solving and solution-provision to the next
                  amazing level.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <div className="benefit-item">
              <FaFileAlt className="benefit-icon" />
              <div className="benefit-content">
                <h4>100% Paperless Process</h4>
                <p>
                  So that you can experience the most relaxed and comfortable
                  process.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <div className="benefit-item">
              <FaShieldAlt className="benefit-icon" />
              <div className="benefit-content">
                <h4>CIBIL Remains Unimpacted</h4>
                <p>
                  Because our experts know exactly which NBFC is ideal for your
                  profile.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="personal-plan-container4">
        <h1 className="section-title">How It Works?</h1>
        <p className="section-description">
          Follow these simple steps to make the most of our Subscription Plans
        </p>
        <Row gutter={[16, 32]} justify="center">
          {[
            {
              icon: <TbCircleNumber1Filled />,
              title: "Quick Registration",
              description:
                "Fill in your basic details in the registration form – this process takes just a couple of minutes.",
            },
            {
              icon: <TbCircleNumber2Filled />,
              title: "Check Eligibility",
              description:
                "Our system shows eligibility & pre-approved offers based on your details. This is not final loan approval.",
            },
            {
              icon: <TbCircleNumber3Filled />,
              title: "Buy Subscription Plan",
              description:
                "Purchase the plan through multiple payment options to get your pre-approved loan offer.",
            },
            {
              icon: <TbCircleNumber4Filled />,
              title: "Submit Document",
              description:
                "Login to the portal with your credentials and submit the required documents.",
            },
            {
              icon: <TbCircleNumber5Filled />,
              title: "Bank Verification",
              description:
                "NBFCs verify your profile & documents as per their rules and regulations.",
            },
            {
              icon: <TbCircleNumber6Filled />,
              title: "Bank Sanction",
              description:
                "The final loan sanction depends on your profile & the bank's criteria.",
            },
          ].map((step, index) => (
            <Col lg={8} md={12} sm={24} key={index}>
              <div className="how-it-works-card">
                <div className="icon-container">{step.icon}</div>
                <h4 className="step-title">{step.title}</h4>
                <p className="step-description">{step.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default PersonalPlan;
