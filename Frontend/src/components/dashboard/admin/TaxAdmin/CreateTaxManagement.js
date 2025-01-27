import { Select } from "antd";
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../../../Api";
const { Option } = Select;

function TaxmangementAdmin() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const category = watch("employeeCategory");

  const id = localStorage.getItem("regid");
  const userType = localStorage.getItem("role");

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
      incomeTaxStatus: data.incomeTaxStatus,
      businessType: data.businessType,
      annualIncome: data.annualIncome,
      taxPaid: data.taxPaid,
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
      const res = await Api.post(`/signup/register`, detail);

      const response = await Api.post(
        `/taxManagement/createTaxManagement`,
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
            <b>Tax mangement</b>
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
                {errors.phone && (
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
                              name="taxtype"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  className="inputcolumn_drp"
                                  placeholder="Select taxtype"
                                  onChange={(value) => {
                                    field.onChange(value);
                                    setValue("taxtype", value);
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
                            {errors.employeeCategory && (
                              <p className="text-danger">Employee category is required</p>
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
                                    <Option value="Company">Company</Option>
                                    <Option value="Individual">Individual</Option>
                                    <Option value="Firm">Firm</Option>
                                    <Option value="Other">Other</Option>
                                  </Select>
                                )}
                              />
                              {errors.subCategory && (
                                <p className="text-danger">Sub-category is required</p>
                              )}
                            </div>
                          </Col>
                        )}

            <Col xs={12} md={6} lg={4}>
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
            </Col>

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
                      <Option value="soleProprietorship">
                        Sole Proprietorship
                      </Option>
                      <Option value="partnership">Partnership</Option>
                      <Option value="privateLimited">Private Limited</Option>
                      <Option value="publicLimited">Public Limited</Option>
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

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">
                  Tax Paid in Last Year
                </label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  name="taxPaid"
                  {...register("taxPaid", { required: true })}
                  placeholder="Tax Paid"
                />
                {errors.taxPaid && (
                  <p className="text-danger">Enter tax paid last year</p>
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

export default TaxmangementAdmin;
