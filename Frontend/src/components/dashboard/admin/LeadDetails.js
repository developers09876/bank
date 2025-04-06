import React, { useState, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { Select, Card, Descriptions } from "antd";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../../Api";

function LeadDetails({ collapsed }) {
  const { state } = useLocation();
  const record = state?.record;
  const [remarksFields, setRemarksFields] = useState([]);
  // const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployeeType, setSelectedEmployeeType] = useState("");
  const [categories, setCategories] = useState([]);
  const [assignValue, setAssignValue] = useState([]);
  const [isApproved, setIsApproved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [reportingManagerList, setReportingManagerList] = useState();
  const [salesManagerList, setSalesManagerList] = useState();
  const [districtName, setDistrictName] = useState("");
  const [BranchName, setBranchName] = useState("");

  const [filteredManagers, setFilteredManagers] = useState([]);
  const [filteredSalesManagers, setFilteredSalesManagers] = useState([]);
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

  const filteredEmployeeList = employeeList.filter((employee) => {
    const matchesBranch = employee.Branch === BranchName;
    const matchesEmployeeType =
      employee.services.includes(selectedEmployeeType);

    return matchesBranch && matchesEmployeeType;
  });

  console.log("Branch Name:", BranchName);
  console.log("Employee Type:", selectedEmployeeType);

  console.log("Filtered Employees:", filteredEmployeeList);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await Api.get(`signup/getbyUserType/${employeeType}`);
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `signup/getbyUserType/${employeeType}`
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
        Branch: data?.Branch || "",
        state: data?.state || "",
        district: data?.district || "",
        report_Manager: data?.report_Manager || "",
        sale_Manager: data?.sale_Manager || "",
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
      state: data.state,
      district: data.district,
      Branch: data.Branch,
      report_Manager: data.report_Manager,
      sale_Manager: data.sale_Manager,
    };

    try {
      const response = await Api.put(
        `lead/updateleadassign/${record._id}`,
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
              <h3>Lead Details</h3>
            </center>
            <div>
              <Row className="px-2 py-3">
                <Col lg={12} md={12}>
                  <Card
                    style={{ width: "100%" }}
                    className="loandetail-custom-card"
                    title="Personal Details"
                  >
                    <Descriptions
                      column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}
                    >
                      <Descriptions.Item label="Name">
                        {record.firstname} {record.lastname}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email Id">
                        {record.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Contact Number">
                        {record.contactNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="Alter PhoneNumber ">
                        {record.alternumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="Adhaar Number">
                        {record.aadhar}
                      </Descriptions.Item>
                      <Descriptions.Item label="PanCard Number">
                        {record.panno}
                      </Descriptions.Item>
                      {/* <Descriptions.Item label="GST Number">
                        {record.gst}
                      </Descriptions.Item> */}
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
              <Row className="px-2">
                {record.serviceType === "LoanEmployee" && (
                  <Col lg={12} md={12}>
                    <Card
                      style={{ width: "100%" }}
                      className="loandetail-custom-card"
                      title="Lead Details"
                    >
                      <Descriptions
                        column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}
                      >
                        <Descriptions.Item label="Service Type">
                          Loan
                        </Descriptions.Item>
                        <Descriptions.Item label="Loan Amount">
                          {record.amount}
                        </Descriptions.Item>
                        <Descriptions.Item label="Purpose Of Loan">
                          {record.purpose}
                        </Descriptions.Item>
                        {record.userType && (
                          <Descriptions.Item label="User Type">
                            {record.userType}
                          </Descriptions.Item>
                        )}
                        <Descriptions.Item label="Previously Applied">
                          {record.previouslyapplied}
                        </Descriptions.Item>
                        <Descriptions.Item label="How Immediate">
                          {record.howimidiate}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                )}
                {record.serviceType === "TaxEmployee" && (
                  <Col lg={12} md={12}>
                    <Card
                      style={{ width: "100%" }}
                      className="loandetail-custom-card"
                      title="Lead Details"
                    >
                      <Descriptions
                        column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}
                      >
                        <Descriptions.Item label="Service Type">
                          Tax
                        </Descriptions.Item>
                        <Descriptions.Item label="Tax Category">
                          {record.taxType}
                        </Descriptions.Item>
                        <Descriptions.Item label="Sub-Category">
                          {record.subCategory}
                        </Descriptions.Item>
                        <Descriptions.Item label="IncomeTax Filling Status">
                          {record.incomeTaxStatus}
                        </Descriptions.Item>
                        {record.userType && (
                          <Descriptions.Item label="User Type">
                            {record.userType}
                          </Descriptions.Item>
                        )}
                        <Descriptions.Item label="Business Type">
                          {record.businessType}
                        </Descriptions.Item>
                        <Descriptions.Item label="Previously Applied">
                          {record.previouslyapplied}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                )}
                {record.serviceType === "InsuranceEmployee" && (
                  <Col lg={12} md={12}>
                    <Card
                      style={{ width: "100%" }}
                      className="loandetail-custom-card"
                      title="Lead Details"
                    >
                      <Descriptions
                        column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}
                      >
                        <Descriptions.Item label="Service Type">
                          Insurance
                        </Descriptions.Item>
                        <Descriptions.Item label="Insurance Category">
                          {record.insuranceType}
                        </Descriptions.Item>
                        {record.insuranceType === "Vehicle Insurance" &&
                          record.VehicleType && (
                            <Descriptions.Item label="Vehicle Type">
                              {record.VehicleType}
                            </Descriptions.Item>
                          )}
                        <Descriptions.Item label="Policy Term">
                          {record.PolicyTerm}
                        </Descriptions.Item>
                        <Descriptions.Item label="Sum Assured">
                          {record.sumAssured}
                        </Descriptions.Item>
                        <Descriptions.Item label="Previously Applied">
                          {record.previouslyapplied}
                        </Descriptions.Item>
                        {record.userType && (
                          <Descriptions.Item label="User Type">
                            {record.userType}
                          </Descriptions.Item>
                        )}
                      </Descriptions>
                    </Card>
                  </Col>
                )}
              </Row>

              <Row className="px-2">
                <Col lg={12} md={12}>
                  <Card
                    style={{ width: "100%" }}
                    className="loandetail-custom-card"
                    title="Reminders"
                  >
                    <Descriptions
                      column={{ xl: 3, lg: 3, xs: 1, md: 1, sm: 1 }}
                    >
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
            {isApproved && (
              <center>
                <h4 className="text-success">Approved</h4>
              </center>
            )}
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
                    variant="warning"
                    size="sm"
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
                          <p className="text-danger">
                            {errors.district.message}
                          </p>
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
                          <Controller
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
                                onChange={(value) => {
                                  field.onChange(value);
                                  setValue("report_Manager", value);
                                }}
                              >
                                {filteredManagers?.map((employee) => (
                                  <Select.Option
                                    key={employee._id}
                                    value={employee._id}
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
                            <Controller
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
                                  onChange={(value) => {
                                    field.onChange(value);
                                    setValue("sale_Manager", value);
                                  }}
                                >
                                  {filteredSalesManagers?.map((employee) => (
                                    <Select.Option
                                      key={employee._id}
                                      value={employee._id}
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
                    {/* Employee Type */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Employee Type:
                        </label>
                        <Controller
                          name="employeeType"
                          control={control}
                          rules={{ required: true }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="inputcolumn_drp"
                              style={{ width: "100%" }}
                              onChange={(value) => {
                                field.onChange(value);
                                setSelectedEmployeeType(value);
                              }}
                            >
                              <Option value="">Select Employee Type</Option>
                              <Option value="LoanEmployee">
                                Loan Employee
                              </Option>
                              <Option value="TaxEmployee">Tax Employee</Option>
                              <Option value="InsuranceEmployee">
                                Insurance Employee
                              </Option>
                              <Option value="StockMarket">Stock Market</Option>
                            </Select>
                          )}
                        />
                        {errors.employeeType && (
                          <p className="text-danger">
                            Employee type is required
                          </p>
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
                        {errors.loanType && (
                          <p className="text-danger">Category is required</p>
                        )}
                      </div>
                    </Col>

                    {/* Start Date */}
                    <Col xs={12} md={6} lg={4}>
                      <div>
                        <label className="vendorpage_labelCss">
                          Start Date:
                        </label>
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
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default LeadDetails;
