import React from "react";
import { Col, Row, Button } from "antd";
import "./PersonalPlan.css";
import {
  FaCheckCircle,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaShieldAlt,
} from "react-icons/fa";
import { FaUserCheck, FaMoneyCheck, FaHeadset } from "react-icons/fa6";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";

function PersonalPlan() {
  return (
    <div>
      <Header />

      <Row className="personal-plan-container mt-5">
        <Col lg={2}></Col>
        <Col lg={20} className="personal-plan-content">
          <h1>
            Apne Sapno Ko Do Ek Nayi Udaan, Personal Subscription Plan ke sath!
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
              <span className="discounted-price">Rs. 399</span>
              <span className="original-price">1,499</span> only
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

      <Footer />
    </div>
  );
}

export default PersonalPlan;
