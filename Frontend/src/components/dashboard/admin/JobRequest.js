import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Api from "../../../Api";
const JobRequest = ({ collapsed }) => {
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
      const response = await fetch(`http://localhost:5000/jobrequest/getall`, {
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
    // {
    //   title: "Created On",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (text) => new Date(text).toLocaleDateString(),
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Applied For",
      dataIndex: "jobtitle",
      key: "jobtitle",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
                <strong>Name:</strong> {selectedRecord.name}
              </p>
              <p>
                <strong>Applied For:</strong> {selectedRecord.role}
              </p>
              <p>
                <strong>Email:</strong> {selectedRecord.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedRecord.phone}
              </p>
             
              <p>
                <strong>Resume:</strong>{" "}
                <a
                  href={selectedRecord.resume}
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

export default JobRequest;
