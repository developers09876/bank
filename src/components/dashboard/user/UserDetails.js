import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LocationOnOutlined,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Logout,
} from '@mui/icons-material';
import Sidebar from '../../sidebar/Sidebar';
import TabsProfile from './ProfileTabs';

export default function UserDetails({ setAuth }) {
  const [name, setName] = useState('');
  const [contactnumber, setContactNumber] = useState();
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const getAdmin = async () => {
    try {
      const response = await fetch(`http://localhost:8000/profile`, {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
      });

      const parseRes = await response.json();
      console.log(parseRes);

      setName(parseRes.firstname + ' ' + parseRes.lastname);
      setContactNumber(parseRes.contactnumber);
      setAddress(parseRes.address);
      setEmail(parseRes.email);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 "style={{width:"100px"}}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="ml-[20%] w-[80%] px-8 py-8 pb-8 mb-4 bg-white border rounded shadow-md">
        {/* HEADER */}
        <div className="px-4 py-5 sm:px-6 rounded shadow-md bg-red-500 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-medium leading-6 text-white">
              WELCOME {name}
            </h3>
            <span className="text-md font-medium leading-6 text-white">
              Logged in: {new Date().toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center">
            {/* LOGOUT BUTTON */}
            <button className="text-white hover:-translate-y-0.5">
              <Link to="/user">
                <PermIdentity />
              </Link>
            </button>
            <button
              className="ml-2 text-white hover:-translate-y-0.5"
              onClick={() => setAuth(false)}
            >
              <Link to="/login">
                <Logout />
              </Link>
            </button>
            <span className="ml-10 text-lg font-medium leading-6 text-white">
              {new Date().toLocaleString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="flex gap-10 mt-5">
          {/* Account Info */}
          <div className="w-1/4 h-[720px] border rounded shadow-md border-t-4 border-t-red-500">
            <div className="py-5 px-5">
              <h3 className="text-xl mb-5 border-b-2">Account Details</h3>
              <div className="flex flex-col items-center">
              <div className="relative w-32 h-32">
  <img
    src="https://cdn3.iconfinder.com/data/icons/red-icons-1/512/Male-profile-icon-512.png"
    alt="profile"
    className="w-32 h-32 rounded-full border-4 border-red-500"
  />
  <div className="absolute bottom-0 left-0 right-0 h-10 bg-black bg-opacity-50 rounded-b-full flex items-center justify-center text-white text-sm font-bold">
    Your Text
  </div>
</div>



                <div className="mt-5">
                  <div className="flex items-center my-5">
                    <PermIdentity className="text-lg" />
                    <span className="ml-2.5">{name}</span>
                  </div>
                  <div className="flex items-center my-5">
                    <LocationOnOutlined className="text-lg" />
                    <span className="ml-2.5">{address}</span>
                  </div>
                  <div className="flex items-center my-5">
                    <MailOutline className="text-lg" />
                    <span className="ml-2.5">{email}</span>
                  </div>
                  <div className="flex items-center my-5">
                    <PhoneAndroid className="text-lg" />
                    <span className="ml-2.5">{contactnumber}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Admin Info */}
          <div className="w-3/4">
            <TabsProfile />
          </div>
        </div>
      </div>
    </div>
  );
}
