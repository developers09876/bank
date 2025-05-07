import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./MyProfile.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../../Api";
import { MdDelete } from "react-icons/md";

function Kycvendor() {
  const [userKYCDetail, setUserKYCDetail] = useState();
  const [documents, setDocuments] = useState([]);
  const [selectedDocTypes, setSelectedDocTypes] = useState([]);
  const [currentDocType, setCurrentDocType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  const userid = localStorage.getItem("id");

  useEffect(() => {
    const fetchUserKYCDetails = async () => {
      try {
        const response = await Api.get(`signup/getby/${userid}`);
        setUserKYCDetail(response.data);
        const fetchedData = response.data;
        if (fetchedData.documents) {
          const fetchedDocs = fetchedData.documents.map((doc, index) => ({
            id: Date.now() + index,
            proofType: doc.proofType,
          }));
          setDocuments(fetchedDocs);
          setSelectedDocTypes(
            fetchedDocs.map((doc) => doc.proofType).filter(Boolean)
          );
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserKYCDetails();
  }, [userid]);

  const addDocument = () => {
    if (currentDocType) {
      setDocuments([
        ...documents,
        { id: Date.now(), proofType: currentDocType },
      ]);
      setSelectedDocTypes([...selectedDocTypes, currentDocType]);
      setCurrentDocType("");
    }
  };

  const deleteDocument = (docId, proofType) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
    setSelectedDocTypes((prev) => prev.filter((type) => type !== proofType));
  };

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

    const aadhaarUploadUrl = data.aadhaarUpload?.[0]
      ? await uploadFile(data.aadhaarUpload[0])
      : null;
    const panUploadUrl = data.panUpload?.[0]
      ? await uploadFile(data.panUpload[0])
      : null;

    const documentDetails = await Promise.all(
      documents.map(async (doc, index) => {
        if (data[`proofType_${doc.id}`]) {
          const uploadUrl = data[`proofUpload_${doc.id}`]?.[0]
            ? await uploadFile(data[`proofUpload_${doc.id}`][0])
            : null;
          return {
            proofType: data[`proofType_${doc.id}`],
            proofNumber: data[`proofNumber_${doc.id}`],
            proofUpload: uploadUrl,
          };
        }
        return null;
      })
    );

    const Details = {
      panCardNumber: data.panCardNumber,
      aadhaarNumber: data.aadhaarNumber,
      accountNumber: data.accountNumber,
      IFSCCode: data.IFSCCode,
      bankName: data.bankName,
      bankBranch: data.bankBranch,
      aadhaarUpload: aadhaarUploadUrl,
      panUpload: panUploadUrl,
      documents: documentDetails.filter((doc) => doc !== null),
    };

    console.log("Submitted KYC Details:", Details);

    try {
      const response = await Api.put(`signup/updateKYC/${userid}`, Details);
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Form submission failed", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  const getValidationRules = (proofType) => {
    switch (proofType) {
      case "Voter ID":
        return {
          pattern: {
            value: /^[A-Z]{3}[0-9]{7}$/,
            message: "Invalid Voter ID format (Ex. ABC1234567)",
          },
        };
      case "Driving License":
        return {
          pattern: {
            value: /^[A-Z]{2}[0-9]{13}$/,
            message: "Invalid Driving License format (Ex. MH1234567890123)",
          },
        };
      case "Passport":
        return {
          pattern: {
            value: /^[A-Z][0-9]{7}$/,
            message: "Invalid Passport format (Ex. A1234567)",
          },
        };
      case "Ration Card":
        return {
          pattern: {
            value: /^[0-9]{12}$/,
            message: "Invalid Ration Card format (Ex. 123456789012)",
          },
        };
      default:
        return {};
    }
  };

  const availableDocTypes = [
    "Voter ID",
    "Driving License",
    "Passport",
    "Ration Card",
  ].filter((type) => !selectedDocTypes.includes(type));

  return (
    <div>
      <ToastContainer />
      <Container style={{ justifyContent: "center" }}>
        <div
          className="ourProfileParentdiv px-1 py-1"
          style={{
            backgroundColor: "white",
          }}
        >
          <center>
            <h4 className="pages-title mt-3">KYC Details</h4>
            <br />
            {/* <p
              style={{
                backgroundColor: "#fccc55",
                padding: "10px",
                width: "80%",
                fontSize: "18px",
              }}
            >
              Your Company details are required to meet KYC Compliance
            </p> */}
            <br />
          </center>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Row className="px-3">
              <Col sm={12} md={6} lg={6}>
                <label>Bank Name: </label>
                <input
                  {...register("bankName", {
                    required: "Bank name is required",
                    minLength: {
                      value: 3,
                      message: "Bank name must be at least 3 characters",
                    },
                  })}
                  className="inputcolumn-ourProfile"
                  placeholder="Enter bank name"
                />
                {errors.bankName && (
                  <p className="text-danger">{errors.bankName.message}</p>
                )}
              </Col>
              <Col sm={12} md={6} lg={6}>
                <label>Branch: </label>
                <input
                  {...register("bankBranch", {
                    required: "Branch name is required",
                    minLength: {
                      value: 3,
                      message: "Branch name must be at least 3 characters",
                    },
                  })}
                  className="inputcolumn-ourProfile"
                  placeholder="Enter branch name"
                />
                {errors.bankBranch && (
                  <p className="text-danger">{errors.bankBranch.message}</p>
                )}
              </Col>
              <Col sm={12} md={6} lg={6}>
                <label>Account Number: </label>
                <input
                  type="number"
                  {...register("accountNumber", {
                    required: "Account number is required",
                    minLength: {
                      value: 8,
                      message: "Account number must be at least 8 digits",
                    },
                  })}
                  className="inputcolumn-ourProfile"
                  placeholder="Enter account number"
                />
                {errors.accountNumber && (
                  <p className="text-danger">{errors.accountNumber.message}</p>
                )}
              </Col>
              <Col sm={12} md={6} lg={6}>
                <label>IFSC Code: </label>
                <input
                  {...register("IFSCCode", {
                    required: "IFSC code is required",
                    pattern: {
                      value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                      message: "Invalid IFSC code format",
                    },
                  })}
                  className="inputcolumn-ourProfile"
                  placeholder="Ex. SBIN0001234"
                />
                {errors.IFSCCode && (
                  <p className="text-danger">{errors.IFSCCode.message}</p>
                )}
              </Col>

              <Col sm={12} md={6} lg={6}>
                <label>Aadhaar Card Number: </label>
                <input
                  {...register("aadhaarNumber", {
                    required: "Aadhaar number is required",
                    pattern: {
                      value: /^\d{12}$/,
                      message: "Aadhaar must be 12 digits",
                    },
                  })}
                  className="inputcolumn-ourProfile"
                  placeholder="Ex. 123456789012"
                />
                {errors.aadhaarNumber && (
                  <p className="text-danger">{errors.aadhaarNumber.message}</p>
                )}
              </Col>
              <Col sm={12} md={6} lg={6}>
                <label>Aadhaar Upload: </label>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("aadhaarUpload", {
                    required: !userKYCDetail?.aadhaarUpload
                      ? "Aadhaar upload is required"
                      : false,
                  })}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const fileUrl = URL.createObjectURL(e.target.files[0]);
                      setValue("aadhaarPreview", fileUrl);
                      setValue("aadhaarFileName", e.target.files[0].name);
                    }
                  }}
                />
                {errors.aadhaarUpload && (
                  <p className="text-danger">{errors.aadhaarUpload.message}</p>
                )}
              </Col>
              <Col sm={12} md={6} lg={6}>
                <label>PAN Card: </label>
                <input
                  {...register("panCardNumber", {
                    pattern: {
                      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: "Invalid PAN format (Ex. AAAPA1234A)",
                    },
                  })}
                  className="inputcolumn-ourProfile"
                  placeholder="Ex. AAAPA1234A"
                />
                {errors.panCardNumber && (
                  <p className="text-danger">{errors.panCardNumber.message}</p>
                )}
              </Col>
              <Col sm={12} md={6} lg={6}>
                <label>PAN Card Upload: </label>
                <input
                  className="inputcolumn-ourProfile"
                  style={{ outline: "none", height: "50px" }}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  {...register("panUpload")}
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const fileUrl = URL.createObjectURL(e.target.files[0]);
                      setValue("panPreview", fileUrl);
                      setValue("panFileName", e.target.files[0].name);
                    }
                  }}
                />
                {errors.panUpload && (
                  <p className="text-danger">{errors.panUpload.message}</p>
                )}
              </Col>
            </Row>
            <Row className="px-3">
              <Col sm={8} md={6} lg={6}>
                <label>Select Document Type: </label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <select
                    value={currentDocType}
                    onChange={(e) => setCurrentDocType(e.target.value)}
                    className="inputcolumn-ourProfile"
                    style={{ flex: 1 }}
                  >
                    <option value="">Select Document</option>
                    {availableDocTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {/* <Button
                    className="button1 m-2 p-2"
                    onClick={addDocument}
                    disabled={!currentDocType}
                    style={{ marginLeft: "10px" }}
                  >
                    Add Document
                  </Button> */}
                </div>
              </Col>
              <Col style={{ alignSelf: "center" }}>
                <Button
                  className="p-2"
                  onClick={addDocument}
                  disabled={!currentDocType}
                  style={{ marginLeft: "10px", alignSelf: "center" }}
                >
                  Add Document
                </Button>
              </Col>
            </Row>

            {documents.map((doc, index) => (
              <Row key={doc.id} className="px-3">
                <Col sm={12} md={6} lg={6}>
                  <label>{doc.proofType}: </label>
                  <input
                    {...register(`proofNumber_${doc.id}`, {
                      ...getValidationRules(doc.proofType),
                    })}
                    className="inputcolumn-ourProfile"
                    placeholder={`Enter ${doc.proofType} number`}
                  />
                  {errors[`proofNumber_${doc.id}`] && (
                    <p className="text-danger">
                      {errors[`proofNumber_${doc.id}`].message}
                    </p>
                  )}
                </Col>
                <Col sm={12} md={6} lg={6}>
                  <label>Upload {doc.proofType}: </label>
                  <div style={{ display: "flex", alignItems: "flex-start" }}>
                    <input
                      className="inputcolumn-ourProfile"
                      style={{ outline: "none", height: "50px", flex: 1 }}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register(`proofUpload_${doc.id}`)}
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          const fileUrl = URL.createObjectURL(
                            e.target.files[0]
                          );
                          setValue(`proofPreview_${doc.id}`, fileUrl);
                          setValue(
                            `proofFileName_${doc.id}`,
                            e.target.files[0].name
                          );
                        }
                      }}
                    />
                    <Button
                      variant="danger"
                      className="m-2 p-2"
                      onClick={() => deleteDocument(doc.id, doc.proofType)}
                      style={{ marginLeft: "10px" }}
                    >
                      <MdDelete />
                    </Button>
                  </div>
                  {errors[`proofUpload_${doc.id}`] && (
                    <p className="text-danger">
                      {errors[`proofUpload_${doc.id}`].message}
                    </p>
                  )}
                </Col>
                <input
                  type="hidden"
                  {...register(`proofType_${doc.id}`)}
                  value={doc.proofType}
                />
              </Row>
            ))}
            <Row>
              <Col lg={3}>
                {(userKYCDetail?.panUpload || watch("panPreview")) && (
                  <>
                    <img
                      src={watch("panPreview") || userKYCDetail.panUpload}
                      alt="PAN Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        marginTop: "10px",
                      }}
                    />
                    <p>PAN Card</p>
                  </>
                )}
              </Col>
              <Col lg={3}>
                {(userKYCDetail?.aadhaarUpload || watch("aadhaarPreview")) && (
                  <>
                    <img
                      src={
                        watch("aadhaarPreview") || userKYCDetail.aadhaarUpload
                      }
                      alt="Aadhaar Preview"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "contain",
                        marginTop: "10px",
                      }}
                    />
                    <p>Aadhaar Card</p>
                  </>
                )}
              </Col>
              {documents.map((doc, index) => (
                <Col lg={3} key={`preview_${doc.id}`}>
                  {(userKYCDetail?.documents?.[index]?.proofUpload ||
                    watch(`proofPreview_${doc.id}`)) && (
                    <>
                      <img
                        src={
                          watch(`proofPreview_${doc.id}`) ||
                          userKYCDetail?.documents?.[index]?.proofUpload
                        }
                        alt="Proof Preview"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "contain",
                          marginTop: "10px",
                        }}
                      />
                      <p>{doc.proofType}</p>
                    </>
                  )}
                </Col>
              ))}
            </Row>
            <center>
              <div
                className="submitbuttons px-4"
                style={{ flexDirection: "unset" }}
              >
                <Button className="button1 m-2 p-2" type="submit">
                  Submit
                </Button>
                <button className="button2 m-2 p-2" type="reset">
                  Cancel
                </button>
              </div>
            </center>
          </form>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Kycvendor;
