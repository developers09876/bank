import React from 'react';
import { Link } from 'react-router-dom'; 
import Imageh1 from '../Images/WhatsApp Image 2024-10-05 at 15.28.34_a0e3c4a5.jpg';

function Header() {
  return (
    <header className='fixed top-0 left-0 w-full bg-white z-50 shadow-md'>
      <nav className='flex justify-between max-w-screen-xl px-4 py-8 mx-auto'>
        <div className='flex items-center'>
          <img src={Imageh1} alt='logo-img' style={{ width: '120px', height: '120px', position:'absolute' }} />
        </div>
        <div>
          <ul className='flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 items-center'>
            <li>
              <Link
                to='/'
                className='block py-2 pl-3 pr-4 rounded text-gray-700 no-underline lg:hover:text-white lg:hover:bg-[#47b6f2] font-light lg:text-x'
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to='/about'
                className='block py-2 pl-3 pr-4 rounded text-gray-700 no-underline lg:hover:text-white lg:hover:bg-[#47b6f2] font-light lg:text-x'
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to='/contact'
                className='block py-2 pl-3 pr-4 rounded text-gray-700 no-underline lg:hover:text-white lg:hover:bg-[#47b6f2] font-light lg:text-x'
              >
                Contact
              </Link>
            </li>

            <li>
              <button className='bg-[#47b6f2] hover:bg-[#47b6f9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5'>
                <Link to='/login' className='no-underline'>Login</Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
