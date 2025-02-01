import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  Card,
  Descriptions,
  Tag,
  Space,
  Button,
  Divider,
  Modal,
  Input,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { Select } from "antd";
import { toast, ToastContainer } from "react-toastify";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Col, Row } from "react-bootstrap";
import { BorderRight } from "@mui/icons-material";
import Api from "../../../../Api";
import "../../user/LoanDetails.css";
const { Option } = Select;

function LoanTaskDetails() {
  const { state } = useLocation();
  const initialRecord = state?.record;
  const [record, setRecord] = useState(initialRecord);
  const location = useLocation();
  const userId = localStorage.getItem("id");

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [isPendingtModalVisible, setIsPendingModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingReason, setPendingReason] = useState("");
  const [loan, setLoan] = useState([]);
  const dateFormat = new Date(record.dob).toISOString().split("T")[0];

  const fetchUpdatedRecord = async () => {
    try {
      const response = await Api.get(
        `http://localhost:5000/loanform/getbyEmployeeid/${userId}`
      );
      console.log("responseget.data", response.data);
      const update = response.data;
      console.log("update", update);
      const updatedRecord = update.filter(
        (loandata) => loandata._id === record._id
      );
      console.log("updatedRecord", updatedRecord);
      if (updatedRecord) {
        setRecord(updatedRecord[0]);
      }
    } catch (error) {
      console.error("Error fetching updated record:", error);
    }
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

      await fetchUpdatedRecord();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleApprove = () => {
    if (record) {
      updateStatus(record._id, "approve");
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

  const handleRejectionReasonChange = (e) => {
    setRejectionReason(e.target.value);
  };

  const handleReject = () => {
    if (record && rejectionReason.trim()) {
      updateStatus(record._id, "reject", rejectionReason.trim());
      setIsRejectModalVisible(false);
      setRejectionReason("");
    } else {
      console.error("Rejection reason is required.");
    }
  };

  const handleReset = () => {
    setRejectionReason("");
    setPendingReason("");
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <div className="loandetail-container">
        <div>
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
                        borderRight: "1px #e5e7eb solid",
                        textAlign: "-webkit-center",
                      }}
                    >
                      {record.photographs ? (
                        <div className="photo-preview mb-2">
                          <img
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
              <Col lg={12} md={12}>
                <Card className="loandetail-custom-card" title="Loan Details">
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Agent Name">
                      {record.loanAgentName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Agent Contact">
                      {record.loanAgentContactNumber}
                    </Descriptions.Item>
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
                        {record.branch}
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

            <Row className="py-3">
              {record.employeeType && (
                <>
                  <center>
                    <h3>Update the Loan Status</h3>
                  </center>
                  <Col lg={12} md={12}>
                    <Card
                      className="loandetail-custom-card"
                      title="Task Details"
                    >
                      <Descriptions
                        column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}
                      >
                        <Descriptions.Item label="Loan Type">
                          {record.loanType}
                        </Descriptions.Item>
                        <Descriptions.Item label="Start Date">
                          {record.startDate
                            ? new Date(record.startDate)
                                .toISOString()
                                .split("T")[0]
                            : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="End Date">
                          {record.endDate
                            ? new Date(record.endDate)
                                .toISOString()
                                .split("T")[0]
                            : "N/A"}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description">
                          {record.description}
                        </Descriptions.Item>

                        {(record.pendingReason === null ||
                          record.rejectionReason === null) && (
                          <Descriptions.Item label="Your Approval Status">
                            {record.status === "1" ? (
                              <p color="green">Loan Approved</p>
                            ) : record.status === "2" ? (
                              <p color="red">Loan Rejected</p>
                            ) : (
                              <p style={{ color: "orange" }}>Loan is on Hold</p>
                            )}
                          </Descriptions.Item>
                        )}

                        {record.status === "2" && (
                          <Descriptions.Item label="Reason for Your Rejection">
                            {record.rejectionReason}
                          </Descriptions.Item>
                        )}
                        {record.status === "Pending" &&
                          record.pendingReason && (
                            <Descriptions.Item label="Reason for Holding the Loan">
                              {record.pendingReason}
                            </Descriptions.Item>
                          )}
                      </Descriptions>

                      <Row
                        className="px-4 py-4"
                        style={{ justifySelf: "center" }}
                      >
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
                                type="primary"
                                danger
                                onClick={() => setIsRejectModalVisible(true)}
                              >
                                Reject
                              </Button>
                            </>
                          )}

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
                                <Button
                                  variant="secondary"
                                  onClick={handleReset}
                                >
                                  Reset
                                </Button>
                              </Space>
                            </div>
                          </Modal>

                          <Modal
                            title="Pending Confirmation"
                            visible={isPendingtModalVisible}
                            onCancel={() => setIsPendingModalVisible(false)}
                            footer={null}
                          >
                            <div>
                              <p>
                                Please provide a reason for holding the Loan
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
                                <Button
                                  variant="secondary"
                                  onClick={handleReset}
                                >
                                  Reset
                                </Button>
                              </Space>
                            </div>
                          </Modal>

                          {record && record.status === "1" && (
                            <>
                              <Button type="primary" disabled>
                                Approved
                              </Button>
                              <Button
                                type="primary"
                                danger
                                onClick={() => setIsRejectModalVisible(true)}
                              >
                                Reject
                              </Button>
                              <Button
                                type="primary"
                                ghost
                                onClick={() => setIsPendingModalVisible(true)}
                              >
                                Hold
                              </Button>
                            </>
                          )}

                          {record && record.status === "2" && (
                            <>
                              <Button
                                type="primary"
                                style={{ background: "#4096ff", color: "#fff" }}
                                onClick={handleApprove}
                              >
                                Approve
                              </Button>
                              <Button type="primary" danger disabled>
                                Rejected
                              </Button>
                              <Button
                                type="primary"
                                ghost
                                onClick={() => setIsPendingModalVisible(true)}
                              >
                                Hold
                              </Button>
                            </>
                          )}
                        </Space>
                      </Row>
                    </Card>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanTaskDetails;
