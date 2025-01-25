import { Table, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../../../Api";

function LeadTask() {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState([]); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`lead/getbyEmployeeid/${userId}`);
      setFetchedData(response.data); 
      console.log('response.data', response.data)
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleViewDetails = (record) => {
    console.log('record', record)
    navigate(`/loanEmp/leadtaskdetails/${record._id}`, { state: { record } });
    // navigate(`leadtaskdetails`);
  };
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, employee) => `${employee.firstname} ${employee.lastname}`,
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Type of Loan",
      dataIndex: "loanType",
      key: "loanType",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_,record) => (
        <div>
          <Button
            type="primary"
            style={{ color: "black" }}
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      <Container style={{ width: "90%" }}>
        <div style={{ width: "100%" }}>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>Assign Task</h4>
          <br />
          <div style={{ justifyContent: "space-between" }}>
            <Space style={{ marginBottom: 16 }} className="filter-actions">
              <Input
                placeholder="Search"
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
            </Space>
          </div>
          <Table
            dataSource={fetchedData}  // Use the correct state here
            columns={columns}
            loading={loading}
            rowKey="id"
            className="loan-table"
          />
        </div>
      </Container>
    </div>
  );
}

export default LeadTask;
