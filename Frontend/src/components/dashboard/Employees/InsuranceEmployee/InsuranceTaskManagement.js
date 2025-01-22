import { Table, Input, Space, Pagination, Modal, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../../../Api";

function InsuranceTaskManagement() {
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
    fetchLeads();
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

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`insuranceManagement/getbyEmployeeid/${userId}`);
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
      title: "Business Type",
      dataIndex: "businessType",
      key: "businessType",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Button
            type="primary"
            size="small"
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
            Task Management
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
      <Modal
        title="Task Management Details"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={null}
        style={{ fontSize: "18px" }}
        // bodyStyle={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        {selectedRecord && (
          <div>
            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Name</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {`${selectedRecord.firstname} ${selectedRecord.lastname}`}
                </p>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Email</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.email}
                </p>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Phone</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.contactNumber}
                </p>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Aadhar Number</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.aadhar}
                </p>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>PAN Card Number</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.panno}
                </p>
              </Col>
            </Row>

            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Business Type</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.businessType}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Income Tax Status</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.incomeTaxStatus}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>GST Number</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.gst}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Tax paid for last year</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.taxPaid}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Annual Income</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.annualIncome}
                </p>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  <strong>Admin Message</strong>
                </p>
              </Col>
              <Col span={2}>
                <p style={{ fontSize: "15px", padding: "3px" }}>:</p>
              </Col>
              <Col span={10}>
                <p style={{ fontSize: "15px", padding: "3px" }}>
                  {selectedRecord.description}
                </p>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default InsuranceTaskManagement;
