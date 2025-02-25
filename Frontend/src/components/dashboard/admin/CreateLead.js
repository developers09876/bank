// import { Select } from "antd";
// import axios from "axios";
// import React from "react";
// import { Col, Container, Row, Button } from "react-bootstrap";
// import { Controller, useForm } from "react-hook-form";
// import { toast, ToastContainer } from "react-toastify";

// const { Option } = Select;

// function CreateLead() {
//   const {
//     register,
//     handleSubmit,
//     reset,
//     control,
//     formState: { errors },
//   } = useForm();

//   const id = localStorage.getItem("id");
//   const userType = localStorage.getItem("role");

//   const onSubmit = async (data) => {
//     const details = {
//       firstname: data.firstname,
//       lastname: data.lastname,
//       userId: id,
//       userType: userType,
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
//       const res = await axios.post(
//         `http://localhost:5000/signup/register`,
//         detail
//       );
//       const response = await axios.post(
//         `http://localhost:5000/lead/createlead`,
//         details
//       );

//       toast.success("Form submitted successfully");
//     } catch (error) {
//       console.error("Error:", error);

//       const errorMessage =
//         error.response?.data?.error ||
//         "An error occurred while submitting the form";
//       toast.error(errorMessage);
//     }
//   };
//   return (
//     <div>
//       <Container style={{ marginTop: "5%" }}>
//         <form>
//           <h4 style={{ textAlign: "center", color: "#00397f" }}>
//             <b>Add Lead</b>
//           </h4>
//           <Row className="px-2 py-3">
//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss"> First Name</label>
//                 <input
//                   className="inputcolumn-ourProfile"
//                   type="text"
//                   name="firstname"
//                   {...register("firstname", { required: true })}
//                   placeholder="Name"
//                 />
//                 {errors.firstname && (
//                   <p className="text-danger"> First Name is required</p>
//                 )}
//               </div>
//             </Col>
//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">Last Name</label>
//                 <input
//                   className="inputcolumn-ourProfile"
//                   type="text"
//                   name="lastname"
//                   {...register("lastname", { required: true })}
//                   placeholder="Name"
//                 />
//                 {errors.lastname && (
//                   <p className="text-danger">Last Name is required</p>
//                 )}
//               </div>
//             </Col>

//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">Email Id</label>
//                 <input
//                   className="inputcolumn-ourProfile"
//                   type="email"
//                   name="email"
//                   placeholder="Email Id"
//                   {...register("email", {
//                     required: true,
//                     pattern: {
//                       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                       message: "Invalid Email Address",
//                     },
//                   })}
//                 />
//                 {errors.email && <p className="text-danger">Enter Email Id</p>}
//               </div>
//             </Col>

//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">Phone Number</label>
//                 <input
//                   className="inputcolumn-ourProfile"
//                   type="number"
//                   name="contactNumber"
//                   {...register("contactNumber", {
//                     required: true,
//                     pattern: {
//                       // value: /^[0-9]{10}$/,
//                       message: "Invalid Phone Number",
//                     },
//                   })}
//                   placeholder="Phone Number"
//                 />
//                 {errors.contactNumber && (
//                   <p className="text-danger">Enter Phone number</p>
//                 )}
//               </div>
//             </Col>

//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">Aadhaar Number</label>
//                 <input
//                   className="inputcolumn-ourProfile"
//                   type="number"
//                   name="aadhar"
//                   {...register("aadhar", {
//                     required: true,
//                     pattern: {
//                       // value: /^[0-9]{12}$/,
//                       message: "Aadhaar must be 12 digits",
//                     },
//                   })}
//                   placeholder="Aadhaar Number"
//                 />
//                 {errors.aadhar && (
//                   <p className="text-danger">Enter Aadhaar Number</p>
//                 )}
//               </div>
//             </Col>

//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">PAN Card Number</label>
//                 <input
//                   className="inputcolumn-ourProfile"
//                   type="text"
//                   name="panno"
//                   {...register("panno", {
//                     required: true,
//                     pattern: {
//                       // value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
//                       message: "Invalid PAN Card Number",
//                     },
//                   })}
//                   placeholder="PAN Number"
//                   onInput={(e) => {
//                     e.target.value = e.target.value.toUpperCase();
//                   }}
//                 />
//                 {errors.panno && (
//                   <p className="text-danger">Enter PAN card number</p>
//                 )}
//               </div>
//             </Col>

