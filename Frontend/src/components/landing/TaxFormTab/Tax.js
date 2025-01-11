import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Api from "../../../Api";
const Tax = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [tax, setTax] = useState([]);
  const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const handleViewDetails = (record) => {};

  const handleAddTax = () => {
    navigate(`/user/userTaxmangemnent`);
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
      const response = await Api.get(`http://localhost:5000/taxManagement/getByIdTaxManagement/${userid}`);
      console.log("Fetched Data:", response.data);
      setTax(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = tax.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
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
      title: "Business Type",
      dataIndex: "businessType",
      key: "businessType",
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
  useEffect(() => {
    fetchLeads();
  }, []);
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
            style={{ width: 200, marginLeft: "50px" }}
            prefix={<SearchOutlined />}
          />
          <Button
            type="primary"
            onClick={handleAddTax}
            style={{
              background: "#00397F",
              color: "#fff",
              marginRight: "130px",
            }}
          >
            Add Tax
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

export default Tax;
