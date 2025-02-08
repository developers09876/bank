import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

const CreateJobForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Job Posted:", data);
    const details = {
      jobTitle: data.jobTitle,
      jobType: data.jobType,
      company: data.company,
      location: data.location,
      description: data.description,
      designation: data.designation,
      requirements: data.requirements,
      salary: data.salary,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/job/createjob",
        details
      );
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while submitting the form");
    }
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Job Title</label>
                    <input
                      className="inputcolumn-ourProfile"
                      type="text"
                      {...register("jobTitle", { required: true })}
                      placeholder="Job Title"
                    />
                    {errors.jobTitle && (
                      <p className="text-danger">Job Title is required</p>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Company</label>
                    <input
                      className="inputcolumn-ourProfile"
                      type="text"
                      {...register("company", { required: true })}
                      placeholder="Company"
                    />
                    {errors.company && (
                      <p className="text-danger">Company is required</p>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Role</label>
                    <br />
                    <select
                      className="inputcolumn-ourProfile"
                      {...register("designation", { required: true })}
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
                    {errors.designation && (
                      <p className="text-danger">Designation is required</p>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Location</label>
                    <input
                      className="inputcolumn-ourProfile"
                      type="text"
                      {...register("location", { required: true })}
                      placeholder="Location"
                    />
                    {errors.location && (
                      <p className="text-danger">Location is required</p>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Job Type</label>
                    <select
                      className="inputcolumn-ourProfile"
                      {...register("jobType")}
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
                    <br />
                    <input
                      className="inputcolumn-ourProfile"
                      type="number"
                      {...register("salary", { required: true })}
                      placeholder="Salary"
                    />
                    {errors.salary && (
                      <p className="text-danger">Salary is required</p>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">
                      Job Description
                    </label>
                    <textarea
                      className="inputcolumn-ourProfile"
                      {...register("description", { required: true })}
                      placeholder="Job Description"
                    />
                    {errors.description && (
                      <p className="text-danger">Description is required</p>
                    )}
                  </div>
                </Col>
                <Col xs={12} md={6} lg={4}>
                  <div>
                    <label className="vendorpage_labelCss">Requirements</label>
                    <textarea
                      className="inputcolumn-ourProfile"
                      {...register("requirements", { required: true })}
                      placeholder="Requirements"
                    />
                    {errors.requirements && (
                      <p className="text-danger">Requirements are required</p>
                    )}
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
      <ToastContainer />
    </Container>
  );
};

export default CreateJobForm;
