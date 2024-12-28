import React, { useEffect, useState } from "react";
import { Container, Row, Col, button, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Api from "../../../Api";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

function LoanKfc() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const [selectImage, setSelectImage] = useState(null);
  const [selectImageAadhar, setSelectImageAadhar] = useState(null);

  const setImage = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const setImages = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectImageAadhar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  const handleFileChanges = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages(file);
    }
  };
  const loanApplicationId = localStorage.getItem("loanApplicationId");
  //   useEffect(() => {
  //     getValue();
  //   }, []);

  //   const getValue = async () => {
  //     try {
  //     //   const res = await Api.get(`/vendor/getOne/${id}`);
  //       const data = res.data[0];
  //       setSelectImage(data.PanOrAdharUpload);

  //       reset({
  //         pancardNumber: data.panCardNumber,
  //         gstNumber: data.GSTNumber,
  //         accountno: data.accountNumber,
  //         ifcecode: data.IFSCCode,
  //         bankname: data.bankName,
  //         branch: data.branch,
  //       });
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  const handleFormSubmit = async () => {
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
    const panProofUrl = selectImage ? await uploadFile(selectImage) : null;
    const aadhaarProofUrl = selectImageAadhar
      ? await uploadFile(selectImageAadhar)
      : null;

    const Details = {
      panCardNumber: getValues().pancardNumber,
      GSTNumber: getValues().gstNumber,
      aadhaarNumber: getValues().aadhaarNumber,
      accountNumber: getValues().accountno,
      IFSCCode: getValues().ifcecode,
      bankName: getValues().bankname,
      branch: getValues().branch,
      panImageUpload: panProofUrl,
      aadharImageUpload: aadhaarProofUrl,
    };
    await Api.put(
      `/loanform/updateloanapplications/${loanApplicationId}`,
      Details
    ).then(async (res) => {
      console.log("res :>> ", res);
    });
  };

  return (
    <div>
      <Header />
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
                  {...register("pancardNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.pancardNumber && (
                  <p className="text-danger">pancard number is required</p>
                )}
              </Col>
            </Row>
            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>Aadhaar Number: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  {...register("aadhaarNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.aadhaarNumber && (
                  <p className="text-danger">Aadhaar Number is required</p>
                )}
              </Col>
            </Row>

            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>GST Number: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  {...register("gstNumber", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.gstNumber && (
                  <p className="text-danger">GST number is required</p>
                )}
              </Col>
            </Row>

            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>Upload Your Pan Card Proof: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  onChange={handleFileChange}
                />
              </Col>
            </Row>
            <Row className="kycRow_Container">
              <Col sm={12} lg={4}>
                <label>Upload Your Aadhaar Proof: </label>
              </Col>
              <Col sm={12} lg={6}>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  onChange={handleFileChanges}
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
                  {...register("accountno", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.accountno && (
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
                  {...register("ifcecode", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.ifcecode && (
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
                  {...register("bankname", { required: true })}
                  className="inputcolumn-ourProfile"
                />
                {errors.bankname && (
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
      <Footer />
    </div>
  );
}

export default LoanKfc;
