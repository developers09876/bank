import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Space,
  Pagination,
  Button,
  Modal,
  Row,
  Col,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Api from "../../../Api";
const LoanManagement = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  console.log("rejectReason", rejectReason);

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
      const updatedLoans = loan.map((item) =>
        item._id === id
          ? { ...item, status: action === "approve" ? "1" : "2" }
          : item
      );
      setLoan(updatedLoans);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  // const handleApprove = async (id) => {
  //   try {
  //     await updateStatus(id, "approve");
  //     const updatedLoans = loan.map((item) =>
  //       item._id === id ? { ...item, status: "1" } : item
  //     );
  //     setLoan(updatedLoans);
  //     message.success("Approved successfully");
  //     setIsApproveModalVisible(false);
  //   } catch (error) {
  //     message.error("Error approving record");
  //   }
  // };

  const handleApprove = () => {
    if (selectedRecord) {
      updateStatus(selectedRecord._id, "approve");
      handleModalOk();
    }
  };

  // const handleReject = async (id, rejectReason) => {
  //   try {
  //     await updateStatus(id, "reject", rejectReason);
  //     message.success("Rejected successfully");
  //     setIsRejectModalVisible(false);
  //   } catch (error) {
  //     message.error("Error rejecting record");
  //   }
  // };
  const handleReject = async (id, rejectReason) => {
    try {
      await updateStatus(id, "reject", rejectReason);
      const updatedLoans = loan.map((item) =>
        item._id === id ? { ...item, status: "2" } : item
      );
      setLoan(updatedLoans);
      message.success("Rejected successfully");
      setIsRejectModalVisible(false);
    } catch (error) {
      message.error("Error rejecting record");
    }
  };

  const handleReset = () => {
    setRejectReason("");
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
                  <p style={{ fontSize: "15px" }}>{selectedRecord.createdAt}</p>
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
                    <strong>Aadhaar</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{selectedRecord.aadhaar}</p>
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
              <Row style={{ marginTop: "25px", marginRight: "280px" }}>
                <Space>
                  {selectedRecord && selectedRecord.status !== "1" && (
                    <Button
                      type="primary"
                      style={{ background: "#4096ff", color: "#fff" }}
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                  )}

                  {selectedRecord && selectedRecord.status !== "2" && (
                    <>
                      <Button
                        danger
                        onClick={() => setIsRejectModalVisible(true)}
                      >
                        Reject
                      </Button>
                      <Modal
                        title="Rejection Confirmation"
                        visible={isRejectModalVisible}
                        onCancel={() => setIsRejectModalVisible(false)}
                        footer={null}
                      >
                        <div>
                          <p>Please provide a reason for rejection:</p>
                          <Input.TextArea
                            rows={3}
                            placeholder="Enter rejection reason"
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                          />
                          <Space style={{ marginTop: "20px" }}>
                            <Button
                              type="primary"
                              onClick={() =>
                                handleReject(selectedRecord._id, rejectReason)
                              }
                              disabled={!rejectReason.trim()}
                            >
                              Submit
                            </Button>
                            <Button onClick={handleReset}>Reset</Button>
                          </Space>
                        </div>
                      </Modal>
                    </>
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
