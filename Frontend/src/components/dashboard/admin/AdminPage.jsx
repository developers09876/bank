import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LocationOnOutlined, MailOutline, PermIdentity, 
  PhoneAndroid, Logout 
} from '@mui/icons-material';
import Admins from './AllAdmins';
import Sidebar from './Sidebar';

export default function AdminPage({ setAuth }) {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  // Fetch Admin Data
  const getAdmin = async () => {
    try {
      const response = await fetch(`http://localhost:8000/profile`, {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
      });
      const parseRes = await response.json();
      setName(`${parseRes.firstname} ${parseRes.lastname}`);
      setContactNumber(parseRes.contactnumber);
      setAddress(parseRes.address);
      setEmail(parseRes.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-72 bg-gray-50">
        <div className="bg-red-500 text-white p-6 flex justify-between items-center shadow-md">
          <div>
            <h3 className="text-2xl font-semibold">WELCOME {name}</h3>
            <span className="text-sm">Logged in: {new Date().toLocaleTimeString()}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-white">
              <PermIdentity fontSize="large" />
            </Link>
            <button
              onClick={() => setAuth(false)}
              className="text-white hover:bg-red-600 p-2 rounded-md"
            >
              <Link to="/login">
                <Logout fontSize="large" />
              </Link>
            </button>
            <span className="text-sm">
              {new Date().toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="p-8">
          <Admins />
        </div>
      </div>
    </div>
  );
}
