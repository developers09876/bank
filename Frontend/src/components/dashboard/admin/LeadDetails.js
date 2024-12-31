

import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function LeadDetails() {
  const { state } = useLocation();
  const record = state?.record;
  const [remarksFields, setRemarksFields] = useState([
    { date: "", remarks: "", status: "" },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!record) {
    return <p>No details available</p>;
  }

  const onSubmit = async (data) => {
    const formattedRemarks = remarksFields.map((field, index) => ({
      date: data[`date_${index}`],
      remarks: data[`remarks_${index}`],
      status: data[`status_${index}`],
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
      addremark: formattedRemarks,
      panno: record.panno,
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

  const addRemarkField = () => {
    setRemarksFields([
      ...remarksFields,
      { date: "", remarks: "", status: "" },
    ]);
  };

  const removeRemarkField = (index) => {
    setRemarksFields(remarksFields.filter((_, i) => i !== index));
  };

  return (
    <div style={{ marginTop: "50px", padding: "20px" }}>
      <h3>Lead Details</h3>
      <div>
  <Row>
    <Col xs={2}>
      <p>
        <strong>Name:</strong>
      </p>
    </Col>
    <Col xs={7}>
      <p>{`${record.firstname} ${record.lastname}`}</p>
    </Col>
  </Row>
  <Row>
    <Col xs={2}>
      <p>
        <strong>Email:</strong>
      </p>
    </Col>
    <Col xs={7}>
      <p>{record.email}</p>
    </Col>
  </Row>
  <Row>
    <Col xs={2}>
      <p>
        <strong>Phone:</strong>
      </p>
    </Col>
    <Col xs={7}>
      <p>{record.phone}</p>
    </Col>
  </Row>
  <Row>
    <Col xs={2}>
      <p>
        <strong>Loan Amount:</strong>
      </p>
    </Col>
    <Col xs={7}>
      <p>{record.amount}</p>
    </Col>
  </Row>
  <Row>
    <Col xs={2}>
      <p>
        <strong>Aadhar Number:</strong>
      </p>
    </Col>
    <Col xs={7}>
      <p>{record.aadhar}</p>
    </Col>
  </Row>
  <Row>
    <Col xs={2}>
      <p>
        <strong>PAN Card Number:</strong>
      </p>
    </Col>
    <Col xs={7}>
      <p>{record.panno}</p>
    </Col>
  </Row>
  <Row>
    <Col xs={2}>
      <p>
        <strong>Purpose Of Loan:</strong>
      </p>
    </Col>
    <Col xs={7}>
      <p>{record.purpose}</p>
    </Col>
  </Row>
</div>

      <div className="mt-3">
        <h3>Add Remarks</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 p-3">
          {remarksFields.map((_, index) => (
            <Row key={index} className="mb-3">
              <Col lg={4} md={6}>
                <label className="vendorpage_labelCss">Date</label>
                <br/>
                <input
                  type="date"
                  className="inputcolumn-ourProfile"
                  {...register(`date_${index}`, { required: true })}
                />
                {errors[`date_${index}`] && (
                  <p className="text-danger">Date is required</p>
                )}
              </Col>
              <Col xs={12} md={6} lg={4}>
                <label className="vendorpage_labelCss">Remarks</label>
                <textarea
                  className="inputcolumn-ourProfile"
                  {...register(`remarks_${index}`, { required: true })}
                  placeholder="Remarks"
                />
                {errors[`remarks_${index}`] && (
                  <p className="text-danger">Remarks are required</p>
                )}
              </Col>
              <Col xs={12} md={6} lg={4}>
                <label className="vendorpage_labelCss">Status</label>
                <select
                  className="inputcolumn-ourProfile"
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
              <Col xs={12} md={6} lg={4} className="d-flex align-items-center">
                {remarksFields.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => removeRemarkField(index)}
                  >
                    -
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-success ms-2"
                  onClick={addRemarkField}
                >
                  +
                </button>
              </Col>
            </Row>
          ))}
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeadDetails;
