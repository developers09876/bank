import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Table, Button } from 'antd';
import Sidebar from '../Sidebar';

const UserList = ({ setAuth }) => {
//   const [employees, setEmployees] = useState([]);

  // Function to fetch all users and filter for employees
//   const getEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/signup/getall', {
//         method: 'GET',
//         headers: { Authorization: localStorage.getItem('token') },
//       });

//       const users = await response.json();

//       // Filter only users with userType 'user'
//       const employeeUsers = users.filter((user) => user.userType === 'user');
//       setEmployees(employeeUsers);
//     } catch (error) {
//       console.log(error);
//     }
//   };

  // Delete Notification Function
//   const deleteNotif = () => {
//     toast.promise(
//       new Promise((resolve) => {
//         setTimeout(() => {
//           resolve();
//         }, 2000);
//       }),
//       {
//         pending: 'Deleting User...',
//         success: 'Deleted Successfully!',
//         error: 'Error!',
//       },
//       {
//         autoClose: 2000,
//       }
//     );
//   };

//   useEffect(() => {
//     getEmployees();
//   }, []);

  // Ant Design Table columns
  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname',
      render: (_, user) => `${user.firstname} ${user.lastname}`,
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
      render: (_, user) => (
        <Button
         type="primary" 
         style={{color:'black'}}
         onClick={() => console.log(`Viewing user: ${user._id}`)}>
          View
        </Button>
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
          <h3 className="text-lg font-medium text-gray px-1"> Users List</h3>
        </div>
        {/* INFO */}
        <div className="w-full px-4 mt-5">
          <Table
            columns={columns}
            // dataSource={users}
            rowKey="_id"
            pagination={{ pageSize: 5 }}


          />
        </div>
        
      </div>
    </div>
  );
};

export default UserList;

