import { Button, Select } from 'antd'
import { Option } from "antd/lib/mentions";

import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'

function LeadGeneration() {
     const {
        register,
        getValues,
        handleSubmit,
        reset,
        control,
        formState: { errors },
      } = useForm();
    
  return (
    <div>
         <Container style={{ marginTop: "5%" }}>
         <form onSubmit={handleSubmit()}>
        <Row>
                    {/* Full Name */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">Full Name</label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="fullName"
                          {...register("fullName", { required: true })}
                          placeholder="Full Name"
                        />
                        {errors.fullName && (
                          <p className="text-danger">Full Name is required</p>
                        )}
                      </div>
                    </Col>

                    {/* Date of Birth */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Date of Birth
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="date"
                          name="dob"
                          max={new Date().toISOString().split("T")[0]} // Prevent future dates
                          {...register("dob", { required: true })}
                        />
                        {errors.dob && (
                          <p className="text-danger">
                            Date of Birth is required
                          </p>
                        )}
                      </div>
                    </Col>

                    {/* Gender */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">Gender</label>
                        <Controller
                          name="gender"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Gender"
                            >
                              <Option value="Male">Male</Option>
                              <Option value="Female">Female</Option>
                              <Option value="Other">Other</Option>
                            </Select>
                          )}
                        />
                        {errors.gender && (
                          <p className="text-danger">Gender is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Aadhaar Number
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          name="aadhaar"
                          {...register("aadhaar", { required: true })}
                          placeholder="Aadhaar Number"
                        />
                        {errors.aadhaar && (
                          <p className="text-danger">
                            Aadhaar Number is required
                          </p>
                        )}
                      </div>
                    </Col>

                    {/* Contact Information */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Contact Information
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="tel"
                          name="contact"
                          {...register("contact", { required: true })}
                          placeholder="Phone Number"
                        />
                        {errors.contact && (
                          <p className="text-danger">
                            Phone Number is required
                          </p>
                        )}
                      </div>
                    </Col>

                    {/* Residential Address */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Residential Address
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          name="address"
                          {...register("address", { required: true })}
                          placeholder="Residential Address"
                        />
                        {errors.address && (
                          <p className="text-danger">Address is required</p>
                        )}
                      </div>
                    </Col>
                    </Row>
                    <div className="upgrade_column mb-3">
                  <Button className="button1" type="submit">
                    Submit
                  </Button>
                </div>
                    </form>
                    </Container>
    </div>
  )
}

export default LeadGeneration
