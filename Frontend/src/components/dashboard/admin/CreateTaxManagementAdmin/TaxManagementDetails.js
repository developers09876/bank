import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Select, Layout, Card, Descriptions, Tag, Space, Divider } from "antd";
import "../../user/LoanDetails.css";
import Api from "../../../../Api";
const { Option } = Select;

function TaskManagementDetails() {
  const { state } = useLocation();
  const record = state?.record || {};
  const id = localStorage.getItem("regid");

  // const [employeeType, setEmployeeType] = useState("");
  const [inputs, setInputs] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [employeeCategory, setemployeeCategory] = useState();
  const [selectedEmployeeType, setSelectedEmployeeType] =
    useState("TaxEmployee");
  const [assignValue, setAssignValue] = useState([]);

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
      employeeType: "",
      employeeId: "",
      loanType: "",
      startDate: "",
      endDate: "",
      description: "",
      employeeCategory: "",
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
        const response = await Api.get(`signup/getbyUserType/${employeeType}`);
        const filteredEmployees = response.data.filter((employee) =>
          employee.services.includes("TaxEmployee")
        );
        setEmployeeList(filteredEmployees);
        console.log("Filtered Employees:", filteredEmployees);
      } catch (error) {
        console.error("Error fetching employee list:", error);
        toast.error("Failed to fetch employee list.");
      }
    };

    fetchEmployeeList();
  }, [employeeType]);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      const employeeid = record.employeeId;
      try {
        const response = await Api.get(`signup/getby/${employeeid}`);
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
        toast.error("Failed to fetch employee list.");
      }
    };
    fetchEmployeeList();
  }, []);
  useEffect(() => {
    getbyLeadId();
  }, []);

  const getbyLeadId = async () => {
    await Api.get(`/taxManagement/getByTaxId/${record?._id}`).then((res) => {
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
      });
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
      employeeType: selectedEmployeeType,
      employeeCategory: data.employeeCategory,
    };

    try {
      await Api.put(
        `/taxManagement/updateTaxManagement/${record._id}`,
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

  if (!record) {
    return <p>No details available</p>;
  }

  return (
    <div
      className="loandetail-container"
      style={{ marginTop: "50px", padding: "20px" }}
    >
      {/* <div>
        {Object.entries(record).map(([key, value]) => (
          <Row key={key}>
            <Col xs={2}>
              <p>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
              </p>
            </Col>
            <Col xs={7}>
              <p>{value}</p>
            </Col>
          </Row>
        ))}
      </div> */}
      <div>
        <center>
          <h3>Tax Details</h3>
        </center>
      </div>
      <Row className="px-4 py-3" style={{ justifyContent: "center" }}>
        <Col lg={8}>
          <Card>
            <Row className="personal_card_row">
              <Col
                className="firstrowcol px-1 py-1"
                lg={6}
                md={12}
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
        </Col>
      </Row>
      <Row style={{ textAlign: "-webkit-center" }}>
        <Col lg={12} md={12}>
          <Card
            style={{ width: "60%" }}
            className="loandetail-custom-card"
            title="Tax Details"
          >
            <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
              <Descriptions.Item label="bussiness Type">
                {record.businessType}
              </Descriptions.Item>
              <Descriptions.Item label="Annual Income">
                {record.annualIncome}
              </Descriptions.Item>
              <Descriptions.Item label="Tax Paid">
                {record.taxPaid}
              </Descriptions.Item>
              <Descriptions.Item label="Income Tax Status">
                {record.incomeTaxStatus}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      {record.employeeId && (
        <Row style={{ textAlign: "-webkit-center" }}>
          <Col lg={12} md={12}>
            <Card
              style={{ width: "60%" }}
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
                <label className="vendorpage_labelCss">Employee Type:</label>
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
                      onChange={(value) => {
                        field.onChange(value);
                        setSelectedEmployeeType(value);
                      }}
                    >
                      <Option value="">Select Employee Type</Option>
                      <Option value="LoanEmployee">Loan Employee</Option>
                      <Option value="InsuranceEmployee">
                        Insurance Employee
                      </Option>
                      <Option value="TaxEmployee">Tax Employee</Option>
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
                {employeeList?.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstname} {employee.lastname}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <p className="text-danger">Employee selection is required</p>
              )}
            </Col>

            {/* Category */}
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

            {/* Start Date */}
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Start Date:</label>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input type="date" {...field} className="form-control" />
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
                    <input type="date" {...field} className="form-control" />
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
                <label className="vendorpage_labelCss">Description:</label>
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
      <ToastContainer />
    </div>
  );
}

export default TaskManagementDetails;
