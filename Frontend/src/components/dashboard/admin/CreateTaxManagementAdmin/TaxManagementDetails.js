import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function TaxManagementDetails() {
  const { state } = useLocation();
  const record = state?.record;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
              <strong>PAN Card Number:</strong>
            </p>
          </Col>
          <Col xs={7}>
            <p>{record.panno}</p>
          </Col>
        </Row>
      </div>

      <div className="mt-3">
        <h3>Add Remarks</h3>
      </div>
    </div>
  );
}

export default TaxManagementDetails;
