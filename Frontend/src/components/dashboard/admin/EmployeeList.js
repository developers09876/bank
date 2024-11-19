import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Table, Button } from 'antd';
import Sidebar from './Sidebar';

const EmployeeList = ({ setAuth }) => {
  const [employees, setEmployees] = useState([]);

  const getEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/signup/getall', {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
      });

      const users = await response.json();

      // Filter only users with userType 'employee'
      const employeeUsers = users.filter((user) => user.userType === 'employee');
      setEmployees(employeeUsers);
    } catch (error) {
      console.log(error);
    }
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
        pending: 'Deleting Employee...',
        success: 'Deleted Successfully!',
        error: 'Error!',
      },
      {
        autoClose: 2000,
      }
    );
  };

  // Delete Employee Function
  const deleteEmployee = async (id) => {
    try {
      await fetch(`http://localhost:5000/admins/${id}`, {
        method: 'DELETE',
        headers: { Authorization: localStorage.getItem('token') },
      });
      deleteNotif();
      setTimeout(() => {
        setEmployees(employees.filter((employee) => employee._id !== id));
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  // Ant Design Table columns
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (_, employee) => `${employee.firstname} ${employee.lastname}`,
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, employee) => (
        <div>
          <Button
            type="primary"
            style={{color:'black'}}
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
    <div className="w-full border bg-white shadow-md rounded mt-5 border-t-4 border-t-red-500">
      <Sidebar />
      <ToastContainer />
      <div className="py-5 px-5">
        {/* TITLE */}
        <div className="flex items-center justify-between border-b-2">
          <h3 className="text-lg font-medium text-gray px-1">Manage Employees</h3>
          <button className="border hover:bg-red-700 bg-red-500 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline mr-5">
            <Link to="/admin/addAdmin" className="no-underline" style={{ color: 'white' }}>
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
