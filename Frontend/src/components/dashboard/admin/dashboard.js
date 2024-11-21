// src/AdminDashboard.js
import React from 'react';
import { Card, Col, Row, Button, } from 'react-bootstrap'; // Or use Ant Design's Card and Row
import { useNavigate } from "react-router-dom";
import './AdminDashboard.scss'; // Custom SCSS styles
import { FaUsers, FaMoneyBillWave, FaFileInvoice, FaChartLine } from 'react-icons/fa'; // Icons
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const stats = {
    totalUsers: 1200,
    loans: {
      active: 320,
      pending: 50,
      closed: 150,
    },
    revenue: "$50,000",
    invoices: 45,
  };

 

  return (
    <div>
      <Sidebar />
       <div className="main-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
         
        </header>
        <Row className="stat-row">
          <Col md={6} lg={6}>
            <Card className="stat-card">
              <Card.Body>
                <FaUsers className="stat-icon" />
                <Card.Title>Total Users</Card.Title>
                <Card.Text>{stats.totalUsers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={6}>
            <Card className="stat-card">
              <Card.Body>
                <FaChartLine className="stat-icon" />
                <Card.Title>Total Loans</Card.Title>
                <Card.Text>Active: {stats.loans.active}</Card.Text>
                <Card.Text>Pending: {stats.loans.pending}</Card.Text>
                <Card.Text>Closed: {stats.loans.closed}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={6}>
            <Card className="stat-card">
              <Card.Body>
                <FaMoneyBillWave className="stat-icon" />
                <Card.Title>Revenue</Card.Title>
                <Card.Text>{stats.revenue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={6}>
            <Card className="stat-card">
              <Card.Body>
                <FaFileInvoice className="stat-icon" />
                <Card.Title>Invoices Overview</Card.Title>
                <Card.Text>Total: {stats.invoices}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {/* <h1 style={{ textAlign: "center", marginTop: "50px" }}>
        Admin Dashboard
      </h1>
      <Container
        style={{ textAlign: "center", marginTop: "50px" }}
        className="container"
      >
        <Row>
          <Col lg={6} md={12}>
            {" "}
            <Card className="stat-card">
              <Card.Body>
                <FaUsers className="stat-icon" />
                <Card.Title>Total Users</Card.Title>
                <Card.Text>{stats.totalUsers}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={12}>
            {" "}
            <Card className="stat-card">
              <Card.Body>
                <FaChartLine className="stat-icon" />
                <Card.Title>Total Loans</Card.Title>
                <Card.Text>Active: {stats.loans.active}</Card.Text>
                <Card.Text>Pending: {stats.loans.pending}</Card.Text>
                <Card.Text>Closed: {stats.loans.closed}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container className="container" style={{ marginBottom: "50px" }}>
        <Row>
          <Col lg={6} md={12}>
            {" "}
            <Card className="stat-card">
              <Card.Body>
                <FaMoneyBillWave className="stat-icon" />
                <Card.Title>Revenue</Card.Title>
                <Card.Text>{stats.revenue}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} md={12}>
            {" "}
            <Card className="stat-card">
              <Card.Body>
                <FaFileInvoice className="stat-icon" />
                <Card.Title>Invoices Overview</Card.Title>
                <Card.Text>Total: {stats.invoices}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default AdminDashboard;
