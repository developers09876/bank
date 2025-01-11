import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";

function InsuranceLeadDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { record } = location.state || {};
  console.log('record', record);

  if (!record) {
    return <p>No details available.</p>;
  }

  return (
    <div style={{ margin: "50px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Lead Details</h2>

      {/* Displaying all the details */}
      <Row>
        <Col span={6}><strong>Name:</strong></Col>
        <Col span={18}>{`${record.firstname} ${record.lastname}`}</Col>
      </Row>
      <Row>
        <Col span={6}><strong>Email:</strong></Col>
        <Col span={18}>{record.email}</Col>
      </Row>
      <Row>
        <Col span={6}><strong>Phone:</strong></Col>
        <Col span={18}>{record.contactNumber}</Col>
      </Row>
      <Row>
        <Col span={6}><strong>Loan Amount:</strong></Col>
        <Col span={18}>{record.amount}</Col>
      </Row>
      <Row>
        <Col span={6}><strong>Aadhar Number:</strong></Col>
        <Col span={18}>{record.aadhar}</Col>
      </Row>
      <Row>
        <Col span={6}><strong>PAN Card Number:</strong></Col>
        <Col span={18}>{record.panno}</Col>
      </Row>
      <Row>
        <Col span={6}><strong>Purpose Of Loan:</strong></Col>
        <Col span={18}>{record.purpose}</Col>
      </Row>
      <Row>
        <Col span={6}><strong>How Immediate:</strong></Col>
        <Col span={18}>{record.howimidiate}</Col>
      </Row>
      <Row>
        <Col span={6}><strong>Previously Applied:</strong></Col>
        <Col span={18}>{record.previouslyapplied}</Col>
      </Row>

      <h3 style={{ marginBottom: "20px", marginTop: "20px" }}>Reminders</h3>

      {/* Displaying reminders */}
      {record.addremarks && record.addremarks.length > 0 ? (
        record.addremarks.map((remark, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={6}><strong>Date:</strong></Col>
              <Col span={18}>{remark.date}</Col>
            </Row>
            <Row>
              <Col span={6}><strong>Message:</strong></Col>
              <Col span={18}>{remark.remarks}</Col>
            </Row>
          
            <hr style={{ margin: "10px 0" }} />
          </div>
        ))
      ) : (
        <p>No reminders available.</p>
      )}

      <Button
        type="primary"
        style={{ marginTop: "20px" }}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
    </div>
  );
}

export default InsuranceLeadDetails;
