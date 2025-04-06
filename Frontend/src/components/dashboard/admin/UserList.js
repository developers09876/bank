import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Table, Button } from "antd";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const UserList = ({ setAuth }) => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  // Function to fetch all users and filter for employees
  const getEmployees = async () => {
    try {
      const response = await fetch("http://vilu.in:5000/signup/getall", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });

      const users = await response.json();

      // Filter only users with userType 'user'
      const employeeUsers = users.filter((user) => user.userType === "user");
      setEmployees(employeeUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (record) => {
    navigate(`/admin/userdetails/${record._id}`, { state: { record } });
  };

  // Delete Notification Function
  const deleteNotif = () => {
    toast.promise(
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }),
      {
        pending: "Deleting User...",
        success: "Deleted Successfully!",
        error: "Error!",
      },
      {
        autoClose: 2000,
      }
    );
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Ant Design Table columns
  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, record) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
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
    <div className="w-full border bg-white shadow-md rounded mt-5 border-t-4 border-t-red-500">
      <Sidebar />
      <ToastContainer />
      <div className="py-5 ">
        {/* TITLE */}
        <div className="flex items-center justify-between border-b-2">
          <h3 className="text-lg font-medium text-gray px-1">Users List</h3>
        </div>
        {/* INFO */}
        <div className="w-full px-4 mt-5">
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <Table
              columns={columns}
              dataSource={employees}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content" }} // Enables horizontal & vertical scrolling
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
