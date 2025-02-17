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
  const [loan, setLoan] = useState();
  const [loanStatusCounts, setLoanStatusCounts] = useState({
    pending: 0,
    rejected: 0,
    completed: 0,
  });
  const [insuranceStatusCounts, setInsuranceStatusCounts] = useState({
    pending: 0,
    rejected: 0,
    approved: 0,
  });
  
  const [taxStatusCounts, setTaxStatusCounts] = useState({
    pending: 0,
    rejected: 0,
    approved: 0,
  });
  
  console.log('loan', loan)
  const [insurances, setInsurances] = useState();
  const [taxs, setTaxs] = useState();
  const user = "user";
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/signup/getbyUserType/${user}`
      );
      // console.log("response.data", response.data);
      setUsers(response.data.length);
      // console.log("users", response.data.length);
    } catch (error) {
      console.log("error occurs while fetch users", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/signup/getall");
      const filteredemployees = response.data.filter(
        (employees) => employees.userType !== "user"
      );
      // console.log("filteredemployees", filteredemployees);
      setEmployees(filteredemployees.length);
    } catch (error) {
      console.log("error occurs while fetch users", error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  const fetchLoans = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/loanform/getall`);
      // console.log("response.data", response.data);
      setLoan(response.data)
      setLoans(response.data.length);
      // console.log("loans", response.data.length);
      const statusCounts = { pending: 0, rejected: 0, completed: 0 };
      response.data.forEach((loan) => {
        if (loan.status === "Pending") statusCounts.pending++;
        else if (loan.status === "2") statusCounts.rejected++;
        else if (loan.status === "1") statusCounts.completed++;
      });
  
      setLoanStatusCounts(statusCounts);
    } catch (error) {
      console.log("Error occurs while fetching loans:", error);
    }
  };
  useEffect(() => {
    fetchLoans();
  }, []);
  const fetchInsurances = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/insuranceManagement/getAllInsuranceManagement`
      );
      // console.log("response.data", response.data);
      setInsurances(response.data.length);
      // console.log("insurances", response.data.length);
      const statusCounts = { pending: 0, rejected: 0, approved: 0 };
      response.data.forEach((insurance) => {
        if (insurance.status === "Pending") statusCounts.pending++;
        else if (insurance.status === "2") statusCounts.rejected++;
        else if (insurance.status === "1") statusCounts.approved++;
      });
  
      setInsuranceStatusCounts(statusCounts);
    } catch (error) {
      console.log("Error occurs while fetching insurances:", error);
    }
  };

  useEffect(() => {
    fetchInsurances();
  }, []);
  const fetchTaxs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/taxManagement/getAllTaxManagement`
      );
      console.log("response.data", response.data);
      setTaxs(response.data.length);
      console.log("taxes", response.data.length);
      const statusCounts = { pending: 0, rejected: 0, approved: 0 };
      response.data.forEach((tax) => {
        if (tax.status === "Pending") statusCounts.pending++;
        else if (tax.status === "2") statusCounts.rejected++;
        else if (tax.status === "1") statusCounts.approved++;
      });
  
      setTaxStatusCounts(statusCounts);
    } catch (error) {
      console.log("Error occurs while fetching taxes:", error);
    }
  };

  useEffect(() => {
    fetchTaxs();
  }, []);
  const totalStatusCounts = {
    pending:
      loanStatusCounts.pending +
      insuranceStatusCounts.pending +
      taxStatusCounts.pending,
    rejected:
      loanStatusCounts.rejected +
      insuranceStatusCounts.rejected +
      taxStatusCounts.rejected,
    approved:
      loanStatusCounts.approved +
      insuranceStatusCounts.approved +
      taxStatusCounts.approved,
  };

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
    labels: ["Pending", "Rejected", "Completed"],
    datasets: [
      {
        label: "Client Status",
        data: [
          totalStatusCounts.pending,
          totalStatusCounts.rejected,
          totalStatusCounts.completed,
        ],
        backgroundColor: ["#ffcd56", "lightcoral", "#4caf50"],
        borderColor: ["#ffcd56", "lightcoral", "#4caf50"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top",
  //     },
  //     title: {
  //       display: true,
  //       text: "Client Status Chart",
  //       font: {
  //         size: 16,
  //       },
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       ticks: {
  //         stepSize: 1,
  //       },
  //     },
  //   },
  // };
  const options = {
    responsive: true,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const status = ["pending", "rejected", "completed"][index];
        navigate(`/admin/client-statistics/${status}`);
      }
    },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Client Status Chart", font: { size: 16 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };
  const handleCardClick = () => {
    navigate("/admin/loandashboard");
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
                    <Card.Text>{loans}</Card.Text>
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
                    <Card.Text>{employees}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={6}>
                <Card className="admin-stat-card">
                  <Card.Body>
                    <FaFileInvoice className="admin-stat-icon" />
                    <Card.Title>Total Insurance</Card.Title>
                    <Card.Text>{insurances}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} lg={6}>
                <Card className="admin-stat-card">
                  <Card.Body>
                    <FaFileInvoice className="admin-stat-icon" />
                    <Card.Title>Total Tax</Card.Title>
                    <Card.Text>{taxs}</Card.Text>
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
