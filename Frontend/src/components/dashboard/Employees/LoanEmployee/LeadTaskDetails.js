import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

function LeadTaskDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  //   const { record } = location.state || {};
  const [remarksFields, setRemarksFields] = useState([]);
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    if (record) {
      const initialRemarks = record.addremarks?.length
        ? record.addremarks.map((field) => ({ ...field, prefilled: true }))
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
  }, [record, reset]);

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
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Handle null/undefined
    return new Date(dateString).toLocaleDateString("en-CA"); // "en-CA" gives "YYYY-MM-DD"
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
    <div style={{ margin: "50px", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Lead Details
      </h2>

      <div>
        <Row>
          <Col span={6}>
            <strong>Name:</strong>
          </Col>
          <Col span={18}>{`${record.firstname} ${record.lastname}`}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Email:</strong>
          </Col>
          <Col span={18}>{record.email}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Phone:</strong>
          </Col>
          <Col span={18}>{record.contactNumber}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Loan Amount:</strong>
          </Col>
          <Col span={18}>{record.amount}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Aadhar Number:</strong>
          </Col>
          <Col span={18}>{record.aadhar}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>PAN Card Number:</strong>
          </Col>
          <Col span={18}>{record.panno}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Purpose Of Loan:</strong>
          </Col>
          <Col span={18}>{record.purpose}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>How Immediate:</strong>
          </Col>
          <Col span={18}>{record.howimidiate}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Previously Applied:</strong>
          </Col>
          <Col span={18}>{record.previouslyapplied}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Task Message</strong>
          </Col>
          <Col span={18}>{record.description}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Task Assigned Start Date</strong>
          </Col>
          <Col span={18}>{formatDate(record.startDate)}</Col>
        </Row>
        <Row>
          <Col span={6}>
            <strong>Task Assigned End Date</strong>
          </Col>
          <Col span={18}>{formatDate(record.endDate)}</Col>
        </Row>
        {/* 
        <h3 style={{ marginBottom: "20px", marginTop: "20px" }}>Reminders</h3>

        {record.addremarks && record.addremarks.length > 0 ? (
          record.addremarks.map((remark, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <Row>
                <Col span={6}>
                  <strong>Date:</strong>
                </Col>
                <Col span={18}>{remark.date}</Col>
              </Row>
              <Row>
                <Col span={6}>
                  <strong>Message:</strong>
                </Col>
                <Col span={18}>{remark.remarks}</Col>
              </Row>

              <hr style={{ margin: "10px 0" }} />
            </div>
          ))
        ) : (
          <p>No reminders available.</p>
        )} */}

        <Button
          type="primary"
          style={{ marginTop: "20px" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>

      <div className="mt-3">
        <h3>Add Remarks</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 p-3">
          {remarksFields.map((field, index) => (
            <Row key={index} className="mb-3">
              <Col lg={8} md={12}>
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
              <Col xs={24} md={12} lg={8}>
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
              <Col xs={24} md={12} lg={8}>
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
              <Col xs={24} md={12} lg={8} className="d-flex align-items-center">
                {!field.prefilled && remarksFields.length > 1 && (
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

export default LeadTaskDetails;
