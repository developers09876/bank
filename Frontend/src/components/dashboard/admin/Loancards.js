
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { FaChartLine } from 'react-icons/fa';
import "./AdminDashboard.scss"; 
import { useNavigate } from 'react-router-dom';

function Loancards() {
  const navigate = useNavigate();
  return (
    <div className="admin-dashboard-container">
      {/* Sidebar can be uncommented if it works */}
      {/* <Sidebar /> */}
      <div className="admin-main-content">
        <Row  className="admin-stats-row">
        <Col md={5} lg={5}>
                <Card
                  className="admin-stat-card"
                  onClick={() => navigate("/admin/loanstatus",{state:"0"})}
                >
                  <Card.Body>
                    {/* <FaChartLine className="admin-stat-icon" /> */}
                    <Card.Title>Loan Requests</Card.Title>
                    <Card.Text>0</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5} lg={5}>
                <Card
                  className="admin-stat-card"
                  onClick={() => navigate("/admin/loanstatus",{state:"1"})}
                >
                  <Card.Body>
                    {/* <FaChartLine className="admin-stat-icon" /> */}
                    <Card.Title>Approved Loans</Card.Title>
                    <Card.Text>2</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5} lg={5}>
                <Card
                  className="admin-stat-card"
                  onClick={() => navigate("/admin/loanstatus",{state:"2"})}
                >
                  <Card.Body>
                    {/* <FaChartLine className="admin-stat-icon" /> */}
                    <Card.Title>Rejected Loans</Card.Title>
                    <Card.Text>2</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
        </Row>
      </div>
    </div>
  );
}

export default Loancards;

