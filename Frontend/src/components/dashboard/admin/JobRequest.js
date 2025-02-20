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
  Descriptions,
} from "antd";
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
      dataIndex: "jobTitle",
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
        <h4
          style={{
            textAlign: "center",
            marginTop: "10px",
            color: "#00397f",
          }}
        >
          <b>Job Requests</b>
        </h4>
        <Space style={{ margin: "10px" }} className="filter-actions">
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
        </Space>
        <div className="w-full px-2 mt-3">
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <Table
              dataSource={getPaginatedData()}
              columns={columns}
              pagination={false}
              className="loan-table"
              rowKey="_id"
              scroll={{ x: "max-content" }} // Enables horizontal & vertical scrolling
            />
          </div>
        </div>

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
          title="Job Request Details"
          visible={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={null}
          // bodyStyle={{
          //   maxHeight: "70vh",
          //   overflowY: "auto",
          // }}
        >
          {selectedRecord && (
            <Descriptions
              className="jobrequest-des"
              // title="Candidate Details"
              column={{ xl: 1, lg: 1, xs: 1, md: 1, sm: 1 }}
            >
              <Descriptions.Item label="Name">
                {selectedRecord.name}
              </Descriptions.Item>
              <Descriptions.Item label="Applied For">
                {selectedRecord.role}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title">
                {selectedRecord.jobTitle}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedRecord.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {selectedRecord.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Resume">
                <a
                  href={selectedRecord.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#1890ff", textDecoration: "underline" }}
                >
                  View
                </a>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Space>
                  {selectedRecord.status !== "1" && (
                    <Button
                      type="primary"
                      style={{ background: "#4096ff", color: "#fff" }}
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                  )}
                  {selectedRecord.status !== "2" && (
                    <Button danger onClick={handleReject}>
                      Reject
                    </Button>
                  )}
                  {selectedRecord.status === "1" && (
                    <Button type="primary" disabled>
                      Approved
                    </Button>
                  )}
                  {selectedRecord.status === "2" && (
                    <Button danger disabled>
                      Rejected
                    </Button>
                  )}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default JobRequest;
