import { Logout } from "@mui/icons-material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../InsuranceAdmin/InsuranceSidebar";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";

const AddInsuranceEmployee = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    empno: "",
    userType: "InsuranceEmployee",
    firstname: "",
    lastname: "",
    email: "",
    contactNumber: "",
    Manager: "",
    Branch: "",
    dateOfJoining: "",
    employeeCategory: "",
  });

  const empCreatedBy = localStorage.getItem("id")

  const {
    empno,
    userType,
    firstname,
    lastname,
    contactNumber,
    email,
    Manager,
    Branch,
    dateOfJoining,
    employeeCategory, 
  } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/signup/register", {
        empno,
        userType,
        empCreatedBy,
        firstname,
        lastname,
        email,
        contactNumber,
        Manager,
        Branch,
        dateOfJoining,
        employeeCategory,
      });
  
        toast.success("Employee added successfully!");
        // reset(); 
      
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="flex h-[900px]">
      <Sidebar />
      <ToastContainer />

      <div className="w-full border bg-white shadow-md rounded">
        <Container>
          <div className="w-full px-8 pt-6 pb-8 mb-4 bg-white rounded">
            <div
              className="flex items-center justify-between px-4 py-5 sm:px-6 rounded shadow-md"
              style={{
                backgroundColor: "rgb(0 57 127 / var(--tw-bg-opacity))",
              }}
            >
              <div>
                <h3 className="text-lg font-medium leading-6 text-white">
                  Add New Employee
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-white">
                  Register all the required fields.
                </p>
              </div>
              <div className="text-white">
                <button
                  onClick={(e) => {
                    setAuth(false);
                  }}
                >
                  <Link to="/login">
                    <Logout />
                  </Link>
                </button>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="mt-5 p-8 rounded border shadow-md border-t-4 border-t-red-500"
            >
              <Row>
                <Col lg={6} md={6}>
                  <label htmlFor="empno">Employee No:</label>
                  <input
                    type="text"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="empno"
                    value={empno}
                    onChange={onChange}
                    placeholder="Employee No"
                    required
                  />
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="designation">Services:</label>
                  <select
                    name="userType"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    value={userType}
                    onChange={onChange}
                    // defaultValue="TaxEmployee"
                    disabled
                    required
                  >
                    <option value="" >
                      Select Services
                    </option>
                    <option value="LoanEmployee">Loan Employee</option>
                    <option value="TaxEmployee">Tax Employee</option>
                    <option value="InsuranceEmployee">
                      Insurance Employee
                    </option>
                    <option value="stockMarket">Stock Market</option>
                  </select>
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="employeeCategory">Insurance Type:</label>
                  <select
                    name="employeeCategory"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    value={employeeCategory}
                    onChange={onChange}
                    required
                  >
                    <option value="">
                      Select Insurance Type
                    </option>
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Vehicle Insurance">Vehicle Insurance</option>
                    <option value="Property Insurance">Property Insurance</option>
                  </select>
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="firstname"
                    value={firstname}
                    onChange={onChange}
                    placeholder="First Name"
                    required
                  />
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="lastname"
                    value={lastname}
                    onChange={onChange}
                    placeholder="Last Name"
                    required
                  />
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="contactNumber">Contact Number:</label>
                  <input
                    type="number"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="contactNumber"
                    value={contactNumber}
                    onChange={onChange}
                    placeholder="Contact Number"
                    required
                  />
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="email">Email Address:</label>
                  <input
                    type="email"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                    required
                  />
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="dateOfJoining">Date of Joining:</label>
                  <input
                    type="date"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="dateOfJoining"
                    value={dateOfJoining}
                    onChange={onChange}
                    required
                  />
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="Manager">Reporting Manager:</label>
                  <input
                    type="text"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="Manager"
                    value={Manager}
                    onChange={onChange}
                    placeholder="Manager"
                    required
                  />
                </Col>
                <Col lg={6} md={6}>
                  <label htmlFor="Branch">Reporting Branch:</label>
                  <input
                    type="text"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    name="Branch"
                    value={Branch}
                    onChange={onChange}
                    placeholder="Branch"
                    required
                  />
                </Col>
              </Row>

              <button
                type="submit"
                className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/6"
                style={{
                  backgroundColor: "rgb(0 57 127 / var(--tw-bg-opacity))",
                }}
              >
                Save
              </button>
              <button
                type="button"
                className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/6 ml-10"
                style={{
                  backgroundColor: "rgb(0 57 127 / var(--tw-bg-opacity))",
                }}
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

export default AddInsuranceEmployee;
