import React, { useEffect, useState } from "react";
import { Container, Row, Col, button, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Api from "../../../../Api";
function Kycvendor() {
  const { state } = useLocation();
  const record = state?.record;
  const [userKYCDetail, setUserKYCDetail] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    reset,
    setValue,
  } = useForm();

  const userid = localStorage.getItem("id");
  const id = localStorage.getItem("vendor_id");
  const loanApplicationId = localStorage.getItem("loanApplicationId");

  console.log("userKYCDetail", userKYCDetail);

  useEffect(() => {
    const fetchLoanApplicationData = async () => {
      try {
        const response = await Api.get(`/loanform/getbyEmployeeid/${userid}`);
        const filterOneApplication = response.data.filter(
          (application) => application._id === record._id
        );
        console.log("Applicationresponse", response.data);
        console.log("filterOneApplication", filterOneApplication[0]);
        if (filterOneApplication) {
          reset(filterOneApplication[0]);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchLoanApplicationData();
  }, [userid, record._id, reset]);

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

    const panUploadUrl = data.panUpload?.[0]
      ? await uploadFile(data.panUpload[0])
      : null;
    const AdharUploadUrl = data.AdharUpload?.[0]
      ? await uploadFile(data.AdharUpload[0])
      : null;
    const voterIdUploadUrl = data.voterIdUpload?.[0]
      ? await uploadFile(data.voterIdUpload[0])
      : null;

    const Details = {
      panCardNumber: data.panCardNumber,
      aadhaarNumber: data.aadhaarNumber,
      GSTNumber: data.GSTNumber,
      accountNumber: data.accountNumber,
      IFSCCode: data.IFSCCode,
      bankName: data.bankName,
      bankBranch: data.bankBranch,
      panUpload: panUploadUrl,
      AdharUpload: AdharUploadUrl,
      voterIdUpload: voterIdUploadUrl,
    };
    console.log("Details", Details);

    try {
      const response = await axios.put(
        `http://localhost:5000/loanform/updateloanapplications/${loanApplicationId}`,
        Details
      );
      console.log(response.data.data, "Form submitted successfully");
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Form submission failed", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div>
      <Container style={{ justifyContent: "center" }}>
        <div
          className="ourProfileParentdiv py-1 px-1"
          style={{
            backgroundColor: "white",
            // padding: "10px 20px",
            // width: "80%",
            // marginLeft: "150px",
          }}
        >
          <center>
            <h4 className="pages-title mt-3">KYC Complaince</h4>
            <br />
            <p
              style={{
                backgroundColor: "#fccc55",
                padding: "10px",
                width: "100%",
                fontSize: "18px",
              }}
            >
              Your Company details are required to meet kyc Complaince
            </p>
            <br />
          </center>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="kycRow_Container">
              <Col sm={10} md={4} lg={4}>
                <label>PanCard Number: </label>
                <input
                  {...register("panCardNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.panCardNumber && (
                  <p className="text-danger">pancard number is required</p>
                )}
              </Col>
              <Col sm={10} md={4} lg={4}>
                <label>Aadhar Number: </label>
                <input
                  {...register("aadhaarNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.aadhaarNumber && (
                  <p className="text-danger">Aadhaar number is required</p>
                )}
              </Col>

              <Col sm={10} md={4} lg={4}>
                <label>GST Number: </label>

                <input
                  {...register("GSTNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.GSTNumber && (
                  <p className="text-danger">GST number is required</p>
                )}
              </Col>

              <Col sm={10} md={4} lg={4}>
                <label>Account Number: </label>

                <input
                  type="number"
                  {...register("accountNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.accountNumber && (
                  <p className="text-danger">Account number is required</p>
                )}
              </Col>
              <Col sm={10} md={4} lg={4}>
                <label>IFSC Code</label>

                <input
                  {...register("IFSCCode", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.IFSCCode && (
                  <p className="text-danger">IFCE code is required</p>
                )}
              </Col>
              <Col sm={10} md={4} lg={4}>
                <label>Bank Name: </label>

                <input
                  {...register("bankName", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.bankName && (
                  <p className="text-danger">Bank Name is required</p>
                )}
              </Col>
              <Col sm={10} md={4} lg={4}>
                <label>Branch:</label>

                <input
                  {...register("bankBranch", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.bankBranch && (
                  <p className="text-danger">Branch is required</p>
                )}
              </Col>
              <Col sm={10} md={4} lg={4}>
                <label>Pan Upload: </label>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("panUpload", {
                    required: !userKYCDetail?.panUpload,
                  })}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const fileUrl = URL.createObjectURL(e.target.files[0]);
                      setValue("panPreview", fileUrl);
                      setValue("panFileName", e.target.files[0].name);
                    }
                  }}
                />

                {!userKYCDetail?.panOrAdharUpload && errors.panUpload && (
                  <p className="text-danger">Pan is required</p>
                )}
              </Col>

              <Col sm={10} md={4} lg={4}>
                <label>Adhar Upload : </label>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("AdharUpload", {
                    required: !userKYCDetail?.AdharUpload,
                  })}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const fileUrl = URL.createObjectURL(e.target.files[0]);
                      setValue("AdharPreview", fileUrl);
                      setValue("AdharFileName", e.target.files[0].name);
                    }
                  }}
                />

                {!userKYCDetail?.panOrAdharUpload && errors.AdharUpload && (
                  <p className="text-danger"> Adhar is required</p>
                )}
              </Col>

              <Col sm={10} md={4} lg={4}>
                <label>Voter ID: </label>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("voterIdUpload", {
                    required: !userKYCDetail?.voterIdUpload,
                  })}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const fileUrl = URL.createObjectURL(e.target.files[0]);
                      setValue("voterIdPreview", fileUrl);
                      setValue("voterIdFileName", e.target.files[0].name);
                    }
                  }}
                />

                {!userKYCDetail?.voterIdUpload && errors.voterIdUpload && (
                  <p className="text-danger">Voter ID is required</p>
                )}
              </Col>
            </Row>
            {/* <Row>
              <Col lg={3}>
                {(userKYCDetail?.panOrAdharUpload ||
                  watch("panOrAdharPreview")) && (
                  <>
                    <img
                      src={
                        watch("panOrAdharPreview") ||
                        userKYCDetail.panOrAdharUpload
                      }
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        marginTop: "10px",
                      }}
                    />
                    <p>Pan or Adhar</p>
                  </>
                )}
              </Col>

              <Col lg={3}>
                {(userKYCDetail?.voterIdUpload || watch("voterIdPreview")) && (
                  <>
                    <img
                      src={
                        watch("voterIdPreview") || userKYCDetail.voterIdUpload
                      }
                      alt="Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        marginTop: "10px",
                      }}
                    />
                    <p>Voter ID</p>
                  </>
                )}
              </Col>
            </Row> */}
            <center>
              <div
                className="submitbuttons px-4"
                style={{ flexDirection: "unset" }}
              >
                <Button
                  className="button1 m-2 p-2"
                  type="submit"
                  // onClick={handleSubmit}
                >
                  Submit
                </Button>
                <button className="button2 m-2 p-2" type="reset">
                  cancel
                </button>
              </div>
            </center>
          </form>
        </div>
      </Container>
      {/* </Card> */}
    </div>
  );
}

export default Kycvendor;
