import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Api from "../../../Api";

const Insurance = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [insurance, setInsurance] = useState([]);
  const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const handleViewDetails = (record) => {
    // navigate(`/user/insuranceDetails/${record._id}`, { state: { record } });
  };

  const handleAddInsurance = () => {
    navigate(`/user/insurancedetails`);
  };
  useEffect(() => {
    const filtered = data.filter((item) => {
        // userId: data.userId,
      const firstname = item.firstname || "";
      const phone = item.contactNumber || "";
      const aadhar = item.aadhar || "";
      const policy = item.businessType|| "";
      return (
        firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        phone.toLowerCase().includes(searchText.toLowerCase()) ||
        aadhar.toLowerCase().includes(searchText.toLowerCase())
        // policy.toLowerCase().includes(searchText.toLowerCase())
      );
      
    });
    setFilteredData(filtered);
  }, [searchText, data]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`http://localhost:5000/getInsuranceBy/${userid}`);
      console.log("Fetched Data:", response.data);
      setInsurance(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = insurance.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getPaginatedData = () => {
    const sourceData = searchText ? filteredData : insurance;
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sourceData.slice(start, end);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstName",
    },
    {
      title: "Phone Number",
      dataIndex: "contactNumber",
      key: "phone",
    },
    {
      title: "Aadhaar Number",
      dataIndex: "aadhar",
      key: "aadhaarNumber",
    },
    {
      title: "Policy Type",
      dataIndex: "businessType",
      key: "policyType",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          type="primary"
          style={{ background: "#4096ff", color: "#fff" }}
          onClick={() => handleViewDetails(record)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div
        className={collapsed ? "main-content.open" : "main-content"}
      >
        <Space style={{ marginBottom: 16 }} className="filter-actions">
          <Input
            placeholder="Search"
            value={searchText}
            onChange={handleSearch}
            style={{ width: 200, marginLeft: "50px" }}
            prefix={<SearchOutlined />}
          />
          <Button
            type="primary"
            onClick={handleAddInsurance}
            style={{
              background: "#00397F",
              color: "#fff",
              marginLeft: "800px",
            }}
          >
            Add Insurance
          </Button>
        </Space>

        <Table
          dataSource={getPaginatedData()}
          columns={columns}
          pagination={false}
          className="loan-table"
          rowKey="_id"
          loading={loading}
        />

        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={searchText ? filteredData.length : insurance.length}
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

export default Insurance;
