import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Card, Descriptions, Tag, Space, Divider, Modal, Input,Button } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../../dashboard/user/LoanDetails.css";
import Api from "../../../Api";
const InsuranceDetails = ({ collapsed }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state?.record;
   const [loan, setLoan] = useState([]);
    const [isPendingtModalVisible, setIsPendingModalVisible] = useState(false);
      const [pendingReason, setPendingReason] = useState("");
  console.log("record", record);
  const updateStatus = async (id, action, reason = "") => {
      try {
        const details = { action, reason };
        const response = await Api.put(
          `http://localhost:5000/insuranceManagement/updateInsapplicationsStaus/${id}`,
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
  
        // await getbyLeadId();
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
  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Insurance Details</h3>
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
          </div>

          <Row className="px-2 py-2">
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Personal Details">
                <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Name">
                    {record.firstname} {record.lastname}
                  </Descriptions.Item>
                  <Descriptions.Item label="Email Id">
                    {record.email}
                  </Descriptions.Item>
                  <Descriptions.Item label="Contact ">
                    {record.contactNumber}
                  </Descriptions.Item>
                  <Descriptions.Item label="Adhaar Number">
                    {record.aadhar}
                  </Descriptions.Item>
                  <Descriptions.Item label="PanCard Number">
                    {record.panno}
                  </Descriptions.Item>
                  <Descriptions.Item label="GST Number">
                    {record.gst}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col lg={12} md={12}>
              <Card
                // style={{ width: "100%" }}
                className="loandetail-custom-card"
                title="Insurance Details"
              >
                <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Policy Type">
                    {record.PolicyType}
                  </Descriptions.Item>
                  {record.PolicyType === "Vehicle Insurance" &&
                    record.VehicleType && (
                      <Descriptions.Item label="Vehicle Type">
                        {record.VehicleType}
                      </Descriptions.Item>
                    )}
                  <Descriptions.Item label="Policy Amount">
                    {record.policyAmount}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sum Assured">
                    {record.sumAssured}
                  </Descriptions.Item>
                  <Descriptions.Item label="Policy Term">
                    {record.policyTerm}
                  </Descriptions.Item>
                  <Descriptions.Item label="Annual Income">
                    {record.annualIncome}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Insurance Status">
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
          </Row>
          {/* {record.employeeId && (
            <Row className="px-2">
              <Col lg={12} md={12}>
                <Card
                  style={{ width: "100%" }}
                  className="loandetail-custom-card"
                  title="Task Assigned Details"
                >
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    
                    <Descriptions.Item label="Employee Type">
                      {record.employeeType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Employee Category">
                      {record.employeeCategory}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                      {record.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Start Date">
                      {record.startDate
                        ? record.startDate.split("T")[0]
                        : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="End Date">
                      {record.endDate ? record.endDate.split("T")[0] : "N/A"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          )} */}
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
  );
};

export default InsuranceDetails;
