import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Card, Descriptions, Tag, Space, Divider } from "antd";
import "../../dashboard/user/LoanDetails.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const InsuranceTaskViewDetails = ({ collapsed }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);

  const [employeeName, setEmployeeName] = useState();

  const [remarksFields, setRemarksFields] = useState([]);

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

  const onSubmit = async (data) => {
    const formattedRemarks = remarksFields.map((field, index) => ({
      date: data[`date_${index}`],
      remarks: data[`remarks_${index}`],
      status: data[`status_${index}`],
      // notiFicatioinStauts: "false",
    }));
    const details = {
      addremarks: formattedRemarks,
    };

    try {
      await axios.put(
        `http://localhost:5000/insuranceManagement/updateInsuranceremarks/${record._id}`,
        details
      );
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while submitting the form");
    }
  };

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/signup/getby/${record.employeeId}`
        );
        console.log("response employee data", response);
        setEmployeeName(`${response.data.firstname} ${response.data.lastname}`);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchEmployeeDetail();
  }, [record.employeeId]);

  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Insurance Details</h3>
            </center>
            <div className="px-2" style={{ textAlign: "end" }}>
              <Tag
                icon={
                  record.status === "Pending" ? (
                    <ClockCircleOutlined />
                  ) : record.status === "2" ? (
                    <CloseCircleOutlined />
                  ) : record.status === "1" ? (
                    <CheckCircleOutlined />
                  ) : null
                }
                color={
                  record.status === "Pending"
                    ? "orange"
                    : record.status === "2"
                    ? "red"
                    : record.status === "1"
                    ? "green"
                    : null
                }
                className={`status-tag ${
                  record.status === "1"
                    ? "approved"
                    : record.status === "2"
                    ? "rejected"
                    : "pending"
                }`}
              >
                {record.status === "1" ? (
                  <p style={{ display: "inline" }}>Approved</p>
                ) : record.status === "2" ? (
                  <p style={{ display: "inline" }}>Rejected</p>
                ) : (
                  <p style={{ display: "inline" }}>Pending</p>
                )}
              </Tag>
            </div>
          </div>
          <Row className="px-2 py-4">
            {/* <Col>
              <Card>
                <Row>
                  <Col
                    className="firstrowcol px-1 py-1"
                    lg={3}
                    style={{
                      height: "auto",
                      alignContent: "center",
                      borderRight: "1px #e5e7eb solid",
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
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Personal Details">
                <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Name">
                    {record.firstname} {record.lastname}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email Id">
                    {record.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact ">
                    {record.contactNumber}
                  </Descriptions.Item>
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
              </Card>
            </Col>
            <Col lg={12} md={12}>
              <Card
                // style={{ width: "100%" }}
                className="loandetail-custom-card"
                title="Insurance Details"
              >
                <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Policy Type">
                    {record.PolicyType}
                  </Descriptions.Item>
                  {record.PolicyType === "Vehicle Insurance" &&
                    record.VehicleType && (
                      <Descriptions.Item label="Vehicle Type">
                        {record.VehicleType}
                      </Descriptions.Item>
                    )}
                  <Descriptions.Item label="Policy Amount">
                    {record.policyAmount}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sum Assured">
                    {record.sumAssured}
                  </Descriptions.Item>
                  <Descriptions.Item label="Policy Term">
                    {record.policyTerm}
                  </Descriptions.Item>
                  <Descriptions.Item label="Annual Income">
                    {record.annualIncome}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Insurance Status">
                <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Approval Status">
                    {record.status === "1" ? (
                      <p color="green">Approved</p>
                    ) : record.status === "2" ? (
                      <p color="red">Rejected</p>
                    ) : (
                      <p color="orange">Pending</p>
                    )}
                  </Descriptions.Item>
                  {record.status === "2" && (
                    <Descriptions.Item label="Reason for Rejection">
                      {record.rejectionReason}
                    </Descriptions.Item>
                  )}
                  {record.status === "Pending" && record.pendingReason && (
                    <Descriptions.Item label="Reason for Hold">
                      {record.pendingReason}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </Card>
            </Col>
          </Row>
          <Row className="px-2 py-2">
            <center>
              <h5>
                <b>Task Details:</b>
              </h5>
            </center>
            <Col lg={12} md={12}>
              <Card
                className="loandetail-custom-card"
                title="Task Assigned Details"
              >
                <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Employee Name">
                    {employeeName}
                  </Descriptions.Item>
                  <Descriptions.Item label="Employee Type">
                    {record.employeeType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Employee Category">
                    {record.employeeCategory}
                  </Descriptions.Item>
                  <Descriptions.Item label="Description">
                    {record.description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start Date">
                    {record.startDate ? record.startDate.split("T")[0] : "N/A"}
                  </Descriptions.Item>
                  <Descriptions.Item label="End Date">
                    {record.endDate ? record.endDate.split("T")[0] : "N/A"}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
          <Row className="px-2 py-3">
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Reminders">
                <Descriptions column={{ xl: 3, lg: 3, xs: 1, md: 1, sm: 1 }}>
                  {record.addremarks && record.addremarks.length > 0 ? (
                    record.addremarks.map((remark, index) => (
                      <React.Fragment key={index}>
                        <Descriptions.Item label="Date">
                          {remark.date}
                        </Descriptions.Item>
                        <Descriptions.Item label="Message">
                          {remark.remarks}
                        </Descriptions.Item>
                        <Descriptions.Item label="Status">
                          {remark.status}
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
                  <Col
                    lg={4}
                    md={6}
                    xs={12}
                    className="px-1 py-1  d-flex align-items-center"
                  >
                    {!field.prefilled && remarksFields.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={() => removeRemarkField(index)}
                      >
                        -
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-success"
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
      </div>
    </div>
  );
};

export default InsuranceTaskViewDetails;
