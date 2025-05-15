import React, { useState, useEffect } from "react";
import Api from "../../../../Api";
import { Controller, useForm } from "react-hook-form";
import { Row, Col, Button, Container } from "react-bootstrap";
import "../../../dashboard/user/MyProfile.scss";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const { Option, OptGroup } = Select;
function CreateLoanDetails() {
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
  const selectedSource = watch("source");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [salaryPersonDoc, setSalaryPersonDoc] = useState({});
  const [businessOwnerDoc, setBusinessOwnerDoc] = useState({});
  const [showVehicleOptions, setShowVehicleOptions] = useState(false);
  const [showHomeLoanOptions, setShowHomeLoanOptions] = useState(false);
  
  const handleSalaryPersonFileUpload = (event) => {
    setSalaryPersonDoc(event.target.files[0]);
  };

  const handleBusinessOwnerFileUpload = (event) => {
    setBusinessOwnerDoc(event.target.files[0]);
  };
  const MAX_FILE_SIZE_MB = 10;

  const handleFileUpload = (fieldName) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024); // Convert bytes to MB
  
      if (fileSizeMB > MAX_FILE_SIZE_MB) {
        alert(`File size should not exceed ${MAX_FILE_SIZE_MB} MB`);
        event.target.value = ""; // Reset the file input
        return;
      }
  
      if (employmentStatus === "Salary Person") {
        setSalaryPersonDoc(prev => ({ ...prev, [fieldName]: file }));
      } else if (employmentStatus === "Business Owner") {
        setBusinessOwnerDoc(prev => ({ ...prev, [fieldName]: file }));
      }
    }
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
                              Source
                            </label>
                            <Controller
                              name="source"
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
                                  }}
                                >
                                  <Option value="Direct">Direct</Option>
                                  <Option value="Financial Advisor">
                                    Financial Advisor
                                  </Option>
                                </Select>
                              )}
                            />
                            {errors.source && (
                              <p className="text-danger">Source is required</p>
                            )}
                          </div>
                        </Col>

                        {selectedSource === "Financial Advisor" && (
                          <>
                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label className="vendorpage_labelCss">
                                  Financial Advisor Name
                                </label>
                                <br />
                                <input
                                  className="inputcolumn-ourProfile"
                                  type="text"
                                  {...register("loanAgentName", {
                                    required: true,
                                  })}
                                  placeholder="Financial Advisor Name"
                                />
                                {errors.loanAgentName && (
                                  <p className="text-danger">
                                    Financial Advisor Name is required
                                  </p>
                                )}
                              </div>
                            </Col>

                            <Col xs={12} md={6} lg={4}>
                              <div>
                                <label className="vendorpage_labelCss">
                                  Financial Advisor Contact Number
                                </label>
                                <br />
                                <input
                                  className="inputcolumn-ourProfile"
                                  type="number"
                                  {...register("loanAgentContactNumber", {
                                    required: true,
                                  })}
                                  placeholder="Financial Advisor Contact Number"
                                />
                                {errors.loanAgentContactNumber && (
                                  <p className="text-danger">
                                    Financial Advisor Contact Number is required
                                  </p>
                                )}
                              </div>
                            </Col>
                          </>
                        )}
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
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                        Annual Income
                        </label>
                        <Controller
                          name="annualIncome"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              placeholder="Select Annual Income"
                            >
                              <Option value="">Select Annual Income</Option>
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
                        {errors.annualIncome && (
                          <p className="text-danger">Select Loan Amount</p>
                        )}
                      </div>
                    </Col>

                    {employmentStatus === "Salary Person" && (
                      <>
                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            Offer or Appointment Letter
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("offerLetter")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            Company ID
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("companyId")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            Last 6 Months Payslips
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("payslips")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            One Year Bank Statement
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("bankStatement")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            Form 16 (Last 3 Years)
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("form16")}
                          />
                        </Col>
                      </>
                    )}

                    {/* Conditional Rendering for Business Owner Document Upload */}
                    {employmentStatus === "Business Owner" && (
                      <>
                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">License</label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("license")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            MSME Certificate
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("msme")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            ITR (Last 3 Years)
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("itr")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            One Year Bank Statement (Savings or Current)
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("businessBankStatement")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            GST Certificate
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("gstCertificate")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            One Year GST Returns
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("gstReturns")}
                          />
                        </Col>

                        <Col xs={12} md={6} lg={4}>
                          <label className="vendorpage_labelCss">
                            Latest 6 Months Sales & Purchase List
                          </label>
                          <input
                            type="file"
                            accept="application/pdf"
                            className="inputcolumn-ourProfile"
                            onChange={handleFileUpload("salesPurchase")}
                          />
                        </Col>
                      </>
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
                          Reference Name
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="nomineeName"
                          {...register("nomineeName", { required: true })}
                          placeholder="Reference"
                        />
                        {errors.nomineeName && (
                          <p className="text-danger">Nominee is required</p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Reference Relationship
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="text"
                          name="nomineeRelationship"
                          {...register("nomineeRelationship", {
                            required: true,
                          })}
                          placeholder="Reference Relationship"
                        />
                        {errors.nomineeRelationship && (
                          <p className="text-danger">Nominee is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Reference Address
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          style={{ height: "60px" }}
                          name="nomineeAddress"
                          {...register("nomineeAddress", { required: true })}
                          placeholder="Reference Address"
                        />
                        {errors.nomineeAddress && (
                          <p className="text-danger">Address is required</p>
                        )}
                      </div>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Reference Contact Number
                        </label>
                        <br />
                        <input
                          className="inputcolumn-ourProfile"
                          type="number"
                          {...register("referenceContactNumber", {
                            required: true,
                          })}
                          placeholder="Reference Contact Number"
                        />
                        {errors.loanAgentContactNumber && (
                          <p className="text-danger">
                            Reference Contact Number is required
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
                                setShowHomeLoanOptions(value === "Home Loan");
                              }}
                            >
                              <Option value="Home Loan">
                                Home Loan
                              </Option>
                              <Option value="Vehicle Loan">Vehicle Loan</Option>
                              <Option value="Business Loan">
                                Business Loan
                              </Option>
                              <Option value="Loan Transfer">
                                Loan Transfer( BT TopUp )
                              </Option>
                             
                              <Option value="Personal Loan">
                                Personal Loan
                              </Option>
                             
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
                          <label className="vendorpage_labelCss">
                            Vehicle Type
                          </label>
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
                                <Option value="Bike Loan">Bike Loan</Option>
                                <Option value="Car Loan">Car Loan</Option>
                                <Option value="Used Vehicle">
                                  Used Vehicle
                                </Option>
                                <Option value="New Vehicle">New Vehicle</Option>
                                <Option value="Heavy Vehicle">
                                  Heavy Vehicle
                                </Option>
                                <Option value="Other Vehicle">
                                  Other Vehicle
                                </Option>
                              </Select>
                            )}
                          />
                          {errors.vehicleType && (
                            <p className="text-danger">
                              Vehicle Type is required
                            </p>
                          )}
                        </div>
                      </Col>
                    )}

                    {showHomeLoanOptions && (
                      <Col xs={12} md={6} lg={4}>
                        <div>
                          <label className="vendorpage_labelCss">
                            Sub-Loan Type
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
                                <Option value="Home Purchase">
                                  Home Purchase
                                </Option>
                                <Option value="Self Construction">
                                  {" "}
                                  Self Construction on ownland
                                </Option>
                                <Option value="Plot Purchase">
                                  Plot Purchase
                                </Option>
                                <Option value="Home Extension">
                                  Home Extension
                                </Option>
                                <Option value="Plot Purchase">
                                  Plot Loan
                                </Option>
                                
                                <Option value="Home Impovement">
                                  Home Impovement
                                </Option>
                                <Option value="Home Loan Balance Transfer">
                                  Home Loan Balance Transfer
                                </Option>
                                <Option value="Home Loan Balance Transfer & Purchase">
                                  Home Loan Balance Transfer & Purchase
                                </Option>
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
                    )}

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Loan Amount
                        </label>
                        <Controller
                          name="loanAmount"
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
                        {errors.loanAmount && (
                          <p className="text-danger">Select Loan Amount</p>
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
    </div>
  );
}

export default CreateLoanDetails;
