import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../LoanAdmin/Loansidebar";
import { Col, Container, Row } from "react-bootstrap";

const AddLoanEmployee = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    empno: "",
    designation: "",
    firstname: "",
    lastname: "",
    email: "",
    contactNumber: "",
    Manager: "",
    Branch: "",
    dateOfJoining: "",
    loanType: "", 
  });

  const {
    empno,
    designation,
    firstname,
    lastname,
    contactNumber,
    email,
    Manager,
    Branch,
    dateOfJoining,
    loanType, // Destructure loanType
  } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted with the following data:");
    console.log({
      empno,
      designation,
      firstname,
      lastname,
      contactNumber,
      email,
      Manager,
      Branch,
      dateOfJoining,
      loanType,
    });
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
                  <Link to="/login">Logout</Link>
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
                    name="designation"
                    className="block border border-grey-500 w-full p-3 rounded mb-4"
                    value={designation}
                    onChange={onChange}
                    required
                  >
                    <option value="" disabled>
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

                {/* Conditional Loan Type Dropdown */}
                {designation === "LoanEmployee" && (
                  <Col lg={6} md={6}>
                    <label htmlFor="loanType">Loan Type:</label>
                    <select
                      name="loanType"
                      className="block border border-grey-500 w-full p-3 rounded mb-4"
                      value={loanType}
                      onChange={onChange}
                      required
                    >
                      <option value="" disabled>
                        Select Loan Type
                      </option>
                      <option value="Home Loan">Home Loan</option>
                      <option value="Vehicle Loan">Vehicle Loan</option>
                      <option value="Business Loan">Business Loan</option>
                      <option value="Personal Loan">Personal Loan</option>
                    </select>
                  </Col>
                )}

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

export default AddLoanEmployee;
