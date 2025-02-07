import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../../Api";
import { useLocation } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

function InsuranceEditDetails() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { state } = useLocation();
  const record = state?.record;

  useEffect(() => {
    if (record) {
      Object.keys(record).forEach((key) => setValue(key, record[key]));
    }
  }, [record, setValue]);

  const onSubmit = async (data) => {
    if (!record?._id) {
      toast.error("User ID is missing!");
      return;
    }

    const updateDetails = {
      firstname: data.firstname,
      lastname: data.lastname,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhar: data.aadhar,
      panno: data.panno,
      gst: data.gst,
      policyTerm: data.policyTerm,
      PolicyType: data.PolicyType,
      annualIncome: data.annualIncome,
      sumAssured: data.sumAssured,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/insuranceManagement/updateInsurancedetails/${record._id}`,
        updateDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Details updated successfully!");
      } else {
        toast.error("Failed to update details. Try again.");
      }
    } catch (error) {
      console.error("Error updating details:", error);
      toast.error("An error occurred while updating details.");
    }
  };

  return (
    <div>
      <Container style={{ marginTop: "5%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4
            style={{ textAlign: "center", color: "#00397f", marginTop: "15px" }}
          >
            <b> Edit Insurance Management</b>
          </h4>
          <Row className="px-2 py-3">
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">First Name</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  {...register("firstname", { required: true })}
                  placeholder="First Name"
                />
                {errors.firstname && <p className="text-danger">Required</p>}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Last Name</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  {...register("lastname", { required: true })}
                  placeholder="Last Name"
                />
                {errors.lastname && <p className="text-danger">Required</p>}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Email Id</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message:
                        "Enter a valid email address (e.g., name@example.com)",
                    },
                  })}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Phone Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  name="contactNumber"
                  {...register("contactNumber", {
                    required: "Contact number is required",
                    minLength: {
                      value: 10,
                      message: "Contact number must be exactly 10 digits",
                    },
                    maxLength: {
                      value: 10,
                      message: "Contact number must be exactly 10 digits",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Only numbers are allowed (10 digits required)",
                    },
                  })}
                  placeholder="Enter your 10-digit contact number"
                  maxLength={10}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.contactNumber && (
                  <p className="text-red-500">{errors.contactNumber.message}</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Aadhaar Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  {...register("aadhar", { required: true })}
                  placeholder="Aadhaar Number"
                />
                {errors.aadhar && <p className="text-danger">Required</p>}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">PAN Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  {...register("panno", { required: true })}
                  placeholder="PAN Number"
                />
                {errors.panno && <p className="text-danger">Required</p>}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">GST Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  {...register("gst", { required: true })}
                  placeholder="GST Number"
                />
                {errors.gst && <p className="text-danger">Required</p>}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Policy Type</label>
                <Controller
                  name="PolicyType"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} className="inputcolumn_drp">
                      <Option value="Life Insurance">Life Insurance</Option>
                      <Option value="Health Insurance">Health Insurance</Option>
                      <Option value="Vehicle Insurance">
                        Vehicle Insurance
                      </Option>
                    </Select>
                  )}
                />
                {errors.PolicyType && <p className="text-danger">Required</p>}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Annual Income</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  {...register("annualIncome", { required: true })}
                  placeholder="Annual Income"
                />
                {errors.annualIncome && <p className="text-danger">Required</p>}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Sum Assured</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  {...register("sumAssured", { required: true })}
                  placeholder="Sum Assured"
                />
                {errors.sumAssured && <p className="text-danger">Required</p>}
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

export default InsuranceEditDetails;
