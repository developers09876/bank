import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button, Modal } from "antd";
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
      setLoan(loans); // Ensure backend provides status for each loan
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
            <div>
              <p>
                <strong>Created On:</strong> {selectedRecord.createdAt}
              </p>
              <p>
                <strong>Application ID:</strong> {selectedRecord._id}
              </p>
              <p>
                <strong>Full Name:</strong> {selectedRecord.fullName}
              </p>
              <p>
                <strong>Aadhaar:</strong> {selectedRecord.aadhaar}
              </p>
              <p>
                <strong>Address:</strong> {selectedRecord.address}
              </p>
              <p>
                <strong>Annual Income:</strong> {selectedRecord.annualIncome}
              </p>
              <p>
                <strong>Contact:</strong> {selectedRecord.contact}
              </p>
              <p>
                <strong>Credit Score:</strong> {selectedRecord.creditScore}
              </p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {new Date(selectedRecord.dob).toLocaleDateString()}
              </p>
              <p>
                <strong>Down Payment:</strong> {selectedRecord.downPayment}
              </p>
              <p>
                <strong>Employer Details:</strong>{" "}
                {selectedRecord.employerDetails}
              </p>
              <p>
                <strong>Employment Status:</strong>{" "}
                {selectedRecord.employmentStatus}
              </p>
              <p>
                <strong>Existing Loans:</strong> {selectedRecord.existingLoans}
              </p>
              <p>
                <strong>Gender:</strong> {selectedRecord.gender}
              </p>
              <p>
                <strong>Income Details:</strong> {selectedRecord.incomeDetails}
              </p>
              <p>
                <strong>Loan Amount:</strong> {selectedRecord.loanAmount}
              </p>
              <p>
                <strong>Loan Purpose:</strong> {selectedRecord.loanPurpose}
              </p>
              <p>
                <strong>Nationality:</strong> {selectedRecord.nationality}
              </p>
              <p>
                <strong>PAN:</strong> {selectedRecord.pan}
              </p>
              <p>
                <strong>Property Details:</strong>{" "}
                {selectedRecord.propertyDetails}
              </p>
              <p>
                <strong>Property Ownership Proof:</strong>{" "}
                <a
                  href={selectedRecord.propertyOwnershipProof}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </p>
              <p>
                <strong>Identity Proof:</strong>{" "}
                <a
                  href={selectedRecord.identityProof}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </p>
              <p>
                <strong>Signature:</strong>{" "}
                <a
                  href={selectedRecord.signature}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </p>
              <p>
                <strong>Photographs:</strong>{" "}
                <a
                  href={selectedRecord.photographs}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              </p>
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
                  <Button danger onClick={handleReject}>
                    Reject
                  </Button>
                )}

                {/* Display "Already Approved" or "Already Rejected" */}
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
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default LoanManagement;
