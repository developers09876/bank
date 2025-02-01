import React, { useEffect, useState } from "react";
import { Table, Tag, Button } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EditOutlined, DownloadOutlined } from "@ant-design/icons";

const LoanStatusTable = ({ collapsed }) => {
  const [loans, setLoans] = useState([]);

  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  useEffect(() => {
    const getUserLoan = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/loanform/getbyid/${userId}`
        );
        const loan = response.data;
        console.log("loan", loan);
        setLoans(loan);
      } catch (error) {
        console.log(error);
      }
    };
    getUserLoan();
  }, [userId]);

  const handleViewDetails = (record) => {
    navigate(`/user/userloandetails/${record._id}`, { state: { record } });
  };
  const handleEdit = (record) => {
    navigate(`/user/loanform/${record._id}`, { state: { record } });
  };

  const columns = [
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Application ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Loan Amount",
      dataIndex: "loanAmount",
      key: "loanAmount",
    },
    {
      title: "Purpose of Loan",
      dataIndex: "loanPurpose",
      key: "loanPurpose",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "1") {
          return <span style={{ color: "green" }}>Approved</span>;
        } else if (status === "2") {
          return <span style={{ color: "red" }}>Rejected</span>;
        }
        return <span style={{ color: "orange" }}>Pending</span>;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          // <Button
          //   type="primary"
          //   style={{ background: "#4096ff", color: "#fff" }}
          //   onClick={() => handleViewDetails(record)}
          // >
          //   View
          // </Button>
          <>
            <EyeOutlined
              style={{
                fontSize: "18px",
                color: "#4096ff",
                cursor: "pointer",
                marginRight: "15px",
              }}
              onClick={() => handleViewDetails(record)}
            />
            <EditOutlined
              style={{
                fontSize: "18px",
                color: "#ff4d4f",
                marginRight: "15px",
                cursor: "pointer",
              }}
              onClick={() => handleEdit(record)}
            />
            {/* <DownloadOutlined
              style={{
                fontSize: "18px",
                color: "#52c41a",
            cursor: "pointer",
              }}
          /> */}
          </>
        );
      },
    },
  ];

  const handleView = (record) => {
    alert(`Viewing details for ${record.loanID}`);
  };

  return (
    <div>
      <div style={{ width: "90%", marginRight: "auto", marginLeft: "auto" }}>
        <div
          className={collapsed === true ? "main-content.open" : "main-content"}
        >
          <Table
            columns={columns}
            dataSource={loans}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoanStatusTable;
