import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  Card,
  Descriptions,
  Tag,
  Space,
  Divider,
  Modal,
  Input,
  Button,
} from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../user/LoanDetails.css";
import { Col, Row } from "react-bootstrap";
import Api from "../../../Api";
import { BorderRight } from "@mui/icons-material";

const LoanDetails = ({ collapsed }) => {
  const [loan, setLoan] = useState([]);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isPendingtModalVisible, setIsPendingModalVisible] = useState(false);
  const [pendingReason, setPendingReason] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);
  const dateFormat = new Date(record.dob).toISOString().split("T")[0];
  const updateStatus = async (id, action, reason = "") => {
    try {
      const details = { action, reason };
      const response = await Api.put(
        `loanform/updateloanapplicationsStaus/${id}`,
        details
      );
      console.log("Response data:", response.data);
      const updatedLoans = loan.map((item) =>
        item._id === id
          ? {
              ...item,
              status:
                action === "approve"
                  ? "1"
                  : action === "reject"
                  ? "2"
                  : "Pending",
              rejectionReason: action === "reject" ? reason : null,
              pendingReason: action === "Pending" ? reason : null,
            }
          : item
      );
      setLoan(updatedLoans);

      // await fetchUpdatedRecord();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handlePendingReasonChange = (e) => {
    setPendingReason(e.target.value);
  };

  const handlePending = () => {
    if (record && pendingReason.trim()) {
      updateStatus(record._id, "Pending", pendingReason.trim());
      setIsPendingModalVisible(false);
      setPendingReason("");
    } else {
      console.error("Pending reason is required.");
    }
  };
  const handleReset = () => {
    setPendingReason("");
  };
  if (!record) {
    return <div>Loading or No loan details available.</div>;
  }

  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Loan Details</h3>
            </center>
            <div className="px-2" style={{ textAlign: "end" }}>
              <Tag
                icon={
                  record.status === "Pending" ? (
                    <ClockCircleOutlined />
                  ) : record.status === "2" ? (
                    <CloseCircleOutlined />
                  ) : record.status === "1" ? (
                    <CheckCircleOutlined />
                  ) : null
                }
                color={
                  record.status === "Pending"
                    ? "orange"
                    : record.status === "2"
                    ? "red"
                    : record.status === "1"
                    ? "green"
                    : null
                }
                className={`status-tag ${
                  record.status === "1"
                    ? "approved"
                    : record.status === "2"
                    ? "rejected"
                    : "pending"
                }`}
              >
                {record.status === "1" ? (
                  <p style={{ display: "inline" }}>Approved</p>
                ) : record.status === "2" ? (
                  <p style={{ display: "inline" }}>Rejected</p>
                ) : (
                  <p style={{ display: "inline" }}>Pending</p>
                )}
              </Tag>
            </div>
            <Row className="px-4 py-3">
              <Col>
                <Card>
                  <Row>
                    <Col
                      className="firstrowcol px-1 py-1"
                      lg={3}
                      style={{
                        height: "auto",
                        alignContent: "center",
                        // borderRight: "1px #e5e7eb solid",
                        textAlign: "-webkit-center",
                      }}
                    >
                      {record.photographs ? (
                        <div className="photo-preview mb-2">
                          <img
                            //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM_uVhUxuWMjezl0rV0KPIad0chGa4Pw6aA&s"
                            src={record.photographs}
                            alt="Photograph"
                            className="photo-image"
                            style={{
                              width: "200px",
                              height: "200px",
                              border: "6px solid #80808040",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="photo-preview mb-2">
                          <img
                            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                            //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeM_uVhUxuWMjezl0rV0KPIad0chGa4Pw6aA&s"
                            // src={record.photographs}
                            alt="Photograph"
                            className="photo-image"
                            style={{
                              width: "200px",
                              height: "200px",
                              border: "6px solid #80808040",
                            }}
                          />
                        </div>
                      )}
                      <p>
                        {record.firstname} {record.lastname}
                      </p>
                    </Col>

                    <Col lg={9} className="px-3 py-1">
                      <h6>Personal Info</h6>
                      <Descriptions
                        size="small"
                        // layout="vertical"
                        style={{
                          borderBottom: "1px #e5e7eb solid",
                          paddingBottom: "10px",
                        }}
                        column={{ xl: 3, lg: 2, xs: 1, md: 2, sm: 1 }}
                      >
                        <Descriptions.Item label="Name">
                          {record.firstname} {record.lastname}
                        </Descriptions.Item>
                        <Descriptions.Item label="Gender">
                          {record.gender}
                        </Descriptions.Item>
                        <Descriptions.Item label="Date of Birth">
                          {dateFormat}
                        </Descriptions.Item>
                        <Descriptions.Item label="Marital Status">
                          {record.maritalStatus}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nationality">
                          {record.nationality}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone Number">
                          {record.contactNumber}
                        </Descriptions.Item>
                      </Descriptions>
                      <h6 style={{ marginTop: "10px" }}>Contact Details</h6>
                      <Descriptions
                        size="small"
                        // layout="vertical"
                        column={{ xl: 3, lg: 2, xs: 1, md: 2, sm: 1 }}
                      >
                        <Descriptions.Item label="Address">
                          {record.address}
                        </Descriptions.Item>
                        <Descriptions.Item label="City">
                          {record.city}
                        </Descriptions.Item>
                        <Descriptions.Item label="District">
                          {record.district}
                        </Descriptions.Item>
                        <Descriptions.Item label="State">
                          {record.state}
                        </Descriptions.Item>
                        <Descriptions.Item label="Country">
                          {record.country}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row className="px-2">
              {/* <Col lg={6} md={12}>
                <Card
                  className="loandetail-custom-card"
                  title="Personal Details"
                >
                  <Descriptions
                    size="small"
                    layout="vertical"
                    column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}
                  >
                    <Descriptions.Item label="Name">
                      {record.firstname} {record.lastname}
                    </Descriptions.Item>
                    <Descriptions.Item label="Gender">
                      {record.gender}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date of Birth">
                      {dateFormat}
                    </Descriptions.Item>
                    <Descriptions.Item label="Marital Status">
                      {record.maritalStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="Nationality">
                      {record.nationality}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col> */}

              {/* <Col lg={6} md={12}>
                <Card
                  className="loandetail-custom-card"
                  title="Contact Details"
                >
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Address">
                      {record.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="City">
                      {record.city}
                    </Descriptions.Item>
                    <Descriptions.Item label="District">
                      {record.district}
                    </Descriptions.Item>
                    <Descriptions.Item label="State">
                      {record.state}
                    </Descriptions.Item>
                    <Descriptions.Item label="Country">
                      {record.country}
                    </Descriptions.Item>
                    <Descriptions.Item label="Pincode">
                      {record.pinCode}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col> */}

              <Col lg={12} md={12}>
                <Card className="loandetail-custom-card" title="Loan Details">
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    {record.loanAgentName && (
                      <Descriptions.Item label="Agent Name">
                        {record.loanAgentName}
                      </Descriptions.Item>
                    )}
                    {record.loanAgentContactNumber && (
                      <Descriptions.Item label="Agent Contact">
                        {record.loanAgentContactNumber}
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Loan Amount">
                      {record.loanAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label="Purpose">
                      {record.loanPurpose}
                    </Descriptions.Item>
                    <Descriptions.Item label="Employment Status">
                      {record.employmentStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="Annual Income">
                      {record.annualIncome}
                    </Descriptions.Item>
                    <Descriptions.Item label="Existing Loans">
                      {record.existingLoans}
                    </Descriptions.Item>
                    <Descriptions.Item label="Credit Score">
                      {record.creditScore}
                    </Descriptions.Item>
                    <Descriptions.Item label="Property Details">
                      {record.propertyDetails}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              <Col lg={12} md={12}>
                <Card className="loandetail-custom-card" title="Loan Status">
                  <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Approval Status">
                      {record.status === "1" ? (
                        <p color="green">Approved</p>
                      ) : record.status === "2" ? (
                        <p color="red">Rejected</p>
                      ) : (
                        <p color="orange">Pending</p>
                      )}
                    </Descriptions.Item>
                    {record.status === "2" && (
                      <Descriptions.Item label="Reason for Rejection">
                        {record.rejectionReason}
                      </Descriptions.Item>
                    )}
                    {record.status === "Pending" && record.pendingReason && (
                      <Descriptions.Item label="Reason for Hold">
                        {record.pendingReason}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Col>

              <Col lg={12} md={12}>
                <Card
                  className="loandetail-custom-card"
                  title="Nominee Details"
                >
                  <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Nominee Name">
                      {record.nomineeName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Relationship">
                      {record.nomineeRelationship}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {record.nomineeAddress}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>

              {record.maritalStatus === "Married" && (
                <Col lg={12} md={12}>
                  <Card
                    className="loandetail-custom-card"
                    title="Spouse Details"
                  >
                    <Descriptions
                      column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}
                    >
                      <Descriptions.Item label="Spouse Name">
                        {record.spouseName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Spouse Occupation">
                        {record.spouseOccupation}
                      </Descriptions.Item>
                      <Descriptions.Item label="Spouse Income">
                        {record.spouseIncome}
                      </Descriptions.Item>
                      <Descriptions.Item label="Spouse Designation">
                        {record.spouseDesignation}
                      </Descriptions.Item>
                      {record.totalChildren && record.totalChildren > 0 && (
                        <Descriptions.Item label="Total Children">
                          {record.totalChildren}
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Card>
                </Col>
              )}

              {record.bankName && (
                <Col lg={12} md={12}>
                  <Card className="loandetail-custom-card" title="Bank Details">
                    <Descriptions
                      column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}
                    >
                      <Descriptions.Item label="Bank Name">
                        {record.bankName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Branch Name">
                        {record.bankBranch}
                      </Descriptions.Item>
                      <Descriptions.Item label="IFSC Code">
                        {record.IFSCCode}
                      </Descriptions.Item>
                      <Descriptions.Item label="Account Number">
                        {record.accountNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="GST Number">
                        {record.GSTNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="Aadhar Number">
                        {record.aadhaarNumber}
                      </Descriptions.Item>
                      <Descriptions.Item label="PAN Number">
                        {record.panCardNumber}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              )}

              <Col lg={12} md={12}>
                <Card
                  className="loandetail-custom-card"
                  title="Proof Documents"
                >
                  <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Identity Proof">
                      <a
                        href={record.identityProof}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Property Ownership Proof">
                      <a
                        href={record.propertyOwnershipProof}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Signature">
                      <a
                        href={record.signature}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="PAN Image">
                      <a
                        href={record.panImageUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Aadhaar Image">
                      <a
                        href={record.aadharImageUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Financial Proof">
                      <a
                        href={record.financialProof[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Address Proof">
                      <a
                        href={record.addressProof}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    {record.coApplicantDocs && (
                      <Descriptions.Item label="Spouse Pay Slip">
                        <a
                          href={record.coApplicantDocs}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                      </Descriptions.Item>
                    )}
                    <Descriptions.Item label="Nominee Documents">
                      <a
                        href={record.nomineeDocs}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
            <Row className="py-4" style={{ justifySelf: "center" }}>
              <Space>
                {/* {record && record.status === "Pending" && (
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
                                type="primary"
                                danger
                                onClick={() => setIsRejectModalVisible(true)}
                              >
                                Reject
                              </Button>
                            </>
                          )} */}

                {record &&
                  record.status === "Pending" &&
                  !record.pendingReason && (
                    <Button
                      color="yellow"
                      variant="solid"
                      onClick={() => setIsPendingModalVisible(true)}
                    >
                      Hold
                    </Button>
                  )}
                {record &&
                  record.status === "Pending" &&
                  record.pendingReason && (
                    <Button
                      color="yellow"
                      variant="solid"
                      disabled
                      onClick={() => setIsPendingModalVisible(true)}
                    >
                      On Hold
                    </Button>
                  )}

                {/* <Modal
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
                                <Button variant="secondary" onClick={handleReset}>
                                  Reset
                                </Button>
                              </Space>
                            </div>
                          </Modal> */}

                <Modal
                  title="Pending Confirmation"
                  visible={isPendingtModalVisible}
                  onCancel={() => setIsPendingModalVisible(false)}
                  footer={null}
                >
                  <div>
                    <p>
                      Please provide a reason for holding the Insurance
                      application:
                    </p>
                    <Input.TextArea
                      rows={3}
                      placeholder="Enter Pending reason"
                      value={pendingReason}
                      onChange={handlePendingReasonChange}
                    />
                    <Space style={{ marginTop: "20px" }}>
                      <Button
                        type="primary"
                        onClick={handlePending}
                        disabled={!pendingReason.trim()}
                      >
                        Submit
                      </Button>
                      <Button variant="secondary" onClick={handleReset}>
                        Reset
                      </Button>
                    </Space>
                  </div>
                </Modal>

                {record && record.status === "1" && (
                  <>
                    {/* <Button type="primary" disabled>
                                Approved
                              </Button>
                              <Button
                                type="primary"
                                danger
                                onClick={() => setIsRejectModalVisible(true)}
                              >
                                Reject
                              </Button> */}
                    <Button
                      color="yellow"
                      variant="solid"
                      onClick={() => setIsPendingModalVisible(true)}
                    >
                      Hold
                    </Button>
                  </>
                )}

                {record && record.status === "2" && (
                  <>
                    {/* <Button
                                type="primary"
                                style={{ background: "#4096ff", color: "#fff" }}
                                onClick={handleApprove}
                              >
                                Approve
                              </Button>
                              <Button type="primary" danger disabled>
                                Rejected
                              </Button> */}
                    <Button
                      color="yellow"
                      variant="solid"
                      onClick={() => setIsPendingModalVisible(true)}
                    >
                      Hold
                    </Button>
                  </>
                )}
              </Space>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
