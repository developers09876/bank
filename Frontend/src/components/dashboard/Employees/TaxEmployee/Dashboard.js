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

const TaxEmployeesDashboard = () => {
  const navigate = useNavigate();
  const stats = {
    totalUsers: 120,
    loans: {
      active: 32,
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
      "Pending",
      "In Process",
      "Rejected",
      "Completed",
    ],
    datasets: [
      {
        label: "Application Status",
        data: [2, 3, 1, 4],
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
          <Col md={7} className="admin-chart-container">
            <div className="admin-chart-wrapper">
              <Bar data={data} options={options} />
            </div>
          </Col>

          <Col md={4}>
            <Row className="admin-stats-row">
              <Col md={12} lg={12}>
                <Card className="admin-stat-card">
                  <Card.Body>
                    <FaUsers className="admin-stat-icon" />
                    <Card.Title>Total Users</Card.Title>
                    <Card.Text>{stats.totalUsers}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={12} lg={12}>
                <Card className="admin-stat-card">
                  <Card.Body>
                    <FaChartLine className="admin-stat-icon" />
                    <Card.Title>Total Loans</Card.Title>
                     <Card.Text>{stats.loans.active}</Card.Text>
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

export default TaxEmployeesDashboard;
