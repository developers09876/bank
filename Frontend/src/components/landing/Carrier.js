import React from 'react';
import Header from '../Layout/Header';
import { Col, Row } from 'antd';
import './Carrier.css';
import img1 from '../Images/group-1000002437.png'

function Carrier() {
  const jobListings = [
    {
      title: 'Loan Officer',
      department: 'Sales',
      location: 'Remote',
      type: 'Full-Time',
      description: 'Help customers through the loan application process and provide guidance on financial products.',
    },
    // Add more jobs as needed
  ];

  return (
    <div>
      <Header />
      <Row style={{ height: '90vh', padding: '30px', marginTop: '74px' }}>
        {/* <Col style={{ backgroundColor: 'pink', }} lg={12}>
        <div style={{padding:'150px 200px 0px 50px'}}>
          <h1>Get Your<br></br> Best Courses <br></br>with Education</h1>
          <h4>Explore and grow your knowledge with the best resources available.</h4></div>
        </Col> */}
        <Col style={{ backgroundColor: '#4169E1', padding: '150px 200px 0px 50px', color: 'white' }} lg={12}>
  <h1 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: '48px' }}>
    Kickstart Your <br /> Career with <span style={{ color: '#800000' }}>Us</span>
  </h1>
  <h4 style={{ marginTop: '20px', fontFamily: 'Georgia, serif', fontSize: '20px', fontStyle: 'italic' }}>
    Join our dynamic team and help people achieve their financial goals through our innovative loan solutions.
  </h4>
</Col>

<Col style={{ backgroundColor: '#4169E1' }} lg={12}>
  <img src={img1} alt="Description of Image" style={{ width: '100%', height: 'auto' }} />
</Col>

      </Row>

      <div className="career-container">
        <section className="career-intro">
          <h1>Join Our Team</h1>
          <p>
            We are a fast-growing loan company committed to empowering people to achieve their financial goals. Explore
            our open positions and find a career that matches your passion and skills.
          </p>
        </section>

        <section className="job-listings">
          <h2>Current Job Openings</h2>
          {jobListings.map((job, index) => (
            <div className="job" key={index}>
              <h3>{job.title}</h3>
              <p>
                <strong>Department:</strong> {job.department}
              </p>
              <p>
                <strong>Location:</strong> {job.location}
              </p>
              <p>
                <strong>Type:</strong> {job.type}
              </p>
              <p>
                <strong>Job Description:</strong> {job.description}
              </p>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))}
        </section>

        <section className="employee-testimonials">
          <h2>Why Our Employees Love Working Here</h2>
          <blockquote>
            "<span style={{color:'red'}}>Vilu Genius </span>Loans has been an amazing place to grow my career. The team is supportive, and I love the work we do." –
            Prakash, Loan Specialist
          </blockquote>
        </section>

        <section className="application-form">
          <h2>Apply Now</h2>
          <form action="/submit-application" method="POST" enctype="multipart/form-data">
            <label htmlFor="name">Full Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="position">Position Applying For:</label>
            <select id="position" name="position">
              {jobListings.map((job, index) => (
                <option value={job.title} key={index}>
                  {job.title}
                </option>
              ))}
            </select>

            <label htmlFor="resume">Upload Resume:</label>
            <input type="file" id="resume" name="resume" accept=".pdf, .doc" required />

            <button type="submit" class="submit-button1">Submit Application</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Carrier;
