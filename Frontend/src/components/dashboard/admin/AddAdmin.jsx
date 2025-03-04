import { Logout } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import { Select } from "antd";
import Api from "../../../Api";
import axios from "axios";
const { Option } = Select;

const serviceToCategoryMap = {
  LoanEmployee: ["personal", "business", "education", "home"],
  TaxEmployee: [
    "IncomeTax",
    "Tds&TcsServices",
    "GSTservices",
    "Esi&PfServices",
  ],
  InsuranceEmployee: [
    "Health Insurance",
    "Life Insurance",
    "Vehicle Insurance",
  ],
  stockMarket: ["Mutual Funds", "Equity", "Bonds"],
};

const AddAdmin = ({ setAuth }) => {
  const navigate = useNavigate();
  const [selectedServices, setSelectedServices] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
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
  const employeeType = "employee";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const Service = watch("services");
  useEffect(() => {
    // Get categories based on selected services
    let categories = new Set();
    selectedServices.forEach((service) => {
      serviceToCategoryMap[service]?.forEach((category) =>
        categories.add(category)
      );
    });
    setFilteredCategories([...categories]);
  }, [selectedServices]);

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

  const onSubmit = async (data) => {
    try {
      const body = { ...data, userType: "employee" };

      const response = await fetch("http://localhost:5000/signup/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (response.ok) {
        toast.success("Added Successfully!");
        setTimeout(() => navigate(-1), 3000);
      } else {
        toast.error(parseRes.message || "Failed to add admin!");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to add admin!");
    }
  };

  return (
    <div className="flex h-[900px]">
      <Sidebar />
      <ToastContainer />

      <div className="w-full border bg-white shadow-md rounded">
        <Container>
          <div className="w-full px-2 pt-6 pb-8 mb-4 bg-white rounded">
            {/* HEADER */}
            <div
              className="flex items-center justify-between px-5 py-5 sm:px-6 rounded shadow-md"
              style={{
                backgroundColor: "rgb(0 57 127 / var(--tw-bg-opacity))",
              }}
            >
              <h3 className="text-lg font-medium leading-6 text-white">
                Add New Employee
              </h3>
              <button onClick={() => setAuth(false)}>
                <Link to="/login">
                  <Logout />
                </Link>
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-5 p-2 rounded border shadow-md border-t-4 border-t-red-500"
            >
              <Row>
                {/* Employee No */}
                {/* <Col lg={6} md={6}>
                  <label htmlFor="empno">Employee No:</label>
                  <input
                    type="text"
                    className="block border w-full p-3 rounded mb-4"
                    {...register("empno", {
                      required: "Employee No is required",
                    })}
                    placeholder="Employee No"
                  />
                  {errors.empno && (
                    <p className="text-red-500">{errors.empno.message}</p>
                  )}
                </Col> */}

                {/* Services */}
                <Col lg={4} md={6} sm={12}>
                  <label htmlFor="services">Services:</label>
                  <Controller
                    name="services"
                    control={control}
                    rules={{ required: "Please select at least one service" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        mode="multiple"
                        className="inputcolumn_drp w-full mb-4"
                        style={{ width: "100%" }}
                        placeholder="Select Services"
                        // style={{ height: "55%" }}
                        onChange={(value) => {
                          setSelectedServices(value);
                          setValue("services", value);
                        }}
                      >
                        <Option value="LoanEmployee">Loan Employee</Option>
                        <Option value="TaxEmployee">Tax Employee</Option>
                        <Option value="InsuranceEmployee">
                          Insurance Employee
                        </Option>
                        <Option value="stockMarket">Stock Market</Option>
                        <Option value="ReportingManager">
                          Reporting Manager
                        </Option>
                        <Option value="SalesManager">Sales Manager</Option>
                      </Select>
                    )}
                  />
                  {errors.services && (
                    <p className="text-red-500">{errors.services.message}</p>
                  )}
                </Col>

                {/* Category - Filtered Based on Services */}
                {/* <Col lg={6} md={6}>
                  <label htmlFor="category">Category:</label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Please select at least one category" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        mode="multiple"
                        className="inputcolumn_drp"
                        placeholder="Select Category"
                        style={{ height: "55%" }}
                        disabled={filteredCategories.length === 0}
                        onChange={(value) => setValue("category", value)}
                      >
                        {filteredCategories.map((category) => (
                          <Option key={category} value={category}>
                            {category}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500">{errors.category.message}</p>
                  )}
                </Col> */}

                {/* Other Fields */}
                <Col lg={4} md={6} sm={12}>
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    className="block border w-full p-2 rounded mb-4"
                    {...register("firstname", {
                      required: "First Name is required",
                    })}
                    placeholder="First Name"
                  />
                  {errors.firstname && (
                    <p className="text-red-500">{errors.firstname.message}</p>
                  )}
                </Col>

                <Col lg={4} md={6} sm={12}>
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    className="block border w-full p-2 rounded mb-4"
                    {...register("lastname", {
                      required: "Last Name is required",
                    })}
                    placeholder="Last Name"
                  />
                  {errors.lastname && (
                    <p className="text-red-500">{errors.lastname.message}</p>
                  )}
                </Col>
                {/* <Col lg={6} md={6}>
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input
                    type="number"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="contactNumber"
                    {...register("contactNumber", {
                      required: "contactNumber is required",
                    })}
                    placeholder="contactNumber"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </Col> */}
                <Col lg={4} md={6} sm={12}>
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input
                    type="text"
                    className="block border border-grey-500 w-full p-2 rounded mb-4"
                    name="contactNumber"
                    {...register("contactNumber", {
                      required: "Contact number is required",
                      minLength: {
                        value: 10,
                        message: "Contact number must be exactly 10 digits",
                      },
                      maxLength: {
                        value: 10,
                        message: "Contact number must be exactly 10 digits",
                      },
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message:
                          "Only numbers are allowed (10 digits required)",
                      },
                    })}
                    placeholder="Enter your 10-digit contact number"
                    maxLength={10}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500">
                      {errors.contactNumber.message}
                    </p>
                  )}
                </Col>

                {/* <Col lg={6} md={6}>
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    className="block border w-full p-3 rounded mb-4"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </Col> */}
                <Col lg={4} md={6} sm={12}>
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    className="block border w-full p-2 rounded mb-4"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message:
                          "Enter a valid email address (e.g., name@example.com)",
                      },
                    })}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </Col>

                <Col lg={4} md={6} sm={12}>
                  <label htmlFor="dateOfJoining">Date of Joining:</label>
                  <input
                    type="date"
                    className="block border w-full p-2 rounded mb-4"
                    {...register("dateOfJoining", {
                      required: "Date of Joining is required",
                    })}
                  />
                  {errors.dateOfJoining && (
                    <p className="text-red-500">
                      {errors.dateOfJoining.message}
                    </p>
                  )}
                </Col>

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
                      <label htmlFor="report_Manager">Reporting Manager:</label>
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
              </Row>

              <button type="submit" className="btn btn-primary mr-3">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </button>
            </form>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AddAdmin;
