import React, { useState } from "react";
import { Col, Card, Row } from "react-bootstrap";
import { FaChartLine, FaCheck, FaClock, FaTimes } from "react-icons/fa";
import "./LoanDashboard.scss";


const LoanDashboard = ({ stats }) => {
  const [showLoanDetails, setShowLoanDetails] = useState(false);

  const handleCardClick = () => {
    setShowLoanDetails(true);
  };

  const handleBackClick = () => {
    setShowLoanDetails(false);
  };

  return (
    <div className="loan-dashboard-container">
      <Row className="loan-dashboard-row">
        {!showLoanDetails ? (
          // Total Loans Card
          <Col md={6} lg={6} onClick={handleCardClick} style={{ cursor: "pointer" }}>
            <Card className="loan-card">
              <Card.Body>
                <FaChartLine className="loan-card-icon" />
                <Card.Title className="loan-card-title">Total Loans</Card.Title>
                <Card.Text className="loan-card-text">{stats.loans.total}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <>
            {/* Active Loans Card */}
            <Col md={4} lg={4}>
              <Card className="loan-card">
                <Card.Body>
                  <FaCheck className="loan-card-icon" />
                  <Card.Title className="loan-card-title">Active Loans</Card.Title>
                  <Card.Text className="loan-card-text">{stats.loans.active}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Pending Loans Card */}
            <Col md={4} lg={4}>
              <Card className="loan-card">
                <Card.Body>
                  <FaClock className="loan-card-icon" />
                  <Card.Title className="loan-card-title">Pending Loans</Card.Title>
                  <Card.Text className="loan-card-text">{stats.loans.pending}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Closed Loans Card */}
            <Col md={4} lg={4}>
              <Card className="loan-card">
                <Card.Body>
                  <FaTimes className="loan-card-icon" />
                  <Card.Title className="loan-card-title">Closed Loans</Card.Title>
                  <Card.Text className="loan-card-text">{stats.loans.closed}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Back Button */}
            <Col md={12} className="text-center">
              <button onClick={handleBackClick} className="btn btn-primary loan-back-button">
                Back
              </button>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default LoanDashboard;
