import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import {
  FaMoneyBillWave,
  FaMoneyBill,
  FaUniversity,
  FaShieldAlt,
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

const UserDashboard = () => {
  const navigate = useNavigate();
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
  const [stockmarketStatusCounts, setstockmarketStatusCounts] = useState({
    pending: 0,
    rejected: 0,
    approved: 0,
  });

  console.log("loan", loan);
  const [insurances, setInsurances] = useState();
  const [taxs, setTaxs] = useState();
  const [stockmarket, setstockmarket] = useState();
  const userId = localStorage.getItem("id");
  const userid = localStorage.getItem("id");
  const fetchLoans = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/loanform/getbyid/${userId}`
      );
      setLoan(response.data);
      setLoans(response.data.length);
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
        `http://localhost:5000/insuranceManagement/getByIdInsuranceManagement/${userid}`
      );
      setInsurances(response.data.length);
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
        `http://localhost:5000/taxManagement/getByIdTaxManagement/${userid}`
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
  console.log("approved", totalStatusCounts);

  const stats = {
    loans: {
      active: 320,
      pending: 50,
      closed: 150,
    },
    totalinsurance: 2000,
    revenue: "$50,000",
    invoices: 45,
    totalstockmarket: 200,
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
  const options = {
    responsive: true,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const status = ["pending", "rejected", "completed"][index];
        navigate(`/user/client-statistics/${status}`);
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
    <div className="user-dashboard-container">
      <Sidebar />
      <div className="user-main-content">
        <header className="user-dashboard-header">
          <h1 className="user-dashboard-title">User Dashboard</h1>
        </header>

        <Row className="userdashboard-content">
          <Col md={12} lg={6} className="user-chart-container px-2 py-3">
            <div
              className="user-chart-wrapper"
              style={{ justifyItems: "center" }}
            >
              <Bar data={data} options={options} />
            </div>
          </Col>

          <Col sm={12} md={12} lg={6} className=" px-2 py-3">
            <Row className="user-stats-row">
              <Col sm={12} md={6} lg={6}>
                <Card
                  className="user-stat-card"
                  onClick={() => navigate("/user/loanstatus")}
                >
                  <Card.Body>
                    <FaUniversity
                      size={30}
                      className="user-stat-icon"
                      style={{ color: "#007bff", justifySelf: "center" }}
                    />
                    <Card.Title>Total Loans</Card.Title>
                    <Card.Text>{loans}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <Card
                  className="user-stat-card"
                  onClick={() => navigate("/user/insu")}
                >
                  <Card.Body>
                    <FaShieldAlt
                      size={30}
                      className="user-stat-icon"
                      style={{ color: "#28a745", justifySelf: "center" }}
                    />
                    <Card.Title>Total Insurance</Card.Title>
                    <Card.Text>{insurances}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <Card
                  className="user-stat-card"
                  onClick={() => navigate("/user/tax")}
                >
                  <Card.Body>
                    <FaMoneyBill
                      size={30}
                      className="user-stat-icon"
                      style={{ color: "#ffc107", justifySelf: "center" }}
                    />
                    <Card.Title>Total Tax</Card.Title>
                    <Card.Text>{taxs}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <Card className="user-stat-card">
                  <Card.Body>
                    <FaMoneyBillWave
                      size={30}
                      className="user-stat-icon"
                      style={{ color: "red", justifySelf: "center" }}
                    />
                    <Card.Title>Total StockMarket</Card.Title>
                    <Card.Text>{stockmarket}</Card.Text>
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

export default UserDashboard;
