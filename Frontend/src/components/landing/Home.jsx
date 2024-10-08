import React from 'react';
import { Link } from 'react-router-dom';
import {
  PermIdentity,
  CreditScore,
  ReceiptLong,
  Assessment,
} from '@mui/icons-material';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import image1 from '../Images/Img 1.png';
import { Col, Row } from 'react-bootstrap';
import Carousel from "react-bootstrap/Carousel";
import './Home.css'

const Landing = () => {
  const carouselImages = [
    {
      id:1,
      image:'https://flexiloans.com/wp-content/uploads/2023/08/Small-Business-Loans.png'
    },
    {
      id:2,
      image:'https://paytmblogcdn.paytm.com/wp-content/uploads/2023/09/Blog_Paytm_What-is-Tax_-Types-of-Tax-Benefits-and-Penalty-in-Tax-1.jpg'
    },
    {
      id:3,
      image:'https://i0.wp.com/www.suretiimf.com/wp-content/uploads/2020/06/New2.jpg?fit=1214%2C355&ssl=1'
    },
  ]
  return (
    <div className='home'>
      <Header />
      <br/>

       {/* <section>
        <div className='grid max-w-screen-xl px-4 pt-32 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12 lg:pt-28'>
          <div className='mr-auto place-self-center lg:col-span-7'>
            <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl '>
              Simplify your <br /> Loan and Tax<br /> Management
            </h1>
            <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
              Easily track your loans, manage clients and make smart financial
              decisions with our user-friendly app.
            </p>

            <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
              <Link to='/register'>
                <button className='bg-[#47b6f2] no-underline hover:bg-[#47b6f9] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-5'>
                  Get Started
                </button>
              </Link>
              <Link to='/contact'>
                <button className='border border-black-200 no-underline rounded sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold py-2 px-4 focus:outline-none focus:shadow-outline mr-5'>
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          <div className='lg:mt-0 lg:col-span-5 lg:flex'>
            <img src={image1} alt='Illustration of financial management' />
          </div>
        </div>
      </section>  */}
       <div className="carousel" style={{ paddingTop: "5%" }}>
      <Row>
        <Col md={12}>
          <Carousel className="carousel_wh">
            {carouselImages.map((image) => (
              <Carousel.Item >
                <img
                  className="carousel_img"
                  style={{
                    width: "100%",
                    height: "70vh",
                    position: "relative",
                    
                  }}
                  src={image.image}
                  alt={`Slide `}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </div>

      <section id='featured' className='mb-20'>
      
      <div className='max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6'>
      <div className='text-center my-20 py-1 w-1/2 mx-auto'>
        <h2 className='mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900'>
          We Provide Quality Service
        </h2>
        <p className='mb-6 font-light text-gray-500 md:text-lg'>
          We will provide the best service to you so that you understand how
          to use and get to know the features that we provide.
        </p>
      </div>

      <Row className='g-4'>
        {/* Loan Management Card */}
        <Col md={3}>
          <div className='p-10 border border-black rounded-xl hover:shadow-xl hover:bg-[#47b6f2] hover:text-white cursor-pointer group'>
            <div className='mb-2'>
              <CreditScore className='w-full text-[#47b6f2] group-hover:text-white rounded-full h-full text-2xl transition-colors duration-300' />
            </div>
            <h4 className='text-md font-semibold mb-1'>Loan Management</h4>
            <p>We will provide management for your loan so that you can track them easily.</p>
          </div>
        </Col>

        {/* Tax Management Card */}
        <Col md={3}>
          <div className='p-10 border border-black rounded-xl hover:shadow-xl hover:bg-[#47b6f2] hover:text-white cursor-pointer group'>
            <div className='mb-2'>
              <PermIdentity className='w-full text-[#47b6f2] group-hover:text-white rounded-full h-full text-2xl transition-colors duration-300' />
            </div>
            <h4 className='text-md font-semibold mb-1'>Tax Management</h4>
            <p>We will provide tax management plus managers can now email their clients to notify them.</p>
          </div>
        </Col>

        {/* Insurance Management Card */}
        <Col md={3}>
          <div className='p-10 border border-black rounded-xl hover:shadow-xl hover:bg-[#47b6f2] hover:text-white cursor-pointer group'>
            <div className='mb-2'>
              <ReceiptLong className='w-full text-[#47b6f2] group-hover:text-white rounded-full h-full text-2xl transition-colors duration-300' />
            </div>
            <h4 className='text-md font-semibold mb-1'>Insurance Management</h4>
            <p>We will provide management for your Insurance so that you can track them easily.</p>
          </div>
        </Col>

        {/* Cibil Score Card */}
        <Col md={3}>
          <div className='p-10 border border-black rounded-xl hover:shadow-xl hover:bg-[#47b6f2] hover:text-white cursor-pointer group'>
            <div className='mb-2'>
              <Assessment className='w-full text-[#47b6f2] group-hover:text-white rounded-full h-full text-2xl transition-colors duration-300' />
            </div>
            <h4 className='text-md font-semibold mb-1'>Cibil Score Management</h4>
            <p>We will provide tools to help you track and manage your Cibil score easily.</p>
          </div>
        </Col>
      </Row>
    </div>



      </section>

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

      <Footer />
    </div>
  );
};

export default Landing;
