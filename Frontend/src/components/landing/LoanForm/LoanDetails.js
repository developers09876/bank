import React, { useState, useEffect } from "react";
import Api from "../../../Api";
import { Controller, useForm } from "react-hook-form";
import { Row, Col, Button, Container } from "react-bootstrap";
import "../../dashboard/user/MyProfile.scss";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
// const { Option, OptGroup } = Select;
function LoanDetails() {
  const {
    register,
    unregister,
    getValues,
    handleSubmit,
    reset,
    setValue,
    watch,

    control,
    formState: { errors },
  } = useForm();

  const [employmentStatus, setEmploymentStatus] = useState("");
  const [salaryPersonDoc, setSalaryPersonDoc] = useState(null);
  const [businessOwnerDoc, setBusinessOwnerDoc] = useState(null);
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const handleSalaryPersonFileUpload = (event) => {
    setSalaryPersonDoc(event.target.files[0]);
  };

  const handleBusinessOwnerFileUpload = (event) => {
    setBusinessOwnerDoc(event.target.files[0]);
  };

  const loanApplicationId = localStorage.getItem("loanApplicationId");
  const userType = localStorage.getItem("userType");
  const referCode = localStorage.getItem("referCode");

  const handleFormSubmit = async (data) => {
    console.log("step1", data);

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

    const identityProofUrl = data.identityProof?.[0]
      ? await uploadFile(data.identityProof[0])
      : null;

    const addressProofUrl = data.addressProof?.[0]
      ? await uploadFile(data.addressProof[0])
      : null;

    const propertyOwnershipProofUrl = data.propertyOwnershipProof?.[0]
      ? await uploadFile(data.propertyOwnershipProof[0])
      : null;

    const signatureUrl = data.signature?.[0]
      ? await uploadFile(data.signature[0])
      : null;

    const nomineeDocsDocsUrl = data.nomineeDocs?.[0]
      ? await uploadFile(data.nomineeDocs[0])
      : null;

    const financialProofUrl = data.financialProof?.[0]
      ? await uploadFile(data.financialProof[0])
      : null;

    const employeePayslipProof =
      data.employmentStatus === "Salary Person"
        ? salaryPersonDoc
          ? await uploadFile(salaryPersonDoc)
          : null
        : null;

    const businessOwnerStatementProof =
      data.employmentStatus === "Business Owner"
        ? businessOwnerDoc
          ? await uploadFile(businessOwnerDoc)
          : null
        : null;

    const Details = {
      referCode: referCode || "",
      loanAgentName: data.loanAgentName,
      loanAgentContactNumber: data.loanAgentContactNumber,
      identityProof: identityProofUrl,
      addressProof: addressProofUrl,
      annualIncome: data.annualIncome,
      nomineeDocs: nomineeDocsDocsUrl,
      creditScore: data.creditScore,
      employmentStatus: data.employmentStatus,
      existingLoans: data.existingLoans,
      financialProof: financialProofUrl,
      incomeDetails: data.incomeDetails,
      loanAmount: data.loanAmount,
      loanType: data.loanType,
      
      vehicleType: data.vehicleType,
      loanPurpose: data.loanPurpose,
      nomineeName: data.nomineeName,
      nomineeAddress: data.nomineeAddress,
      nomineeRelationship: data.nomineeRelationship,
      propertyDetails: data.propertyDetails,
      propertyOwnershipProof: propertyOwnershipProofUrl,
      signature: signatureUrl,
      employeePayslipProof,
      businessOwnerStatementProof,
    };

    try {
      const response = await Api.put(
        `/loanform/updateloanapplications/${loanApplicationId}`,
        Details
      );
      console.log(response, "Form submitted successfully");
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Form submission failed", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div>
      <Header />

      <Container style={{ marginTop: "1%" }}>
        <Col xs={12} md={12} lg={12}>
          <div
            className="ourProfileParentdiv"
            style={{ backgroundColor: "white", padding: "10px 20px" }}
          >
            <div style={{ paddingLeft: "10px" }}>
              <center>
                {" "}
                <h4 className="pages-title mt-3 mb-5"> Loan Details</h4>
              </center>

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                  <Row>
                    {userType !== "user" && (
                      <>
                        <Col xs={12} md={6} lg={4}>
                          <div>
                            <label className="vendorpage_labelCss">
                              loan Agent Name
                            </label>
                            <br />
                            <input
                              className="inputcolumn-ourProfile"
                              type="text"
                              {...register("loanAgentName", { required: true })}
                              placeholder="loan Agent Name"
                            />
                            {errors.Name && (
                              <p className="text-danger">
                                loan Agent Name are required
                              </p>
                            )}
                          </div>
                        </Col>
                        <Col xs={12} md={6} lg={4}>
                          <div>
                            <label className="vendorpage_labelCss">
                              loan Agent Contact Number
                            </label>
                            <br />
                            <input
                              className="inputcolumn-ourProfile"
                              type="text"
                              {...register("loanAgentContactNumber", {
                                required: true,
                              })}
                              placeholder="loan Agent Contact Number"
                            />
                            {errors.loanAgentContactNumber && (
                              <p className="text-danger">
                                loanAgent Contact Number are required
                              </p>
                            )}
                          </div>
                        </Col>
                      </>
                    )}

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
                              onChange={(value) => {
                                field.onChange(value);
                                setEmploymentStatus(value);
                                setSalaryPersonDoc(null);
                                setBusinessOwnerDoc(null);
                              }}
                            >
                              <Option value="Salary Person">
                                Salary Person
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

                    {employmentStatus === "Salary Person" && (
                      <Col xs={12} md={6} lg={4}>
                        <div className="upload-section">
                          <label className="vendorpage_labelCss">
                            Upload Your Last 5 Months Payslip Document
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleSalaryPersonFileUpload}
                          />
                        </div>
                        {/* {salaryPersonDoc && (
                          <div>
                            <h5>Uploaded Document:</h5>
                            <p>{salaryPersonDoc.name}</p>
                          </div>
                        )} */}
                      </Col>
                    )}

                    {/* Conditional Rendering for Business Owner Document Upload */}
                    {employmentStatus === "Business Owner" && (
                      <Col xs={12} md={6} lg={4}>
                        <div className="upload-section">
                          <label className="vendorpage_labelCss">
                            Upload Your Last 1 Year Statement Document
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleBusinessOwnerFileUpload}
                          />
                        </div>
                        {/* {businessOwnerDoc && (
                          <div>
                            <h5>Uploaded Document:</h5>
                            <p>{businessOwnerDoc.name}</p>
                          </div>
                        )} */}
                      </Col>
                    )}
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
                          Nominee Name
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="nomineeName"
                          {...register("nomineeName", { required: true })}
                          placeholder="Nominee"
                        />
                        {errors.nomineeName && (
                          <p className="text-danger">Nominee is required</p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Nominee Relationship
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="nomineeRelationship"
                          {...register("nomineeRelationship", {
                            required: true,
                          })}
                          placeholder="Nominee Relationship"
                        />
                        {errors.nomineeRelationship && (
                          <p className="text-danger">Nominee is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Nominee Address
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          style={{ height: "60px" }}
                          name="nomineeAddress"
                          {...register("nomineeAddress", { required: true })}
                          placeholder="Residential Address"
                        />
                        {errors.nomineeAddress && (
                          <p className="text-danger">Address is required</p>
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
                          style={{ height: "60px" }}
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
                          style={{ height: "60px" }}
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

                    {/* <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">Loan Type</label>
                        <Controller
                          name="loanType"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Purpose"
                            >
                              <Option value="Home Loan">Home Loan</Option>
                              <Option value="Vehicle Loan">Vehicle Loan</Option>
                              <Option value="Business Loan"> Business Loan</Option>
                              <Option value="Personal Loan"> Personal Loan</Option>
                            </Select>
                          )}
                        />
                        {errors.loanType && (
                          <p className="text-danger">Loan Type is required</p>
                        )}
                      </div>
                    </Col> */}
<Col xs={12} md={6} lg={4}>
        <div>
          <label className="vendorpage_labelCss">Loan Type</label>
          <Controller
            name="loanType"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                className="inputcolumn_drp"
                placeholder="Select Purpose"
                onChange={(value) => {
                  field.onChange(value);
                  setShowVehicleOptions(value === "Vehicle Loan");
                }}
              >
                <Option value="Home Loan">Home Loan</Option>
                <Option value="Vehicle Loan">Vehicle Loan</Option>
                <Option value="Business Loan">Business Loan</Option>
                <Option value="Personal Loan">Personal Loan</Option>
              </Select>
            )}
          />
          {errors.loanType && (
            <p className="text-danger">Loan Type is required</p>
          )}
        </div>
      </Col>

      {showVehicleOptions && (
        <Col xs={12} md={6} lg={4}>
          <div>
            <label className="vendorpage_labelCss">Vehicle Type</label>
            <Controller
              name="vehicleType"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="inputcolumn_drp"
                  placeholder="Select Vehicle Type"
                >
                  <Option value="Car">Car</Option>
                  <Option value="Bike">Bike</Option>
                </Select>
              )}
            />
            {errors.vehicleType && (
              <p className="text-danger">Vehicle Type is required</p>
            )}
          </div>
        </Col>
      )}
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
                          Documentation for Nominee
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          {...register("nomineeDocs")}
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
        </Col>
      </Container>
      <ToastContainer />
      <br />
      <br />

      <Footer />
    </div>
  );
}

export default LoanDetails;
