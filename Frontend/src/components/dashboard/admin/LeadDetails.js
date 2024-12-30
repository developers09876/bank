import React from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


function LeadDetails() {
  const { state } = useLocation();
  const record = state?.record;
console.log('record', record)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!record) {
    return <p>No details available</p>;
  }
  //const Add remark;
  const onSubmit = async (data) => {
    console.log('data', data)
    const details = {
      firstname: record.firstname,
      lastname: record.lastname,
      userId: record.id,
      contactNumber: record.phone,
      email: record.email,
      aadhar: record.aadhar,
      purpose: record.purpose,
      amount: record.amount,
      howimidiate: data.howimidiate,
      previouslyapplied: data.previouslyapplied,
      panno: record.panno,
        SAddremark:{
      date: data.date,
      remarks: data.remarks,
      status: data.status,
      }
      //Addremark :[SAddremark]
    };
console.log('details', details)
    try {
      await axios.put(`http://localhost:5000/lead/updatelead/${record._id}`, details);
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div style={{ marginTop: "50px", padding: "20px" }}>
      <h3>Loan Details</h3>
      <div>
        <p>
          <strong>Name:</strong> {`${record.firstname} ${record.lastname}`}
        </p>
        <p>
          <strong>Email:</strong> {record.email}
        </p>
        <p>
          <strong>Phone:</strong> {record.phone}
        </p>
        <p>
          <strong>Loan Amount:</strong> {record.amount}
        </p>
        <p>
          <strong>Aadhar Number:</strong> {record.aadhar}
        </p>
        <p>
          <strong>PAN Card Number:</strong> {record.panno}
        </p>
        <p>
          <strong>Purpose Of Loan:</strong> {record.purpose}
        </p>
      </div>
      <div className="mt-3">
        <h3>Add Remarks</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 p-3">
          <Row>
            <Col lg={4} md={6}>
              <label className="vendorpage_labelCss">Date</label>
              <input
                type="date"
                className="inputcolumn-ourProfile"
                {...register("date", { required: true })}
              />
              {errors.date && <p className="text-danger">Date is required</p>}
            </Col>
            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Remarks</label>
              <textarea
                className="inputcolumn-ourProfile"
                {...register("remarks", { required: true })}
                placeholder="Remarks"
              />
              {errors.remarks && (
                <p className="text-danger">Remarks are required</p>
              )}
            </Col>
            <Col xs={12} md={6} lg={4}>
              <label className="vendorpage_labelCss">Status</label>
              <select
                className="inputcolumn-ourProfile"
                {...register("status", { required: true })}
              >
                <option value="">-- SELECT --</option>
                <option value="Rejected">Rejected</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Approved">Approved</option>
              </select>
              {errors.status && <p className="text-danger">Status is required</p>}
            </Col>
          </Row>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeadDetails;
