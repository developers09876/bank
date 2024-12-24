import React, { useState, useEffect } from "react";
// import Api from "../../Api";
import { Controller, useForm } from "react-hook-form";
import { Row, Col, Button, Container } from "react-bootstrap";
import "../dashboard/user/MyProfile.scss";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axios from "axios";

function LoanForm() {
  const [stateValue, setStateValue] = useState();

  const [districtValue, setDistrictValue] = useState();

  const [data, setData] = useState();

  useEffect(() => {
    getCountry();
  }, []);
  useEffect(() => {
    if (data?.country) {
      getCountry();
    }
  }, [data?.country]);

  useEffect(() => {
    if (data?.country) {
      getState(data.country);
    }
  }, [data?.country]);

  useEffect(() => {
    if (data?.state) {
      getDistrict(data.state);
    }
  }, [data?.state]);

  useEffect(() => {
    if (data?.district) {
      getCity(data.district);
    }
  }, [data?.district]);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    setValue,
    watch,

    control,
    formState: { errors },
  } = useForm();

  const getCountry = () => {};

  const getState = (country_id) => {};

  const getDistrict = (state_id) => {
    setStateValue(state_id);
  };

  const getCity = (districtId) => {
    setDistrictValue(districtId);
  };

  const [selectImage, setSelectImage] = useState(null);
  const [showChildDetails, setShowChildDetails] = useState(false);
  const setImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const userid = localStorage.getItem("id");
  console.log("userid", userid);

  const handleFormSubmit = async (data) => {
    const uploadFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "darshan");
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dzblzw7ll/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const cloudinaryData = await response.json();
        return cloudinaryData.secure_url;
      } catch (error) {
        console.error("File upload failed", error);
        return null;
      }
    };

    const identityProofUrl = data.identityProof[0]
      ? await uploadFile(data.identityProof[0])
      : null;
    const addressProofUrl = data.addressProof[0]
      ? await uploadFile(data.addressProof[0])
      : null;
    const photographsUrl = data.photographs[0]
      ? await uploadFile(data.photographs[0])
      : null;
    const propertyOwnershipProofUrl = data.propertyOwnershipProof[0]
      ? await uploadFile(data.propertyOwnershipProof[0])
      : null;
    const signatureUrl = data.signature[0]
      ? await uploadFile(data.signature[0])
      : null;
    const Details = {
      userid: userid,
      fullName: data.fullName,
      dob: data.dob,
      gender: data.gender,
      maritalStatus: data.MaritalStatus,
      nationality: data.nationality,
      pan: data.pan,
      aadhaar: data.aadhaar,
      contact: data.contact,
      address: data.address,
      annualIncome: data.annualIncome,
      bankAccountDetails: data.bankAccountDetails,
      creditScore: data.creditScore,
      downPayment: data.downPayment,
      employerDetails: data.employerDetails,
      employmentStatus: data.employmentStatus,
      existingLoans: data.existingLoans,
      incomeDetails: data.incomeDetails,
      loanAmount: data.loanAmount,
      loanPurpose: data.loanPurpose,
      propertyDetails: data.propertyDetails,
      identityProof: identityProofUrl,
      addressProof: addressProofUrl,
      photographs: photographsUrl,
      propertyOwnershipProof: propertyOwnershipProofUrl,
      signature: signatureUrl,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/loanform/createloanapplications`,
        Details
      );
      console.log(response, "Form submitted successfully");
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Form submission failed", error);
      toast.error("An error occurred while submitting the form");
    }
  };
  const [children, setChildren] = useState([{ id: Date.now() }]);

  const addChild = () => {
    setChildren([...children, { id: Date.now() }]);
  };

  const removeChild = (id) => {
    setChildren(children.filter((child) => child.id !== id));
  };
  return (
    <div>
      <Header />
      <br />
      <Container style={{ marginTop: "5%" }}>
        <Col xs={12} md={12} lg={12}>
          <div
            className="ourProfileParentdiv"
            style={{ backgroundColor: "white", padding: "10px 20px" }}
          >
            <div style={{ paddingLeft: "10px" }}>
              <center>
                {" "}
                <h4 className="pages-title mt-3 mb-5"> Loan Form</h4>
              </center>

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                  <p className="ourProfile_Heading_div">Personal Details</p>

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

                    {/* Marital Status */}
                    {/* <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Marital Status
                        </label>
                        <Controller
                          name="MaritalStatus"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Gender"
                            >
                              <Option value="Single">Single</Option>
                              <Option value="Married">Married</Option>
                              <Option value="Divorced">Divorced</Option>
                            </Select>
                          )}
                        />
                        {errors.MaritalStatus && (
                          <p className="text-danger">
                            Marital Status is required
                          </p>
                        )}
                      </div>
                    </Col> */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Marital Status
                        </label>
                        <Controller
                          name="MaritalStatus"
                          control={control}
                          defaultValue=""
                          
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Marital Status"
                              onChange={(value) => {
                                field.onChange(value);
                                setValue("MaritalStatus", value); // Update the form state
                              }}
                            >
                              <Option value="Single">Single</Option>
                              <Option value="Married">Married</Option>
                              <Option value="Divorced">Divorced</Option>
                            </Select>
                          )}
                        />
                        {errors.MaritalStatus && (
                          <p className="text-danger">
                            Marital Status is required
                          </p>
                        )}
                      </div>
                    </Col>
                    {watch("MaritalStatus") === "Married" && (
                      <>
                        <Col xs={12} md={6} lg={4}>
                          <div>
                            <label className="vendorpage_labelCss">
                              Wife's / Husbans's Name
                            </label>
                            <Controller
                              name="WifeName"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="text"
                                  className="inputcolumn-ourProfile"
                                  placeholder="Enter Wife's Name"
                                />
                              )}
                            />
                            {errors.WifeName && (
                              <p className="text-danger">
                                Wife's / Husbans's Name is required
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                          <div>
                            <label className="vendorpage_labelCss">
                              Wife's / Husbans's Occupation
                            </label>
                            <Controller
                              name="WifeOccupation"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  className="inputcolumn_drp"
                                  placeholder="Select Occupation"
                                  onChange={(value) => {
                                    field.onChange(value);
                                    setValue("WifeOccupation", value); // Update form state
                                  }}
                                >
                                  <Option value="Working Person">
                                    Working Person
                                  </Option>
                                  <Option value="Housewife">Housewife</Option>
                                </Select>
                              )}
                            />
                            {errors.WifeOccupation && (
                              <p className="text-danger">
                                Wife's / Husbans'sOccupation is required
                              </p>
                            )}
                          </div>
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <div>
                            <label className="vendorpage_labelCss">
                              Children Status
                            </label>
                            <Controller
                              name="ChildrenStatus"
                              control={control}
                              defaultValue=""
                              rules={{ required: true }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  className="inputcolumn_drp"
                                  placeholder="Select Children Status"
                                  onChange={(value) => {
                                    field.onChange(value);
                                    setValue("ChildrenStatus", value); // Update the form state
                                    setShowChildDetails(value === "Yes"); // Show child details if "Yes"
                                  }}
                                >
                                  <Option value="Yes">Yes</Option>
                                  <Option value="No">No</Option>
                                </Select>
                              )}
                            />
                            {errors.ChildrenStatus && (
                              <p className="text-danger">
                                Children Status is required
                              </p>
                            )}
                          </div>
                        </Col>

                        {showChildDetails && (
                          <>
                            {children.map((child, index) => (
                              <>
                                <Col xs={12} md={6} lg={4}>
                                  <div>
                                    <label className="vendorpage_labelCss">
                                      Child Gender
                                    </label>
                                    <Controller
                                      name={`ChildGender_${child.id}`}
                                      control={control}
                                      defaultValue=""
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          className="inputcolumn_drp"
                                          placeholder="Select Child Gender"
                                        >
                                          <Option value="Male">Male</Option>
                                          <Option value="Female">Female</Option>
                                        </Select>
                                      )}
                                    />
                                    {errors[`ChildGender_${child.id}`] && (
                                      <p className="text-danger">
                                        Child Gender is required
                                      </p>
                                    )}
                                  </div>
                                </Col>
                                {console.log("index", index)}

                                <Col xs={12} md={6} lg={4}>
                                  <div>
                                    <label className="vendorpage_labelCss">
                                      Child Name
                                    </label>
                                    <Controller
                                      name={`ChildName_${child.id}`}
                                      control={control}
                                      defaultValue=""
                                      rules={{ required: true }}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="text"
                                          className="inputcolumn-ourProfile"
                                          placeholder="Enter Child Name"
                                        />
                                      )}
                                    />
                                    {errors[`ChildName_${child.id}`] && (
                                      <p className="text-danger">
                                        Child Name is required
                                      </p>
                                    )}
                                  </div>
                                </Col>

                                <Col xs={12} md={6} lg={4}>
                                  <div>
                                    <label className="vendorpage_labelCss">
                                      Child Age
                                    </label>
                                    <Controller
                                      name={`ChildAge_${child.id}`}
                                      control={control}
                                      defaultValue=""
                                      rules={{ required: true, min: 1 }}
                                      render={({ field }) => (
                                        <input
                                          {...field}
                                          type="number"
                                          className="inputcolumn-ourProfile"
                                          placeholder="Enter Child Age"
                                        />
                                      )}
                                    />
                                    {errors[`ChildAge_${child.id}`] && (
                                      <p className="text-danger">
                                        Child Age is required
                                      </p>
                                    )}
                                  </div>
                                </Col>

                                <Col xs={12} md={6} lg={4}>
                                  {index !== 0 && (
                                    <Button
                                      variant="danger"
                                      onClick={() => removeChild(child.id)}
                                      className="mt-3 mr-3"
                                      style={{borderRadius:"10px"}}
                                    >
                                      Remove
                                    </Button>
                                  )}
                                  <Button
                                    variant="primary"
                                    onClick={addChild}
                                    className="mr-3 mt-3"
                                    style={{borderRadius:"10px"}}
                                    
                                  >
                                    Add Child
                                    


                                  </Button>
                                </Col>
                              </>
                            ))}
                          </>
                        )}

                        {/* Conditionally render Designation and Income fields */}
                        {watch("WifeOccupation") === "Working Person" && (
                          <>
                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label className="vendorpage_labelCss">
                                  Wife's / Husbans's Designation
                                </label>
                                <Controller
                                  name="WifeDesignation"
                                  control={control}
                                  defaultValue=""
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Wife's Designation"
                                    />
                                  )}
                                />
                                {errors.WifeDesignation && (
                                  <p className="text-danger">
                                    Wife's / Husbans'sDesignation is required
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label className="vendorpage_labelCss">
                                  Wife's / Husbans's Income
                                </label>
                                <Controller
                                  name="WifeIncome"
                                  control={control}
                                  defaultValue=""
                                  rules={{ required: true }}
                                  render={({ field }) => (
                                    <input
                                      {...field}
                                      type="number"
                                      className="form-control"
                                      placeholder="Enter Wife's Income"
                                    />
                                  )}
                                />
                                {errors.WifeIncome && (
                                  <p className="text-danger">
                                    Wife's / Husbans's Income is required
                                  </p>
                                )}
                              </div>
                            </Col>
                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label className="vendorpage_labelCss">
                                  Upload Your Pay slip
                                </label>
                                <input
                                  className="inputcolumn-ourProfile"
                                  type="file"
                                  accept=".pdf,.jpg,.jpeg,.png"
                                  {...register("coApplicantDocs")}
                                  placeholder="If applicable"
                                />
                              </div>
                            </Col>
                          </>
                        )}
                      </>
                    )}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Nationality
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="nationality"
                          {...register("nationality", { required: true })}
                          placeholder="Nationality"
                        />
                        {errors.nationality && (
                          <p className="text-danger">Nationality is required</p>
                        )}
                      </div>
                    </Col>

                    {/* PAN */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          PAN Number
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="pan"
                          {...register("pan", { required: true })}
                          placeholder="PAN Number"
                        />
                        {errors.pan && (
                          <p className="text-danger">PAN is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Nominee Name
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="Nominee"
                          {...register("Nominee", { required: true })}
                          placeholder="Nominee"
                        />
                        {errors.Nominee && (
                          <p className="text-danger">Nominee is required</p>
                        )}
                      </div>
                    </Col>
                    {/* Aadhaar Number */}
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
                          style={{height:"60px"}}
                          name="address"
                          {...register("address", { required: true })}
                          placeholder="Residential Address"
                        />
                        {errors.address && (
                          <p className="text-danger">Address is required</p>
                        )}
                      </div>
                    </Col>

                    {/* Occupation */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Proof of Identity
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          {...register("identityProof", { required: true })}
                          placeholder="Passport, Driver’s License, Aadhaar, Voter ID, etc."
                        />
                        {errors.identityProof && (
                          <p className="text-danger">
                            Proof of Identity is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Proof of Address
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          {...register("addressProof", { required: false })}
                          placeholder="Utility Bills, Rental Agreement, Aadhaar, etc."
                        />
                        {errors.addressProof && (
                          <p className="text-danger">
                            Proof of Address is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Income Details
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          {...register("incomeDetails", { required: true })}
                          placeholder="Salary, Business Income, Other Sources"
                        />
                        {errors.incomeDetails && (
                          <p className="text-danger">
                            Income Details are required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Employer’s Name and Address
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          {...register("employerDetails", { required: true })}
                          placeholder="For salaried individuals"
                        />
                        {errors.employerDetails && (
                          <p className="text-danger">
                            Employer's Name and Address are required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Employment Status
                        </label>
                        <Controller
                          name="employmentStatus"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Status"
                            >
                              <Option value="Employed">Employed</Option>
                              <Option value="Self-employed">
                                Self-employed
                              </Option>
                              <Option value="Business Owner">
                                Business Owner
                              </Option>
                            </Select>
                          )}
                        />
                        {errors.employmentStatus && (
                          <p className="text-danger">
                            Employment Status is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Bank Account Details
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          {...register("bankAccountDetails", {
                            required: true,
                          })}
                          placeholder="Account Number, IFSC Code"
                        />
                        {errors.bankAccountDetails && (
                          <p className="text-danger">
                            Bank Account Details are required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Annual Income
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          {...register("annualIncome", { required: true })}
                          placeholder="Annual Income"
                        />
                        {errors.annualIncome && (
                          <p className="text-danger">
                            Annual Income is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Details of Existing Loans
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          style={{height:"60px"}}
                          {...register("existingLoans")}
                          placeholder="If any"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Credit Score
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          {...register("creditScore", { required: true })}
                          placeholder="Credit Score"
                        />
                        {errors.creditScore && (
                          <p className="text-danger">
                            Credit Score is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Property Details
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          style={{height:"60px"}}
                          {...register("propertyDetails", { required: true })}
                          placeholder="Address, Type, Size, and Value of the Property"
                        />
                        {errors.propertyDetails && (
                          <p className="text-danger">
                            Property Details are required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Purpose of the Loan
                        </label>
                        <Controller
                          name="loanPurpose"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Purpose"
                            >
                              <Option value="Purchase">Purchase</Option>
                              <Option value="Construction">Construction</Option>
                              <Option value="Renovation">Renovation</Option>
                            </Select>
                          )}
                        />
                        {errors.loanPurpose && (
                          <p className="text-danger">
                            Purpose of the Loan is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Loan Amount Requested
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          {...register("loanAmount", { required: true })}
                          placeholder="Loan Amount Requested"
                        />
                        {errors.loanAmount && (
                          <p className="text-danger">
                            Loan Amount Requested is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Down Payment Amount
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          {...register("downPayment", { required: true })}
                          placeholder="Down Payment Amount"
                        />
                        {errors.downPayment && (
                          <p className="text-danger">
                            Down Payment Amount is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Proof of Property Ownership or Agreement to Sell
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          {...register("propertyOwnershipProof", {
                            required: true,
                          })}
                        />
                        {errors.propertyOwnershipProof && (
                          <p className="text-danger">
                            Proof of Property Ownership is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Signature Specimen
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          accept="image/*"
                          {...register("signature", { required: true })}
                        />
                        {errors.signature && (
                          <p className="text-danger">
                            Signature Specimen is required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Photographs (Passport size)
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          accept="image/*"
                          {...register("photographs", { required: true })}
                        />
                        {errors.photographs && (
                          <p className="text-danger">
                            Photographs are required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Proof of Financial Liabilities or Assets
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          {...register("financialProof")}
                          placeholder="Optional"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Documentation for Co-applicants/Guarantors
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          {...register("coApplicantDocs")}
                          placeholder="If applicable"
                        />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="upgrade_column mb-3 mt-3">
                  <Button className="button1" type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
          {/* </Card> */}
        </Col>
      </Container>
      <ToastContainer />
      <br />
      <br />

      <Footer />
    </div>
  );
}

export default LoanForm;
