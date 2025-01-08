import React, { useState, useEffect } from "react";
import {
  Table,
  Input,
  Space,
  Pagination,
  Button,
  Modal,
  Row,
  Col,
  message,
} from "antd";
import { useLocation, useNavigate } from 'react-router-dom';
import Api from "../../../Api";

function LoanDetails() {
    const { state } = useLocation();
      const record = state?.record;
      console.log('record', record)
       const [selectedRecord, setSelectedRecord] = useState(null);
       const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
       const [rejectionReason, setRejectionReason] = useState("");
         const [loan, setLoan] = useState([]);
         const navigate = useNavigate();
       

       const handleModalOk = () => {
        setSelectedRecord(null);
      };
    
      const handleModalCancel = () => {
        setSelectedRecord(null);
      };
    
      const updateStatus = async (id, action, reason = "") => {
        try {
          const details = { action, reason };
          const response = await Api.put(
            `http://localhost:5000/loanform/updateloanapplicationsStaus/${id}`,
            details
          );
          console.log("Response data:", response.data);
          const updatedLoans = loan.map((item) =>
            item._id === id
              ? {
                  ...item,
                  status: action === "approve" ? "1" : "2",
                  rejectionReason: action === "reject" ? reason : null,
                }
              : item
          );
          setLoan(updatedLoans);
        } catch (error) {
          console.error("Error updating status:", error);
        }
      };

      const handleApprove = () => {
        if (record) {
          updateStatus(record._id, "approve");
          navigate("/admin/loanManagement");
        }
      };
    
      const handleRejectionReasonChange = (e) => {
        setRejectionReason(e.target.value);
      };
    
      const handleReject = () => {
        if (record && rejectionReason.trim()) {
          updateStatus(record._id, "reject", rejectionReason.trim());
          setIsRejectModalVisible(false);
          setRejectionReason("");
          navigate("/admin/loanManagement");

        } else {
          console.error("Rejection reason is required.");
        }
      };
    
      const handleReset = () => {
        setRejectionReason("");
      };
    
  return (
    <div  style={{ marginTop: "50px", padding: "20px" }}>
       <h3>Loan Details</h3>
      <div style={{ overflow: "hidden" }}>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Created On</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {/* {new Date(record.createdAt).toLocaleDateString()} */}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Application ID</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record._id}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Full Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.fullName}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Aadhaar Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {" "}
                    {record.aadhaarNumber}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Address</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.address}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Annual Income</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.annualIncome}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Contact</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.contact}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Credit Score</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.creditScore}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Date of Birth</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {new Date(record.dob).toLocaleDateString()}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Down Payment</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.downPayment}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Employer Details</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.employerDetails}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Employment Status</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.employmentStatus}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Existing Loans</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.existingLoans}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Gender</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.gender}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Income Details</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.incomeDetails}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Loan Amount</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.loanAmount}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Loan Purpose</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.loanPurpose}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nationality</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.nationality}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>PAN</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.pan}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Property Details</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.propertyDetails}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Spouse Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.spouseName}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Spouse Occupation</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.spouseOccupation}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Spouse Income</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.spouseIncome}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Spouse Designation</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.spouseDesignation}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Total Children</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.totalChildren}
                  </p>
                </Col>
              </Row>
              {record.children.map((child, index) => (
                <React.Fragment key={index}>
                  <Row>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Child {index + 1} Name</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>{child.name}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Child {index + 1} Gender</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>{child.gender}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Child {index + 1} Age</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>{child.age}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>
                        <strong>Child {index + 1} School Name</strong>
                      </p>
                    </Col>
                    <Col span={2}>
                      <p style={{ fontSize: "15px" }}>:</p>
                    </Col>
                    <Col span={10}>
                      <p style={{ fontSize: "15px" }}>{child.schoolName}</p>
                    </Col>
                  </Row>
                </React.Fragment>
              ))}
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Status</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.status}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>GST Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.GSTNumber}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>IFSC Code</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.IFSCCode}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Aadhaar Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.aadhaarNumber}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Account Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.accountNumber}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Address</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.address}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Annual Income</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.annualIncome}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Bank Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.bankName}</p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Branch</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>{record.branch}</p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>PAN Card Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.panCardNumber}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Loan Agent Contact Number</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.loanAgentContactNumber}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Loan Agent Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.loanAgentName}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nominee Address</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.nomineeAddress}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nominee Name</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.nomineeName}
                  </p>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nominee Relationship</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    {record.nomineeRelationship}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Property Ownership Proof</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <a
                      href={record.propertyOwnershipProof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Aadhaar Image</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.aadharImageUpload}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Identity Proof</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.identityProof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Aadhaar Image</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.aadharImageUpload}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Signature</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.signature}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Photographs</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.photographs}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>PAN Image</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.panImageUpload}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Financial Proof</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.financialProof[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Address Proof</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.addressProof}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Co-Applicant Documents</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.coApplicantDocs}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={10}>
                  <p style={{ fontSize: "15px" }}>
                    <strong>Nominee Documents</strong>
                  </p>
                </Col>
                <Col span={2}>
                  <p style={{ fontSize: "15px" }}>:</p>
                </Col>
                <Col span={10}>
                  <a
                    href={record.nomineeDocs}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Document
                  </a>
                </Col>
              </Row>

              <Row style={{ marginTop: "25px", marginRight: "280px" }}>
                <Space>
                  {record && record.status === "Pending" && (
                    <Button
                      type="primary"
                      style={{ background: "#4096ff", color: "#fff" }}
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                  )}

                  {record && record.status === "Pending" && (
                    <>
                      <Button
                        danger
                        onClick={() => setIsRejectModalVisible(true)}
                      >
                        Reject
                      </Button>
                      <Modal
                        title="Rejection Confirmation"
                        visible={isRejectModalVisible}
                        onCancel={() => setIsRejectModalVisible(false)}
                        footer={null}
                      >
                        <div>
                          <p>Please provide a reason for rejection:</p>
                          <Input.TextArea
                            rows={3}
                            placeholder="Enter rejection reason"
                            value={rejectionReason}
                            onChange={handleRejectionReasonChange}
                          />
                          <Space style={{ marginTop: "20px" }}>
                            <Button
                              type="primary"
                              onClick={handleReject}
                              disabled={!rejectionReason.trim()}
                            >
                              Submit
                            </Button>
                            <Button onClick={handleReset}>Reset</Button>
                          </Space>
                        </div>
                      </Modal>
                    </>
                  )}

                  {record && record.status === "1" && (
                    <Button type="primary" disabled>
                      Approved
                    </Button>
                  )}

                  {record && record.status === "2" && (
                    <Button danger disabled>
                      Rejected
                    </Button>
                  )}
                </Space>
              </Row>
            </div>
    </div>
  )
}

export default LoanDetails
