import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../../Api";

function InsuranceManagementDetails() {
  const { state } = useLocation();
  const record = state?.record || {};
  const id = localStorage.getItem("regid");

  const [employeeType, setEmployeeType] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [subOptions, setSubOptions] = useState("");
  const [incomeTaxOptions, setIncomeTaxOptions] = useState([]);
  const [subType, setSubType] = useState("");
  console.log('subOptions', subOptions)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const employeeTypes = [ "InsuranceEmployee"];

  useEffect(() => {
    if (employeeType) {
      fetchEmployeeList(employeeType);
    }
  }, [employeeType]);

  const fetchEmployeeList = async (type) => {
    try {
      const response = await Api.get(`signup/getbyUserType/${type}`);
      setEmployeeList(
        response.data.map((employee) => ({
          id: employee._id,
          name: employee.firstname,
          categoey: employee.employeeCategory
        }))
      );
    } catch (error) {
      console.error("Error fetching employee list:", error);
      toast.error("Failed to fetch employee list.");
    }
  };

  const handleEmployeeTypeChange = (event) => {
    const value = event.target.value;
    setEmployeeType(value);

    switch (value) {
      case "LoanEmployee":
        setSubOptions(["Home Loan", "Personal Loan", "Vehicle Loan" , "Business Loan"]);
        break;
      case "InsuranceEmployee":
        setSubOptions(["Health Insurance", "Life Insurance", "Vehicle Insurance"]);
        break;
      case "TaxEmployee":
        setSubOptions(["Income Tax", "TDS / TCS Services", "GST Services", "ESI & PF Services"]);
        break;
      default:
        setSubOptions([]);
        break;
    }

    setIncomeTaxOptions([]); 
    setSubType(""); 
  };

  const handleSubtypeChange = (event) => {
    const selectedSubType = event.target.value; 
    console.log('selectedSubType', selectedSubType)
    console.log('employeeList', employeeList)
  
    const filteredEmployees = employeeList.filter(
      (employee) => employee.categoey === selectedSubType
    );
    console.log('filteredEmployees', filteredEmployees)
  
    setEmployeeList(
      filteredEmployees.map((employee) => ({
        id: employee._id,
        name: `${employee.firstname} ${employee.lastname}`,
        category: employee.employeeCategory,
      }))
    );
  };
  
  const onSubmit = async (data) => {
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
      employeeId: data.employeeId,
      employeeType: data.employeeType,
    };

    try {
      await Api.put(`/insuranceManagement/updateInsuranceManagement/${record._id}`, details);
      toast.success("Task Assigned successfully");
    } catch (error) {
      console.error("Error:", error);
      const errorMessage =
        error.response?.data?.error || "An error occurred while submitting the form";
      toast.error(errorMessage);
    }
  };

  if (!record) {
    return <p>No details available</p>;
  }

  return (
    <div style={{ marginTop: "50px", padding: "20px" }}>
      <h3>Tax Management Details</h3>
      <DetailsSection record={record} />
      <AssignTaskSection
        employeeTypes={employeeTypes}
        employeeType={employeeType}
        employeeList={employeeList}
        subOptions={subOptions}
        incomeTaxOptions={incomeTaxOptions}
        handleEmployeeTypeChange={handleEmployeeTypeChange}
        handleSubtypeChange={handleSubtypeChange}
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
      <ToastContainer />
    </div>
  );
}

const DetailsSection = ({ record }) => (
  <div>
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
  </div>
);

const AssignTaskSection = ({
  employeeTypes,
  employeeType,
  employeeList,
  subOptions,
  incomeTaxOptions,
  handleEmployeeTypeChange,
  handleSubtypeChange,
  subType,
  onSubmit,
  register,
  errors,
}) => (
  <div className="mt-3">
    <h3>Assign To</h3>
    <Form onSubmit={onSubmit}>
      <Row className="mb-3">
        <Col xs={2}>
          <Form.Label>
            <strong>Employee Type:</strong>
          </Form.Label>
        </Col>
        <Col xs={7}>
          <Form.Select
            {...register("employeeType", { required: true })}
            value={employeeType}
            onChange={handleEmployeeTypeChange}
          >
            <option value="">Select Employee Type</option>
            {employeeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Form.Select>
          {errors.employeeType && <p className="text-danger">Employee Type is required</p>}
        </Col>
      </Row>

      {subOptions.length > 0 && (
        <Row className="mb-3">
          <Col xs={2}>
            <Form.Label>
              <strong>Category:</strong>
            </Form.Label>
          </Col>
          <Col xs={7}>
  <Form.Select
    {...register("subType", { required: true })}
    value={subType}
    onChange={handleSubtypeChange}
  >
    <option value="">Select Sub Type</option>
    {subOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </Form.Select>
  {errors.subType && <p className="text-danger">Category is required</p>}
</Col>

        </Row>
      )}

      {incomeTaxOptions.length > 0 && (
        <Row className="mb-3">
          <Col xs={2}>
            <Form.Label>
              <strong>Income Tax Category:</strong>
            </Form.Label>
          </Col>
          <Col xs={7}>
            <Form.Select {...register("incomeTaxCategory", { required: true })}>
              <option value="">Select Category</option>
              {incomeTaxOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      )}

      <Row className="mb-3">
        <Col xs={2}>
          <Form.Label>
            <strong>Employee List:</strong>
          </Form.Label>
        </Col>
        <Col xs={7}>
          <Form.Select {...register("employeeId", { required: true })}>
            <option value="">Select Employee</option>
            {employeeList.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </Form.Select>
          {errors.employeeId && <p className="text-danger">Employee List is required</p>}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={2}>
          <Form.Label>
            <strong>Description:</strong>
          </Form.Label>
        </Col>
        <Col xs={7}>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            {...register("description", { required: true })}
          />
          {errors.description && <p className="text-danger">Description is required</p>}
        </Col>
      </Row>

      <Row>
        <Col xs={{ span: 7, offset: 2 }}>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  </div>
);

export default InsuranceManagementDetails;
