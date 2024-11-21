// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import {
//   PermIdentity,Home , CreditScore, ReceiptLong, MailOutline,
//   AttachMoney, ExpandMore
// } from '@mui/icons-material';

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const [isTransactionsOpen, setTransactionsOpen] = useState(false);

//   // Toggle function for dropdown
//   const toggleTransactions = () => setTransactionsOpen(!isTransactionsOpen);

//   return (
//     <div className='fixed top-0 left-0 h-full w-72 px-5 py-5 bg-white border-r shadow-lg'>
//       {/* LOGO */}
//       <div className='my-10' onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
//         <h3 className='text-center text-2xl'>VILU GENIUS</h3>
//         <p className='text-center text-sm'>private limited</p>
//       </div>

//       <hr className='h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />

//       {/* MENU */}
//       <div className='my-10'>
//         <ul>
//         <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
//             <Home />
//             <Link
//               to='/admindashboard'
//               className='ml-2.5 no-underline'
//               style={{ color: 'black' }} // Ensuring black color
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
//             <PermIdentity />
//             <Link
//               to='/admin'
//               className='ml-2.5 no-underline'
//               style={{ color: 'black' }} // Ensuring black color
//             >
//               Employee List
//             </Link>
//           </li>
//           <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
//             <PermIdentity />
//             <Link
//               to='/userlist'
//               className='ml-2.5 no-underline'
//               style={{ color: 'black' }} // Ensuring black color
//             >
//               User List
//             </Link>
//           </li>

//           {/* Transaction List Dropdown */}
//           <li
//             className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out flex justify-between items-center cursor-pointer'
//             onClick={toggleTransactions}
//           >
//             <div className='flex items-center'>
//               <AttachMoney />
//               <span className='ml-2.5'>Transactions</span>
//             </div>
//             <ExpandMore
//               style={{ transform: isTransactionsOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
//             />
//           </li>

//           {/* Dropdown Options */}
//           {isTransactionsOpen && (
//             <ul className='ml-10 mt-2 space-y-1'>
//               <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
//                 <Link to='/transactions/loan' className='no-underline'  style={{ color: 'black' }} >Loan</Link>
//               </li>
//               <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
//                 <Link to='/transactions/tax' className='no-underline'  style={{ color: 'black' }} >Tax</Link>
//               </li>
//               <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
//                 <Link to='/transactions/insurance' className='no-underline'  style={{ color: 'black' }} >Insurance</Link>
//               </li>
//             </ul>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { NavLink } from "react-router-dom";

import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";


function Sidebar({ collapsed }) {
  const onClick = (e) => {
    console.log("click ", e);
  };
  const role = localStorage.getItem("name");
  const id = localStorage.getItem("regid");

  return (
    <div className={collapsed === true ? "sidebarcontent open" : "d-none"}>
      <Menu onClick={onClick} mode="inline" className="nav-list">
        {/* <NavLink
          to="/professional/professionalprofile"
          ClassName="main-nav-style"
        >
          <MdPerson className="Nav-Icon" />
          My profile
        </NavLink> */}
        {/* <SubMenu
          icon={<AiFillProject size={20} className="Nav-Icon1" />}
          title="Freelancing"
        > */}

        {/* </SubMenu> */}
        <NavLink
          to="/admin"
          ClassName="main-nav-style"
          style={{ marginTop: "70px" }}
        >
          {/* <MdAreaChart className="Nav-Icon" /> */}
          Dashboard
        </NavLink>

        <NavLink to="/admin/userlist" ClassName="main-nav-style">
          {/* <MdAreaChart className="Nav-Icon" /> */}
          UserList
        </NavLink>
        <NavLink to="/admin/employeelist" ClassName="main-nav-style">
          {/* <MdAreaChart className="Nav-Icon" /> */}
          EmployeeList
        </NavLink>
<NavLink to="/admin/createjobform" className="main-nav-style">Job Post</NavLink>
        <SubMenu
          // icon={<AiFillProject size={20} className="Nav-Icon1" />}
          title="Management"
        >
          <NavLink to="/professional/jobs">
            {/* <MdRequestPage className="Nav-Icon" /> */}
            Loan Management
          </NavLink>
          <NavLink to="/professional/jobrequests">
            {/* <MdSend className="Nav-Icon" /> */}
            Insurance Management
          </NavLink>
          <NavLink to="/professional/jobrequest">
            {/* <MdSend className="Nav-Icon" /> */}
            Tax Management
          </NavLink>
        </SubMenu>
      </Menu>
    </div>
  );
}

export default Sidebar;
