import { Select } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const { Option } = Select;

function CreateLead() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  //   const id = localStorage.getItem("id");
  //   const userType = localStorage.getItem("userType");
  const category = watch("employeeCategory");

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//   };
  //   const [category, setCategory] = useState(""); // State for Employee Category
  //   const [subCategory, setSubCategory] = useState(""); // State for Sub-category

  const [inputs, setInputs] = useState({
    empno: "",
    designation: "",
    firstname: "",
    lastname: "",
    email: "",
    // password: "",
    // confirmPassword: "",
    contactNumber: "",
    Manager: "",
    Branch: "",
    dateOfJoining: "",
  });

  const {
    empno,
    designation,
    firstname,
    lastname,
    contactNumber,
    email,
    // password,
    // confirmPassword,
    Manager,
    Branch,
    dateOfJoining,
  } = inputs;

const onSubmit = async (data) => {
  const formData = {
    empno: data.empno,
    firstname: data.firstname,
    lastname: data.lastname,
    contactNumber: data.contactNumber,
    email: data.email,
    dateOfJoining: data.dateOfJoining,
    manager: data.manager,
    branch: data.branch,
    userType: data.userType,
    employeeCategory: data.employeeCategory,
    subCategory: data.subCategory, 
  };

  try {
    // Make the API call
    const response = await axios.post("http://localhost:5000/signup/register", formData);

    
      toast.success("Employee added successfully!");
      reset(); 
    
  } catch (error) {
    console.error("Error submitting the form:", error);
    toast.error("An error occurred while submitting the form. Please try again.");
  }
};

  //   const handleCategoryChange = (e) => {
  //     setCategory(e.target.value);
  //     if (e.target.value !== "IncomeTax") {
  //       setSubCategory(""); // Reset sub-category if category is not Income Tax
  //     }
  //   };

  //   const handleSubCategoryChange = (e) => {
  //     setSubCategory(e.target.value);
  //   };

  //   const onSubmit = async (data) => {
  //     const details = {
  //       firstname: data.firstname,
  //       lastname: data.lastname,
  //       userType: userType,
  //       userId: id,
  //       contactNumber: data.contactNumber,
  //       email: data.email,
  //       aadhar: data.aadhar,
  //       purpose: data.purpose,
  //       amount: data.amount,
  //       howimidiate: data.howimidiate,
  //       previouslyapplied: data.previouslyapplied,
  //       panno: data.panno,
  //     };
  //     const detail = {
  //       userType: "user",
  //       firstname: data.firstname,
  //       lastname: data.lastname,
  //       userId: id,
  //       contactNumber: data.contactNumber,
  //       email: data.email,
  //     };
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:5000/lead/createlead`,
  //         details
  //       );
  //       const res = await axios.post(
  //         `http://localhost:5000/signup/register`,
  //         detail
  //       );
  //       toast.success("Form submitted successfully");
  //     } catch (error) {
  //       console.error("Error:", error.message);
  //       toast.error("An error occurred while submitting the form");
  //     }
  //   };
  return (
    <div>
      <Container style={{ marginTop: "5%" }}>
        <form>
          <h4 style={{ textAlign: "center", color: "#00397f" }}>
            <b>Add Employee</b>
          </h4>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Employee No:</label>
              <input
                className="inputcolumn-ourProfile"
                type="text"
                name="empno"
                {...register("empno", { required: true })}
              />
              {errors.empno && (
                <p className="text-danger"> Employee No is required</p>
              )}
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Services:</label>
                <Controller
                  name="userType"
                  control={control}
                  defaultValue="TaxEmployee"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                     {...field} 
                     disabled
                      className="inputcolumn_drp"
                      >
                      <Option value="LoanEmployee">Loan Employee</Option>
                      <Option value="TaxEmployee">Tax Employee</Option>
                      <Option value="InsuranceEmployee">
                        Insurance Employee
                      </Option>
                      <Option value="StockMarket">Stock Market</Option>
                    </Select>
                  )}
                />
                {errors.userType && (
                  <p className="text-danger">Service is required</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">
                  Employee Category:
                </label>
                <Controller
                  name="employeeCategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                     {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Employee Category"
                      onChange={(value) => {    
                        field.onChange(value);
                        setValue("employeeCategory", value);
                      }}
                      >
                      <Option value="IncomeTax">Income Tax</Option>
                      <Option value="Tds&TcsServices">
                        {" "}
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
              <label className="vendorpage_labelCss">First Name:</label>
              <input
                className="inputcolumn-ourProfile"
                type="text"
                name="firstname"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <p className="text-danger"> First Name is required</p>
              )}
            </Col>

            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Last Name:</label>
              <input
                className="inputcolumn-ourProfile"
                type="text"
                name="lastname"
                {...register("lastname", { required: true })}
              />
              {errors.lastname && (
                <p className="text-danger"> Last Name is required</p>
              )}
            </Col>

            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Contact Number:</label>
              <input
                className="inputcolumn-ourProfile"
                type="number"
                name="contactNumber"
                {...register("contactNumber", { required: true })}
              />
              {errors.contactNumber && (
                <p className="text-danger"> Contact Number is required</p>
              )}
            </Col>

            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Email Address:</label>
              <input
                className="inputcolumn-ourProfile"
                type="email"
                name="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-danger"> Email Id is required</p>
              )}
            </Col>

            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Date of Joining:</label>
              <input
                className="inputcolumn-ourProfile"
                type="date"
                name="email"
                {...register("dateOfJoining", { required: true })}
              />
              {errors.dateOfJoining && (
                <p className="text-danger"> Joining Date is required</p>
              )}
            </Col>

            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Reporting Manager:</label>
              <input
                className="inputcolumn-ourProfile"
                type="text"
                name="manager"
                {...register("manager", { required: true })}
              />
              {errors.manager && (
                <p className="text-danger"> Manager Name is required</p>
              )}
            </Col>

            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Reporting Branch:</label>
              <input
                className="inputcolumn-ourProfile"
                type="text"
                name="branch"
                {...register("branch", { required: true })}
              />
              {errors.branch && (
                <p className="text-danger"> Branch Name is required</p>
              )}
            </Col>
          </Row>

          <button
            type="submit"
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/6"
            style={{
              backgroundColor: "rgb(0 57 127 / var(--tw-bg-opacity))",
            }}
          >
            Save
          </button>
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
