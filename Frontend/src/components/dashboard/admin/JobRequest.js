import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Space,
  Pagination,
  Button,
  Modal,
  Descriptions,
} from "antd";
import { SearchOutlined,EyeOutlined, DeleteOutlined  } from "@ant-design/icons";
import Api from "../../../Api";
const { confirm } = Modal;
const JobRequest = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
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
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this job request?",
      icon: < DeleteOutlined style={{ fontSize: "18px", color: "#ff4d4f",marginTop:"2px"}}/>,
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        handleDelete(id);
      },
    });
  };
  const handleDelete = async (id) => {
    try {
      await Api.delete(`http://localhost:5000/jobrequest/delete/${id}`);
      getAll();
    } catch (error) {
      console.error("Error deleting record:", error);
    }
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
    if (!selectedRecord) return;
    try {
      const details = {
        name: selectedRecord.name,
        phone: selectedRecord.phone,
        email: selectedRecord.email,
        jobTitle: selectedRecord.jobTitle,
        resume: selectedRecord.resume,
        status: action,
      };
      const response = await Api.put(
        `http://localhost:5000/jobrequest/update/${id}`,
        details
      );
      console.log("Response data:", response.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleApprove = () => {
    if (selectedRecord) {
      updateStatus(selectedRecord._id, "Approved"); 
      handleModalOk();
    }
  };
  const handleHold = () => {
    if (selectedRecord) {
      updateStatus(selectedRecord._id, "Hold"); 
      setIsModalVisible(false);
    }
  };
  const handleReject = () => {
    if (selectedRecord) {
      updateStatus(selectedRecord._id, "Rejected"); 
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Approved") {
          return <span style={{ color: "green" }}>Approved</span>;
        } else if (status === "Hold") {
          return <span style={{ color: "orange" }}>Hold</span>;
        }
        return <span style={{ color: "red" }}>Rejected</span>;
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: (text, record) => {
    //     return (
    //       <Button
    //         type="primary"
    //         style={{ background: "#4096ff", color: "#fff" }}
    //         onClick={() => handleViewDetails(record)}
    //       >
    //         View
    //       </Button>
    //     );
    //   },
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <>
          <EyeOutlined
            style={{ fontSize: "18px", color: "#4096ff", cursor: "pointer", marginRight: "15px" }}
            onClick={() => handleViewDetails(record)}
          />
          <DeleteOutlined
            style={{ fontSize: "18px", color: "#ff4d4f", cursor: "pointer" }}
            onClick={() => showDeleteConfirm(record._id)}
          />
        </>
      ),
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
              scroll={{ x: "max-content" }}
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
        >
          {selectedRecord && (
            <Descriptions column={1}>
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
                  {selectedRecord.status !== "Approved" && (
                    <Button
                      type="primary"
                      style={{ background: "#4096ff", color: "#fff" }}
                      onClick={handleApprove}
                      disabled={selectedRecord.status === "Approved"}
                    >
                      Approve
                    </Button>
                  )}
                  {selectedRecord.status !== "Hold" && (
                    <Button
                      type="primary"
                      style={{ background: "#FFA500", color: "#fff" }}
                      onClick={handleHold}
                      disabled={selectedRecord.status === "Hold"}
                    >
                      Hold
                    </Button>
                  )}
                  {selectedRecord.status !== "Rejected" && (
                    <Button
                      danger
                      onClick={handleReject}
                      disabled={selectedRecord.status === "Rejected"}
                    >
                      Reject
                    </Button>
                  )}
                  {selectedRecord.status === "Approved" && (
                    <Button type="primary" disabled>
                      Approve
                    </Button>
                  )}
                  {selectedRecord.status === "Hold" && (
                    <Button type="primary" disabled>
                      Hold
                    </Button>
                  )}
                  {selectedRecord.status === "Rejected" && (
                    <Button danger disabled>
                      Reject
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
