import React, { useEffect, useState } from "react";
import { Container, Row, Col, button, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import Api from "../../Api";

function Kycvendor() {
  const [userKYCDetail, setUserKYCDetail] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const userid = localStorage.getItem("id");
  const id = localStorage.getItem("vendor_id");

  console.log('userKYCDetail', userKYCDetail)
  
  useEffect(() => {
    const fetchUserKYCDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/signup/getby/${userid}`);
        setUserKYCDetail(response.data);
        const fetchedData = response.data
        reset({
          panCardNumber: fetchedData.panCardNumber,
          GSTNumber: fetchedData.GSTNumber,
          accountNumber: fetchedData.accountNumber,
          IFSCCode: fetchedData.IFSCCode,
          bankName: fetchedData.bankName,
          branch: fetchedData.branch,
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };
  
    fetchUserKYCDetails();
  }, [userid, reset]);
  

 
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

    const panOrAdharUploadUrl = data.panOrAdharUpload?.[0]
      ? await uploadFile(data.panOrAdharUpload[0])
      : null;
    const voterIdUploadUrl = data.voterIdUpload?.[0]
      ? await uploadFile(data.voterIdUpload[0])
      : null;

    const Details = {
      panCardNumber: data.panCardNumber,
      GSTNumber: data.GSTNumber,
      accountNumber: data.accountNumber,
      IFSCCode: data.IFSCCode,
      bankName: data.bankName,
      branch: data.branch,
      panOrAdharUpload: panOrAdharUploadUrl,
      voterIdUpload: voterIdUploadUrl,
    };
    console.log("Details", Details);

    try {
      const response = await axios.put(
        `http://localhost:5000/signup/updateKYC/${userid}`,
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
      <Container>
        <div
          className="ourProfileParentdiv"
          style={{
            backgroundColor: "white",
            padding: "10px 20px",
            width: "80%",
            marginLeft: "150px",
          }}
        >
          <center>
            <h4 className="pages-title mt-3">KYC Complaince</h4>
            <br />
            <p
              style={{
                backgroundColor: "#fccc55",
                padding: "10px",
                width: "80%",
                fontSize: "18px",
              }}
            >
              Your Company details are required to meet kyc Complaince
            </p>
            <br />
          </center>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>PanCard Number: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  {...register("panCardNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.panCardNumber && (
                  <p className="text-danger">pancard number is required</p>
                )}
              </Col>
            </Row>

            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>GST Number: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  {...register("GSTNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.GSTNumber && (
                  <p className="text-danger">GST number is required</p>
                )}
              </Col>
            </Row>

            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>Pan or Adhar Upload Anyone: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("panOrAdharUpload")}
                />
              </Col>
            </Row>
            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>VoterID: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("voterIdUpload")}
                />
              </Col>
            </Row>
            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>Account Number: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  type="number"
                  {...register("accountNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.accountNumber && (
                  <p className="text-danger">Account number is required</p>
                )}
              </Col>
            </Row>
            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>IFSC Code</label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  {...register("IFSCCode", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.IFSCCode && (
                  <p className="text-danger">IFCE code is required</p>
                )}
              </Col>
            </Row>
            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>Bank Name: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  {...register("bankName", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.bankName && (
                  <p className="text-danger">Bank Name is required</p>
                )}
              </Col>
            </Row>
            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>Branch:</label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  {...register("branch", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.branch && (
                  <p className="text-danger">Branch is required</p>
                )}
              </Col>
            </Row>
            <center>
              <div className="submitbuttons px-4">
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
