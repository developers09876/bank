import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button, Modal, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";

const TaxList = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const navigate = useNavigate();

  console.log("selectedRecord", selectedRecord);
  const [tax, setTax] = useState([]);
  const userid = localStorage.getItem("id");

  useEffect(() => {
    getAll();
  }, [selectedRecord]);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/taxManagement/getbyEmployeeid/${userid}`
      );
      const taxs = response.data;
      setTax(taxs);
      console.log("responseget", taxs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (record) => {
    navigate(`/employee/taxdetails/${record._id}`, { state: { record } });
  };
  const handleEdit = (record) => {
    navigate(`/employee/editTax/${record._id}`, {
      state: { record },
    });
  };
  const handleAddTax = () => {
    navigate(`/employee/createtax`);
  };


  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = tax.filter((item) =>
      item.fullName.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getPaginatedData = () => {
    const sourceData = searchText ? filteredData : tax;
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
        return (
          <>
            <EyeOutlined
              style={{
                fontSize: "18px",
                color: "#4096ff",
                cursor: "pointer",
                marginRight: "15px",
              }}
              onClick={() => handleViewDetails(record)}
            />
            <EditOutlined
              style={{
                fontSize: "18px",
                color: "#ff4d4f",
                cursor: "pointer",
              }}
              onClick={() => handleEdit(record)}
            />
          </>
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
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Tax List
        </h4>
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
            style={{ width: 200,marginLeft:"40px "}}
            prefix={<SearchOutlined />}
          />
          {/* <Button
            type="primary"
            onClick={handleAddLoan}
            style={{
              display: "inline",
              float: "right",
              marginRight: "10px",
              backgroundColor: "#00397f",
            }}
          >
            <FaPlus style={{ display: "inline", color: "white" }} />
            Add New
          </Button> */}
        </Space>

        <Table
          dataSource={getPaginatedData()}
          columns={columns}
          pagination={false}
          className="tax-table"
          rowKey="_id"
        />

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={searchText ? filteredData.length : tax.length}
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

export default TaxList;
