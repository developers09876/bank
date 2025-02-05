import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  Card,
  Descriptions,
  Tag,
  Space,
  Divider,
  Modal,
  Input,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";
import { toast, ToastContainer } from "react-toastify";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
// import "../../user/LoanDetails.css";
import "../user/LoanDetails.css";
import { Col, Row, Button } from "react-bootstrap";
import { BorderRight } from "@mui/icons-material";
import Api from "../../../Api";
const { Option } = Select;

const LoanDetails = ({ collapsed }) => {
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);
  const id = localStorage.getItem("regid");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [loan, setLoan] = useState([]);
  const navigate = useNavigate();
  const dateFormat = new Date(record.dob).toISOString().split("T")[0];
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeName, setEmployeeName] = useState();
  const [employeeCategory, setemployeeCategory] = useState();
  const [selectedEmployeeType, setSelectedEmployeeType] =
    useState("LoanEmployee");
  const [assignValue, setAssignValue] = useState([]);
  console.log("assignValue", assignValue);
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // employeeType: "",
      employeeId: "",
      loanType: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const category = watch("loanType");
  console.log("category", category);
  const employeeCategories = {
    LoanEmployee: [
      "Home Loan",
      "Business Loan",
      "Vehicle Loan",
      "Personal Loan",
    ],
  };
  const employeeType = "employee";
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await Api.get(`signup/getbyUserType/${employeeType}`);
        setEmployeeList(response.data);
        console.log("responseemployee", response.data);
      } catch (error) {
        console.error("Error fetching employee list:", error);
        toast.error("Failed to fetch employee list.");
      }
    };
    fetchEmployeeList();
  }, [employeeType]);
  const filteredEmployeeList = employeeList.filter((employee) =>
    employee.services.includes(selectedEmployeeType)
  );

  const handleModalOk = () => {
    setSelectedRecord(null);
  };

  const handleModalCancel = () => {
    setSelectedRecord(null);
  };
  useEffect(() => {
    getbyLeadId();
  }, []);

  const getbyLeadId = async () => {
    await Api.get(`/loanform/getby/${record._id}`).then((res) => {
      const data = res.data;
      setAssignValue(data);
      reset({
        employeeType: data?.employeeType || "LoanEmployee",
        employeeId: data?.employeeId || "",
        loanType: data?.loanType || "",
        startDate: data?.startDate ? data.startDate.split("T")[0] : "",
        endDate: data?.endDate ? data.endDate.split("T")[0] : "",
        description: data?.description || "",
      });
      setSelectedEmployeeType(data?.employeeType || "LoanEmployee");
    });
  };
  const updateStatus = async (id, action, reason = "") => {
    try {
      const details = { action, reason };
      const response = await Api.put(
        `http://localhost:5000/loanform/updateloanapplicationsStaus/${id}`,
        details
      );
      console.log("Response data:", response.data);
      const updatedLoans = loan.map((item) =>
        item._id === id
          ? {
              ...item,
              status: action === "approve" ? "1" : "2",
              rejectionReason: action === "reject" ? reason : null,
            }
          : item
      );
      setLoan(updatedLoans);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleApprove = () => {
    if (record) {
      updateStatus(record._id, "approve");
      navigate("/admin/loanManagement");
    }
  };

  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
  };

  const handleReject = () => {
    if (record && rejectionReason.trim()) {
      updateStatus(record._id, "reject", rejectionReason.trim());
      setIsRejectModalVisible(false);
      setRejectionReason("");
      navigate("/admin/loanManagement");
    } else {
      console.error("Rejection reason is required.");
    }
  };

  const handleReset = () => {
    setRejectionReason("");
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const updateDetails = {
      AdminId: data.AdminId,
      employeeType: data.employeeType,
      loanType: data.loanType,
      employeeList: data.employeeList,
      employeeId: data.employeeId,
      description: data.description,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
    };

    try {
      const response = await Api.put(
        `http://localhost:5000/loanform/updateloan/${record._id}`,
        updateDetails
      );
      toast.success("Task Assigned successfully");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error?.response?.data?.error ||
        "An error occurred while submitting the form";
      toast.error(errorMessage);
    }
  };

  if (!record) {
    return <p>No details available</p>;
  }

  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Loan Details</h3>
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
            <Row className="px-4 py-3">
              <Col>
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
                      {record.photographs ? (
                        <div className="photo-preview mb-2">
                          <img
                            //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM_uVhUxuWMjezl0rV0KPIad0chGa4Pw6aA&s"
                            src={record.photographs}
                            alt="Photograph"
                            className="photo-image"
                            style={{
                              width: "200px",
                              height: "200px",
                              //   objectFit: "cover",
                              border: "6px solid #80808040",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="photo-preview mb-2">
                          <img
                            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                            //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM_uVhUxuWMjezl0rV0KPIad0chGa4Pw6aA&s"
                            // src={record.photographs}
                            alt="Photograph"
                            className="photo-image"
                            style={{
                              width: "200px",
                              height: "200px",
                              //   objectFit: "cover",
                              border: "6px solid #80808040",
                            }}
                          />
                        </div>
                      )}
                      <p>
                        {record.firstname} {record.lastname}
                      </p>
                    </Col>

                    <Col lg={9} className="px-3 py-1">
                      <h6>Personal Info</h6>
                      <Descriptions
                        size="small"
                        // layout="vertical"
                        style={{
                          borderBottom: "1px #e5e7eb solid",
                          paddingBottom: "10px",
                        }}
                        column={{ xl: 3, lg: 2, xs: 1, md: 2, sm: 1 }}
                      >
                        <Descriptions.Item label="Name">
                          {record.firstname} {record.lastname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                          {record.gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">
                          {dateFormat}
                        </Descriptions.Item>
                        <Descriptions.Item label="Marital Status">
                          {record.maritalStatus}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nationality">
                          {record.nationality}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number">
                          {record.contactNumber}
                        </Descriptions.Item>
                      </Descriptions>
                      <h6 style={{ marginTop: "10px" }}>Contact Details</h6>
                      <Descriptions
                        size="small"
                        // layout="vertical"
                        column={{ xl: 3, lg: 2, xs: 1, md: 2, sm: 1 }}
                      >
                        <Descriptions.Item label="Address">
                          {record.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="City">
                          {record.city}
                        </Descriptions.Item>
                        <Descriptions.Item label="District">
                          {record.district}
                        </Descriptions.Item>
                        <Descriptions.Item label="State">
                          {record.state}
                        </Descriptions.Item>
                        <Descriptions.Item label="Country">
                          {record.country}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row className="px-2">
              {/* <Col lg={6} md={12}>
                    <Card
                      className="loandetail-custom-card"
                      title="Personal Details"
                    >
                      <Descriptions
                        size="small"
                        layout="vertical"
                        column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}
                      >
                        <Descriptions.Item label="Name">
                          {record.firstname} {record.lastname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                          {record.gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">
                          {dateFormat}
                        </Descriptions.Item>
                        <Descriptions.Item label="Marital Status">
                          {record.maritalStatus}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nationality">
                          {record.nationality}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col> */}

              {/* <Col lg={6} md={12}>
                    <Card
                      className="loandetail-custom-card"
                      title="Contact Details"
                    >
                      <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                        <Descriptions.Item label="Address">
                          {record.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="City">
                          {record.city}
                        </Descriptions.Item>
                        <Descriptions.Item label="District">
                          {record.district}
                        </Descriptions.Item>
                        <Descriptions.Item label="State">
                          {record.state}
                        </Descriptions.Item>
                        <Descriptions.Item label="Country">
                          {record.country}
                        </Descriptions.Item>
                        <Descriptions.Item label="Pincode">
                          {record.pinCode}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col> */}

              <Col lg={12} md={12}>
                <Card className="loandetail-custom-card" title="Loan Details">
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Agent Name">
                      {record.loanAgentName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Agent Contact">
                      {record.loanAgentContactNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="Loan Amount">
                      {record.loanAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Purpose">
                      {record.loanPurpose}
                    </Descriptions.Item>
                    <Descriptions.Item label="Employment Status">
                      {record.employmentStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="Annual Income">
                      {record.annualIncome}
                    </Descriptions.Item>
                    <Descriptions.Item label="Existing Loans">
                      {record.existingLoans}
                    </Descriptions.Item>
                    <Descriptions.Item label="Credit Score">
                      {record.creditScore}
                    </Descriptions.Item>
                    <Descriptions.Item label="Property Details">
                      {record.propertyDetails}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col lg={12} md={12}>
                <Card className="loandetail-custom-card" title="Loan Status">
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

              <Col lg={12} md={12}>
                <Card
                  className="loandetail-custom-card"
                  title="Nominee Details"
                >
                  <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Nominee Name">
                      {record.nomineeName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Relationship">
                      {record.nomineeRelationship}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {record.nomineeAddress}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              {record.maritalStatus === "Married" && (
                <Col lg={12} md={12}>
                  <Card
                    className="loandetail-custom-card"
                    title="Spouse Details"
                  >
                    <Descriptions
                      column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}
                    >
                      <Descriptions.Item label="Spouse Name">
                        {record.spouseName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Spouse Occupation">
                        {record.spouseOccupation}
                      </Descriptions.Item>
                      <Descriptions.Item label="Spouse Income">
                        {record.spouseIncome}
                      </Descriptions.Item>
                      <Descriptions.Item label="Spouse Designation">
                        {record.spouseDesignation}
                      </Descriptions.Item>
                      {record.totalChildren && record.totalChildren > 0 && (
                        <Descriptions.Item label="Total Children">
                          {record.totalChildren}
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Card>
                </Col>
              )}

              {record.bankName && (
                <Col lg={12} md={12}>
                  <Card className="loandetail-custom-card" title="Bank Details">
                    <Descriptions
                      column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}
                    >
                      <Descriptions.Item label="Bank Name">
                        {record.bankName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Branch Name">
                        {record.branch}
                      </Descriptions.Item>
                      <Descriptions.Item label="IFSC Code">
                        {record.IFSCCode}
                      </Descriptions.Item>
                      <Descriptions.Item label="Account Number">
                        {record.accountNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="GST Number">
                        {record.GSTNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="Aadhar Number">
                        {record.aadhaarNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="PAN Number">
                        {record.panCardNumber}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              )}

              <Col lg={12} md={12}>
                <Card
                  className="loandetail-custom-card"
                  title="Proof Documents"
                >
                  <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Identity Proof">
                      <a
                        href={record.identityProof}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Property Ownership Proof">
                      <a
                        href={record.propertyOwnershipProof}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Signature">
                      <a
                        href={record.signature}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="PAN Image">
                      <a
                        href={record.panImageUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Aadhaar Image">
                      <a
                        href={record.aadharImageUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Financial Proof">
                      <a
                        href={record.financialProof[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Address Proof">
                      <a
                        href={record.addressProof}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    {record.coApplicantDocs && (
                      <Descriptions.Item label="Spouse Pay Slip">
                        <a
                          href={record.coApplicantDocs}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Nominee Documents">
                      <a
                        href={record.nomineeDocs}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
            {record.employeeId && (
              <Row style={{ textAlign: "-webkit-center" }}>
                <h5>
                  <b>Task Details:</b>
                </h5>
                <Col lg={12} md={12}>
                  <Card
                    className="loandetail-custom-card"
                    title="Task Assigned Details"
                  >
                    <Descriptions
                      column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}
                    >
                      <Descriptions.Item label="Employee Name">
                        {employeeName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Employee Type">
                        {record.employeeType}
                      </Descriptions.Item>
                      <Descriptions.Item label="Employee Category">
                        {employeeCategory}
                      </Descriptions.Item>
                      <Descriptions.Item label="Description">
                        {record.description}
                      </Descriptions.Item>

                      <Descriptions.Item label="Start Date">
                        {record.startDate
                          ? record.startDate.split("T")[0]
                          : "N/A"}
                      </Descriptions.Item>
                      <Descriptions.Item label="End Date">
                        {record.endDate ? record.endDate.split("T")[0] : "N/A"}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            )}
            <div className="py-2 px-2">
              <h5>
                <b>Assign To</b>
              </h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  {/* Employee Type */}
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">
                        Employee Type:
                      </label>
                      <Controller
                        name="employeeType"
                        control={control}
                        // disabled
                        defaultValue="LoanEmployee" // Ensure default value is set
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            onChange={(value) => {
                              field.onChange(value);
                              setSelectedEmployeeType(value);
                            }}
                          >
                            {/* <Option value="">Select Employee Type</Option> */}
                            <Option value="LoanEmployee">Loan Employee</Option>
                            {/* <Option value="InsuranceEmployee">
                              Insurance Employee
                            </Option> */}
                          </Select>
                        )}
                      />
                      {errors.employeeType && (
                        <p className="text-danger">Employee type is required</p>
                      )}
                    </div>
                  </Col>

                  {/* Employee List */}
                  <Col xs={12} md={6} lg={4}>
                    <label>Employee List:</label>
                    <select
                      {...register("employeeId", { required: true })}
                      className="form-select"
                    >
                      <option value="">Select Employee</option>
                      {filteredEmployeeList.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.firstname} {employee.lastname}
                        </option>
                      ))}
                    </select>
                    {errors.employeeId && (
                      <p className="text-danger">
                        Employee selection is required
                      </p>
                    )}
                  </Col>

                  {/* Category */}
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Category:</label>
                      <Controller
                        name="loanType"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            placeholder="Select Category"
                            onChange={(value) => field.onChange(value)}
                            disabled={!selectedEmployeeType}
                          >
                            <Option value="">Select Category</Option>
                            {selectedEmployeeType &&
                              employeeCategories[selectedEmployeeType]?.map(
                                (category, index) => (
                                  <Option key={index} value={category}>
                                    {category}
                                  </Option>
                                )
                              )}
                          </Select>
                        )}
                      />
                      {errors.loanType && (
                        <p className="text-danger">Category is required</p>
                      )}
                    </div>
                  </Col>

                  {/* Start Date */}
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Start Date:</label>
                      <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="form-control"
                          />
                        )}
                      />
                      {errors.startDate && (
                        <p className="text-danger">Start date is required</p>
                      )}
                    </div>
                  </Col>

                  {/* End Date */}
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">End Date:</label>
                      <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <input
                            type="date"
                            {...field}
                            className="form-control"
                          />
                        )}
                      />
                      {errors.endDate && (
                        <p className="text-danger">End date is required</p>
                      )}
                    </div>
                  </Col>

                  {/* Description */}
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">
                        Description:
                      </label>
                      <Controller
                        name="description"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            className="form-control"
                            placeholder="Task description"
                          />
                        )}
                      />
                      {errors.description && (
                        <p className="text-danger">Description is required</p>
                      )}
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col className="px-2 py-2">
                    <Button type="submit" variant="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>
            </div>

            {/* <Row className="px-4 py-5">
                <Space>
                  {record && record.status === "Pending" && (
                    <Button
                      type="primary"
                      style={{ background: "#4096ff", color: "#fff" }}
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                  )}

                  {record && record.status === "Pending" && (
                    <>
                      <Button
                        danger
                        onClick={() => setIsRejectModalVisible(true)}
                      >
                        Reject
                      </Button>
                      </>
                  )}

                      <Modal
                        title="Rejection Confirmation"
                        visible={isRejectModalVisible}
                        onCancel={() => setIsRejectModalVisible(false)}
                        footer={null}
                      >
                        <div>
                          <p>Please provide a reason for rejection:</p>
                          <Input.TextArea
                            rows={3}
                            placeholder="Enter rejection reason"
                            value={rejectionReason}
                            onChange={handleRejectionReasonChange}
                          />
                          <Space style={{ marginTop: "20px" }}>
                            <Button
                              type="primary"
                              onClick={handleReject}
                              disabled={!rejectionReason.trim()}
                            >
                              Submit
                            </Button>
                            <Button onClick={handleReset}>Reset</Button>
                          </Space>
                        </div>
                      </Modal>

                  {record && record.status === "1" && (
                    <>
                    <Button type="primary" disabled>
                      Approved
                    </Button>
                    <Button
                    danger
                    onClick={() => setIsRejectModalVisible(true)}
                  >
                    Reject
                  </Button>
                  </>
                  )}

                  {record && record.status === "2" && (
                    <>
                    <Button
                    type="primary"
                    style={{ background: "#4096ff", color: "#fff" }}
                    onClick={handleApprove}
                  >
                    Approve
                  </Button>
                    <Button danger disabled>
                      Rejected
                    </Button>
                    </>
                  )}
                </Space>
              </Row> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
