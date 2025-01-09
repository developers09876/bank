import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button, Modal, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const LoanManagements = ({ collapsed }) => {

  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  
  console.log("selectedRecord", selectedRecord);
  const [loan, setLoan] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    getAll();
  }, [selectedRecord]);

  const getAll = async () => {
    try {
      console.log('userId', userId)
      const response = await axios.get(`http://localhost:5000/loanform/getbyid/${userId}`)
      const loans = response.data;
      // const filterbyUserid = loans.filter(item => item.userid === userId);
      // console.log('filterbyUserid', filterbyUserid)
      setLoan(loans);
      console.log('responseget', loans)
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
          // bodyStyle={{
          //   maxHeight: "70vh",
          //   overflow: "auto",
          // }}
        >
          {selectedRecord && (
            <div style={{ overflow: "hidden" }}>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Created On</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {new Date(selectedRecord.createdAt).toLocaleDateString()}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Application ID</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord._id}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Full Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.fullName}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Aadhaar Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.aadhaarNumber}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Address</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.address}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Annual Income</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.annualIncome}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Contact</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.contact}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Credit Score</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.creditScore}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Date of Birth</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {new Date(selectedRecord.dob).toLocaleDateString()}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Down Payment</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.downPayment}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Employer Details</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.employerDetails}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Employment Status</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.employmentStatus}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Existing Loans</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.existingLoans}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Gender</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.gender}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Income Details</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.incomeDetails}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Loan Amount</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.loanAmount}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Loan Purpose</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.loanPurpose}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nationality</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.nationality}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>PAN</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.pan}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Property Details</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.propertyDetails}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Spouse Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.spouseName}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Spouse Occupation</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.spouseOccupation}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Spouse Income</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.spouseIncome}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Spouse Designation</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.spouseDesignation}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Total Children</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.totalChildren}
                  </p>
                </Col>
              </Row>
              {selectedRecord.children.map((child, index) => (
                <React.Fragment key={index}>
                  <Row>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Child {index + 1} Name</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>{child.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Child {index + 1} Gender</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>{child.gender}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Child {index + 1} Age</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>{child.age}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Child {index + 1} School Name</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>{child.schoolName}</p>
                    </Col>
                  </Row>
                </React.Fragment>
              ))}
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Status</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.status}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>GST Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.GSTNumber}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>IFSC Code</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.IFSCCode}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Aadhaar Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.aadhaarNumber}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Account Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.accountNumber}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Address</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.address}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Annual Income</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.annualIncome}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Bank Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.bankName}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Branch</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.branch}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>PAN Card Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.panCardNumber}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Loan Agent Contact Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.loanAgentContactNumber}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Loan Agent Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.loanAgentName}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nominee Address</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.nomineeAddress}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nominee Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.nomineeName}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nominee Relationship</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.nomineeRelationship}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Property Ownership Proof</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <a
                      href={selectedRecord.propertyOwnershipProof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Aadhaar Image</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={selectedRecord.aadharImageUpload}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Identity Proof</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={selectedRecord.identityProof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Aadhaar Image</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={selectedRecord.aadharImageUpload}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Signature</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={selectedRecord.signature}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Property Ownership Proof</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <a
                      href={selectedRecord.propertyOwnershipProof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Identity Proof</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={selectedRecord.identityProof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Signature</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={selectedRecord.signature}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Photographs</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={selectedRecord.photographs}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Status</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {selectedRecord.status === "1" ? (
                      <span style={{ color: "green" }}>
                        Your loan has been approved.
                      </span>
                    ) : selectedRecord.status === "2" ? (
                      <span style={{ color: "red" }}>
                        Your loan has been rejected. <br />
                      </span>
                    ) : (
                      <span style={{ color: "orange" }}>Pending</span>
                    )}
                  </p>
                </Col>
              </Row>
              <Row>
                {selectedRecord.status === "2" ? (
                  <>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Reason for rejection</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <span>{selectedRecord.rejectionReason}</span>
                    </Col>
                  </>
                ) : null}
              </Row>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default LoanManagements;