//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">Loan Type</label>
//                 <Controller
//                   name="loan type"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       className="inputcolumn_drp"
//                       placeholder="Select Loan Type"
//                     >
//                       <Option value="">Select Purpose</Option>
//                       <Option value="personal">Personal</Option>
//                       <Option value="business">Business</Option>
//                       <Option value="education">Education</Option>
//                       <Option value="home">Home</Option>
//                     </Select>
//                   )}
//                 />
//                 {errors.purpose && (
//                   <p className="text-danger">Select the loan type</p>
//                 )}
//               </div>
//             </Col>

//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">Loan Amount</label>
//                 <Controller
//                   name="amount"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       className="inputcolumn_drp"
//                       placeholder="Select Loan Amount"
//                     >
//                       <Option value="">Select Loan Amount</Option>
//                       <Option value="0-5Lakhs">0-5Lakhs</Option>
//                       <Option value="5-10Lakhs">5 - 10 Lakhs</Option>
//                       <Option value="10-15Lakhs">10-15Lakhs</Option>
//                       <Option value="15-20Lakhs">15 - 20 Lakhs</Option>
//                       <Option value="20-25Lakhs">20 - 25 Lakhs</Option>
//                       <Option value="25-30Lakhs">25 - 30 Lakhs</Option>
//                       <Option value="30-40Lakhs">30 - 40 Lakhs</Option>
//                       <Option value="40-50Lakhs">40 - 50 Lakhs</Option>
//                       <Option value="50-60Lakhs">50 - 60 Lakhs</Option>
//                       <Option value="60-70Lakhs">60 - 70 Lakhs</Option>
//                       <Option value="70-80Lakhs">70 - 80 Lakhs</Option>
//                       <Option value="80-90Lakhs">80 - 90 Lakhs</Option>
//                       <Option value="90-100Lakhs">90 Lakhs - 1 Crore</Option>
//                       <Option value="above1Crore">Above 1 Crore</Option>
//                     </Select>
//                   )}
//                 />
//                 {errors.amount && (
//                   <p className="text-danger">Select Loan Amount</p>
//                 )}
//               </div>
//             </Col>

//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">
//                   How Immediately You Want Loan
//                 </label>
//                 <Controller
//                   name="howimidiate"
//                   control={control}
//                   defaultValue=""
//                   rules={{ required: true }}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       className="inputcolumn_drp"
//                       placeholder="Select Duration"
//                     >
//                       <Option value="">Select Dueration</Option>
//                       <Option value="immediately">Immediately</Option>
//                       <Option value="1month">Within 1 Month</Option>
//                       <Option value="3months">Within 3 Months</Option>
//                       <Option value="6months">Within 6 Months</Option>
//                     </Select>
//                   )}
//                 />
//                 {errors.howimidiate && (
//                   <p className="text-danger">Select Dueration</p>
//                 )}
//               </div>
//             </Col>
//             <Col xs={12} md={6} lg={4}>
//               <div>
//                 <label className="vendorpage_labelCss">
//                   Previously Applied for Loan?
//                 </label>
//                 <div>
//                   <input
//                     type="radio"
//                     id="yes"
//                     name="previouslyapplied"
//                     value="yes"
//                     {...register("previouslyapplied", { required: true })}
//                   />
//                   &nbsp;&nbsp;
//                   <label htmlFor="yes" className="mr-3">
//                     Yes
//                   </label>
//                   <input
//                     type="radio"
//                     id="no"
//                     name="previouslyapplied"
//                     value="no"
//                     {...register("previouslyapplied", { required: true })}
//                   />
//                   &nbsp;&nbsp;
//                   <label htmlFor="no">No</label>
//                 </div>
//                 {errors.previouslyapplied && (
//                   <p className="text-danger">Please select an option.</p>
//                 )}
//               </div>
//             </Col>
//           </Row>
//           <div className="upgrade_column mb-3">
//             <Button
//               className="button1 mx-2"
//               type="submit"
//               onClick={handleSubmit(onSubmit)}
//               style={{ backgroundColor: "#00397f", color: "white" }}
//             >
//               Submit
//             </Button>
//             <Button
//               className="button1 mx-2"
//               // type="button"
//               variant="secondary"
//               onClick={() => reset()}
//               // style={{ backgroundColor: '#d9534f', color: 'white' }}
//             >
//               Reset
//             </Button>
//           </div>
//         </form>
//         <ToastContainer />
//       </Container>
//     </div>
//   );
// }

// export default CreateLead;

