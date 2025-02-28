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
import { Table, Input, Space, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";

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
        console.log("userId", userId);
        const response = await axios.get(
          `http://localhost:5000/loanform/getbyid/${userId}`
        );
        const loans = response.data;
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

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchText(searchTerm);
    const filtered = loan.filter(
      (item) =>
        item.firstname.toLowerCase().includes(searchTerm) ||
        item.lastname.toLowerCase().includes(searchTerm)
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const getPaginatedData = () => {
    const sourceData = searchText ? filteredData : loan;
    const start = (currentPage - 1) * pageSize;
    return sourceData.slice(start, start + pageSize);
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
      key: "fullName",
      render: (_, record) => `${record.firstname || ""} ${record.lastname || ""}`,
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
        const statusColors = {
          "1": { text: "Approved", color: "green" },
          "2": { text: "Rejected", color: "red" },
        };
        return (
          <span style={{ color: statusColors[status]?.color || "orange" }}>
            {statusColors[status]?.text || "Pending"}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <EyeOutlined
            style={{ fontSize: "18px", color: "#4096ff", cursor: "pointer", marginRight: "15px" }}
            onClick={() => handleViewDetails(record)}
          />
          <EditOutlined
            style={{ fontSize: "18px", color: "#ff4d4f", cursor: "pointer" }}
            onClick={() => handleEdit(record)}
          />
        </>
      ),
    },
  ];

  return (
    <div className={collapsed ? "main-content open" : "main-content"}>
      <h4 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>Loan List</h4>
      <Space
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
        className="filter-actions"
      >
        <Input
          placeholder="Search by Name"
          value={searchText}
          onChange={handleSearch}
          style={{ width: 200 }}
          prefix={<SearchOutlined />}
        />
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
  );
};

export default LoanList;
