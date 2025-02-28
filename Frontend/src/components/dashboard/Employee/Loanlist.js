// import React, { useState, useEffect } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import { Table, Button } from "antd";
// import Sidebar from "./Sidebar";
// import { useNavigate } from "react-router-dom";

// const UserList = ({ setAuth }) => {
//   const [employees, setEmployees] = useState([]);
//   const navigate = useNavigate();
//   // Function to fetch all users and filter for employees
//   const getEmployees = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/signup/getall", {
//         method: "GET",
//         headers: { Authorization: localStorage.getItem("token") },
//       });

//       const users = await response.json();

//       // Filter only users with userType 'user'
//       const employeeUsers = users.filter((user) => user.userType === "user");
//       setEmployees(employeeUsers);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleViewDetails = (record) => {
//     navigate(`/admin/userdetails/${record._id}`, { state: { record } });
//   };

//   // Delete Notification Function
//   const deleteNotif = () => {
//     toast.promise(
//       new Promise((resolve) => {
//         setTimeout(() => {
//           resolve();
//         }, 2000);
//       }),
//       {
//         pending: "Deleting User...",
//         success: "Deleted Successfully!",
//         error: "Error!",
//       },
//       {
//         autoClose: 2000,
//       }
//     );
//   };

//   useEffect(() => {
//     getEmployees();
//   }, []);

//   // Ant Design Table columns
//   const columns = [
//     {
//       title: "Full Name",
//       dataIndex: "fullname",
//       key: "fullname",
//       render: (_, record) => `${record.firstname} ${record.lastname}`,
//     },
//     {
//       title: "Contact Number",
//       dataIndex: "contactNumber",
//       key: "contactNumber",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           style={{ background: "#4096ff", color: "#fff" }}
//           onClick={() => handleViewDetails(record)}
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div className="w-full border bg-white shadow-md rounded mt-5 border-t-4 border-t-red-500">
//       <Sidebar />
//       <ToastContainer />
//       <div className="py-5 ">
//         <div className="flex items-center justify-between border-b-2">
//           <h3 className="text-lg font-medium text-gray px-1">Loan List</h3>
//         </div>
//         <div className="w-full px-4 mt-5">
//           <div style={{ maxWidth: "100%", overflowX: "auto" }}>
//             <Table
//               columns={columns}
//               dataSource={employees}
//               rowKey="_id"
//               pagination={{ pageSize: 5 }}
//               scroll={{ x: "max-content" }} 
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserList;
import React, { useEffect, useState } from "react";
import { Table, Input, Space, Pagination, Button, Modal, Row, Col } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";

const LoanList = ({ collapsed }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const navigate = useNavigate();

  console.log("selectedRecord", selectedRecord);
  const [loan, setLoan] = useState([]);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    getAll();
  }, [selectedRecord]);

  const getAll = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/loanform/getall`
      );
      const loans = response.data;
      // const filterbyUserid = loans.filter(item => item.userid === userId);
      // console.log('filterbyUserid', filterbyUserid)
      setLoan(loans);
      console.log("responseget", loans);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (record) => {
    navigate(`/employee/loandetails/${record._id}`, { state: { record } });
  };
  const handleEdit = (record) => {
    navigate(`/employee/editownloan/${record._id}`, { state: { record } });
  };
  const handleAddLoan = () => {
    navigate(`/employee/createloan`);
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
          Loan List
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
            style={{ width: 200,marginLeft:"40px " }}
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

export default LoanList;
