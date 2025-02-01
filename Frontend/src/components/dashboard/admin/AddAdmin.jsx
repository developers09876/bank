import { Logout } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import { Select } from "antd";
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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

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
          <div className="w-full px-8 pt-6 pb-8 mb-4 bg-white rounded">
            {/* HEADER */}
            <div
              className="flex items-center justify-between px-4 py-5 sm:px-6 rounded shadow-md"
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
              className="mt-5 p-8 rounded border shadow-md border-t-4 border-t-red-500"
            >
              <Row>
                {/* Employee No */}
                <Col lg={6} md={6}>
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
                </Col>

                {/* Services */}
                <Col lg={6} md={6}>
                  <label htmlFor="services">Services:</label>
                  <Controller
                    name="services"
                    control={control}
                    rules={{ required: "Please select at least one service" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        mode="multiple"
                        className="inputcolumn_drp"
                        placeholder="Select Services"
                        style={{ height: "55%" }}
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
                <Col lg={6} md={6}>
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    className="block border w-full p-3 rounded mb-4"
                    {...register("firstname", {
                      required: "First Name is required",
                    })}
                    placeholder="First Name"
                  />
                  {errors.firstname && (
                    <p className="text-red-500">{errors.firstname.message}</p>
                  )}
                </Col>

                <Col lg={6} md={6}>
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    className="block border w-full p-3 rounded mb-4"
                    {...register("lastname", {
                      required: "Last Name is required",
                    })}
                    placeholder="Last Name"
                  />
                  {errors.lastname && (
                    <p className="text-red-500">{errors.lastname.message}</p>
                  )}
                </Col>
                <Col lg={6} md={6}>
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
                    <p className="text-red-500">{errors.contactNumber.message}</p>
                  )}
                </Col>


                <Col lg={6} md={6}>
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
                </Col>

                <Col lg={6} md={6}>
                  <label htmlFor="dateOfJoining">Date of Joining:</label>
                  <input
                    type="date"
                    className="block border w-full p-3 rounded mb-4"
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
                <Col lg={6} md={6}>
                  <label htmlFor="Manager">Reporting Manager:</label>
                  <input
                    type="text"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="Manager"
                    {...register("manager", {
                      required: "Manager is required",
                    })}
                    placeholder="Manager"
                  />
                  {errors.Manager && (
                    <p className="text-red-500">{errors.Manager.message}</p>
                  )}
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="Branch">Reporting Branch:</label>
                  <input
                    type="text"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="Branch"
                    {...register("branch", {
                      required: "Branch is required",
                    })}
                    placeholder="Branch"
                  />
                  {errors.Branch && (
                    <p className="text-red-500">{errors.Branch.message}</p>
                  )}
                </Col>
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
