import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  Select,
  Layout,
  Button,
  Card,
  Descriptions,
  Tag,
  Space,
  Divider,
  Modal,
  Input,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../../user/LoanDetails.css";
import Api from "../../../../Api";
import axios from "axios";
const { Option } = Select;

function TaskManagementDetails({ collapsed }) {
  const { state } = useLocation();
  const initialRecord = state?.record;
  // const record = state?.record || {};
  const [record, setRecord] = useState(initialRecord);

  const id = localStorage.getItem("regid");

  // const [employeeType, setEmployeeType] = useState("");
  const [inputs, setInputs] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [employeeCategory, setemployeeCategory] = useState();
  const [selectedEmployeeType, setSelectedEmployeeType] =
    useState("TaxEmployee");
  const [assignValue, setAssignValue] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isPendingtModalVisible, setIsPendingModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingReason, setPendingReason] = useState("");
  const [loan, setLoan] = useState([]);
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

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employeeType: record?.employeeType || "",
      employeeId: record?.employeeId || "",
      loanType: record?.loanType || "",
      startDate: record?.startDate || "",
      endDate: record?.endDate || "",
      description: record?.description || "",
      employeeCategory: record?.employeeCategory || "",
      employeeList: record?.employeeList || "",
    },
  });

  const category = watch("employeeCategory");
  const employeeType = "employee";

  const employeeCategories = {
    TaxEmployee: [
      "Income Tax",
      "TDS/TCS Services",
      "GST Services",
      "ESI & PF Services",
    ],
  };
  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const response = await Api.get(`http://localhost:5000/signup/getbyUserType/${employeeType}`);
        setEmployeeList(response.data);
        console.log("responseemployee", response.data);
      } catch (error) {
        console.error("Error fetching employee list:", error);
        toast.error("Failed to fetch employee list.");
      }
    };
    fetchEmployeeList();
  }, [employeeType]);
  const filteredEmployeeList = employeeList?.filter((employee) => {
    const matchesBranch = employee.Branch === BranchName;
    const matchesEmployeeType =
      employee.services.includes(selectedEmployeeType);

    return matchesBranch && matchesEmployeeType;
  });
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/signup/getbyUserType/${employeeType}`
        );
        console.log("Employee response.data", response.data);
        const filteredEmployees = response.data?.filter((employee) =>
          employee.services.includes("ReportingManager")
        );
        console.log("filteredEmployees", filteredEmployees);
        setReportingManagerList(filteredEmployees);

        const filteredSalesEmployees = response.data?.filter((salesemployee) =>
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
      const filtered = reportingManagerList?.filter(
        (manager) => manager.district === districtName
      );
      setFilteredManagers(filtered);
    }
  }, [districtName, reportingManagerList]);

  useEffect(() => {
    if (BranchName) {
      const filtered = salesManagerList?.filter(
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
  // const getState = () => {
  //   const country_id = 101;

  //   Api.get(`state/stateById/${country_id}`).then((res) => {
  //     setStateList(res.data.data);
  //     console.log("state res.data.data", res.data.data);
  //   });
  // };
  // // const state_id = 4026;
  // const getDistrict = (state_id) => {
  //   Api.get(`district/districtById/${state_id}`).then((res) => {
  //     setDistrictList(res.data.data);
  //     console.log("dist res.data.data", res.data.data);
  //   });
  // };

  // const getCity = (districtId) => {
  //   Api.get(`city/cityById/${districtId}`).then((res) => {
  //     setCityList(res.data.data);
  //     console.log("city res.data.data", res.data.data);
  //   });
  // };

  const getState = async () => {
    try {
      const country_id = 101;
      const response = await Api.get(`state/stateById/${country_id}`);
      console.log("State API Response:", response.data);
      setStateList(response.data.data);
    } catch (error) {
      console.error("Error fetching states:", error.response?.status, error.message);
    }
  };
  
  const getDistrict = async (state_id) => {
    try {
      const response = await Api.get(`district/districtById/${state_id}`);
      console.log("District API Response:", response.data);
      setDistrictList(response.data.data);
    } catch (error) {
      console.error("Error fetching districts:", error.response?.status, error.message);
    }
  };
  
  const getCity = async (districtId) => {
    try {
      const response = await Api.get(`city/cityById/${districtId}`);
      console.log("City API Response:", response.data);
      setCityList(response.data.data);
    } catch (error) {
      console.error("Error fetching cities:", error.response?.status, error.message);
    }
  };
  
  useEffect(() => {
    getCountry();
    getState();
    // getDistrict();
  }, []);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      const employeeid = record.employeeId;
      try {
        const response = await Api.get(`http://localhost:5000/signup/getby/${employeeid}`);
        if (
          response.data &&
          response.data.firstname &&
          response.data.lastname
        ) {
          setEmployeeName(
            `${response.data.firstname} ${response.data.lastname}`
          );
        }
        setemployeeCategory(response.data.employeeCategory);
      } catch (error) {
        console.error("Error fetching employee list:", error);
        // toast.error("Failed to fetch employee list.");
      }
    };
    fetchEmployeeList();
  }, []);
  useEffect(() => {
    getbyLeadId();
  }, []);
  useEffect(() => {
    if (watch("state")) {
      getDistrict(stateList.find((s) => s.name === watch("state"))?.id);
    }
  }, [watch("state")]);
  
  useEffect(() => {
    if (watch("district")) {
      getCity(districtList.find((d) => d.name === watch("district"))?.id);
    }
  }, [watch("district")]);

  const getbyLeadId = async () => {
    await Api.get(`http://localhost:5000/taxManagement/getByTaxId/${record?._id}`).then((res) => {
      const data = res.data.data[0];
      setAssignValue(data);
      reset({
        employeeType: data?.employeeType || "TaxEmployee",
        employeeId: data?.employeeId || "",
        loanType: data?.loanType || "",
        startDate: data?.startDate ? data.startDate.split("T")[0] : "",
        endDate: data?.endDate ? data.endDate.split("T")[0] : "",
        description: data?.description || "",
        employeeCategory: data?.employeeCategory || "",
        Branch: data?.Branch || "",
        state: data?.statename || "",
        district: data?.districtname || "",
        report_Manager: data?.report_Manager || "",
        report_ManagerName: data?.report_ManagerName || "",
        sale_Manager: data?.sale_Manager || "",
        sale_ManagerName: data?.sale_ManagerName || "",
      });
      setRecord(data);
      setSelectedEmployeeType(data?.employeeType || "TaxEmployee");
    });
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("employeeType", data);
    const details = {
      AdminId: id,
      firstname: record.firstname,
      lastname: record.lastname,
      userId: record.id,
      contactNumber: record.phone,
      email: record.email,
      aadhar: record.aadhar,
      panno: record.panno,
      gstNo: record.gstNo,
      PolicyType: record.PolicyType,
      annualIncome: record.annualIncome,
      sumAssured: record.sumAssured,
      policyTerm: record.policyTerm,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      employeeId: data.employeeId,
      employeeType: data.employeeType,
      employeeCategory: data.employeeCategory,
      employeeList: data.employeeList,
      statename: data.state,
      districtname: data.district,
      Branch: data.Branch,
      report_Manager: data.report_Manager,
      report_ManagerName: data.report_ManagerName,
      sale_Manager: data.sale_Manager,
      sale_ManagerName: data.sale_ManagerName,
    };

    try {
      await Api.put(
        `http://localhost:5000/taxManagement/updateTaxManagement/${record._id}`,
        details
      );
      toast.success("Task Assigned successfully");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while submitting the form";
      toast.error(errorMessage);
    }
  };

  const updateStatus = async (id, action, reason = "") => {
    try {
      const details = { action, reason };
      const response = await Api.put(
        `http://localhost:5000/taxManagement/updateTaxapplicationsStaus/${id}`,
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
      await getbyLeadId();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleApprove = () => {
    if (record) {
      // alert("approved");
      updateStatus(record._id, "approve");
    }
  };

  const handlePendingReasonChange = (e) => {
    setPendingReason(e.target.value);
  };

  const handlePending = () => {
    if (record && pendingReason.trim()) {
      // alert("updated as pending");
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
      // alert("rejected");
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

  if (!record) {
    return <p>No details available</p>;
  }

  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Tax Details</h3>
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
          <Row className="px-2 py-3">
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

                  <Col lg={6} md={12} className="px-3 py-1">
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
          </Row>
          <Row className="px-2 py-2">
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Tax Details">
                <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="bussiness Type">
                    {record.businessType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Annual Income">
                    {record.annualIncome}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax Type">
                    {record.taxType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax Sub-Category">
                    {record.subCategory}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="Income Tax Status">
                    {record.incomeTaxStatus}
                  </Descriptions.Item> */}
                </Descriptions>
              </Card>
            </Col>
          </Row>

          <Row className="px-2 py-2">
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Tax Status">
                <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Approval Status">
                    {record.status === "1" ? (
                      <p style={{ color: "green", fontSize: "14px" }}>
                        Approved
                      </p>
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

          {record.employeeId && (
            <Row className="px-2 py-2">
              <center>
                <h5>
                  {/* <b>Task Details:</b> */}
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
                      {record.startDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date">
                      {record.endDate}
                    </Descriptions.Item>
                    <Descriptions.Item label="Report Manager">
                      {record.report_ManagerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Sales Manager">
                      {record.sale_ManagerName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Assign to">
                      {record.employeeId}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          )}
          <Row className="px-2 py-2">
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

          <div className="py-2 px-2">
            <h5>
              <b>Assign To</b>
            </h5>
            {assignValue.employeeId && !isEditing ? (
              // Display assigned employee if lead is assigned and not in edit mode
              <div className="alert alert-info d-flex justify-content-between align-items-center">
                <b>Task Already assigned</b>
                {/* {assignValue.firstname} */}
                <Button
                  style={{
                    color: "black",
                    backgroundColor: "#ffc107",
                    borderColor: "#ffc107",
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label>State</label>
                      <Controller
                        name="state"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select State"
                            optionFilterProp="childer"
                            onChange={(value, option) => {
                              field.onChange(value);
                              setValue("state", value);
                              getDistrict(option.key);
                            }}
                            filterOption={(input, option) =>
                              option?.children
                                ?.toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          >
                            {stateList.map(({ id, name }) => (
                              <Select.Option key={id} value={name}>
                                {name}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.state && (
                        <p className="text-danger">State is required</p>
                      )}
                    </div>
                  </Col>
                  <Col lg={4} md={6} xs={12}>
                    <div>
                      <label>District</label>
                      <Controller
                        name="district"
                        defaultValue=""
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            optionFilterProp="childer"
                            placeholder="Select District"
                            showSearch
                            style={{ width: "100%" }}
                            onChange={(value, option) => {
                              field.onChange(value);
                              setValue("district", value);
                              setDistrictName(value);
                              getCity(option.key);
                            }}
                            filterOption={(input, option) =>
                              option?.children
                                ?.toLowerCase()
                                .includes(input.toLowerCase())
                            }
                          >
                            {districtList.map(({ id, name }) => (
                              <Select.Option key={id} value={name}>
                                {name}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.district && (
                        <p className="text-danger">{errors.district.message}</p>
                      )}
                    </div>
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <div style={{ display: "grid" }}>
                      <label className="vendorpage_labelCss">Branch</label>
                      <Controller
                        name="Branch"
                        control={control}
                        defaultValue=""
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            style={{ width: "100%" }}
                            placeholder="Select Branch"
                            onChange={(value) => {
                              field.onChange(value);
                              setValue("city", value);
                              setBranchName(value);
                            }}
                          >
                            {cityList.map(({ id, cityName }) => (
                              <Select.Option key={id} value={cityName}>
                                {cityName}
                              </Select.Option>
                            ))}
                          </Select>
                        )}
                      />
                      {errors.Branch && (
                        <p className="text-danger">Branch is required</p>
                      )}
                    </div>
                  </Col>
                  {!selectedServices.includes("ReportingManager") && (
                    <>
                      <Col lg={4} md={6} sm={12}>
                        <label htmlFor="report_Manager">
                          Reporting Manager:
                        </label>
                        {/* <Controller
                          name="report_Manager"
                          control={control}
                          defaultValue=""
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              style={{ width: "100%" }}
                              placeholder="Select Reporting Manager"
                              onChange={(value, option) => {
                                field.onChange(value);
                                setValue("report_Manager", value);
                                setValue("report_ManagerName", option?.label);
                              }}
                            >
                              {filteredManagers?.map((employee) => (
                                <Select.Option
                                  key={employee._id}
                                  value={employee._id}
                                  label={`${employee.firstname} ${employee.lastname}`}
                                >
                                  {employee.firstname} {employee.lastname}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        /> */}
                        <Controller
                          name="report_Manager"
                          control={control}
                          defaultValue={record?.report_Manager || ""}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              style={{ width: "100%" }}
                              placeholder="Select Reporting Manager"
                              value={
                                field.value
                                  ? {
                                      value: field.value,
                                      label: getValues("report_ManagerName"),
                                    }
                                  : undefined
                              }
                              labelInValue
                              onChange={(option) => {
                                field.onChange(option.value);
                                setValue("report_Manager", option.value);
                                setValue("report_ManagerName", option.label);
                              }}
                            >
                              {filteredManagers?.map((employee) => (
                                <Select.Option
                                  key={employee._id}
                                  value={employee._id}
                                  label={`${employee.firstname} ${employee.lastname}`}
                                >
                                  {employee.firstname} {employee.lastname}
                                </Select.Option>
                              ))}
                            </Select>
                          )}
                        />
                        {errors.report_Manager && (
                          <p className="text-red-500">
                            {errors.report_Manager.message}
                          </p>
                        )}
                      </Col>

                      {!selectedServices.includes("SalesManager") && (
                        <Col lg={4} md={6} sm={12}>
                          <label htmlFor="sale_Manager">Sales Manager:</label>
                          {/* <Controller
                            name="sale_Manager"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="inputcolumn_drp"
                                style={{ width: "100%" }}
                                placeholder="Select Sales Manager"
                                onChange={(value, option) => {
                                  field.onChange(value);
                                  setValue("sale_Manager", value);
                                  setValue("sale_ManagerName", option?.label);
                                }}
                              >
                                {filteredSalesManagers?.map((employee) => (
                                  <Select.Option
                                    key={employee._id}
                                    value={employee._id}
                                    label={`${employee.firstname} ${employee.lastname}`}
                                  >
                                    {employee.firstname} {employee.lastname}
                                  </Select.Option>
                                ))}
                              </Select>
                            )}
                          /> */}

                          <Controller
                            name="sale_Manager"
                            control={control}
                            defaultValue={record?.sale_Manager || ""}
                            rules={{ required: true }}
                            render={({ field }) => (
                              <Select
                                {...field}
                                className="inputcolumn_drp"
                                style={{ width: "100%" }}
                                placeholder="Select Sales Manager"
                                value={
                                  field.value
                                    ? {
                                        value: field.value,
                                        label:
                                          getValues("sale_ManagerName") || "",
                                      }
                                    : undefined
                                }
                                labelInValue
                                onChange={(option) => {
                                  field.onChange(option.value);
                                  setValue("sale_Manager", option.value);
                                  setValue("sale_ManagerName", option.label);
                                }}
                              >
                                {filteredSalesManagers?.map((employee) => (
                                  <Select.Option
                                    key={employee._id}
                                    value={employee._id}
                                    label={`${employee.firstname} ${employee.lastname}`}
                                  >
                                    {employee.firstname} {employee.lastname}
                                  </Select.Option>
                                ))}
                              </Select>
                            )}
                          />

                          {errors.sale_Manager && (
                            <p className="text-red-500">
                              {errors.sale_Manager.message}
                            </p>
                          )}
                        </Col>
                      )}
                    </>
                  )}
                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">
                        Employee Type:
                      </label>
                      <Controller
                        name="employeeType"
                        control={control}
                        // disabled
                        defaultValue="TaxEmployee" // Ensure default value is set
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            disabled
                            className="inputcolumn_drp"
                            style={{ width: "100%" }}
                            onChange={(value) => {
                              field.onChange(value);
                              setSelectedEmployeeType(value);
                            }}
                          >
                            <Option value="">Select Employee Type</Option>
                            <Option value="TaxEmployee">Tax Employee</Option>
                          </Select>
                        )}
                      />
                      {errors.employeeType && (
                        <p className="text-danger">Employee type is required</p>
                      )}
                    </div>
                  </Col>

                  <Col xs={12} md={6} lg={4}>
                    <label>Employee List:</label>
                    <select
                      {...register("employeeId", { required: true })}
                      className="form-select"
                    >
                      <option value="">Select Employee</option>
                      {filteredEmployeeList?.map((employee) => (
                        // <option key={employee._id} value={employee._id}>
                        //   {employee.firstname} {employee.lastname}
                        // </option>
                        <option key={employee._id} value={`${employee.firstname} ${employee.lastname}`}>
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

                  <Col xs={12} md={6} lg={4}>
                    <div>
                      <label className="vendorpage_labelCss">Category:</label>
                      <Controller
                        name="employeeCategory"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="inputcolumn_drp"
                            style={{ width: "100%" }}
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
                      {errors.employeeCategory && (
                        <p className="text-danger">Category is required</p>
                      )}
                    </div>
                  </Col>

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
                    <Button type="primary" onClick={handleSubmit(onSubmit)}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </form>
            )}
          </div>

          <Row className="py-4" style={{ justifySelf: "center" }}>
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

              {/* {record &&
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
                )} */}

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
                  {/* <Button
                    color="yellow"
                    variant="solid"
                    onClick={() => setIsPendingModalVisible(true)}
                  >
                    Hold
                  </Button> */}
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
                  {/* <Button
                    color="yellow"
                    variant="solid"
                    onClick={() => setIsPendingModalVisible(true)}
                  >
                    Hold
                  </Button> */}
                </>
              )}
            </Space>
          </Row>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default TaskManagementDetails;
