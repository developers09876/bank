import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { useParams } from "react-router-dom";

const ClientStatistics = () => {
  const { status, category } = useParams();
  const [loans, setLoans] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [taxes, setTaxes] = useState([]);

  console.log("status", status);
  console.log("category", category);
  // Fetch Loans
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        if (category === "loan") {
          const response = await axios.get(
            "http://localhost:5000/loanform/getall"
          );
          let filteredLoans = response.data;
          console.log("getallLoans", response.data);

          if (status === "completed") {
            filteredLoans = filteredLoans.filter((loan) => loan.status === "1");
          } else if (status === "rejected") {
            filteredLoans = filteredLoans.filter((loan) => loan.status === "2");
          } else if (status === "pending") {
            filteredLoans = filteredLoans.filter(
              (loan) => loan.status === "Pending"
            );
          }

          setLoans(filteredLoans);
          console.log("Filtered Loans:", filteredLoans);
        }
      } catch (error) {
        console.error("Error fetching loans:", error);
      }
    };

    fetchLoans();
  }, [status]);

  // Fetch Insurance
  useEffect(() => {
    const fetchInsurances = async () => {
      try {
        if (category === "insurance") {
          const response = await axios.get(
            `http://localhost:5000/insuranceManagement/getAllInsuranceManagement`
          );
          setInsurances(response.data);
          console.log("ins response.data", response.data);
        }
      } catch (error) {
        console.error("Error fetching insurances:", error);
      }
    };
    fetchInsurances();
  }, [category]);

  // Fetch Taxes
  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        if (category === "tax") {
          const response = await axios.get(
            `http://localhost:5000/taxManagement/getAllTaxManagement`
          );
          setTaxes(response.data);
          console.log("tax response.data", response.data);
        }
      } catch (error) {
        console.error("Error fetching taxes:", error);
      }
    };
    fetchTaxes();
  }, [category]);

  // Define columns for the tables
  const loancolumns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_, loanss) => {
        return `${loanss.firstname} ${loanss.lastname}`;
      },
    },
    {
      title: "Amount",
      dataIndex: "loanAmount",
      key: "loanAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (loanss) => {
        if (loanss.status === "1") {
          return <span style={{ color: "green" }}>Approved</span>;
        } else if (loanss.status === "2") {
          return <span style={{ color: "red" }}>Rejected</span>;
        }
        return <span style={{ color: "orange" }}>Pending</span>;
      },
    },
  ];
  const insurancecolumns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_, loanss) => {
        return `${loanss.firstname} ${loanss.lastname}`;
      },
    },
    {
      title: "Policy Type",
      dataIndex: "PolicyType",
      key: "PolicyType",
    },
    {
      title: "Sum Assured",
      dataIndex: "sumAssured",
      key: "sumAssured",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (loanss) => {
    //     if (loanss.status === "1") {
    //       return <span style={{ color: "green" }}>Approved</span>;
    //     } else if (loanss.status === "2") {
    //       return <span style={{ color: "red" }}>Rejected</span>;
    //     }
    //     return <span style={{ color: "orange" }}>Pending</span>;
    //   },
    // },
  ];

  const taxcolumns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (_, loanss) => {
        return `${loanss.firstname} ${loanss.lastname}`;
      },
    },
    {
      title: "Business Type",
      dataIndex: "businessType",
      key: "businessType",
    },
    {
      title: "Annual Income",
      dataIndex: "annualIncome",
      key: "annualIncome",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (loanss) => {
    //     if (loanss.status === "1") {
    //       return <span style={{ color: "green" }}>Approved</span>;
    //     } else if (loanss.status === "2") {
    //       return <span style={{ color: "red" }}>Rejected</span>;
    //     }
    //     return <span style={{ color: "orange" }}>Pending</span>;
    //   },
    // },
  ];

  return (
    <div style={{ marginTop: "60px" }}>
      {status && (
        <center>
          <h3>
            <b>
              {status.charAt(0).toUpperCase() + status.slice(1)}{" "}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </b>
          </h3>
        </center>
      )}

      {/* Loans Table */}
      {category === "loan" && (
        <>
          <Table
            dataSource={loans}
            columns={loancolumns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </>
      )}

      {/* Insurance Table */}
      {category === "insurance" && (
        <>
          <Table
            dataSource={insurances}
            columns={insurancecolumns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </>
      )}

      {/* Tax Table */}
      {category === "tax" && (
        <>
          <Table
            dataSource={taxes}
            columns={taxcolumns}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </>
      )}
    </div>
  );
};

export default ClientStatistics;
