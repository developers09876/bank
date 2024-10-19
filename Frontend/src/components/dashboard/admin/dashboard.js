// src/AdminDashboard.js
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap'; // Or use Ant Design's Card and Row
import './AdminDashboard.scss'; // Custom SCSS styles
import Sidebar from './Sidebar';

const AdminDashboard = () => {
  const stats = {
    totalUsers: 1200,
    loans: {
      active: 320,
      pending: 50,
      closed: 150,
    },
    revenue: '$50,000',
    invoices: 45,
  };

  return (
    <div className="dashboard-container">
      <Sidebar/>
      <div className="flex-1 ml-72 bg-gray-50">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <Row className="mb-4">
        <Col md={6}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>{stats.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>Total Loans</Card.Title>
              <Card.Text>Active: {stats.loans.active}</Card.Text>
              <Card.Text>Pending: {stats.loans.pending}</Card.Text>
              <Card.Text>Closed: {stats.loans.closed}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text>{stats.revenue}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="stat-card">
            <Card.Body>
              <Card.Title>Invoices Overview</Card.Title>
              <Card.Text>Total: {stats.invoices}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
    </div>
  );
};

export default AdminDashboard;
