import { Select } from "antd";
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../../Api";
import Footer from "../../Layout/Footer";
import Header from "../../Layout/Header";

const { Option } = Select;

function HomeInsuranceForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const id = localStorage.getItem("regid");
  const userType = localStorage.getItem("role");
  const referCode = localStorage.getItem("referCode");

  const onSubmit = async (data) => {
    const details = {
      referCode: referCode || "",

      userId: id,
      userType: userType,
      firstname: data.firstname,
      lastname: data.lastname,
      contactNumber: data.contactNumber,
      email: data.email,
      aadhar: data.aadhar,
      panno: data.panno,
      gst: data.gst,
      policyTerm: data.policyTerm,
      PolicyType: data.PolicyType,
      VehicleType: data.VehicleType,
      annualIncome: data.annualIncome,
      sumAssured: data.sumAssured,
    };
    // const detail = {
    //   userType: "user",
    //   firstname: data.firstname,
    //   lastname: data.lastname,
    //   userId: id,
    //   contactNumber: data.contactNumber,
    //   email: data.email,
    // };
    try {
      // const res = await Api.post(`/signup/register`, detail);

      const response = await Api.post(
        `/insuranceManagement/createinsuranceManagement`,
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
      <Header />
      <br />

      <Container style={{ marginTop: "5%" }}>
        <form>
          <h4
            style={{ textAlign: "center", color: "#00397f", marginTop: "15px" }}
          >
            <b>Insurance mangement</b>
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

            {/* <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Policy Type</label>
                <Controller
                  name="PolicyType"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Gender"
                    >
                      <Option value="Life Insurance">Life Insurance</Option>
                      <Option value="Health Insurance">Health Insurance</Option>
                      <Option value="Vehicle Insurance">
                        Vehicle Insurance
                      </Option>
                    </Select>
                  )}
                />
                {errors.PolicyType && (
                  <p className="text-danger">Policy Type is required</p>
                )}
              </div>
            </Col> */}
<Col xs={12} md={6} lg={4}>
  <div>
    <label className="vendorpage_labelCss">Policy Type</label>
    <Controller
      name="PolicyType"
      control={control}
      defaultValue=""
      rules={{ required: true }}
      render={({ field }) => (
        <Select
          {...field}
          className="inputcolumn_drp"
          placeholder="Select Policy Type"
          onChange={(value) => {
            field.onChange(value);
            setValue("VehicleType", ""); // Reset vehicle type if policy type changes
          }}
        >
          <Option value="Life Insurance">Life Insurance</Option>
          <Option value="Health Insurance">Health Insurance</Option>
          <Option value="Vehicle Insurance">Vehicle Insurance</Option>
        </Select>
      )}
    />
    {errors.PolicyType && (
      <p className="text-danger">Policy Type is required</p>
    )}
  </div>
</Col>


{watch("PolicyType") === "Vehicle Insurance" && (
  <Col xs={12} md={6} lg={4}>
    <div>
      <label className="vendorpage_labelCss">Vehicle Type</label>
      <Controller
        name="VehicleType"
        control={control}
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => (
          <Select {...field} className="inputcolumn_drp" placeholder="Select Vehicle Type">
            <Option value="Bike Insurance">Bike Insurance</Option>
            <Option value="Car Insurance">Car Insurance</Option>
          </Select>
        )}
      />
      {errors.VehicleType && (
        <p className="text-danger">Vehicle Type is required</p>
      )}
    </div>
  </Col>
)}

            {/* Policy Term */}
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Policy Term</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  name="policyTerm"
                  {...register("policyTerm", { required: true })}
                  placeholder="Policy Term (years)"
                />
                {errors.policyTerm && (
                  <p className="text-danger">Policy Term is required</p>
                )}
              </div>
            </Col>

            {/* Sum Assured */}
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Sum Assured</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  name="sumAssured"
                  {...register("sumAssured", { required: true })}
                  placeholder="Sum Assured"
                />
                {errors.sumAssured && (
                  <p className="text-danger">Sum Assured is required</p>
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
      <Footer />
    </div>
  );
}

export default HomeInsuranceForm;
