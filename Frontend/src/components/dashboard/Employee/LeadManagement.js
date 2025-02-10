import { Table, Input, Space, Pagination, Modal, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Api from "../../../Api";
import axios from "axios";

function LeadManagement() {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      return (
        (item.firstname || "").toLowerCase().includes(searchText.toLowerCase()) ||
        (item.lastname || "").toLowerCase().includes(searchText.toLowerCase()) ||
        (item.email || "").toLowerCase().includes(searchText.toLowerCase()) ||
        (item.contactNumber || "").toLowerCase().includes(searchText.toLowerCase()) ||
        (item.purpose || "").toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchText, data]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/lead/getById/${userId}`);
      setData(response.data.data);
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };



  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // const handleViewDetails = (record) => {
  //   navigate(`/employee/leaddetails/${record.employeeId}`);
  // };
  const handleViewDetails = (record) => {
    navigate(`/employee/leaddetails/${record._id}`, {state: { record } });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Loan Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          size="small"
          style={{ background: "#4096ff", color: "#fff" }}
          onClick={() => handleViewDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      <Container style={{ width: "90%" }}>
        <div style={{ width: "100%" }}>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>Lead Management</h4>
          <br />
          <div style={{ justifyContent: "space-between" }}>
            <Space style={{ marginBottom: 16 }} className="filter-actions">
              <Input
                placeholder="Search"
                value={searchText}
                onChange={handleSearch}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
            </Space>
            <Button
              type="primary"
              onClick={() => navigate("/employee/createlead")}
              style={{ display: "inline", float: "right", backgroundColor: "#00397f" }}
            >
              <FaPlus style={{ display: "inline", color: "white" }} />
              Add New
            </Button>
          </div>
          <Table
            dataSource={paginatedData}
            columns={columns}
            loading={loading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: filteredData.length,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
            rowKey="id"
            className="loan-table"
          />
        </div>
      </Container>
    </div>
  );
}

export default LeadManagement;
