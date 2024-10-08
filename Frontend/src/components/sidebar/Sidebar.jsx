import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PermIdentity, CreditScore, ReceiptLong, MailOutline } from '@mui/icons-material';

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className='fixed top-0 left-0 h-full w-72  px-5 py-5 bg-white border-r shadow-lg' onClick={() =>navigate("/")} style={{cursor:"pointer"}}>
      {/* LOGO */}
      <div className='my-10'>
        <h3 className='text-center text-2xl'>VILU GENIUS</h3>
        <p className='text-center text-sm'>private limited</p>
      </div>

      <hr className='h-px bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent' />

      {/* MENU */}
      <div className='my-10'>
        <ul>
        <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
            <PermIdentity />
            <Link to='/user' className='ml-2.5'>
              Dashboard
            </Link>
          </li>
          <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
            <PermIdentity />
            <Link to='/userProfile' className='ml-2.5'>
              My Profile
            </Link>
          </li>

          <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
            <CreditScore />
            <Link to='/loans' className='ml-2.5'>
              Loans
            </Link>
          </li>

          <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
            <ReceiptLong />
            <Link to='/payments' className='ml-2.5'>
              Payments
            </Link>
          </li>

          <li className='text-sm font-medium text-gray-700 py-2 px-2 hover:bg-red-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out'>
            <MailOutline />
            <Link to='/emailClient' className='ml-2.5'>
              Email
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
