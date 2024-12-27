import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button, Modal, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Api from "../../../Api";
const LoanManagement = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  console.log("selectedRecord", selectedRecord);
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    getAll();
  }, [selectedRecord]);

  const getAll = async () => {
    try {
      const response = await fetch(`http://localhost:5000/loanform/getall`, {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const loans = await response.json();
      setLoan(loans);
    } catch (error) {
      console.log(error);
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

  const updateStatus = async (id, action) => {
    try {
      const details = { action };
      const response = await Api.put(
        `http://localhost:5000/loanform/updateloanapplications/${id}`,
        details
      );
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleApprove = () => {
    if (selectedRecord) {
      updateStatus(selectedRecord._id, "approve");
      handleModalOk();
    }
  };

  const handleReject = () => {
    if (selectedRecord) {
      updateStatus(selectedRecord._id, "reject");
      handleModalOk();
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = loan.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getPaginatedData = () => {
    const sourceData = searchText ? filteredData : loan;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sourceData.slice(start, end);
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
      title: "Customer Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Phone Number",
      dataIndex: "contact",
      key: "contact",
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
        if (record.status === "approve") {
          return (
            <Button type="primary" disabled>
              Approve
            </Button>
          );
        } else if (record.status === "reject") {
          return (
            <Button danger disabled>
              Reject
            </Button>
          );
        }
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
    <div>
      <div
        className={collapsed === true ? "main-content.open" : "main-content"}
      >
        <Space style={{ marginBottom: 16 }} className="filter-actions">
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
        </Space>

        <Table
          dataSource={getPaginatedData()}
          columns={columns}
          pagination={false}
          className="loan-table"
          rowKey="_id"
        />

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={searchText ? filteredData.length : loan.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          className="pagination-control"
        />

        <Modal
          title="Loan Details"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={null}
          bodyStyle={{
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {selectedRecord && (
            <div style={{ overflow: "hidden" }}>
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Created On</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.createdAt}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Application ID</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={14}>
                <p>{selectedRecord._id}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Full Name</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.fullName}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Aadhaar</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.aadhaar}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Address</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.address}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Annual Income</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={14}>
                <p>{selectedRecord.annualIncome}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Contact</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.contact}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Credit Score</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.creditScore}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Date of Birth</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{new Date(selectedRecord.dob).toLocaleDateString()}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Down Payment</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={14}>
                <p>{selectedRecord.downPayment}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Employer Details</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.employerDetails}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Employment Status</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.employmentStatus}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Existing Loans</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.existingLoans}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Gender</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.gender}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Income Details</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.incomeDetails}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Loan Amount</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.loanAmount}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Loan Purpose</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.loanPurpose}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Nationality</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.nationality}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>PAN</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.pan}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Property Details</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <p>{selectedRecord.propertyDetails}</p>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Property Ownership Proof</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <a href={selectedRecord.propertyOwnershipProof} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Identity Proof</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <a href={selectedRecord.identityProof} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Signature</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <a href={selectedRecord.signature} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Col>
            </Row>
          
            <Row gutter={[24, 16]}>
              <Col span={8}>
                <p><strong>Photographs</strong></p>
              </Col>
              <Col span={2}>
                <p>:</p>
              </Col>
              <Col span={10}>
                <a href={selectedRecord.photographs} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Col>
            </Row>
          
            <Row justify="center" style={{ marginTop: "20px" }}>
              <Space>
                {selectedRecord && selectedRecord.status !== "1" && (
                  <Button type="primary" style={{ background: "#4096ff", color: "#fff" }} onClick={handleApprove}>
                    Approve
                  </Button>
                )}
          
                {selectedRecord && selectedRecord.status !== "2" && (
                  <Button danger onClick={handleReject}>
                    Reject
                  </Button>
                )}
          
                {selectedRecord && selectedRecord.status === "1" && (
                  <Button type="primary" disabled>
                    Approved
                  </Button>
                )}
          
                {selectedRecord && selectedRecord.status === "2" && (
                  <Button danger disabled>
                    Rejected
                  </Button>
                )}
              </Space>
            </Row>
          </div>
          
          )}
        </Modal>
      </div>
    </div>
  );
};

export default LoanManagement;
