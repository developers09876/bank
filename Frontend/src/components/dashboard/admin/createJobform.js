import React, { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    location: "",
    jobType: "Full-Time",
    salary: "",
    description: "",
    requirements: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Job Posted:", formData);
    // Add API call here to submit the form data
  };

  return (
    <Container className="job-post-form">
      <Col xs={12} md={12} lg={12}>
        <div
          className="ourProfileParentdiv"
          style={{ backgroundColor: "white", padding: "10px 20px" }}
        >
          <div style={{ paddingLeft: "10px" }}>
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Job Title</label>
                    <input
                      className="inputcolumn-ourProfile"
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Company</label>
                    <input
                      className="inputcolumn-ourProfile"
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                <div>
                  <label className="vendorpage_labelCss">Role</label>
                  <br/>
                  <select
                    name="designation"
                    className="inputcolumn-ourProfile"
                    // value={designation}
                    // onChange={onChange}
                    required
                  >
                    <option value="" disabled>
                      Select Designation
                    </option>
                    <option value="LoanEmployee">Loan Employee</option>
                    <option value="TaxEmployee">Tax Employee</option>
                    <option value="InsuranceEmployee">
                      Insurance Employee
                    </option>
                  </select>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Location</label>
                    <input
                      className="inputcolumn-ourProfile"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Job Type</label>
                    <select
                      className="inputcolumn-ourProfile"
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Salary</label>
                    <input
                      className="inputcolumn-ourProfile"
                      type="number"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">
                      Job Description
                    </label>
                    <textarea
                      className="inputcolumn-ourProfile"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Requirements</label>
                    <textarea
                      className="inputcolumn-ourProfile"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </Col>
              </Row>
              <button type="submit" className="btn btn-primary mt-3">
                Post Job
              </button>
            </form>
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default CreateJobForm;
