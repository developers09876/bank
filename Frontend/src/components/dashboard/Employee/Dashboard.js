// import React, { useEffect, useState } from "react";
// import { Card, Col, Row } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// // import "../AdminDashboard.scss"; // Custom SCSS styles
// import {
//   FaMoneyBillWave,
//   FaFileInvoice,
//   FaChartLine,
//   FaUsers,
// } from "react-icons/fa";
// // import Sidebar from "../LoanAdmin/Loansidebar";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import Sidebar from "./Sidebar";
// import Api from "../../../Api";
// import { toast } from "react-toastify";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const id = localStorage.getItem("id");
//   const [employee, setEmployee] = useState(null);
//   const service = employee?.services || [];
//   console.log("service", service);
//   useEffect(() => {
//     getEmployee();
//   }, []);

//   const getEmployee = async () => {
//     try {
//       const response = await Api.get(`signup/getby/${id}`);
//       setEmployee(response.data);
//       console.log("Employee Data:", response);
//     } catch (error) {
//       console.error("Error fetching employee data:", error);
//       toast.error("Failed to fetch employee data.");
//     }
//   };

//   const stats = {
//     totalUsers: 1200,
//     loans: {
//       active: 320,
//       pending: 50,
//       closed: 150,
//     },
//     Users: 150,
//     totalinsurance: 2000,
//     revenue: "$50,000",
//     invoices: 45,
//   };

//   // Data for the chart
//   const data = {
//     labels: ["Pending", "In Process", "Rejected", "Completed"],
//     datasets: [
//       {
//         label: "Client Status",
//         data: [2, 1, 4, 3],
//         backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4caf50"],
//         borderColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4caf50"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Chart options
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//       title: {
//         display: true,
//         text: "Client Status Chart",
//         font: {
//           size: 16,
//         },
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 1,
//         },
//       },
//     },
//   };

//   return (
//     <div className="admin-dashboard-container">
//       <Sidebar />
//       <div className="admin-main-content">
//         <header className="admin-dashboard-header">
//           <h1 className="admin-dashboard-title" style={{ marginTop: "10px" }}>
//             Employee Dashboard
//           </h1>
//         </header>

//         <Row className="admin-dashboard-content">
//           <Col md={6} className="admin-chart-container">
//             <div className="admin-chart-wrapper">
//               <Bar data={data} options={options} />
//             </div>
//           </Col>

//           <Col md={6}>
//             <Row className="admin-stats-row">
//               {service.includes("LoanEmployee") && (
//                 <Col md={6} lg={6}>
//                   <Card
//                     className="admin-stat-card"
//                     onClick={() => navigate("/admin/loancards")}
//                   >
//                     <Card.Body>
//                       <FaChartLine className="admin-stat-icon" />
//                       <Card.Title>Total Loans</Card.Title>
//                       <Card.Text>{stats.loans.active}</Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               )}

//               {service.includes("InsuranceEmployee") && (
//                 <Col md={6} lg={6}>
//                   <Card
//                     className="admin-stat-card"
//                     onClick={() => navigate("/admin/loancards")}
//                   >
//                     <Card.Body>
//                       <FaChartLine className="admin-stat-icon" />
//                       <Card.Title>Total Insurance</Card.Title>
//                       <Card.Text>{stats.loans.active}</Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               )}

//               {service.includes("TaxEmployee") && (
//                 <Col md={6} lg={6}>
//                   <Card
//                     className="admin-stat-card"
//                     onClick={() => navigate("/admin/loancards")}
//                   >
//                     <Card.Body>
//                       <FaChartLine className="admin-stat-icon" />
//                       <Card.Title>Total Taxes</Card.Title>
//                       <Card.Text>{stats.loans.active}</Card.Text>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               )}

