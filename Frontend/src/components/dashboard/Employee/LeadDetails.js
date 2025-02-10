import React, { useEffect, useState } from "react";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Descriptions, Card } from "antd";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Api from "../../../Api";
import axios from "axios";

function LeadDetails({ collapsed }) {
  const userId = localStorage.getItem("id");
  const { id } = useParams(); 
  const location = useLocation();
  const navigate = useNavigate();
  // const { record } = location.state || {};
   const { state } = useLocation();
    const record = state?.record;
  const [remarksFields, setRemarksFields] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
    const [loading, setLoading] = useState(false);

  console.log("record", record);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  useEffect(() => {
    if (fetchedData) {
      const initialRemarks = fetchedData.addremarks?.length
        ? fetchedData.addremarks.map((field) => ({ ...field, prefilled: true }))
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
  }, [fetchedData, reset]);

  const addRemarkField = () => {
    setRemarksFields([
      ...remarksFields,
      { date: "", remarks: "", status: "", prefilled: false },
    ]);
    // toast.success("Remark added successfully!");
  };

  const removeRemarkField = (index) => {
    const updatedFields = remarksFields.filter((_, i) => i !== index);
    setRemarksFields(updatedFields);
    // toast.warn("Remark removed!");
    const defaultValues = updatedFields.reduce((acc, field, i) => {
      acc[`date_${i}`] = field.date;
      acc[`remarks_${i}`] = field.remarks;
      acc[`status_${i}`] = field.status;
      return acc;
    }, {});
    reset(defaultValues);
  };

  const onSubmit = async (data) => {
    const formattedRemarks = remarksFields.map((field, index) => ({
      date: data[`date_${index}`],
      remarks: data[`remarks_${index}`],
      status: data[`status_${index}`],
      // notiFicatioinStauts: "false",
    }));

    const details = {
      firstname: fetchedData.firstname,
      lastname: fetchedData.lastname,
      userId: fetchedData.id,
      contactNumber: fetchedData.phone,
      email: fetchedData.email,
      aadhar: fetchedData.aadhar,
      purpose: fetchedData.purpose,
      amount: fetchedData.amount,
      addremarks: formattedRemarks,
      panno: fetchedData.panno,
    };

    try {
      await axios.put(
        `http://localhost:5000/lead/updatelead/${record._id}`,
        details
      );
      // toast.success("Form submitted successfully");
      toast.success("Remark added successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      // toast.error("An error occurred while submitting the form");
      toast.error("An error occurred while submitting the remark");
    }
  };
  useEffect(() => {
    fetchLead();
  }, [id]);  // Fetch lead when ID changes

  const fetchLead = async () => {
    setLoading(true);
    try {
      const response = await Api.get(`http://localhost:5000/lead/getByleaddetails/${id}`);
      setFetchedData(response.data.data[0]);
      console.log("Fetched Lead Data:", response.data);
    } catch (error) {
      console.error("Error fetching lead details:", error);
    } finally {
      setLoading(false);
    }
  };
  if (!fetchedData) {
    return <p>No details available.</p>;
  }

  return (
    <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
      <div>
        <center>
          <h3>Lead Details</h3>
        </center>
      </div>
      <div style={{marginTop:"20px"}}>
        <Row className="px-2">
          <Col lg={12} md={12}>
            <Card
              style={{ width: "200%" }}
              className="loandetail-custom-card"
              title="Lead Details"
            >
              <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                <Descriptions.Item label="Name">{`${fetchedData.firstname} ${fetchedData.lastname}`}</Descriptions.Item>
                <Descriptions.Item label="Email">
                  {fetchedData.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {fetchedData.contactNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Aadhar Number">
                  {fetchedData.aadhar}
                </Descriptions.Item>
                <Descriptions.Item label="PAN Card Number">
                  {fetchedData.panno}
                </Descriptions.Item>
                <Descriptions.Item label="How Immediate">
                  {fetchedData.howimidiate}
                </Descriptions.Item>
                <Descriptions.Item label="Previously Applied">
                  {fetchedData.previouslyapplied}
                </Descriptions.Item>
                <Descriptions.Item label="Loan Amount">
                  {fetchedData.amount}
                </Descriptions.Item>
                <Descriptions.Item label="Purpose Of Loan">
                  {fetchedData.purpose}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
        </div>
        <Button
          type="primary"
          style={{ marginTop: "20px",marginLeft:"20px" }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
     

      <div className="mt-3">
        <ToastContainer position="top-right" autoClose={3000} />
        <h3>Add Remarks</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 p-3">
          {remarksFields.map((field, index) => (
            <Row key={index} className="mb-3">
              <Col xs={24} md={8} className="pe-md-3">
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
              <Col xs={24} md={8} className="pe-md-3">
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
              <Col xs={24} md={8}>
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
            </Row>
          ))}
          <Row className="mb-3">
            <Col>
              <button
                type="button"
                className="btn btn-success me-2"
                onClick={addRemarkField}
              >
                +
              </button>
              {remarksFields.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeRemarkField(remarksFields.length - 1)}
                >
                  -
                </button>
              )}
            </Col>
          </Row>
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default LeadDetails;
