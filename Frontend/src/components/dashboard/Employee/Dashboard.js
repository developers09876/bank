import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.scss"; // Custom SCSS styles
import {
  FaMoneyBillWave,
  FaFileInvoice,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
import Sidebar from "./Sidebar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const stats = {
    totalUsers: 1200,
    loans: {
      active: 320,
      pending: 50,
      closed: 150,
    },
    employees: 150,
    totalinsurance: 2000,
    revenue: "$50,000",
    invoices: 45,
  };

  // Data for the chart
  const data = {
    labels: [
      "Mortgage Pending",
      "Credit Pending",
      "Lead Generated",
      "Completed",
    ],
    datasets: [
      {
        label: "Client Status",
        data: [2, 1, 4, 3],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4caf50"],
        borderColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4caf50"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Status Chart",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="admin-main-content">
        <header className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Employee Dashboard</h1>
        </header>

        <Row className="admin-dashboard-content">
          <Col md={6} className="admin-chart-container">
            <div className="admin-chart-wrapper">
              <Bar data={data} options={options} />
            </div>
          </Col>

          <Col md={6}>
            <Row className="admin-stats-row">
              <Col md={6} lg={6}>
                <Card className="admin-stat-card">
                  <Card.Body>
                    <FaUsers className="admin-stat-icon" />
                    <Card.Title>Total Users</Card.Title>
                    <Card.Text>{stats.totalUsers}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={6}>
                <Card className="admin-stat-card">
                  <Card.Body>
                    <FaChartLine className="admin-stat-icon" />
                    <Card.Title>Total Loans</Card.Title>
                    <div className="loan-details">
                      <p>Active: {stats.loans.active}</p>
                      <p>Pending: {stats.loans.pending}</p>
                      <p>Closed: {stats.loans.closed}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={6}>
                <Card className="admin-stat-card">
                  <Card.Body>
                    <FaMoneyBillWave className="admin-stat-icon" />
                    <Card.Title>Total Employees</Card.Title>
                    <Card.Text>{stats.employees}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={6}>
                <Card className="admin-stat-card">
                  <Card.Body>
                    <FaFileInvoice className="admin-stat-icon" />
                    <Card.Title>Total Insurance</Card.Title>
                    <Card.Text>Total: {stats.totalinsurance}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
