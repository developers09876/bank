import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";
import { Select, Card, Descriptions } from "antd";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import "../user/LoanDetails.css";

function LeadTaskDetails({ collapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  //   const { record } = location.state || {};
  const [remarksFields, setRemarksFields] = useState([]);

  const { state } = useLocation();
  const record = state?.record;
  const [isApproved, setIsApproved] = useState(record?.isApproved || false);
  const [details, setDetails] = useState();
  console.log("details", details);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    if (details) {
      const initialRemarks = details.addremarks?.length
        ? details.addremarks.map((field) => ({ ...field, prefilled: true }))
        : [{ date: "", remarks: "", status: "", prefilled: false }];

      setRemarksFields(initialRemarks);

      const defaultValues = initialRemarks.reduce((acc, field, index) => {
        acc[`date_${index}`] = field.date;
        acc[`remarks_${index}`] = field.remarks;
        acc[`status_${index}`] = field.status;
        return acc;
      }, {});

      reset(defaultValues);
    }
  }, [details, reset]); // Runs when `details` updates

  const addRemarkField = () => {
    setRemarksFields([
      ...remarksFields,
      { date: "", remarks: "", status: "", prefilled: false },
    ]);
  };

  const removeRemarkField = (index) => {
    const updatedFields = remarksFields.filter((_, i) => i !== index);
    setRemarksFields(updatedFields);

    const defaultValues = updatedFields.reduce((acc, field, i) => {
      acc[`date_${i}`] = field.date;
      acc[`remarks_${i}`] = field.remarks;
      acc[`status_${i}`] = field.status;
      return acc;
    }, {});
    reset(defaultValues);
  };
  useEffect(() => {
    getlead();
  }, []);
  const getlead = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/lead/getByLeadId/${record._id}`
      );
      setDetails(response.data.data[0]);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const handleApprove = async () => {
    try {
      await axios.put(`http://localhost:5000/lead/updatelead/${record._id}`, {
        ...record,
        isApproved: true,
      });
      setIsApproved(true);
      toast.success("Lead approved successfully");
      await getlead();
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error approving lead");
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle null/undefined
    return new Date(dateString).toLocaleDateString("en-CA"); // "en-CA" gives "YYYY-MM-DD"
  };

  const deleteRemark = async (remarkId) => {
    try {
      await axios.delete(
        `http://localhost:5000/lead/delete/${record._id}/remark/${remarkId}`
      );
      setRemarksFields(
        remarksFields.filter((remark) => remark._id !== remarkId)
      );
      toast.success("Remark deleted successfully");
    } catch (error) {
      console.error("Error deleting remark:", error.message);
      toast.error("Failed to delete remark");
    }
  };

  const onSubmit = async (data) => {
    const formattedRemarks = remarksFields.map((field, index) => ({
      date: data[`date_${index}`],
      remarks: data[`remarks_${index}`],
      status: data[`status_${index}`],
      // notiFicatioinStauts: "false",
    }));

    const details = {
      firstname: record.firstname,
      lastname: record.lastname,
      userId: record.id,
      contactNumber: record.phone,
      email: record.email,
      aadhar: record.aadhar,
      purpose: record.purpose,
      amount: record.amount,
      addremarks: formattedRemarks,
      panno: record.panno,
      isApproved: true,
    };

    try {
      await axios.put(
        `http://localhost:5000/lead/updatelead/${record._id}`,
        details
      );
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while submitting the form");
    }
  };

  if (!record) {
    return <p>No details available.</p>;
  }

  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Lead Details</h3>
            </center>
          </div>
          <Row className="px-4 py-3">
            {/* <Col>
              <Card>
                <Row>
                  <Col
                    className="firstrowcol px-1 py-1"
                    lg={3}
                    // md={12}
                    style={{
                      height: "auto",
                      alignContent: "center",
                      // borderRight: "1px #e5e7eb solid",
                      textAlign: "-webkit-center",
                    }}
                  >
                    <div className="photo-preview mb-2">
                      <img
                        src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                        //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM_uVhUxuWMjezl0rV0KPIad0chGa4Pw6aA&s"
                        // src={record.photographs}
                        alt="Photograph"
                        className="photo-image"
                        style={{
                          width: "100px",
                          height: "100px",
                          //   objectFit: "cover",
                          borderRadius: "50%",
                          border: "6px solid #80808040",
                        }}
                      />
                    </div>
                    <p>
                      {record.firstname} {record.lastname}
                    </p>
                    <p>{record.email}</p>
                    <p>{record.contactNumber}</p>
                  </Col>

                  <Col lg={9} className="px-3 py-1">
                    <center>
                      <h6>Other Information</h6>
                    </center>
                    <Descriptions
                      size="small"
                      // layout="vertical"
                      style={{
                        paddingBottom: "10px",
                      }}
                      column={{ xl: 1, lg: 1, xs: 1, md: 1, sm: 1 }}
                    >
                      <Descriptions.Item label="Adhaar Number">
                        {record.aadhar}
                      </Descriptions.Item>
                      <Descriptions.Item label="PanCard Number">
                        {record.panno}
                      </Descriptions.Item>
                      <Descriptions.Item label="GST Number">
                        {record.gst}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Col> */}
            <Row className="px-2 py-3">
              <Col lg={12} md={12}>
                <Card
                  style={{ width: "100%" }}
                  className="loandetail-custom-card"
                  title="Personal Details"
                >
                  <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Name">
                      {record.firstname} {record.lastname}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email Id">
                      {record.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Contact Number">
                      {record.contactNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Alter PhoneNumber ">
                      {record.alternumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Adhaar Number">
                      {record.aadhar}
                    </Descriptions.Item>
                    <Descriptions.Item label="PanCard Number">
                      {record.panno}
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="GST Number">
                                    {record.gst}
                                  </Descriptions.Item> */}
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </Row>
          <Row className="px-2">
            {record.serviceType === "LoanEmployee" && (
              <Col lg={12} md={12}>
                <Card
                  style={{ width: "100%" }}
                  className="loandetail-custom-card"
                  title="Lead Details"
                >
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Service Type">
                      Loan
                    </Descriptions.Item>
                    <Descriptions.Item label="Loan Amount">
                      {record.amount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Purpose Of Loan">
                      {record.purpose}
                    </Descriptions.Item>
                    {record.userType && (
                      <Descriptions.Item label="User Type">
                        {record.userType}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Previously Applied">
                      {record.previouslyapplied}
                    </Descriptions.Item>
                    <Descriptions.Item label="How Immediate">
                      {record.howimidiate}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            )}
            {record.serviceType === "TaxEmployee" && (
              <Col lg={12} md={12}>
                <Card
                  style={{ width: "100%" }}
                  className="loandetail-custom-card"
                  title="Lead Details"
                >
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Service Type">
                      Tax
                    </Descriptions.Item>
                    <Descriptions.Item label="Tax Category">
                      {record.taxType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sub-Category">
                      {record.subCategory}
                    </Descriptions.Item>
                    <Descriptions.Item label="IncomeTax Filling Status">
                      {record.incomeTaxStatus}
                    </Descriptions.Item>
                    {record.userType && (
                      <Descriptions.Item label="User Type">
                        {record.userType}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Business Type">
                      {record.businessType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Previously Applied">
                      {record.previouslyapplied}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            )}
            {record.serviceType === "InsuranceEmployee" && (
              <Col lg={12} md={12}>
                <Card
                  style={{ width: "100%" }}
                  className="loandetail-custom-card"
                  title="Lead Details"
                >
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Service Type">
                      Insurance
                    </Descriptions.Item>
                    <Descriptions.Item label="Insurance Category">
                      {record.insuranceType}
                    </Descriptions.Item>
                    {record.insuranceType === "Vehicle Insurance" &&
                      record.VehicleType && (
                        <Descriptions.Item label="Vehicle Type">
                          {record.VehicleType}
                        </Descriptions.Item>
                      )}
                    <Descriptions.Item label="Policy Term">
                      {record.PolicyTerm}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sum Assured">
                      {record.sumAssured}
                    </Descriptions.Item>
                    <Descriptions.Item label="Previously Applied">
                      {record.previouslyapplied}
                    </Descriptions.Item>
                    {record.userType && (
                      <Descriptions.Item label="User Type">
                        {record.userType}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Col>
            )}
          </Row>

          {/* {record.addremarks && record.addremarks.length > 0 ? (
          record.addremarks.map((remark, index) => ( */}
          {/* <div key={index} style={{ marginBottom: "10px" }}> */}
          <Row className="px-2">
            <Col lg={12} md={12}>
              <Card
                style={{ width: "100%" }}
                className="loandetail-custom-card"
                title="Reminders"
              >
                <Descriptions column={{ xl: 1, lg: 1, xs: 1, md: 1, sm: 1 }}>
                  {details?.addremarks && details?.addremarks.length > 0 ? (
                    details?.addremarks.map((remark, index) => (
                      <React.Fragment key={index}>
                        <Descriptions.Item label="Date">
                          {remark.date}
                        </Descriptions.Item>
                        <Descriptions.Item label="Message">
                          {remark.remarks}
                        </Descriptions.Item>
                      </React.Fragment>
                    ))
                  ) : (
                    <Descriptions.Item>
                      No reminders available.
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>
            </Col>
          </Row>
          {/* </div> */}
          {/* ))
        ) : (
          <p>No reminders available.</p>
        )} */}

          <div className="text-center my-3">
            {!isApproved ? (
              <Button variant="success" onClick={handleApprove}>
                Approve
              </Button>
            ) : (
              <h4 className="text-success">Approved</h4>
            )}
          </div>
          {isApproved && (
            <div className="mt-3">
              <h3>Add Remarks</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-3 p-3">
                {remarksFields.map((field, index) => (
                  <Row key={index} className="mb-3">
                    <Col lg={4} md={6} xs={12}>
                      <label>Date</label>
                      <input
                        type="date"
                        className="form-control"
                        {...register(`date_${index}`, { required: true })}
                      />
                      {errors[`date_${index}`] && (
                        <p className="text-danger">Date is required</p>
                      )}
                    </Col>
                    <Col lg={4} md={6} xs={12}>
                      <label>Status</label>
                      <select
                        className="form-control"
                        {...register(`status_${index}`, { required: true })}
                      >
                        <option value="">-- SELECT --</option>
                        <option value="Rejected">Rejected</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Approved">Approved</option>
                      </select>
                      {errors[`status_${index}`] && (
                        <p className="text-danger">Status is required</p>
                      )}
                    </Col>
                    <Col lg={4} md={6} xs={12}>
                      <label>Remarks</label>
                      <textarea
                        className="form-control"
                        {...register(`remarks_${index}`, { required: true })}
                        placeholder="Remarks"
                      />
                      {errors[`remarks_${index}`] && (
                        <p className="text-danger">Remarks are required</p>
                      )}
                    </Col>

                    {!field.prefilled && (
                      <Col lg={4} className="d-flex align-items-center">
                        <Button
                          variant="danger"
                          onClick={() => removeRemarkField(index)}
                        >
                          -
                        </Button>
                      </Col>
                    )}
                    {field.prefilled && (
                      <Col
                        lg={4}
                        className="px-1 py-1 d-flex align-items-center"
                      >
                        <Button variant="success" onClick={addRemarkField}>
                          +
                        </Button>
                        {field._id && (
                          <FaTrash
                            className="text-danger cursor-pointer ms-2"
                            onClick={() => deleteRemark(field._id)}
                          />
                        )}
                      </Col>
                    )}
                  </Row>
                ))}

                <button type="submit" className="btn btn-primary mt-3">
                  Submit
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeadTaskDetails;
