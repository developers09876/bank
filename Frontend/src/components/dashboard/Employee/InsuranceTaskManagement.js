import { Table, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Api from "../../../Api";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

function InsuranceTaskManagement() {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    fetchInsuranceTasks();
  }, []);
  const handleEdit = (record) => {
    // navigate(`/user/loanform/${record._id}`, { state: { record } });
  };
  useEffect(() => {
    const filtered = data.filter((item) => {
      const firstname = item.firstname || "";
      const lastname = item.lastname || "";
      const email = item.email || "";
      const phone = item.phone || "";
      const businessType = item.businessType || "";

      return (
        firstname.toLowerCase().includes(searchText.toLowerCase()) ||
        lastname.toLowerCase().includes(searchText.toLowerCase()) ||
        email.toLowerCase().includes(searchText.toLowerCase()) ||
        phone.toLowerCase().includes(searchText.toLowerCase()) ||
        businessType.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, [searchText, data]);

  const fetchInsuranceTasks = async () => {
    setLoading(true);
    try {
      const response = await Api.get(
        `insuranceManagement/getbyEmployeeid/${userId}`
      );
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

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleViewDetails = (record) => {
    console.log("record", record);
    navigate(`/employee/Insurancetaskdetails/${record._id}`, {
      state: { record },
    });
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

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
          // <Button
          //   type="primary"
          //   style={{ background: "#4096ff", color: "#fff" }}
          //   onClick={() => handleViewDetails(record)}
          // >
          //   View
          // </Button>
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
            {/* <DownloadOutlined
              style={{
                fontSize: "18px",
                color: "#52c41a",
            cursor: "pointer",
              }}
          /> */}
          </>
        );
      },
    },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      <Container style={{ width: "90%" }}>
        <div style={{ width: "100%" }}>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
            Insurance Task Management
          </h4>
          <br />
          <div style={{ justifyContent: "space-between" }}>
            <Space style={{ marginBottom: 16 }} className="filter-actions">
              <Input
                placeholder="Search"
                value={searchText}
                onChange={handleSearch}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
            </Space>
          </div>
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
            className="loan-table"
          />
        </div>
      </Container>
    </div>
  );
}

export default InsuranceTaskManagement;
