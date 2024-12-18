import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Card, Typography } from 'antd';
import './About.css';
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import { FaRegHandshake } from "react-icons/fa6";
import { GiStairsGoal, GiTeamIdea } from "react-icons/gi";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegHandPointRight } from "react-icons/fa";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdOutlinePeopleAlt, MdBusinessCenter } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function About() {
  // return (
  //   <div>
  //     <Header/>
  //     <br/>
  //     <section id='about'>
  //       <div className='max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6'>
  //         {/* ITEM 1 */}
  //         <div className='items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16'>
  //           {/* TEXT */}
  //           <div className='text-gray-500 sm:text-lg'>
  //             {/* TITLE */}
  //             <h2 className='mb-4 text-3xl font-extrabold tracking-tight text-gray-900'>
  //               With Loan App, see how loans are released and Succeed.
  //             </h2>

  //             {/* DESCRIPTION 1 */}
  //             <p className='mb-8 font-light lg:text-xl'>
  //               You can create loans, update their amounts and approve pending
  //               loans.
  //             </p>

  //             {/* FEATS */}
  //             <ul
  //               role='list'
  //               className='pt-8 space-y-5 border-t border-gray-200 my-7'
  //             >
  //               <li className='flex space-x-3'>
  //                 <svg
  //                   className='flex-shrink-0 w-5 h-5 text-[#47b6f2] e-400'
  //                   fill='currentColor'
  //                   viewBox='0 0 20 20'
  //                   xmlns='http://www.w3.org/2000/svg'
  //                 >
  //                   <path
  //                     fillRule='evenodd'
  //                     d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
  //                     clipRule='evenodd'
  //                   ></path>
  //                 </svg>
  //                 <span className='text-base font-medium leading-tight text-gray-900 '>
  //                   Continuous integration and deployment
  //                 </span>
  //               </li>
  //               <li className='flex space-x-3'>
  //                 <svg
  //                   className='flex-shrink-0 w-5 h-5 text-[#47b6f2] e-400'
  //                   fill='currentColor'
  //                   viewBox='0 0 20 20'
  //                   xmlns='http://www.w3.org/2000/svg'
  //                 >
  //                   <path
  //                     fillRule='evenodd'
  //                     d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
  //                     clipRule='evenodd'
  //                   ></path>
  //                 </svg>
  //                 <span className='text-base font-medium leading-tight text-gray-900 '>
  //                   Development workflow
  //                 </span>
  //               </li>
  //               <li className='flex space-x-3'>
  //                 <svg
  //                   className='flex-shrink-0 w-5 h-5 text-[#47b6f2] e-400'
  //                   fill='currentColor'
  //                   viewBox='0 0 20 20'
  //                   xmlns='http://www.w3.org/2000/svg'
  //                 >
  //                   <path
  //                     fillRule='evenodd'
  //                     d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
  //                     clipRule='evenodd'
  //                   ></path>
  //                 </svg>
  //                 <span className='text-base font-medium leading-tight text-gray-900 '>
  //                   Loan management
  //                 </span>
  //               </li>
  //             </ul>

  //             {/* DESCRIPTION 2 */}
  //             <p className='mb-8 font-light lg:text-xl'>
  //               Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
  //               dicta aut, quasi ullam aliquid sed nostrum nesciunt iusto quae
  //               incidunt.
  //             </p>
  //           </div>

  //           {/* IMAGE */}
  //           <div>
  //             <img
  //               src={image1}
  //               alt=''
  //             />
  //           </div>
  //         </div>

  //         {/* ITEM 2 */}
  //         <div className='items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16'>
  //           {/* IMAGE */}
  //           <img
  //             src={image2}
  //             alt=''
  //           />

  //           {/* TEXT */}
  //           <div className='text-gray-500 sm:text-lg'>
  //             {/* TITLE */}
  //             <h2 className='mb-4 text-3xl font-extrabold tracking-tight text-gray-900 '>
  //               Communicate with your clients through the app.
  //             </h2>

  //             {/* DESCRIPTION 1 */}
  //             <p className='mb-8 font-light lg:text-xl'>
  //               Instantly notify your clients with their upcoming loan payments.
  //               Update them with their balance or tell them that their loan has
  //               been approved and ready for disbursement.
  //             </p>

  //             {/* FEATURES */}
  //             <ul
  //               role='list'
  //               className='pt-8 space-y-5 border-t border-gray-200 my-7 '
  //             >
  //               <li className='flex space-x-3'>
  //                 <svg
  //                   className='flex-shrink-0 w-5 h-5 text-[#47b6f2] '
  //                   fill='currentColor'
  //                   viewBox='0 0 20 20'
  //                   xmlns='http://www.w3.org/2000/svg'
  //                 >
  //                   <path
  //                     fillRule='evenodd'
  //                     d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
  //                     clipRule='evenodd'
  //                   ></path>
  //                 </svg>
  //                 <span className='text-base font-medium leading-tight text-gray-900 '>
  //                   Send Email
  //                 </span>
  //               </li>
  //               <li className='flex space-x-3'>
  //                 <svg
  //                   className='flex-shrink-0 w-5 h-5 text-[#47b6f2] '
  //                   fill='currentColor'
  //                   viewBox='0 0 20 20'
  //                   xmlns='http://www.w3.org/2000/svg'
  //                 >
  //                   <path
  //                     fillRule='evenodd'
  //                     d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
  //                     clipRule='evenodd'
  //                   ></path>
  //                 </svg>
  //                 <span className='text-base font-medium leading-tight text-gray-900 '>
  //                   Notify clients
  //                 </span>
  //               </li>
  //               <li className='flex space-x-3'>
  //                 <svg
  //                   className='flex-shrink-0 w-5 h-5 text-[#47b6f2] '
  //                   fill='currentColor'
  //                   viewBox='0 0 20 20'
  //                   xmlns='http://www.w3.org/2000/svg'
  //                 >
  //                   <path
  //                     fillRule='evenodd'
  //                     d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
  //                     clipRule='evenodd'
  //                   ></path>
  //                 </svg>
  //                 <span className='text-base font-medium leading-tight text-gray-900 '>
  //                   Send Loan Status / Approvals
  //                 </span>
  //               </li>
  //             </ul>

  //             {/* DESCRIPTION 2 */}
  //             <p className='font-light lg:text-xl'>
  //               Lorem ipsum dolor sit, amet consectetur adipisicing elit.
  //               Facilis repudiandae quis commodi odio excepturi exercitationem
  //               ipsum et sed nesciunt facere.
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </section>
  //     <Footer/>
  //   </div>
  // )
  const navigate = useNavigate();

  const cardData = [
    {
      id: 1,
      title: 'Company Mission',
      description: "We're on a mission to change the way the housing market works. Rather than offering one service or another, we want to combine as many and make our clients' lives easy and carefree. Our goal is to match our clients with the perfect properties that fit their tastes, needs, and budgets.",
      icon: <GiStairsGoal />,
    },
    {
      id: 2,
      title: 'Target, Vision & Goal',
      description: "We want to live in a world where people can buy homes that match their needs rather than having to find a compromise and settle on the second-best option. That's why we take a lot of time and care in getting to know our clients from the moment they reach out to us and ask for our help.",
      icon: <TbTargetArrow />,
    },
    {
      id: 3,
      title: 'Dedicated Teams',
      description: 'Our strength lies in our individuality. Set up by Mr. Prakasha H, the team strives to bring in the best talent in various fields, and Financial Services and sales.',
      icon: <GiTeamIdea />,
    },
  ];

  const whyweData = [
    {
      id: 1,
      title: "Personalized Loan",
      description:
        "We offer customized loan options tailored to meet your specific financial requirements.",
      icon: <MdBusinessCenter />,
    },
    {
      id: 2,
      title: "Competitive Rates",
      description:
        "Benefit from loanlift competitive rates, designed to make your loans more affordable.",
      icon: <LiaCertificateSolid />,
    },
    {
      id: 3,
      title: "Trusted Partner",
      description:
        "With a commitment to transparency and personalized service, we work with you every step of the way.",
      icon: <MdOutlinePeopleAlt />,
    },
  ];
  return (
    <div className='aboutus-maincontent'>
      <Header />
      <div>
        <div className='aboutus-bg'>
          <div className='aboutus-heading'>
            <Container style={{ width: '80%' }}>
              <h2>About Us</h2>
            </Container>
          </div>
        </div>
        <div className='aboutus-secondcontent'>
          <Container style={{ width: '90%', padding: '70px 0', }} >
            <Row >
              {/* Left Section */}
              <Col lg={7} className="aboutus-content px-3 py-4">
                <h5 className="sub-heading" style={{ display: 'inline' }}>
                  <FaRegHandshake size={20} style={{ paddingRight: '5px', display: 'inline' }} /><span>ABOUT US</span>
                </h5>
                <Title level={2} className="main-heading">
                  25 years of expert loan and finance services.
                </Title>
                <Text className="description" type="secondary">
                  The genesis of VILU Genius private limited is traced Mr. Prakasha H, for his one decade and veterans in the retail banking industry, primarily in the housing loans and financial services and insurance industry. Leverage his experience and unique ideas to create a lasting, well-respected organization in the affordable home loans and other finance business.
                </Text><br />
                <Text className='description' type='secondary' style={{ marginTop: '20px' }}>
                  VILU Genius private limited was incorporated on January 20th, 2023, under the companies act, 2013 with an objective to provide financial consultants, management consultants, and provide advice, services, general consultancy in various fields, mainly focusing on loan consulting, auditing and accounting, book keeping bank loan services and general administrative, commercial, financial legal, economic, direct and indirect taxation and other levies, statistical, accountancy and all type of consultancy services with other related activities.
                </Text>
                <br />
                <Button
                  className="contactus-button mt-3"
                  onClick={() => navigate("/contact")}
                >
                  Contact Us →
                </Button>
              </Col>

              {/* Right Section */}
              <Col lg={5} className="aboutus-images">
                <Row >
                  <Col lg={6}>
                    <img
                      src="https://thegenius.co/html/loanlift/assets/images/about/about-four-imag-1.jpg"
                      alt="Team Meeting"
                      className="img-fluid img1  rounded"
                    />
                  </Col>
                  <Col lg={6}>
                    <Row >
                      <Col style={{ paddingBottom: '12px' }}>
                        <img
                          src="https://thegenius.co/html/loanlift/assets/images/about/about-four-image-2.jpg"
                          alt="Team Collaboration"
                          className="img-fluid img2 rounded"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ paddingTop: '12px' }}>
                        <Card
                          bordered={false}
                          className="experience-box text-center text-white"
                          style={{ backgroundColor: '#1a2a41' }}
                        >
                          <Title level={3} style={{ color: 'white' }}>
                            25+
                          </Title>
                          <Text style={{ color: 'white' }}>Years Of Experience</Text>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Container style={{ width: '90%', padding: '50px 0 ' }} >
            <Row >
              {cardData.map((card) => (
                <Col key={card.id} lg={4} md={4} sm={12} className='px-4'>
                  <Card bordered={false} className="h-100 text-center aboutus-cardDesign">
                    <Row>
                      <Col lg={2}>
                        <p className="aboutus-card-icon">{card.icon}</p>
                        {/* <img src={card.icon} className="aboutus-card-icon" /> */}
                      </Col>
                      <Col lg={10}>
                        <Row>
                          <Title level={4} style={{ textAlign: 'left' }}>{card.title}</Title>
                        </Row>
                        <Row>
                          <Text type="secondary" style={{ textAlign: 'left', color: '#5a5a5a' }}>{card.description}</Text>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <div className='aboutus-whywe'>
            <Container style={{ width: '90%', padding: '70px 0 20px', }} >
              <Row style={{ padding: '20px 0px' }}>
                <Col lg={8} >
                  <h5 className="whywe-sub-heading" style={{ display: 'inline' }}>
                    <FaRegHandPointRight size={20} style={{ paddingRight: '5px', display: 'inline' }} /><span>WHY CHOOSE</span>
                  </h5><br />
                  <Title level={2} className="whywe-main-heading">
                    Your trusted partner for personalized loan solutions, expert financial guidance
                  </Title>
                  <Text className="whywe-description" >

                    At Vilu Genius Private Limited, we provide comprehensive financial services, including loans, insurance, and tax solutions, tailored to help individuals and businesses achieve their financial aspirations and safeguard their assets.
                  </Text>
                  <br />
                  <div className="whywe-card-section">
                    {whyweData.map((cards) => (
                      <div key={cards.id} className="whywecards-card row" >
                        <div className="whywecards-icon col-lg-3">{cards.icon}</div>
                        <span className='col-lg-9'>
                          <h4 className="whywecards-title">{cards.title}</h4>

                        </span><br />
                        <p className="whywecards-description">{cards.description}</p>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col lg={1} style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ borderLeft: '2px solid #808080', height: '100%' }}></div>
                </Col>

                <Col lg={3}>
                  <ul class="counter-box-one">
                    <li>
                      <h6 data-target="25" data-symbol="+">25+</h6>
                      <span>01</span>
                      <p style={{ color: ' rgba(255, 255, 255, 0.9)', borderTop: '1px solid  rgba(255, 255, 255, 0.9)' }}>Years of trusted expertise</p>
                    </li>
                    <li>
                      <h6 data-target="50" data-symbol="k">50k</h6>
                      <span>02</span>
                      <p style={{ color: ' rgba(255, 255, 255, 0.9)', borderTop: '1px solid  rgba(255, 255, 255, 0.9)' }}>Loans approved</p>
                    </li>
                    <li>
                      <h6 data-target="10" data-symbol="K">10K</h6>
                      <span>03</span>
                      <p style={{ color: ' rgba(255, 255, 255, 0.9)', borderTop: '1px solid  rgba(255, 255, 255, 0.9)' }}>Satisfied clients</p>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </div>
          <div className='aboutus-loan'>
            <Container style={{ width: '90%', padding: '50px 0', marginTop: '0' }}>
              <Row>
                <Col lg={8} style={{ alignItems: 'center', padding: '0 50px' }}>
                  <h2>We build trust with our customers by combining creativity with tailored business loan solutions.</h2>
                  <Button
                    className="contactus-button mt-3"
                    onClick={() => navigate("/contact")}
                  >
                    Contact Us →
                  </Button>
                </Col>
                <Col lg={4}>
                  <img className="rounded" src='https://img.freepik.com/free-photo/happy-couple-having-meeting-with-real-estate-agent-analyzing-blueprints-while-communicating_637285-3822.jpg' />
                </Col>
              </Row>
            </Container>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default About
