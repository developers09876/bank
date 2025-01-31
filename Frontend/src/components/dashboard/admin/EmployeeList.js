import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Table, Button } from "antd";
import Sidebar from "./Sidebar";

const EmployeeList = ({ setAuth }) => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const getEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/signup/getall", {
        method: "GET",
        headers: { Authorization: localStorage.getItem("token") },
      });

      const users = await response.json();

      // Filter only users with userType 'employee'
      const employeeUsers = users.filter((user) => user.userType != "user");
      setEmployees(employeeUsers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleViewDetails = (record) => {
    navigate(`/admin/employeedetails/${record._id}`, { state: { record } });
  };

  // Ant Design Table columns
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
      render: (_, record) => `${record.firstname} ${record.lastname}`,
    },
    {
      title: "Designation",
      dataIndex: "userType",
      key: "userType",
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
      key: "action",
      render: (_, record) => (
        <div>
          <Button
            type="primary"
            style={{ color: "black" }}
            onClick={() => handleViewDetails(record)}
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
    <div className="w-full border bg-white shadow-md rounded mt-5 border-t-4 border-t-red-500">
      <Sidebar />
      <ToastContainer />
      <div className="py-5 px-5">
        {/* TITLE */}
        <div className="flex items-center justify-between border-b-2">
          <h3 className="text-lg font-medium text-gray px-1">
            Manage Employees
          </h3>
          <button
            className="border   text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline mr-5"
            style={{ backgroundColor: "rgb(0 57 127)" }}
          >
            <Link
              to="/admin/addAdmin"
              className="no-underline"
              style={{ color: "white" }}
            >
              Add Employee
            </Link>
          </button>
        </div>
        {/* INFO */}
        <div className="w-full px-4 mt-5">
          <Table
            columns={columns}
            dataSource={employees}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
