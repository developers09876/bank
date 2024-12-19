import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { Card, Col, Row } from 'antd';
import './Carrier.css';
import img1 from '../Images/group-1000002437.png'
import { ImLocation } from "react-icons/im";

function Carrier() {
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const jobListings = [
    {
      title: 'Loan Officer',
      department: 'Sales',
      location: 'Remote',
      type: 'Full-Time',
      salary: '3 LPA',
      description: 'Help customers through the loan application process and provide guidance on financial products.',
    },
    {
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'In-Office',
      type: 'Part-Time',
      salary: '5 LPA',
      description: 'Create and manage marketing campaigns to drive customer engagement and growth.',
    },
  ];

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowForm(false);
  };

  return (
    <div>
      <Header />
      <Row style={{ height: '90vh', padding: '30px', marginTop: '74px' }}>
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
      <br />

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
                <strong>Salary:</strong> {job.salary}
              </p>
              <p>
                <strong>Job Description:</strong> {job.description}
              </p>
              <button className="apply-btn" onClick={() => handleApplyClick(job)}>Apply Now</button>
            </div>
          ))}
        </section>

        <div>
          <Row>
            {jobListings.map((job, index) => (
              <Col key={index}>
                <Card>
                  <h5><strong>{job.title}</strong></h5>
                  <b>{job.department}</b>
                  <p style={{ display: 'inline' }}><ImLocation style={{ display: 'inline' }} /><span>{job.location}</span></p>
                  <Row className='px-2 py-3'>
                    <Col><p></p></Col>
                    <Col><p></p></Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* {showForm && selectedJob && (
          <div className="modal">
            <div className="modal-content">
              <button className="close-btn" onClick={handleCloseForm}>
                &times;
              </button>
              <section className="application-form">
                <h2>Apply for {selectedJob.title}</h2>
                <form
                  action="/submit-application"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <label htmlFor="name">Full Name:</label>
                  <input type="text" id="name" name="name" required />

                  <label htmlFor="email">Email Address:</label>
                  <input type="email" id="email" name="email" required />

                  <label htmlFor="position">Position Applying For:</label>
                  <select id="position" name="position" defaultValue={jobListings.title}>
                    <option value={selectedJob.title}>{selectedJob.title}</option>
                  </select>
                  <label htmlFor="resume">Upload Resume:</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf, .doc"
                    required
                  />

                  <button type="submit" className="submit-button1">
                    Submit Application
                  </button>
                </form>
              </section>
            </div>
          </div>
        )} */}
        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Apply for {selectedJob ? selectedJob.title : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleFormSubmit}>
              <Row>
                <Col className='px-2 py-2' lg={12}>
                  <Form.Group controlId="name">
                    <Form.Label>Full Name:</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col className='px-2 py-2' lg={12}>
                  <Form.Group controlId="email">
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </Form.Group>
                </Col>

                <Col className='px-2 py-2' lg={12}>
                  <Form.Group controlId="position">
                    <Form.Label>Position Applying For:</Form.Label>
                    <Form.Control
                      as="select"
                      disabled
                      value={selectedJob ? selectedJob.title : ''}
                    >
                      <option>{selectedJob ? selectedJob.title : ''}</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col className='px-2 py-2' lg={12}>
                  <Form.Group controlId="resume">
                    <Form.Label>Upload Resume:</Form.Label>
                    <Form.Control
                      type="file"
                      // style={{width:'fit-content'}}
                      required
                      onChange={(e) => setFormData({ ...formData, resume: e.target.files[0] })}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button variant="primary" type="submit">
                  Submit
                </Button></div>
            </Form>
          </Modal.Body>
        </Modal>

        <section className="employee-testimonials">
          <h2>Why Our Employees Love Working Here</h2>
          <blockquote>
            "<span style={{ color: 'red' }}>Vilu Genius </span>Loans has been an amazing place to grow my career. The team is supportive, and I love the work we do." – Prakash, Loan Specialist
          </blockquote>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Carrier;