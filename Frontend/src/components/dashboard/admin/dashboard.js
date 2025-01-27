import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.scss"; // Custom SCSS styles
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
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();
const [users, setUsers] = useState();
const [employees, setEmployees] = useState();
const [loans, setLoans] = useState();
const [insurances, setInsurances] = useState();

const user = "user"
const fetchUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/signup/getbyUserType/${user}`);
    console.log('response.data', response.data);
    setUsers(response.data.length);
    console.log('users', response.data.length)
  } catch (error) {
    console.log('error occurs while fetch users', error)
  }
};

const fetchEmployees = async () => {
  try {
    const response = await axios.get("http://localhost:5000/signup/getall");
const filteredemployees = response.data.filter((employees) => employees.userType !== "user");
console.log('filteredemployees', filteredemployees)
setEmployees(filteredemployees.length)
    console.log("Employee counts:", response.data);
  } catch (error) {
    console.error("Error occurred while fetching employee counts", error);
  }
};


useEffect(() => {
  fetchUsers();
  fetchEmployees();
},[])

  const stats = {
    totalUsers: 50,
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
  const handleCardClick = () => {
    navigate("/admin/loandashboard"); // Set the desired navigation path here
  };
  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="admin-main-content">
        <header className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Admin Dashboard</h1>
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
                  onClick={() => navigate("/admin/userlist")}
                >
                  <Card.Body>
                    <FaUsers className="admin-stat-icon" />
                    <Card.Title>Total Users</Card.Title>
                    <Card.Text>{users}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

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
                  onClick={() => navigate("/admin/employeelist")}
                >
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

export default AdminDashboard;
