import React from 'react';
import { Link } from 'react-router-dom';
import {
  PermIdentity,
  CreditScore,
  ReceiptLong,
} from '@mui/icons-material';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import image1 from '../Images/Img 1.png';
// import './Home.css'

const Landing = () => {
  return (
    <div className=''>
      {/* NAVBAR */}
      <Header />
      <br/>

      {/* HERO SECTION */}
      <section>
        <div className='grid max-w-screen-xl px-4 pt-32 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12 lg:pt-28'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl '>
              Simplify your <br /> Loan and Tax<br /> Management
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
              Easily track your loans, manage clients and make smart financial
              decisions with our user-friendly app.
            </p>

            {/* BUTTONS */}
            <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
              <button className='bg-[#47b6f2] hover:bg-[#47b6f9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5'>
                <Link to='/register'>Get Started</Link>
              </button>
              <button className='border border-black-200 rounded sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold py-2 px-4 focus:outline-none focus:shadow-outline mr-5'>
                <Link to='/contact'>Contact Us</Link>
              </button>
            </div>
          </div>

          <div className='lg:mt-0 lg:col-span-5 lg:flex'>
            <img src={image1} alt='Illustration of financial management' />
          </div>
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section id='featured' className='mb-20'>
      
<div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6'>
  {/* FEATURED TITLE */}
  <div className='flex flex-col my-20 py-1 w-1/2 mx-auto text-center'>
    <h2 className='mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900'>
      We Provide Quality Service
    </h2>
    <p className='mb-6 font-light text-gray-500 md:text-lg'>
      We will provide the best service to you so that you understand how
      to use and get to know the features that we provide.
    </p>
  </div>

  {/* FEATURED ITEMS */}
  <div className='flex gap-10 justify-between'>
  {/* FEATURE 1 : LOAN MGT */}
  <div className='flex flex-col w-80 p-10 border border-black rounded-xl hover:shadow-xl hover:bg-[#47b6f2] hover:text-white cursor-pointer group'>
    <div className=''>
      <CreditScore className='w-full text-[#47b6f2] group-hover:text-white rounded-full h-full text-2xl mb-2 transition-colors duration-300' />
    </div>
    <h4 className='text-md font-semibold mb-1'>Loan Management</h4>
    <p>
      We will provide management for your loan so that you can track
      them easily.
    </p>
  </div>

  {/* FEATURE 2 : CLIENT MGT */}
  <div className='flex flex-col w-80 p-10 border border-black rounded-xl hover:shadow-xl hover:bg-[#47b6f2] hover:text-white cursor-pointer group'>
    <div className=''>
      <PermIdentity className='w-full text-[#47b6f2] group-hover:text-white rounded-full h-full text-2xl mb-2 transition-colors duration-300' />
    </div>
    <h4 className='text-md font-semibold mb-1'>Tax Management</h4>
    <p>
      We will provide tax management plus managers can now email their
      clients to notify them.
    </p>
  </div>

  {/* FEATURE 3 : PAYMENT MGT */}
  <div className='flex flex-col w-80 p-10 border border-black rounded-xl hover:shadow-xl hover:bg-[#47b6f2] hover:text-white cursor-pointer group'>
    <div className=''>
      <ReceiptLong className='w-full text-[#47b6f2] group-hover:text-white rounded-full h-full text-2xl mb-2 transition-colors duration-300' />
    </div>
    <h4 className='text-md font-semibold mb-1'>Insurance Management</h4>
    <p>
      We will provide management for your Insurance so that you can track
      them easily.
    </p>
  </div>
</div>

</div>

      </section>

      {/* TESTIMONIALS SECTION */}
      <section className='bg-gray-100 py-16'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto'>
          <h2 className='mb-8 text-3xl font-extrabold text-center'>What Our Clients Say</h2>
          <div className='flex flex-col items-center'>
            <div className='max-w-md text-center bg-white shadow-md rounded-lg p-6 mb-6'>
              <p className='italic'>"This app has transformed the way I manage my loans!"</p>
              <p className='font-bold mt-4'>- Jane Doe</p>
            </div>
            <div className='max-w-md text-center bg-white shadow-md rounded-lg p-6 mb-6'>
              <p className='italic'>"I love how easy it is to keep track of my finances."</p>
              <p className='font-bold mt-4'>- John Smith</p>
            </div>
            <div className='max-w-md text-center bg-white shadow-md rounded-lg p-6'>
              <p className='italic'>"A must-have tool for any business!"</p>
              <p className='font-bold mt-4'>- Sarah Lee</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs SECTION */}
      <section className='py-16'>
        <div className='max-w-screen-xl px-4 py-8 mx-auto'>
          <h2 className='mb-8 text-3xl font-extrabold text-center'>Frequently Asked Questions</h2>
          <div className='flex flex-col space-y-4'>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <h3 className='font-semibold'>1. How does the loan management feature work?</h3>
              <p className='text-gray-700'>
                Our loan management feature allows you to track all your loans in one place, set reminders for payments, and receive notifications for upcoming due dates.
              </p>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <h3 className='font-semibold'>2. Can I integrate my existing client database?</h3>
              <p className='text-gray-700'>
                Yes, our app supports integration with various databases and can help you migrate your existing client information easily.
              </p>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <h3 className='font-semibold'>3. Is there a mobile app available?</h3>
              <p className='text-gray-700'>
                Absolutely! We have a mobile app available for both iOS and Android, allowing you to manage your finances on the go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Landing;
