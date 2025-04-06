import { Table, Input, Space, Pagination, Modal, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "../../../../Api";

function EmployeeList() {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [fetchedData, setFetchedData] = useState();
  const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState([]);
  //   const [filteredData, setFilteredData] = useState([]);
  //   const [searchText, setSearchText] = useState("");
  //   const [isModalVisible, setIsModalVisible] = useState(false);
  //   const [selectedRecord, setSelectedRecord] = useState(null);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [pageSize, setPageSize] = useState(5);

  //   useEffect(() => {
  //     fetchLeads();
  //   }, []);

  //   useEffect(() => {
  //     const filtered = data.filter((item) => {
  //       const firstname = item.firstname || "";
  //       const lastname = item.lastname || "";
  //       const email = item.email || "";
  //       const contactNumber = item.contactNumber || "";
  //       const purpose = item.purpose || "";

  //       return (
  //         firstname.toLowerCase().includes(searchText.toLowerCase()) ||
  //         lastname.toLowerCase().includes(searchText.toLowerCase()) ||
  //         email.toLowerCase().includes(searchText.toLowerCase()) ||
  //         contactNumber.toLowerCase().includes(searchText.toLowerCase()) ||
  //         purpose.toLowerCase().includes(searchText.toLowerCase())
  //       );
  //     });
  //     setFilteredData(filtered);
  //   }, [searchText, data]);

  //   const fetchLeads = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:5000/lead/getById/${userId}`
  //       );
  //       setData(response.data.data);
  //       setFilteredData(response.data.data);
  //     } catch (error) {
  //       console.error("Error fetching leads:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    const getEmployees = async () => {
      setLoading(true);
      try {
        const response = await Api.get(`signup/getCreatedbyId/${userId}`);
        setFetchedData(response.data);
        console.log("getresponse", response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };
    getEmployees();
  }, [userId]);

  //   const handleSearch = (e) => {
  //     setSearchText(e.target.value);
  //   };

  //   const handleTableChange = (pagination) => {
  //     setCurrentPage(pagination.current);
  //     setPageSize(pagination.pageSize);
  //   };

  //   const paginatedData = filteredData.slice(
  //     (currentPage - 1) * pageSize,
  //     currentPage * pageSize
  //   );

  //   const handleViewDetails = (record) => {
  //     navigate("/employeeTax/employeedetails", { state: { record } });
  //   };

  //   const handleModalOk = () => {
  //     setIsModalVisible(false);
  //     setSelectedRecord(null);
  //   };

  //   const handleModalCancel = () => {
  //     setIsModalVisible(false);
  //     setSelectedRecord(null);
  //   };

  const columns = [
    {
      title: "Emp No",
      dataIndex: "empno",
      key: "empno",
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, employee) => `${employee.firstname} ${employee.lastname}`,
    },
    {
      title: "Designation",
      dataIndex: "employeeCategory",
      key: "employeeCategory",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Date Of Joining",
      dataIndex: "dateOfJoining",
      key: "dateOfJoining",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (_, employee) => (
        <div>
          <Button
            type="primary"
            style={{ color: "black" }}
            onClick={() => console.log(`Viewing employee: ${employee._id}`)}
          >
            View
          </Button>
          {/* <Button
            type="danger"
            className="ml-2"
            onClick={() => deleteEmployee(employee._id)}
          >
            Delete
          </Button> */}
        </div>
      ),
    },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      <Container style={{ width: "90%" }}>
        <div style={{ width: "100%" }}>
          <h4 style={{ textAlign: "center", fontWeight: "bold" }}>
            Employee List
          </h4>
          <br />
          <div style={{ justifyContent: "space-between" }}>
            <Space style={{ marginBottom: 16 }} className="filter-actions">
              <Input
                placeholder="Search"
                // value={searchText}
                // onChange={handleSearch}
                style={{ width: 200 }}
                prefix={<SearchOutlined />}
              />
            </Space>
            <Button
              type="primary"
              onClick={() => navigate("/employeeTax/addEmployee")}
              style={{
                display: "inline",
                float: "right",
                backgroundColor: "#00397f",
              }}
            >
              <FaPlus style={{ display: "inline", color: "white" }} />
              Add Employee
            </Button>
          </div>
          <Table
            dataSource={fetchedData}
            columns={columns}
            loading={loading}
            // pagination={{
            //   current: currentPage,
            //   pageSize: pageSize,
            //   total: filteredData.length,
            //   showSizeChanger: true,
            // }}
            // onChange={handleTableChange}
            rowKey="id"
            className="loan-table"
          />
        </div>
      </Container>
    </div>
  );
}

export default EmployeeList;
