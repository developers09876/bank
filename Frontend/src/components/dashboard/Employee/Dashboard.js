import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import "../AdminDashboard.scss"; // Custom SCSS styles
import {
  FaMoneyBillWave,
  FaFileInvoice,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";
// import Sidebar from "../LoanAdmin/Loansidebar";
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
import Sidebar from "./Sidebar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const navigate = useNavigate();
  const stats = {
    totalUsers: 1200,
    loans: {
      active: 320,
      pending: 50,
      closed: 150,
    },
    Users: 150,
    totalinsurance: 2000,
    revenue: "$50,000",
    invoices: 45,
  };

  // Data for the chart
  const data = {
    labels: ["Pending", "In Process", "Rejected", "Completed"],
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
        text: "Client Status Chart",
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
          <h1 className="admin-dashboard-title" style={{ marginTop: "10px" }}>
            Employee Dashboard
          </h1>
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
                <Card
                  className="admin-stat-card"
                  onClick={() => navigate("/admin/loancards")}
                >
                  <Card.Body>
                    <FaChartLine className="admin-stat-icon" />
                    <Card.Title>Total Loans</Card.Title>
                    <Card.Text>{stats.loans.active}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={6}>
                <Card
                  className="admin-stat-card"
                  onClick={() => navigate("employeeuserlist")}
                >
                  <Card.Body>
                    <FaMoneyBillWave className="admin-stat-icon" />
                    <Card.Title>Total Users</Card.Title>
                    <Card.Text>{stats.Users}</Card.Text>
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

export default Dashboard;
