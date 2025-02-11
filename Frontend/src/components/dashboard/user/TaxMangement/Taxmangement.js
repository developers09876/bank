import { Select } from "antd";
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Api from "../../../../Api";
const { Option } = Select;

function Taxmangement() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const category = watch("taxType");
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");

  const onSubmit = async (data) => {
    const details = {
      userId: id,
      userType: userType,
      firstname: data.firstname,
      lastname: data.lastname,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhar: data.aadhar,
      panno: data.panno,
      gst: data.gst,
      taxType: data.taxType,
      subCategory: data.subCategory,
      incomeTaxStatus: data.incomeTaxStatus,
      businessType: data.businessType,
      annualIncome: data.annualIncome,
    };
    console.log("details", details);
    try {
      const response = await Api.post(
        `/taxManagement/createTaxManagement`,
        details
      );

      toast.success("Form submitted successfully");
      setTimeout(() => navigate(-1), 3000);
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while submitting the form");
    }
  };
  return (
    <div>
      <Container style={{ marginTop: "5%" }}>
        <form>
          <h4 style={{ textAlign: "center", color: "#00397f" }}>
            <b>Tax Mangement</b>
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
                <label className="vendorpage_labelCss">GST Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="text"
                  name="gst"
                  {...register("gst", {
                    required: true,
                    pattern: {
                      // value:
                      //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                      message: "Invalid GST Number",
                    },
                  })}
                  placeholder="GST Number"
                />
                {errors.gst && (
                  <p className="text-danger">Enter valid GST Number</p>
                )}
              </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Category:</label>
                <Controller
                  name="taxType"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select tax type"
                      onChange={(value) => {
                        field.onChange(value);
                        setValue("taxType", value);
                      }}
                    >
                      <Option value="">Select Category</Option>
                      <Option value="IncomeTax">Income Tax</Option>
                      <Option value="Tds&TcsServices">
                        TDS / TCS Services
                      </Option>
                      <Option value="GSTservices">GST Services</Option>
                      <Option value="Esi&PfServices">ESI & PF Services</Option>
                    </Select>
                  )}
                />
                {errors.taxType && (
                  <p className="text-danger">Tax category is required</p>
                )}
              </div>
            </Col>

            {category === "IncomeTax" && (
              <Col xs={12} md={6} lg={4}>
                <div>
                  <label className="vendorpage_labelCss">Sub Category:</label>
                  <Controller
                    name="subCategory"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="inputcolumn_drp"
                        placeholder="Select Sub Category"
                        onChange={(value) => {
                          field.onChange(value);
                          setValue("subCategory", value);
                        }}
                      >
                        <Option value="">Select Sub-category</Option>
                        <Option value="Annual return Filling(Individual)">
                          Annual return Filling(Individual)
                        </Option>
                        <Option value="Annual return Filling(Firm/Company)">
                          Annual return Filling(Firm/Company)
                        </Option>
                        <Option value="Company Registration">
                          Company Registration
                        </Option>
                        <Option value="Notice Services">Notice Services</Option>
                      </Select>
                    )}
                  />
                  {errors.subCategory && (
                    <p className="text-danger">Sub-category is required</p>
                  )}
                </div>
              </Col>
            )}
            {/* Subcategory for GST Services */}
            {(category === "GSTservices" ||
              category === "Tds&TcsServices" ||
              category === "Esi&PfServices") && (
              <Col xs={12} md={6} lg={4}>
                <label className="vendorpage_labelCss">Sub Category:</label>
                <Controller
                  name="subCategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Sub Category"
                      onChange={(value) => setValue("subCategory", value)}
                    >
                      <Option value="">Select Sub-category</Option>
                      <Option value="Registration">Registration</Option>
                      <Option value="Monthly Return Filing">
                        Monthly Return Filing
                      </Option>
                      <Option value="Quaterly Return Filing">
                        Quaterly Return Filing
                      </Option>
                      <Option value="Annual Return Filing">
                        Annual Return Filing
                      </Option>
                      <Option value="Notice Services">Notice Services</Option>
                    </Select>
                  )}
                />
                {errors.subCategory && (
                  <p className="text-danger">Sub-category is required</p>
                )}
              </Col>
            )}

            {/* <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">
                  Income Tax Filing Status
                </label>
                <Controller
                  name="incomeTaxStatus"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Status"
                    >
                      <Option value="filed">Filed</Option>
                      <Option value="notFiled">Not Filed</Option>
                    </Select>
                  )}
                />
                {errors.incomeTaxStatus && (
                  <p className="text-danger">Select filing status</p>
                )}
              </div>
            </Col> */}

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Business Type</label>
                <Controller
                  name="businessType"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Business Type"
                    >
                      <Option value="salaryPerson">Salary Person</Option>
                      <Option value="limitedCompany">Limited Company</Option>
                      <Option value="soleProprietorship">
                        Sole Proprietorship
                      </Option>
                      <Option value="selfEmployee">Self Employee</Option>
                      <Option value="partnership">Partnership</Option>
                    </Select>
                  )}
                />
                {errors.businessType && (
                  <p className="text-danger">Select business type</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Annual Income</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  name="annualIncome"
                  {...register("annualIncome", { required: true })}
                  placeholder="Annual Income"
                />
                {errors.annualIncome && (
                  <p className="text-danger">Enter annual income</p>
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

export default Taxmangement;
