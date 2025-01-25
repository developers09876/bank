import { Select } from "antd";
import axios from "axios";
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const { Option } = Select;

function CreateLead() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const id = localStorage.getItem("id");
  const userType = localStorage.getItem("role");

  const onSubmit = async (data) => {
    const details = {
      firstname: data.firstname,
      lastname: data.lastname,
      userId: id,
      userType: userType,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhar: data.aadhar,
      purpose: data.purpose,
      amount: data.amount,
      howimidiate: data.howimidiate,
      previouslyapplied: data.previouslyapplied,
      panno: data.panno,
    };
    const detail = {
      userType: "user",
      firstname: data.firstname,
      lastname: data.lastname,
      userId: id,
      contactNumber: data.contactNumber,
      email: data.email,
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/signup/register`,
        detail
      );
      const response = await axios.post(
        `http://localhost:5000/lead/createlead`,
        details
      );

      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error);

      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while submitting the form";
      toast.error(errorMessage);
    }
  };
  return (
    <div>
      <Container style={{ marginTop: "5%" }}>
        <form>
          <h4 style={{ textAlign: "center", color: "#00397f" }}>
            <b>Add Lead</b>
          </h4>
          <Row className="px-2 py-3">
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss"> First Name</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  name="firstname"
                  {...register("firstname", { required: true })}
                  placeholder="Name"
                />
                {errors.firstname && (
                  <p className="text-danger"> First Name is required</p>
                )}
              </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Last Name</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  name="lastname"
                  {...register("lastname", { required: true })}
                  placeholder="Name"
                />
                {errors.lastname && (
                  <p className="text-danger">Last Name is required</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Email Id</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="email"
                  name="email"
                  placeholder="Email Id"
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid Email Address",
                    },
                  })}
                />
                {errors.email && <p className="text-danger">Enter Email Id</p>}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Phone Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  name="contactNumber"
                  {...register("contactNumber", {
                    required: true,
                    pattern: {
                      // value: /^[0-9]{10}$/,
                      message: "Invalid Phone Number",
                    },
                  })}
                  placeholder="Phone Number"
                />
                {errors.contactNumber && (
                  <p className="text-danger">Enter Phone number</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Aadhaar Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  name="aadhar"
                  {...register("aadhar", {
                    required: true,
                    pattern: {
                      // value: /^[0-9]{12}$/,
                      message: "Aadhaar must be 12 digits",
                    },
                  })}
                  placeholder="Aadhaar Number"
                />
                {errors.aadhar && (
                  <p className="text-danger">Enter Aadhaar Number</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">PAN Card Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  name="panno"
                  {...register("panno", {
                    required: true,
                    pattern: {
                      // value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Invalid PAN Card Number",
                    },
                  })}
                  placeholder="PAN Number"
                  onInput={(e) => {
                    e.target.value = e.target.value.toUpperCase();
                  }}
                />
                {errors.panno && (
                  <p className="text-danger">Enter PAN card number</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Loan Type</label>
                <Controller
                  name="loan type"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Loan Type"
                    >
                      <Option value="">Select Purpose</Option>
                      <Option value="personal">Personal</Option>
                      <Option value="business">Business</Option>
                      <Option value="education">Education</Option>
                      <Option value="home">Home</Option>
                    </Select>
                  )}
                />
                {errors.purpose && (
                  <p className="text-danger">Select the loan type</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Loan Amount</label>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Loan Amount"
                    >
                      <Option value="">Select Loan Amount</Option>
                      <Option value="0-5Lakhs">0-5Lakhs</Option>
                      <Option value="5-10Lakhs">5 - 10 Lakhs</Option>
                      <Option value="10-15Lakhs">10-15Lakhs</Option>
                      <Option value="15-20Lakhs">15 - 20 Lakhs</Option>
                      <Option value="20-25Lakhs">20 - 25 Lakhs</Option>
                      <Option value="25-30Lakhs">25 - 30 Lakhs</Option>
                      <Option value="30-40Lakhs">30 - 40 Lakhs</Option>
                      <Option value="40-50Lakhs">40 - 50 Lakhs</Option>
                      <Option value="50-60Lakhs">50 - 60 Lakhs</Option>
                      <Option value="60-70Lakhs">60 - 70 Lakhs</Option>
                      <Option value="70-80Lakhs">70 - 80 Lakhs</Option>
                      <Option value="80-90Lakhs">80 - 90 Lakhs</Option>
                      <Option value="90-100Lakhs">90 Lakhs - 1 Crore</Option>
                      <Option value="above1Crore">Above 1 Crore</Option>
                    </Select>
                  )}
                />
                {errors.amount && (
                  <p className="text-danger">Select Loan Amount</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">
                  How Immediately You Want Loan
                </label>
                <Controller
                  name="howimidiate"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Duration"
                    >
                      <Option value="">Select Dueration</Option>
                      <Option value="immediately">Immediately</Option>
                      <Option value="1month">Within 1 Month</Option>
                      <Option value="3months">Within 3 Months</Option>
                      <Option value="6months">Within 6 Months</Option>
                    </Select>
                  )}
                />
                {errors.howimidiate && (
                  <p className="text-danger">Select Dueration</p>
                )}
              </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">
                  Previously Applied for Loan?
                </label>
                <div>
                  <input
                    type="radio"
                    id="yes"
                    name="previouslyapplied"
                    value="yes"
                    {...register("previouslyapplied", { required: true })}
                  />
                  &nbsp;&nbsp;
                  <label htmlFor="yes" className="mr-3">
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="no"
                    name="previouslyapplied"
                    value="no"
                    {...register("previouslyapplied", { required: true })}
                  />
                  &nbsp;&nbsp;
                  <label htmlFor="no">No</label>
                </div>
                {errors.previouslyapplied && (
                  <p className="text-danger">Please select an option.</p>
                )}
              </div>
            </Col>
          </Row>
          <div className="upgrade_column mb-3">
            <Button
              className="button1 mx-2"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              style={{ backgroundColor: "#00397f", color: "white" }}
            >
              Submit
            </Button>
            <Button
              className="button1 mx-2"
              // type="button"
              variant="secondary"
              onClick={() => reset()}
              // style={{ backgroundColor: '#d9534f', color: 'white' }}
            >
              Reset
            </Button>
          </div>
        </form>
        <ToastContainer />
      </Container>
    </div>
  );
}

export default CreateLead;