import { Select } from "antd";
import axios from "axios";
import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
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

  const category = watch("taxType");
  const inscategory = watch("insuranceType");
  const serviceType = watch("serviceType");
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");

  const onSubmit = async (data) => {
    const details = {
      firstname: data.firstname,
      lastname: data.lastname,
      userId: id,
      userType: userType,
      contactNumber: data.contactNumber,
      alternumber: data.alternumber,
      email: data.email,
      aadhar: data.aadhar,
      purpose: data.purpose,
      amount: data.amount,
      howimidiate: data.howimidiate,
      previouslyapplied: data.previouslyapplied,
      panno: data.panno,
      insuranceType: data.insuranceType,
      PolicyTerm: data.PolicyTerm,
      sumAssured: data.sumAssured,
      incomeTaxStatus: data.incomeTaxStatus,
      taxType: data.taxType,
      businessType: data.businessType,
      serviceType: data.serviceType,
      subCategory: data.subCategory,
      VehicleType: data.VehicleType,
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
      // const res = await axios.post(
      //   `http://localhost:5000/signup/register`,
      //   detail
      // );
      const response = await axios.post(
        `http://localhost:5000/lead/createlead`,
        details
      );

      toast.success("Form submitted successfully");
      setTimeout(() => navigate(-1), 3000);
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
      <Container style={{ marginTop: "6%" }}>
        <div className="w-full border bg-white shadow-md rounded">
          <form>
            <h4
              style={{
                textAlign: "center",
                marginTop: "15px",
                color: "#00397f",
              }}
            >
              <b>Add Lead</b>
            </h4>
            <Row className="px-3 py-3">
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

              {/* <Col xs={12} md={6} lg={4}>
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
            </Col> */}
              <Col xs={12} md={6} lg={4}>
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
              </Col>
              {/* <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Phone Number</label>
                <input
                  className="inputcolumn-ourProfile"
                  type="number"
                  name="contactNumber"
                  {...register("contactNumber", {
                    required: true,
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid Phone Number",
                    },
                  })}
                  placeholder="Phone Number"
                />
                {errors.contactNumber && (
                  <p className="text-danger">Enter Phone number</p>
                )}
              </div>
            </Col> */}
              <Col xs={12} md={6} lg={4}>
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
              </Col>
              <Col xs={12} md={6} lg={4}>
                <div>
                  <label className="vendorpage_labelCss">
                    {" "}
                    Alter Phone Number
                  </label>
                  <input
                    className="inputcolumn-ourProfile"
                    type="text"
                    name="alternumber"
                    {...register("alternumber", {
                      required: "phone number is required",
                      minLength: {
                        value: 10,
                        message: "phone number must be exactly 10 digits",
                      },
                      maxLength: {
                        value: 10,
                        message: "phone number must be exactly 10 digits",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message:
                          "Only numbers are allowed (10 digits required)",
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
                  {errors.alternumber && (
                    <p className="text-red-500">{errors.alternumber.message}</p>
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
                  <label className="vendorpage_labelCss">Service Type:</label>
                  <Controller
                    name="serviceType"
                    control={control}
                    // defaultValue="InsuranceEmployee"
                    value={serviceType}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="inputcolumn_drp"
                        placeholder="Select Service Type"
                      >
                        <Option value="LoanEmployee">Loan </Option>
                        <Option value="TaxEmployee">Tax </Option>
                        <Option value="InsuranceEmployee">Insurance</Option>
                        <Option value="StockMarket">Stock Market</Option>
                      </Select>
                    )}
                  />
                  {errors.serviceType && (
                    <p className="text-danger">Service is required</p>
                  )}
                </div>
              </Col>
              {watch("serviceType") === "LoanEmployee" && (
                <>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Loan Type</label>
                      <Controller
                        name="purpose"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            placeholder="Select Purpose of Loan"
                          >
                            <Option value="">Select Purpose</Option>
                            <Option value="Home Loan">
                              Home Loan( TopUp )
                            </Option>
                            <Option value="Vehicle Loan">Vehicle Loan</Option>
                            <Option value="Business Loan">
                              Business Loan( TopUp )
                            </Option>
                            <Option value="Loan Transfer">
                              Loan Transfer( BT TopUp )
                            </Option>
                            <Option value="LAP">
                              LAP( Loan against to property )
                            </Option>
                            <Option value="Personal Loan">Personal Loan</Option>
                            <Option value="Construction Loan">
                              Construction Loan
                            </Option>
                          </Select>
                        )}
                      />
                      {errors.purpose && (
                        <p className="text-danger">
                          Select the purpose of loan
                        </p>
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
                            <Option value="10-15Lakhs">10 - 15Lakhs</Option>
                            <Option value="15-20Lakhs">15 - 20 Lakhs</Option>
                            <Option value="20-25Lakhs">20 - 25 Lakhs</Option>
                            <Option value="25-50Lakhs">25 - 50 Lakhs</Option>
                            <Option value="50-75Lakhs">50 - 75 Lakhs</Option>
                            <Option value="75-1Crore">
                              75 Lakhs - 1 Crore
                            </Option>
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
                </>
              )}
              {watch("serviceType") === "InsuranceEmployee" && (
                <>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Category:</label>
                      <Controller
                        name="insuranceType"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            placeholder="Select insuranceType"
                            onChange={(value) => {
                              field.onChange(value);
                              setValue("insuranceType", value);
                            }}
                          >
                            <Option value="">Select Category</Option>
                            <Option value="Health Insurance">
                              Health Insurance
                            </Option>

                            <Option value="Life Insurance">
                              Life Insurance
                            </Option>
                            <Option value="Vehicle Insurance">
                              Vehicle Insurance
                            </Option>
                          </Select>
                        )}
                      />
                      {errors.insuranceType && (
                        <p className="text-danger">
                          Insurance category is required
                        </p>
                      )}
                    </div>
                  </Col>
                  {inscategory === "Vehicle Insurance" && (
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Vehicle Type
                        </label>
                        <Controller
                          name="VehicleType"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              // placeholder="Select Vehicle Type"
                            >
                              <Option value="">Select vehicle type</Option>
                              <Option value="Bike Insurance">
                                Bike Insurance
                              </Option>
                              <Option value="Car Insurance">
                                Car Insurance
                              </Option>
                              <Option value=" Heavy vehicle Insurance">
                                Heavy vehicle Insurance
                              </Option>
                              <Option value="Used Vechicle Insurance">
                                Used Vechicle Insurance
                              </Option>
                              <Option value="Other Vechicle Insurance">
                                Other Vechicle Insurance
                              </Option>
                            </Select>
                          )}
                        />
                        {errors.VehicleType && (
                          <p className="text-danger">
                            Vehicle Type is required
                          </p>
                        )}
                      </div>
                    </Col>
                  )}
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Policy Term</label>
                      <input
                        className="inputcolumn-ourProfile"
                        type="number"
                        name="PolicyTerm"
                        {...register("PolicyTerm", { required: true })}
                        placeholder="Policy Term (years)"
                      />
                      {errors.PolicyTerm && (
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
                </>
              )}
              {watch("serviceType") === "TaxEmployee" && (
                <>
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
                            placeholder="Select Tax Category"
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
                            <Option value="Esi&PfServices">
                              ESI & PF Services
                            </Option>
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
                        <label className="vendorpage_labelCss">
                          Sub Category:
                        </label>
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
                              <Option value="Notice Services">
                                Notice Services
                              </Option>
                            </Select>
                          )}
                        />
                        {errors.subCategory && (
                          <p className="text-danger">
                            Sub-category is required
                          </p>
                        )}
                      </div>
                    </Col>
                  )}
                  {/* Subcategory for GST Services */}
                  {(category === "GSTservices" ||
                    category === "Tds&TcsServices" ||
                    category === "Esi&PfServices") && (
                    <Col xs={12} md={6} lg={4}>
                      <label className="vendorpage_labelCss">
                        Sub Category:
                      </label>
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
                            <Option value="Notice Services">
                              Notice Services
                            </Option>
                          </Select>
                        )}
                      />
                      {errors.subCategory && (
                        <p className="text-danger">Sub-category is required</p>
                      )}
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
                      <label className="vendorpage_labelCss">
                        Business Type
                      </label>
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
                            <Option value="privateLimited">
                              Private Limited
                            </Option>
                            <Option value="publicLimited">
                              Public Limited
                            </Option>
                          </Select>
                        )}
                      />
                      {errors.businessType && (
                        <p className="text-danger">Select business type</p>
                      )}
                    </div>
                  </Col>
                </>
              )}
              <Col xs={12} md={6} lg={4}>
                <div>
                  <label className="vendorpage_labelCss">
                    Previously Applied ?
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
            <div
              className="upgrade_column mb-3"
              style={{ flexDirection: "unset" }}
            >
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
        </div>
      </Container>
    </div>
  );
}

export default CreateLead;
