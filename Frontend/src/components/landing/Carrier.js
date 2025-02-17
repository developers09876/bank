import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { Card, Col, Row } from "antd";
import "./Carrier.css";
import img1 from "../Images/group-1000002437.png";
import { FaRegClock } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { GoClockFill } from "react-icons/go";
import { ImLocation } from "react-icons/im";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import { useForm } from "react-hook-form";

function Carrier() {
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobListings, setJobListings] = useState([]);
  const [selectImage, setSelectImage] = useState(null);
  console.log("selectImage", selectImage);
  const userId = localStorage.getItem("id");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/job/getall");
        setJobListings(response?.data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobs();
  }, []);

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "darshan");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dzblzw7ll/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const cloudinaryData = await response.json();
      return cloudinaryData.secure_url;
    } catch (error) {
      console.error("File upload failed", error);
      return null;
    }
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectImage(file);
    }
  };

  const onSubmit = async (data) => {
    const details = {
      id: userId,
      jobTitle: data.jobTitle,
      name: data.name,
      email: data.email,
      phone: data.phone,
      resume: data.resume,
    };
    console.log("rsssss", details.jobTitle);
    try {
      if (selectImage) {
        const uploadedResumeUrl = await uploadFile(selectImage);
        if (uploadedResumeUrl) {
          details.resume = uploadedResumeUrl;
        } else {
          alert("Resume upload failed. Please try again.");
          return;
        }
      }
      data.jobTitle = selectedJob?.jobTitle;

      const response = await axios.post(
        "http://localhost:5000/jobrequest/createjobrequest",
        details
      );

      if (response.status === 201) {
        toast.success("Job Applied successfully");
        setShowForm(false);
        reset();
      } else {
        alert("Failed to submit job application. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting job application:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div>
      <Header />
      {/* <Row style={{ height: '90vh', padding: '30px', marginTop: '74px' }}>
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
      </Row> */}
      <Row
        style={{
          height: "90vh",
          padding: "30px",
          marginTop: "74px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {/* Left Column */}
        <Col
          lg={12}
          md={12}
          sm={24}
          xs={24}
          className="career-text"
          style={{
            backgroundColor: "#4169E1",
            padding: "150px 200px 0px 50px",
            color: "white",
            textAlign: "left",
          }}
        >
          <h1 className="career-heading">
            Kickstart Your <br /> Career with{" "}
            <span style={{ color: "#800000" }}>Us</span>
          </h1>
          <h4 className="career-subtext">
            Join our dynamic team and help people achieve their financial goals
            through our innovative loan solutions.
          </h4>
        </Col>

        {/* Right Column (Image) */}
        <Col
          lg={12}
          md={12}
          sm={24}
          xs={24}
          className="career-image"
          style={{
            backgroundColor: "#4169E1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={img1}
            alt="Career"
            className="career-img"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "600px",
            }}
          />
        </Col>

        {/* Media Queries for Mobile (320px), Tablet (768px), and Laptop (1024px) */}
        <style>
          {`
          @media (max-width: 1024px) { /* Laptop View */
            .career-heading {
              font-size: 40px !important;
            }
            .career-subtext {
              font-size: 18px !important;
            }
            .career-text {
              padding: 120px 100px 0px 40px !important;
            }
          }

          @media (max-width: 768px) { /* Tablet View */
            .career-heading {
              font-size: 32px !important;
            }
            .career-subtext {
              font-size: 16px !important;
            }
            .career-text {
              padding: 80px 50px 0px 30px !important;
              text-align: center !important;
            }
            .career-image img {
              max-width: 500px !important;
            }
          }

          @media (max-width: 320px) { /* Mobile View */
            .career-text {
              padding: 50px 20px !important;
              text-align: center !important;
            }
            .career-heading {
              font-size: 24px !important;
            }
            .career-subtext {
              font-size: 14px !important;
            }
            .career-image img {
              max-width: 100% !important;
              height: auto !important;
            }
          }
        `}
        </style>
      </Row>
      <br />

      <div className="career-container">
        <section className="career-intro">
          <h1>Join Our Team</h1>
          <p>
            We are a fast-growing loan company committed to empowering people to
            achieve their financial goals. Explore our open positions and find a
            career that matches your passion and skills.
          </p>
        </section>
      </div>

      <div className="career-container">
        <h3
          style={{ fontWeight: "bold", padding: "20px", textAlign: "center" }}
        >
          Current Job Openings
        </h3>
        <Row>
          {jobListings.map((job, index) => (
            <Col key={index} lg={12} className="px-3" style={{ width: "100%" }}>
              <Card className=" jobcards">
                <h5>
                  <strong>{job.jobTitle}</strong>
                </h5>
                <b>{job.company}</b>
                <p style={{ paddingTop: "5px" }}>
                  <ImLocation style={{ display: "inline", color: "#1a2a41" }} />
                  <span>{job.location}</span>
                </p>
                <Row
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div className="px-1 py-1">
                    <p className="job-role">
                      <MdBusinessCenter style={{ display: "inline" }} />
                      <span> ROLE</span>
                    </p>
                    <p className="job-mini">{job.designation}</p>
                  </div>
                  <div className="px-1 py-1">
                    <p className="job-role">
                      <GoClockFill style={{ display: "inline" }} /> JOB TYPE
                    </p>
                    <p className="job-mini">{job.jobType}</p>
                  </div>
                  <div className="px-1 py-1">
                    <p className="job-role">
                      <BsCashCoin style={{ display: "inline" }} /> SALARY
                    </p>
                    <p className="job-mini">{job.salary} LPA</p>
                  </div>
                </Row>
                <p>{job.description}</p>
                <br />
                <p>
                  <strong>Requirements :</strong> {job.requirements}
                </p>
                <br />
                {/* <Row className='py-2' style={{ display: 'flex' }}>
                  {job.requirements.map((requirement, reqIndex) => (
                    <div className='px-2' key={reqIndex}>
                      <p className='job-minireq'>{requirement}</p>
                    </div>
                  ))}
                </Row> */}
                <Button
                  className="applybtn"
                  onClick={() => handleApplyClick(job)}
                >
                  Apply
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Apply for {selectedJob ? selectedJob.jobTitle : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col className="px-2 py-1" lg={24}>
                <label>Full Name:</label>
                <input
                  type="text"
                  {...register("name", { required: "Full Name is required" })}
                  className="form-control"
                />
                {errors.name && (
                  <p className="error-message">{errors.name.message}</p>
                )}
              </Col>

              <Col className="px-2 py-1" lg={24}>
                <label>Phone Number:</label>
                <input
                  type="number"
                  {...register("phone", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit phone number",
                    },
                  })}
                  className="form-control"
                />
                {errors.phone && (
                  <p className="error-message">{errors.phone.message}</p>
                )}
              </Col>

              <Col className="px-2 py-1" lg={24}>
                <label>Email Address:</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="form-control"
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </Col>

              {/* <Col className='px-2 py-1' lg={24}>
                <label>Position Applying For:</label>
                <input
                  type="text"
                  disabled
                  value={selectedJob ? selectedJob.jobTitle : ''}
                  className='form-control'
                />
              </Col> */}
              <Col className="px-2 py-1" lg={24}>
                <label>Position Applying For:</label>
                <input
                  type="text"
                  value={selectedJob ? selectedJob.jobTitle : ""}
                  disabled
                  className="form-control"
                />
                <input
                  type="hidden"
                  {...register("jobTitle", {
                    required: "Job title is required",
                  })}
                  value={selectedJob ? selectedJob.jobTitle : ""}
                />
              </Col>

              <Col className="px-2 py-1" lg={24}>
                <label>Upload Resume:</label>
                <input
                  type="file"
                  {...register("resume", { required: "Resume is required" })}
                  onChange={handleFileChange}
                  className="form-control"
                />
                {errors.resume && (
                  <p className="error-message">{errors.resume.message}</p>
                )}
              </Col>
            </Row>
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="career-container">
        <section className="employee-testimonials">
          <h2>Why Our Employees Love Working Here</h2>
          <blockquote>
            "<span style={{ color: "red" }}>Vilu Genius </span>Loans has been an
            amazing place to grow my career. The team is supportive, and I love
            the work we do." – Prakash, Loan Specialist
          </blockquote>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Carrier;