//               <Col md={6} lg={6}>
//                 <Card
//                   className="admin-stat-card"
//                   onClick={() => navigate("employeeuserlist")}
//                 >
//                   <Card.Body>
//                     <FaMoneyBillWave className="admin-stat-icon" />
//                     <Card.Title>Total Users</Card.Title>
//                     <Card.Text>{stats.Users}</Card.Text>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaShieldAlt,
  FaMoneyBill,
  FaUsers,
} from "react-icons/fa";
import { FaMoneyBillWave, FaChartLine } from "react-icons/fa";
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
import Api from "../../../Api";
import { toast } from "react-toastify";
import "./Dashboard.css";

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
  const id = localStorage.getItem("id");
  const [employee, setEmployee] = useState(null);
  const [loanStats, setLoanStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [insuranceStats, setInsuranceStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [taxStats, setTaxStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const service = employee?.services || [];

  useEffect(() => {
    getEmployee();
    fetchData();
    // getLoanApplicationById();
  }, [id]);

  const getEmployee = async () => {
    try {
      const response = await Api.get(`signup/getby/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Failed to fetch employee data.");
    }
  };

  const fetchData = async () => {
    try {
      const [loanRes, insuranceRes, taxRes] = await Promise.all([
        Api.get(`loanform/getbyid/${id}`),
        Api.get(`insuranceManagement/getByIdInsuranceManagement/${id}`),
        Api.get(`taxManagement/getByIdTaxManagement/${id}`),
      ]);

      const calculateStats = (data) => ({
        total: data.length,
        pending: data.filter((item) => item.status === "Pending").length,
        approved: data.filter((item) => item.status === "1").length,
        rejected: data.filter((item) => item.status === "2").length,
      });

      setLoanStats(calculateStats(loanRes.data));
      setInsuranceStats(calculateStats(insuranceRes.data));
      setTaxStats(calculateStats(taxRes.data));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch forms data.");
    }
  };

  // const getLoanApplicationById = async () => {
  //   try {
  //     const response = await Api.get(`loanform/getbyid/${id}`);
  //     setloanCount(response.data);
  //     console.log(" loanresponse.daata", response.data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const stats = {
    loans: { active: 320, pending: 50, approved: 150, rejected: 30 },
    Users: 150,
  };

  const data = {
    labels: ["Pending", "Rejected", "Completed"],
    datasets: [
      {
        label: "Client Status",
        data: [2, 4, 3],
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
        navigate(`/employee/client-statistics/${status}`);
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
  const renderCard = (title, icon, stats) => (
    <Col md={6} lg={6} className="py-2">
      <Card className="flip-card">
        <div className="flip-card-inner">
          <Card className="flip-card-front">
            <Card.Body>
              {icon}
              <Card.Title>{title}</Card.Title>
              <Card.Text>{stats.total}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="flip-card-back">
            <Card.Body>
              <Card.Title> Overview</Card.Title>
              <ul>
                <li>Pending: {stats.pending}</li>
                <li>Approved: {stats.approved}</li>
                <li>Rejected: {stats.rejected}</li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </Card>
    </Col>
  );

  return (
    <div className="admin-dashboard-container">
      <Sidebar />
      <div className="admin-main-content">
        <header className="admin-dashboard-header">
          <h1 className="admin-dashboard-title">Employee Dashboard</h1>
        </header>

        <Row className="admin-dashboard-content">
          <Col md={6} className="admin-chart-container">
            <Bar data={data} options={options} />
          </Col>

          <Col md={6}>
            <Row className="admin-stats-row">
              {service.includes("LoanEmployee") &&
                renderCard(
                  "Total Loans",
                  <FaUniversity
                    size={30}
                    className="admin-stat-icon"
                    style={{ color: "#007bff", justifySelf: "center" }}
                  />,
                  loanStats
                )}
              {service.includes("InsuranceEmployee") &&
                renderCard(
                  "Total Insurance",
                  <FaShieldAlt
                    size={30}
                    className="admin-stat-icon"
                    style={{ color: "#28a745", justifySelf: "center" }}
                  />,
                  insuranceStats
                )}
              {service.includes("TaxEmployee") &&
                renderCard(
                  "Total Taxes",
                  <FaMoneyBill
                    size={30}
                    className="admin-stat-icon"
                    style={{ color: "#ffc107", justifySelf: "center" }}
                  />,
                  taxStats
                )}
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
