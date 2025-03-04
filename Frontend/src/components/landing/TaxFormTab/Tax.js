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
import { SearchOutlined } from "@ant-design/icons";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Api from "../../../Api";

const Tax = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [tax, setTax] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const userid = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");

  // const handleViewDetails = (record) => {
  //   setSelectedRecord(record);
  //   setIsModalVisible(true);
  // };
  const handleViewDetails = (record) => {
    navigate(`/user/TaxViewdetails/${record._id}`, { state: { record } });
  };
  const handleEdit = (record) => {
    navigate(`/user/TaxEditdetails/${record._id}`, {
      state: { record },
    });
  };

  const handleAddTax = () => {
    navigate(`/user/userTaxmangemnent`);
  };

  useEffect(() => {
    const filtered = data.filter((item) => {
      const firstname = item.firstname || "";
      const phone = item.contactNumber || "";
      const aadhar = item.aadhar || "";
      const business = item.businessType || "";
      return (
        firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        phone.toLowerCase().includes(searchText.toLowerCase()) ||
        aadhar.toLowerCase().includes(searchText.toLowerCase()) ||
        business.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchText, data]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await Api.get(
        `http://localhost:5000/taxManagement/getByIdTaxManagement/${userid}`
      );
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
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm)
      )
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
                marginRight: "15px",
                cursor: "pointer",
              }}
              onClick={() => handleEdit(record)}
            />
          </>
        );
      },
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
          {/* <Button
            type="primary"
            onClick={handleAddTax}
            style={{
              background: "#00397F",
              color: "#fff",
              marginRight: "130px",
            }}
          >
            Add Tax
          </Button> */}
          <Button
            type="primary"
            onClick={handleAddTax}
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
          loading={loading}
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

      {/* Modal for viewing details */}
      <Modal
        title="Tax Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedRecord && (
          <div>
            <p>
              <strong>First Name:</strong> {selectedRecord.firstname}
            </p>
            <p>
              <strong>Phone Number:</strong> {selectedRecord.contactNumber}
            </p>
            <p>
              <strong>Aadhaar Number:</strong> {selectedRecord.aadhar}
            </p>
            <p>
              <strong>Business Type:</strong> {selectedRecord.businessType}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Tax;
