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
  Button,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";
import { toast, ToastContainer } from "react-toastify";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../SalesManager/Details.css"
import { Col, Row } from "react-bootstrap";
import { BorderRight } from "@mui/icons-material";
import Api from "../../../../Api";
import axios from "axios";
const { Option } = Select;

const LoanManagementDetails = ({ collapsed }) => {
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);
  const id = localStorage.getItem("regid");
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [loan, setLoan] = useState([]);
  const navigate = useNavigate();
  const dateFormat = new Date(record.dob).toISOString().split("T")[0];
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeName, setEmployeeName] = useState();
  // const [employeeCategory, setemployeeCategory] = useState();
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isPendingtModalVisible, setIsPendingModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingReason, setPendingReason] = useState("");
  const [selectedEmployeeType, setSelectedEmployeeType] =
    useState("LoanEmployee");
  const [isEditing, setIsEditing] = useState(false);
  const [assignValue, setAssignValue] = useState([]);
   const [countryList, setCountryList] = useState([]);
      const [stateList, setStateList] = useState([]);
      const [districtList, setDistrictList] = useState([]);
      const [cityList, setCityList] = useState([]);
      const [reportingManagerList, setReportingManagerList] = useState();
      const [salesManagerList, setSalesManagerList] = useState();
      const [districtName, setDistrictName] = useState("");
      const [BranchName, setBranchName] = useState("");
          const [selectedServices, setSelectedServices] = useState([]);
        const [filteredManagers, setFilteredManagers] = useState([]);
        const [filteredSalesManagers, setFilteredSalesManagers] = useState([]);
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
      employeeCategory: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  });

  const category = watch("employeeCategory");
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
  const filteredEmployeeList = employeeList.filter((employee) => {
    const matchesBranch = employee.Branch === BranchName;  
    const matchesEmployeeType = employee.services.includes(selectedEmployeeType);  
  
    return matchesBranch && matchesEmployeeType;
  });

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/signup/getbyUserType/${employeeType}`
        );
        console.log("Employee response.data", response.data);
        const filteredEmployees = response.data.filter((employee) =>
          employee.services.includes("ReportingManager")
        );
        console.log("filteredEmployees", filteredEmployees);
        setReportingManagerList(filteredEmployees);

        const filteredSalesEmployees = response.data.filter((salesemployee) =>
          salesemployee.services.includes("SalesManager")
        );
        console.log("filteredSalesEmployees", filteredSalesEmployees);
        setSalesManagerList(filteredSalesEmployees);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchManagers();
  }, [employeeType]);

  useEffect(() => {
    if (districtName) {
      const filtered = reportingManagerList.filter(
        (manager) => manager.district === districtName
      );
      setFilteredManagers(filtered);
    }
  }, [districtName, reportingManagerList]);

  useEffect(() => {
    if (BranchName) {
      const filtered = salesManagerList.filter(
        (manager) => manager.Branch === BranchName
      );
      setFilteredSalesManagers(filtered);
    }
  }, [BranchName, salesManagerList]);

  const getCountry = async () => {
    try {
      const response = await Api.get("country/getallcountry");
      console.log("country response.data", response.data.data);
      setCountryList(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getState = () => {
    const country_id = 101;

    Api.get(`state/stateById/${country_id}`).then((res) => {
      setStateList(res.data.data);
      console.log("state res.data.data", res.data.data);
    });
  };
  // const state_id = 4026;
  const getDistrict = (state_id) => {
    Api.get(`district/districtById/${state_id}`).then((res) => {
      setDistrictList(res.data.data);
      console.log("dist res.data.data", res.data.data);
    });
  };

  const getCity = (districtId) => {
    Api.get(`city/cityById/${districtId}`).then((res) => {
      setCityList(res.data.data);
      console.log("city res.data.data", res.data.data);
    });
  };

  useEffect(() => {
    getCountry();
    getState();
    // getDistrict();
  }, []);

  const handleModalOk = () => {
    setSelectedRecord(null);
  };

  const handleModalCancel = () => {
    setSelectedRecord(null);
  };
//   useEffect(() => {
//     getbyLeadId();
//   }, []);

//   const getbyLeadId = async () => {
//     await Api.get(`/loanform/getby/${record._id}`).then((res) => {
//       const data = res.data;
//       setAssignValue(data);
//       reset({
//         employeeType: data?.employeeType || "LoanEmployee",
//         employeeId: data?.employeeId || "",
//         employeeCategory: data?.employeeCategory || "",
//         startDate: data?.startDate ? data.startDate.split("T")[0] : "",
//         endDate: data?.endDate ? data.endDate.split("T")[0] : "",
//         description: data?.description || "",
//         Branch: data?.Branch || "",
//         state: data?.statename || "",
//         district: data?.districtname || "",
//         report_Manager: data?.report_Manager || "",
//         sale_Manager: data?.sale_Manager || "",
//       });
//       setSelectedEmployeeType(data?.employeeType || "LoanEmployee");
//     });
//   };

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
              status:
                action === "approve"
                  ? "1"
                  : action === "reject"
                  ? "2"
                  : "Pending",
              rejectionReason: action === "reject" ? reason : null,
              pendingReason: action === "Pending" ? reason : null,
            }
          : item
      );
      setLoan(updatedLoans);

      // await fetchUpdatedRecord();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleApprove = () => {
    if (record) {
      updateStatus(record._id, "approve");
    }
  };

  const handlePendingReasonChange = (e) => {
    setPendingReason(e.target.value);
  };

  const handlePending = () => {
    if (record && pendingReason.trim()) {
      updateStatus(record._id, "Pending", pendingReason.trim());
      setIsPendingModalVisible(false);
      setPendingReason("");
    } else {
      console.error("Pending reason is required.");
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
    } else {
      console.error("Rejection reason is required.");
    }
  };

  const handleReset = () => {
    setRejectionReason("");
    setPendingReason("");
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

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const updateDetails = {
      AdminId: data.AdminId,
      employeeType: data.employeeType,
      employeeCategory: data.employeeCategory,
      employeeList: data.employeeList,
      employeeId: data.employeeId,
      description: data.description,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
      statename: data.state,
      districtname: data.district,
      Branch: data.Branch,
      report_Manager: data.report_Manager,
      sale_Manager:data.sale_Manager,
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
              <h3>Loan Management Details</h3>
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
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 2, sm: 1 }}>
                    {record.loanAgentName && (
                      <Descriptions.Item label="Agent Name">
                        {record.loanAgentName}
                      </Descriptions.Item>
                    )}
                    {record.loanAgentContactNumber && (
                      <Descriptions.Item label="Agent Contact">
                        {record.loanAgentContactNumber}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Loan Amount">
                      {record.loanAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Loan Type">
                      {record.loanType}
                    </Descriptions.Item>
                    {record.vehicleType && (
                      <Descriptions.Item label="Vehicle Type">
                        {record.vehicleType}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Purpose">
                      {record.loanPurpose}
                    </Descriptions.Item>
                    <Descriptions.Item label="Employment Status">
                      {record.employmentStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="Income Details">
                      {record.incomeDetails}
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
              {record.children && record.children.length > 0 && (
                <Row className="px-2">
                  <Col lg={12} md={12}>
                    <Card
                      className="loandetail-custom-card"
                      title="Children Details"
                    >
                      <Descriptions
                        column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}
                      >
                        {record.children.map((child, index) => (
                          <React.Fragment key={child._id}>
                            <Descriptions.Item
                              label={`Child ${index + 1} Name`}
                            >
                              {child.name}
                            </Descriptions.Item>
                            <Descriptions.Item label="Gender">
                              {child.gender}
                            </Descriptions.Item>
                            <Descriptions.Item label="Age">
                              {child.age}
                            </Descriptions.Item>
                            <Descriptions.Item label="School Name">
                              {child.schoolName}
                            </Descriptions.Item>
                          </React.Fragment>
                        ))}
                      </Descriptions>
                    </Card>
                  </Col>
                </Row>
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
                        {record.bankBranch}
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
                    {record.businessOwnerStatementProof && (
                      <Descriptions.Item label="Business Ownership Proof">
                        <a
                          href={record.businessOwnerStatementProof}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </Descriptions.Item>
                    )}
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
                    <Descriptions.Item label="VoterId Image">
                      <a
                        href={record.voterIdUpload}
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
                        {record.employeeCategory}
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
            <Row style={{ textAlign: "-webkit-center" }}>
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
           

            <Row className="px-4 py-4" style={{ justifySelf: "center" }}>
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
                      type="primary"
                      danger
                      onClick={() => setIsRejectModalVisible(true)}
                    >
                      Reject
                    </Button>
                  </>
                )}

                {record &&
                  record.status === "Pending" &&
                  !record.pendingReason && (
                    <Button
                      color="yellow"
                      variant="solid"
                      onClick={() => setIsPendingModalVisible(true)}
                    >
                      Hold
                    </Button>
                  )}
                {record &&
                  record.status === "Pending" &&
                  record.pendingReason && (
                    <Button
                      color="yellow"
                      variant="solid"
                      disabled
                      onClick={() => setIsPendingModalVisible(true)}
                    >
                      On Hold
                    </Button>
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
                      <Button variant="secondary" onClick={handleReset}>
                        Reset
                      </Button>
                    </Space>
                  </div>
                </Modal>

                <Modal
                  title="Pending Confirmation"
                  visible={isPendingtModalVisible}
                  onCancel={() => setIsPendingModalVisible(false)}
                  footer={null}
                >
                  <div>
                    <p>
                      Please provide a reason for holding the Insurance
                      application:
                    </p>
                    <Input.TextArea
                      rows={3}
                      placeholder="Enter Pending reason"
                      value={pendingReason}
                      onChange={handlePendingReasonChange}
                    />
                    <Space style={{ marginTop: "20px" }}>
                      <Button
                        type="primary"
                        onClick={handlePending}
                        disabled={!pendingReason.trim()}
                      >
                        Submit
                      </Button>
                      <Button variant="secondary" onClick={handleReset}>
                        Reset
                      </Button>
                    </Space>
                  </div>
                </Modal>

                {record && record.status === "1" && (
                  <>
                    <Button type="primary" disabled>
                      Approved
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => setIsRejectModalVisible(true)}
                    >
                      Reject
                    </Button>
                    <Button
                      color="yellow"
                      variant="solid"
                      onClick={() => setIsPendingModalVisible(true)}
                    >
                      Hold
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
                    <Button type="primary" danger disabled>
                      Rejected
                    </Button>
                    <Button
                      color="yellow"
                      variant="solid"
                      onClick={() => setIsPendingModalVisible(true)}
                    >
                      Hold
                    </Button>
                  </>
                )}
              </Space>
            </Row>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoanManagementDetails;
