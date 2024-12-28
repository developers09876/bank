import { Table, Input, Space, Modal } from "antd";
import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import axios from "axios";

function LoanLeadManagement() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const firstname = item.firstname || "";
      const lastname = item.lastname || "";
      const email = item.email || "";
      const phone = item.phone || "";
      const purpose = item.purpose || "";

      return (
        firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        lastname.toLowerCase().includes(searchText.toLowerCase()) ||
        email.toLowerCase().includes(searchText.toLowerCase()) ||
        phone.toLowerCase().includes(searchText.toLowerCase()) ||
        purpose.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchText, data]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/lead/getall");
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
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
      dataIndex: "phone",
      key: "phone",
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
      render: (text, record) => {
        return (
          <Button
            type="primary"
            style={{ background: "#4096ff", color: "#fff" }}
            onClick={() => handleViewDetails(record)}
          >
            View
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      <Container style={{ width: "90%" }}>
        <div style={{ width: "100%" }}>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
            Lead Management
          </h4>
          <br />
          <div style={{ justifyContent: "space-between" }}>
            <Space style={{ marginBottom: 16 }} className="filter-actions">
              <Input
                placeholder="Search"
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
              />
            </Space>
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
        </div>
      </Container>
      <Modal
        title="Loan Details"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
        bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {selectedRecord && (
          <div>
            <p style={{ padding: "3px" }}>
              <strong>Name:</strong>{" "}
              {`${selectedRecord.firstname} ${selectedRecord.lastname}`}
            </p>
            <p style={{ padding: "3px" }}>
              <strong>Email:</strong> {selectedRecord.email}
            </p>
            <p style={{ padding: "3px" }}>
              <strong>Phone:</strong> {selectedRecord.phone}
            </p>
            <p style={{ padding: "3px" }}>
              <strong>Loan Amount:</strong> {selectedRecord.amount}
            </p>
            <p style={{ padding: "3px" }}>
              <strong>Aadhar Number:</strong> {selectedRecord.aadhar}
            </p>
            <p style={{ padding: "3px" }}>
              <strong>PAN Card Number:</strong> {selectedRecord.panno}
            </p>
            <p style={{ padding: "3px" }}>
              <strong>Purpose Of Loan:</strong> {selectedRecord.purpose}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default LoanLeadManagement;
