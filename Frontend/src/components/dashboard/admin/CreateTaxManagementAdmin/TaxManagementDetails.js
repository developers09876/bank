import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Api from "../../../../Api";

function TaxManagementDetails() {
  const { state } = useLocation();
  const record = state?.record || {};

  const [employeeType, setEmployeeType] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const employeeTypes = [
    "user",
    "LoanEmployee",
    "InsuranceEmployee",
    "TaxEmployee",
  ];

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
        }))
      );
    } catch (error) {
      console.error("Error fetching employee list:", error);
      toast.error("Failed to fetch employee list.");
    }
  };

  const handleEmployeeTypeChange = (event) => {
    setEmployeeType(event.target.value);
  };

  const onSubmit = async (data) => {
    const details = {
      firstname: record.firstname,
      lastname: record.lastname,
      userId: record.id,
      contactNumber: record.phone,
      email: record.email,
      aadhar: record.aadhar,
      panno: record.panno,
      gstNo: record.gstNo,
      businessType: record.businessType,
      annualIncome: record.annualIncome,
      taxPaid: record.taxPaid,
      incomeTaxStatus: record.incomeTaxStatus,
    };

    try {
      await Api.put(
        `http://localhost:5000/lead/updatelead/${record._id}`,
        details
      );
      toast.success("Form submitted successfully");
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while submitting the form");
    }
  };

  if (!record) {
    return <p>No details available</p>;
  }

  return (
    <div style={{ marginTop: "50px", padding: "20px" }}>
      <h3>Tax Management Details</h3>
      <div>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Name:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{`${record.firstname} ${record.lastname}`}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Email:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.email}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Phone:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.contactNumber}</p>
          </Col>
        </Row>

        <Row>
          <Col xs={2}>
            <p>
              <strong>Aadhar Number:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.aadhar}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>GST Number:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.gst}</p>
          </Col>
        </Row>

        <Row>
          <Col xs={2}>
            <p>
              <strong>PAN Card Number:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.panno}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Income Tax Status:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.incomeTaxStatus}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Tax paid:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.taxPaid}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Annual Incom:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.annualIncome}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>
            <p>
              <strong>Business Type:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.businessType}</p>
          </Col>
        </Row>
      </div>

      <div className="mt-3">
        <h3>Assign To</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
              {errors.employeeType && (
                <p className="text-danger">Employee Type is required</p>
              )}
            </Col>
          </Row>

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
              {errors.employeeId && (
                <p className="text-danger">Employee List is required</p>
              )}
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
              {errors.description && (
                <p className="text-danger">Description is required</p>
              )}
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
    </div>
  );
}

export default TaxManagementDetails;
