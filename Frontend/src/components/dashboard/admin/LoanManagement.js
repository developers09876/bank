import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const LoanManagement = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loan, setLoan] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await fetch(`http://localhost:5000/loanform/getall`, {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const loans = await response.json();
      const loansWithStatus = loans.map((loan) => ({
        ...loan,
        status: "Pending", // Default status
      }));
      setLoan(loansWithStatus);
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

  const handleApprove = () => {
    setLoan((prev) =>
      prev.map((item) =>
        item._id === selectedRecord._id ? { ...item, status: "Approved" } : item
      )
    );
    handleModalOk();
  };

  const handleReject = () => {
    setLoan((prev) =>
      prev.map((item) =>
        item._id === selectedRecord._id ? { ...item, status: "Rejected" } : item
      )
    );
    handleModalOk();
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = loan.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        if (record.status === "Approved") {
          return <Button type="primary" disabled>Approved</Button>;
        } else if (record.status === "Rejected") {
          return <Button danger disabled>Rejected</Button>;
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
        <strong>Date of Birth:</strong> {new Date(selectedRecord.dob).toLocaleDateString()}
      </p>
      <p>
        <strong>Down Payment:</strong> {selectedRecord.downPayment}
      </p>
      <p>
        <strong>Employer Details:</strong> {selectedRecord.employerDetails}
      </p>
      <p>
        <strong>Employment Status:</strong> {selectedRecord.employmentStatus}
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
        <strong>Property Details:</strong> {selectedRecord.propertyDetails}
      </p>
      <p>
        <strong>Property Ownership Proof:</strong>{" "}
        <a href={selectedRecord.propertyOwnershipProof} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </p>
      <p>
        <strong>Identity Proof:</strong>{" "}
        <a href={selectedRecord.identityProof} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </p>
      <p>
        <strong>Signature:</strong>{" "}
        <a href={selectedRecord.signature} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </p>
      <p>
        <strong>Photographs:</strong>{" "}
        <a href={selectedRecord.photographs} target="_blank" rel="noopener noreferrer">
          View
        </a>
      </p>
              <Space>
                <Button
                  type="primary"
                  style={{ background: "#4096ff", color: "#fff" }}
                  onClick={handleApprove}
                >
                  Approve
                </Button>
                <Button danger onClick={handleReject}>
                  Reject
                </Button>
              </Space>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default LoanManagement;