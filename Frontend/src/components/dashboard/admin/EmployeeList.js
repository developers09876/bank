import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { DeleteForever } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { Button } from 'antd';

const EmployeeList = ({ setAuth }) => {
  const [employees, setEmployees] = useState([]);

  // Function to fetch all users and filter for employees
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

  return (
    <div className="w-full border bg-white shadow-md rounded mt-5 border-t-4 border-t-red-500">
      <Sidebar />
      <ToastContainer />
      <div className="py-5 px-5">
        {/* TITLE */}
        <div className="flex items-center justify-between border-b-2">
          <h3 className="text-lg font-medium text-gray px-1">Manage Employees</h3>
          <button className="border hover:bg-red-700 bg-red-500 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline mr-5">
            <Link to="/addAdmin" className="no-underline" style={{ color: 'white' }}>
              Add Employee
            </Link>
          </button>
        </div>
        {/* INFO */}
        <div className="w-full px-4 mt-5 overflow-auto hover:overflow-scroll border rounded shadow-md">
          <table className="table-fixed text-center mb-2">
            <thead>
              <tr>
                <th className="w-1/4 px-1 py-2 text-gray-600">Full Name</th>
                <th className="w-1/4 px-1 py-2 text-gray-600">Contact Number</th>
                <th className="w-1/4 px-1 py-2 text-gray-600">Email</th>
                <th className="w-1/1 px-1 py-2 text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length <= 0 ? (
                <tr className="border px-4 py-2 bg-red-50">
                  <td></td>
                  <td></td>
                  <td className="px-4 py-2 bg-red-50">No Employee Data</td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                employees.map((employee, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{employee.firstname + ' ' + employee.lastname}</td>
                    <td className="border px-4 py-2 bg-gray-50">{employee.contactNumber}</td>
                    <td className="border px-4 py-2 bg-gray-50">{employee.email}</td>
                    <td className="border px-4 py-2">
                      {/* <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline w-full text-sm"
                        onClick={() => deleteEmployee(employee._id)}
                      >
                        <DeleteForever className="text-lg" />
                      </button> */}
                      <Button>View</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
