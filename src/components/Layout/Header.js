import React from 'react';
import { Link } from 'react-router-dom'; 

function Header() {
  return (
    <header className='fixed top-0 left-0 w-full bg-white z-50 shadow-md'>
      <nav className='flex justify-between max-w-screen-xl px-4 py-8 mx-auto'>
        <div className='flex items-center'>
          <h3 className='text-xl font-extrabold tracking-tight text-[#47b6f2]'>
            Loan App<span className='text-gray-900'>.</span>
          </h3>
        </div>
        <div>
          <ul className='flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0 items-center'>
            <li>
              <Link
                to='/'
                className='block py-2 pl-3 pr-4 rounded text-gray-700 lg:hover:text-white lg:hover:bg-[#47b6f2] font-light lg:text-x'
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to='/about'
                className='block py-2 pl-3 pr-4 rounded text-gray-700 lg:hover:text-white lg:hover:bg-[#47b6f2] font-light lg:text-x'
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to='/contact'
                className='block py-2 pl-3 pr-4 rounded text-gray-700 lg:hover:text-white lg:hover:bg-[#47b6f2] font-light lg:text-x'
              >
                Contact
              </Link>
            </li>
            <li>
            <button className='bg-[#47b6f2] hover:bg-[#47b6f9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5'>
                <Link to='/login'>Login</Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
