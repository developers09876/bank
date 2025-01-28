import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Select, Layout, Card, Descriptions, Tag, Space, Divider } from "antd";
import "../user/LoanDetails.css";
import Api from "../../../Api";
const { Option } = Select;

function InsuranceManagementDetails() {
  const { state } = useLocation();
  const record = state?.record || {};
  const id = localStorage.getItem("regid");

  // const [employeeType, setEmployeeType] = useState("");
  const [inputs, setInputs] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [employeeName, setEmployeeName] = useState();
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [employeeCategory, setemployeeCategory] = useState();

  console.log("employeeName", employeeName);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const category = watch("employeeCategory");
  const employeeType = "InsuranceEmployee";
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

  useEffect(() => {
    const fetchEmployeeName = async () => {
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
    fetchEmployeeName();
  }, []);

  useEffect(() => {
    if (category) {
      // Filter employees based on selected category
      const filtered = employeeList.filter(
        (employee) => employee.employeeCategory === category
      );
      setFilteredEmployeeList(filtered);
    }
  }, [category, employeeList]);

  const onSubmit = async (data, event) => {
    event.preventDefault();

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
    };

    try {
      await Api.put(
        `/insuranceManagement/updateInsuranceManagement/${record._id}`,
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
          <h3>Insurance Details</h3>
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
            title="Insurance Details"
          >
            <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
              <Descriptions.Item label="Policy Type">
                {record.PolicyType}
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
                  {employeeCategory}
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
      )}
      <div className="py-2 px-2">
        <h5>
          <b>Assign To</b>
        </h5>

        <form onSubmit={(e) => onSubmit(watch(), e)}>
          <Row>
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Employee Type:</label>
                <Controller
                  name="employeeType"
                  control={control}
                  defaultValue="InsuranceEmployee"
                  // value={employeeType}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select {...field} disabled className="inputcolumn_drp">
                      <Option value="LoanEmployee">Loan Employee</Option>
                      <Option value="TaxEmployee">Tax Employee</Option>
                      <Option value="InsuranceEmployee">
                        Insurance Employee
                      </Option>
                      <Option value="StockMarket">Stock Market</Option>
                    </Select>
                  )}
                />
                {errors.employeeType && (
                  <p className="text-danger">Service is required</p>
                )}
              </div>
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">
                  Employee Category:
                </label>
                <Controller
                  name="employeeCategory"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      className="inputcolumn_drp"
                      placeholder="Select Employee Category"
                      onChange={(value) => {
                        field.onChange(value);
                        setValue("employeeCategory", value);
                      }}
                    >
                      <Option value="">Select Category</Option>
                      <Option value="Health Insurance">Health Insurance</Option>

                      <Option value="Life Insurance">Life Insurance</Option>
                      <Option value="Vehicle Insurance">
                        Vehicle Insurance
                      </Option>
                    </Select>
                  )}
                />
                {errors.employeeCategory && (
                  <p className="text-danger">Employee category is required</p>
                )}
              </div>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <label>Employee List:</label>
              <select
                {...register("employeeId", { required: true })}
                className="form-select"
                placeholder="Select Employee"
              >
                <option value="">Select Employee</option>
                {filteredEmployeeList?.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.firstname} {employee.lastname}
                  </option>
                ))}
              </select>
              {errors.employeeId && (
                <p className="text-danger">Employee selection is required</p>
              )}
            </Col>
            <Col xs={12} md={6} lg={4}>
              <div>
                <label className="vendorpage_labelCss">Start Date:</label>
                <Controller
                  name="startDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="form-control"
                      placeholder="Start Date"
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
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      type="date"
                      {...field}
                      className="form-control"
                      placeholder="End Date"
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
                <label className="vendorpage_labelCss">Description:</label>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
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

export default InsuranceManagementDetails;
