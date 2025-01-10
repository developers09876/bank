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

function TaxFormDetails() {
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
  const handleSalaryPersonFileUpload = (event) => {
    setSalaryPersonDoc(event.target.files[0]);
  };

  const handleBusinessOwnerFileUpload = (event) => {
    setBusinessOwnerDoc(event.target.files[0]);
  };

  const loanApplicationId = localStorage.getItem("loanApplicationId");

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

    // const Details = {
    //   loanAgentName: data.loanAgentName,
    //   loanAgentContactNumber: data.loanAgentContactNumber,

    //   identityProof: identityProofUrl,
    //   addressProof: addressProofUrl,
    //   annualIncome: data.annualIncome,
    //   nomineeDocs: nomineeDocsDocsUrl,
    //   creditScore: data.creditScore,
    //   employmentStatus: data.employmentStatus,
    //   existingLoans: data.existingLoans,
    //   financialProof: financialProofUrl,
    //   incomeDetails: data.incomeDetails,
    //   loanAmount: data.loanAmount,
    //   loanPurpose: data.loanPurpose,
    //   nomineeName: data.nomineeName,
    //   nomineeAddress: data.nomineeAddress,
    //   nomineeRelationship: data.nomineeRelationship,
    //   propertyDetails: data.propertyDetails,
    //   propertyOwnershipProof: propertyOwnershipProofUrl,
    //   signature: signatureUrl,
    //   employeePayslipProof,
    //   businessOwnerStatementProof,
    // };

    // try {
    //   const response = await Api.put(
    //     `/loanform/updateloanapplications/${loanApplicationId}`,
    //     Details
    //   );
    //   console.log(response, "Form submitted successfully");
    //   toast.success("Form submitted successfully");
    // } catch (error) {
    //   console.error("Form submission failed", error);
    //   toast.error("An error occurred while submitting the form");
    // }
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
                <h4 className="pages-title mt-3 mb-5"> Tax Details</h4>
              </center>

              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                  <Row>
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Employer's Name
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("employerDetails", { required: true })}
                          placeholder="Enter employer's name"
                        />
                        {errors.employerDetails && (
                          <p className="text-danger">This field is required</p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Income Details
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("incomeDetails", { required: true })}
                          placeholder="Salary, Business Income, Rental Income, Other Sources"
                        />
                        {errors.incomeDetails && (
                          <p className="text-danger">
                            Income details are required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">Form 16</label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          {...register("form16", { required: true })}
                        />
                        {errors.form16 && (
                          <p className="text-danger">Form 16 is required</p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Investment Details
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("investmentDetails", { required: true })}
                          placeholder="Tax-saving investments under Section 80C, 80D, etc."
                        />
                        {errors.investmentDetails && (
                          <p className="text-danger">
                            Investment details are required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          House Property Details
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("housePropertyDetails")}
                          placeholder="Details for claiming home loan interest deductions"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Capital Gains Details
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("capitalGains")}
                          placeholder="Enter capital gains details (if any)"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          TDS Details
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("tdsDetails", { required: true })}
                          placeholder="Tax Deducted at Source details"
                        />
                        {errors.tdsDetails && (
                          <p className="text-danger">
                            TDS details are required
                          </p>
                        )}
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Tax Payments
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("taxPayments")}
                          placeholder="Advance tax, Self-assessment tax"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Deductions and Exemptions
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("deductions")}
                          placeholder="HRA, LTA, Section 80C, 80D, 80E, etc."
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Tax-saving Proofs
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          {...register("taxProofs")}
                          placeholder="Upload tax-saving proofs"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Foreign Income Details
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("foreignIncome")}
                          placeholder="Enter details of foreign income (if applicable)"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Liabilities
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("liabilities")}
                          placeholder="Details of any loans or liabilities"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Professional Tax Details
                        </label>
                        <textarea
                          className="inputcolumn-ourProfile"
                          {...register("professionalTaxDetails")}
                          placeholder="Professional tax details for self-employed individuals"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Previous Income Tax Returns
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          {...register("previousITR")}
                          placeholder="Upload ITR documents (if applicable)"
                        />
                      </div>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Digital Signature Certificate
                        </label>
                        <input
                          className="inputcolumn-ourProfile"
                          type="file"
                          {...register("digitalSignature")}
                          placeholder="Upload digital signature (optional)"
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

export default TaxFormDetails;
