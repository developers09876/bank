import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Select, Card, Descriptions } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import Api from "../../../Api";

function LeadDetails() {
  const { state } = useLocation();
  const record = state?.record;
  const [remarksFields, setRemarksFields] = useState([]);
  // const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
  console.log("selectedEmployeeType", selectedEmployeeType);
  const [categories, setCategories] = useState([]);
  const [assignValue, setAssignValue] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  console.log('isApproved', isApproved)
  console.log("assignValue", assignValue);
  const { Option } = Select;
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
    InsuranceEmployee: [
      "Life Insurance",
      "Vehicle Insurance",
      "Health Insurance",
    ],
    TaxEmployee: [
      "Income Tax",
      "TDS/TCS Services",
      "GST Services",
      "ESI & PF Services",
    ],
    StockMarket: ["Equity", "Mutual Funds"],
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

  console.log("Filtered Employees:", filteredEmployeeList);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/signup/getbyUserType/${employeeType}`
        );

        // Extract unique employeeCategory values (case-insensitive)
        const uniqueCategories = [
          ...new Set(
            response.data
              .map((item) => item.employeeCategory?.trim()) // Trim whitespace
              .filter(Boolean) // Remove null/undefined values
          ),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [selectedEmployeeType]);
  // useEffect(() => {
  //   if (category) {
  //     console.log("category", category);
  //     const filtered = employeeList.filter(
  //       (employee) => employee.employeeCategory === category
  //     );
  //     setFilteredEmployeeList(filtered);
  //   }
  // }, [category, employeeList]);

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
  useEffect(() => {
    getbyLeadId();
  }, []);

  const getbyLeadId = async () => {
    await Api.get(`/lead/getByLeadId/${record?._id}`).then((res) => {
      const data = res.data.data[0];
      setAssignValue(data);
      setIsApproved(data?.isApproved || false);
      reset({
        employeeType: data?.employeeType || "",
        employeeId: data?.employeeId || "",
        loanType: data?.loanType || "",
        startDate: data?.startDate ? data.startDate.split("T")[0] : "",
        endDate: data?.endDate ? data.endDate.split("T")[0] : "",
        description: data?.description || "",
      });
      setSelectedEmployeeType(data?.employeeType || "");
    });
  };
  const onSubmit = async (data, event) => {
    event.preventDefault();

    const updateDetails = {
      AdminId: data.AdminId,
      employeeType: data.employeeType,
      loanType: data.loanType,
      // employeeList: data.employeeList,
      description: data.description,
      employeeId: data.employeeId,
      startDate: data.startDate || null,
      endDate: data.endDate || null,
    };

    try {
      const response = await Api.put(
        `http://localhost:5000/lead/updateleadassign/${record._id}`,
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
    <div
      className="loandetail-container"
      style={{ marginTop: "50px", padding: "20px" }}
    >
      <div>
        <center>
          <h3>Lead Details</h3>
        </center>
        <div>
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
                title="Loan Details"
              >
                <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Loan Amount">
                    {record.amount}
                  </Descriptions.Item>
                  <Descriptions.Item label="Purpose Of Loan">
                    {record.purpose}
                  </Descriptions.Item>
                  <Descriptions.Item label="User Type">
                    {record.userType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Previously Applied">
                    {record.previouslyapplied}
                  </Descriptions.Item>
                  <Descriptions.Item label="How Immediate">
                    {record.howimidiate}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>

          <Row style={{ textAlign: "-webkit-center" }}>
            <Col lg={12} md={12}>
              <Card
                style={{ width: "60%" }}
                className="loandetail-custom-card"
                title="Reminders"
              >
                <Descriptions column={{ xl: 1, lg: 1, xs: 1, md: 1, sm: 1 }}>
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
          {/* </div> */}
          {/* ))
        ) : (
          <p>No reminders available.</p>
        )} */}
        </div>
        {isApproved && <center><h4 className="text-success">Approved</h4></center>}
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
                        <Option value="">Select Employee Type</Option>
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
                  <p className="text-danger">Employee selection is required</p>
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
      </div>
    </div>
  );
}

export default LeadDetails;
