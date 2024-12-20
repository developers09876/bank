import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { Card, Col, Row } from 'antd';
import './Carrier.css';
import img1 from '../Images/group-1000002437.png'
import { FaRegClock } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { GoClockFill } from "react-icons/go";
import { ImLocation } from "react-icons/im";
import axios from 'axios';

function Carrier() {
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  console.log('jobListings', jobListings);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/job/getall');
        setJobListings(response?.data);
        console.log('response', response.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        // setError('Failed to fetch job listings. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
      </div>

      <div className='career-container'>
        <h3 style={{ fontWeight: 'bold', padding: '20px', textAlign: 'center' }}>Current Job Openings</h3>
        <Row>
          {jobListings.map((job, index) => (
            <Col key={index} lg={12} className='px-3'>
              <Card className=' jobcards'>
                <h5><strong>{job.jobTitle}</strong></h5>
                <b>{job.company}</b>
                <p style={{ paddingTop: '5px' }} ><ImLocation style={{ display: 'inline', color: '#1a2a41' }} /><span >{job.location}</span></p>
                <Row style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div className='px-1 py-1'>
                    <p className='job-role'>
                      <MdBusinessCenter style={{ display: 'inline' }} /><span> ROLE</span>
                    </p>
                    <p className='job-mini'>{job.designation}</p>
                  </div>
                  <div className='px-1 py-1'>
                    <p className='job-role'>
                      <GoClockFill style={{ display: 'inline' }} /> JOB TYPE</p>
                    <p className='job-mini'>{job.jobType}</p>
                  </div>
                  <div className='px-1 py-1'>
                    <p className='job-role'>
                      <BsCashCoin style={{ display: 'inline' }} /> SALARY</p>
                    <p className='job-mini'>{job.salary} LPA</p>
                  </div>
                </Row>
                <p>{job.description}</p>
                <p><strong>Requirements :</strong> {job.requirements}</p>
                {/* <Row className='py-2' style={{ display: 'flex' }}>
                  {job.requirements.map((requirement, reqIndex) => (
                    <div className='px-2' key={reqIndex}>
                      <p className='job-minireq'>{requirement}</p>
                    </div>
                  ))}
                </Row> */}
                <Button className='applybtn' onClick={() => handleApplyClick(job)}>Apply</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {selectedJob ? selectedJob.jobTitle : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col className='px-2 py-1' lg={24}>
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

              <Col className='px-2 py-1' lg={24}>
                <Form.Group controlId="number">
                  <Form.Label>Phone Number:</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col className='px-2 py-1' lg={24}>
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

              <Col className='px-2 py-1' lg={24}>
                <Form.Group controlId="position">
                  <Form.Label>Position Applying For:</Form.Label>
                  <Form.Control
                    as="select"
                    disabled
                    value={selectedJob ? selectedJob.jobTitle : ''}
                  >
                    <option>{selectedJob ? selectedJob.jobTitle : ''}</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col className='px-2 py-1' lg={24}>
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
      <div className='career-container'>
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