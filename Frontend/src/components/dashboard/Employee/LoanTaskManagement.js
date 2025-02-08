import { Table, Input, Space, Pagination, Modal, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { EditOutlined, EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../../Api";

function LoanTaskManagement() {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  console.log("step1", data);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchLoanTasks();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const firstname = item.firstname || "";
      const lastname = item.lastname || "";
      const email = item.email || "";
      const phone = item.phone || "";
      const businessType = item.businessType || "";

      return (
        firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        lastname.toLowerCase().includes(searchText.toLowerCase()) ||
        email.toLowerCase().includes(searchText.toLowerCase()) ||
        phone.toLowerCase().includes(searchText.toLowerCase()) ||
        businessType.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchText, data]);

  const fetchLoanTasks = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`loanform/getbyEmployeeid/${userId}`);
      setData(response.data);
      setFilteredData(response.data);
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

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewDetails = (record) => {
    navigate(`/employee/loantaskdetails/${record._id}`, {state: { record } })
   };
   const handleEdit = (record) => {
     navigate(`/employee/editloan/${record._id}`, { state: { record } });
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
      key: "phone",
    },
    {
      title: "Purpose",
      dataIndex: "loanPurpose",
      key: "loanPurpose",
    },
    {
      title: "Loan Amount",
      dataIndex: "loanAmount",
      key: "loanAmount",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
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
            cursor: "pointer",
          }}
          onClick={() => handleEdit(record)}
        />
      </>
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      <Container style={{ width: "90%" }}>
        <div style={{ width: "100%" }}>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
            Loan Task Management
          </h4>
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
            {/* <Button
              type="primary"
              onClick={() => navigate("/adminLoan/createlead")}
              style={{
                display: "inline",
                float: "right",
                backgroundColor: "#00397f",
              }}
            >
              <FaPlus style={{ display: "inline", color: "white" }} />
              Add New
            </Button> */}
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

export default LoanTaskManagement;
