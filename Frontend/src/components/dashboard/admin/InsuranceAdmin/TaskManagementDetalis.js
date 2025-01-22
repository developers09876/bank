import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../../../Api";
import { Select } from "antd";
const { Option } = Select;

function TaskManagementDetails() {
  const { state } = useLocation();
  const record = state?.record || {};
  const id = localStorage.getItem("regid");

  // const [employeeType, setEmployeeType] = useState("");
  const [inputs, setInputs] = useState();
  const [employeeList, setEmployeeList] = useState();
  const [filteredEmployeeList, setFilteredEmployeeList] = useState([]);
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
    <div style={{ marginTop: "50px", padding: "20px" }}>
      <h3>Insurance Management Details</h3>
      <div>
        {Object.entries(record).map(([key, value]) => (
          <Row key={key}>
            <Col xs={4}>
              <p>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
              </p>
            </Col>
            <Col xs={8}>
              <p>{value}</p>
            </Col>
          </Row>
        ))}
      </div>
      <div className='py-2 px-2'>
        <h5><b>Assign To</b></h5>
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
                      <Option value="">
                      Select Insurance Type
                    </Option>
                    <Option value="Health Insurance">Health Insurance</Option>
                    <Option value="Life Insurance">Life Insurance</Option>
                    <Option value="Vehicle Insurance">Vehicle Insurance</Option>
                    <Option value="Property Insurance">Property Insurance</Option>
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

export default TaskManagementDetails;
