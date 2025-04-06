import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button, Modal } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Api from "../../../Api";

const Insurance = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [insurance, setInsurance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const navigate = useNavigate();
  const userid = localStorage.getItem("id");

  const handleViewDetails = (record) => {
    navigate(`/user/InsuranceViewdetails/${record._id}`, { state: { record } });
  };
  const handleEdit = (record) => {
    navigate(`/user/insuranceEditdetails/${record._id}`, {
      state: { record },
    });
  };
  const handleAddInsurance = () => {
    navigate(`/user/insurancedetails`);
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await Api.get(
        `insuranceManagement/getByIdInsuranceManagement/${userid}`
      );
      setInsurance(response.data);
      setFilteredData(response.data);
      console.log("insurance response.data", response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const firstname = item.firstname || "";
      const phone = item.contactNumber || "";
      const aadhar = item.aadhar || "";
      const policy = item.PolicyType || "";
      return (
        firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        phone.toLowerCase().includes(searchText.toLowerCase()) ||
        aadhar.toLowerCase().includes(searchText.toLowerCase()) ||
        policy.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchText, data]);

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
      dataIndex: "PolicyType",
      key: "PolicyType",
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

  return (
    <div>
      <div className={collapsed ? "main-content.open" : "main-content"}>
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
            onClick={handleAddInsurance}
            style={{
              background: "#00397F",
              color: "#fff",
              marginLeft: "800px",
            }}
          >
            Add Insurance
          </Button> */}
          <Button
            type="primary"
            onClick={handleAddInsurance}
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
          total={searchText ? filteredData.length : insurance.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          className="pagination-control"
        />
      </div>

      {/* <Modal
        title="Insurance Details"
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
              <strong>Policy Type:</strong> {selectedRecord.PolicyType}
            </p>
          </div>
        )}
      </Modal> */}
    </div>
  );
};

export default Insurance;
