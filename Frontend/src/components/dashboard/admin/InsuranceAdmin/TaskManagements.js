import { Table, Input, Space } from "antd";
import React, { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Api from "../../../../Api";

function TaskManagements() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const firstname = item.firstname || "";
      const lastname = item.lastname || "";
      const email = item.email || "";
      const phone = item.phone || "";
      const purpose = item.purpose || "";

      return (
        firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        lastname.toLowerCase().includes(searchText.toLowerCase()) ||
        email.toLowerCase().includes(searchText.toLowerCase()) ||
        phone.toLowerCase().includes(searchText.toLowerCase()) ||
        purpose.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchText, data]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await Api.get("/insuranceManagement/getAllInsuranceManagement");
      console.log("responsessss", response.data.purpose);
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleViewDetails = (record) => {
    console.log("record", record);
    navigate(`/employeeInsurance/taskManagementdetails/${record._id}`, {
      state: { record },
    });
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "contactNumber",
      key: "phone",
    },
    {
      title: "Created By",
      dataIndex: "userType",
      key: "userType",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => handleViewDetails(record)}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      <Container style={{ width: "90%" }}>
        <div style={{ width: "100%" }}>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
            Insurance Management
          </h4>
          <br />
          <div style={{ justifyContent: "space-between" }}>
            <Space style={{ marginBottom: 16 }} className="filter-actions">
              <Input
                placeholder="Search"
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={handleSearch}
              />
            </Space>
            <Button
              type="primary"
              onClick={() => navigate("/employeeInsurance/createinauranceMangement")}
              style={{
                display: "inline",
                float: "right",
                backgroundColor: "#00397f",
              }}
            >
              <FaPlus style={{ display: "inline", color: "white" }} />
              Add New
            </Button>
            <Table
              dataSource={paginatedData}
              columns={columns}
              loading={loading}
              pagination={{
                current: currentPage,
                pageSize: pageSize,
                total: filteredData.length,
                showSizeChanger: true,
              }}
              onChange={handleTableChange}
              rowKey="id"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default TaskManagements;
