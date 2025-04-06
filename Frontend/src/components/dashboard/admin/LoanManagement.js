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
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const LoanManagement = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  console.log("rejectionReason", rejectionReason);

  console.log("selectedRecord", selectedRecord);
  const [loan, setLoan] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, [selectedRecord]);

  const getAll = async () => {
    try {
      const response = await fetch(`http://vilu.in:5000/loanform/getall`, {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });
      const loans = await response.json();
      console.log("getAllloans", loans);
      setLoan(loans);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (record) => {
    navigate(`/admin/loandetails/${record._id}`, { state: { record } });
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
  const handleAddLoan = () => {
    navigate(`/admin/createloan`);
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
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: "Phone Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
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
        <Space
          style={{
            marginBottom: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
          className="filter-actions"
        >
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200 }}
            prefix={<SearchOutlined />}
          />
          <Button
            type="primary"
            onClick={handleAddLoan}
            style={{
              display: "inline",
              float: "right",
              marginRight: "100px",
              backgroundColor: "#00397f",
            }}
          >
            <FaPlus style={{ display: "inline", color: "white" }} />
            Add New
          </Button>
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
      </div>
    </div>
  );
};

export default LoanManagement;
