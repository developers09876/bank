import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
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
// import "../../dashboard/user/LoanDetails.css";
import Api from "../../../Api";
const TaxDetails = ({ collapsed }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);
  const [loan, setLoan] = useState([]);
  const [isPendingtModalVisible, setIsPendingModalVisible] = useState(false);
  const [pendingReason, setPendingReason] = useState("");
  const updateStatus = async (id, action, reason = "") => {
    try {
      const details = { action, reason };
      const response = await Api.put(
        `taxManagement/updateTaxapplicationsStaus/${id}`,
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
              <h3>Tax Details</h3>
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

          <Row className="px-2 py-3">
            {/* <Col>
              <Card>
                <Row>
                  <Col
                    className="firstrowcol px-1 py-1"
                    lg={3}
                    // md={12}
                    style={{
                      height: "auto",
                      alignContent: "center",
                      borderRight: "1px #e5e7eb solid",
                      textAlign: "-webkit-center",
                    }}
                  >
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
                    <p>
                      {record.firstname} {record.lastname}
                    </p>
                    <p>{record.email}</p>
                    <p>{record.contactNumber}</p>
                  </Col>
                 

                  <Col lg={9} className="px-3 py-1">
                    <center>
                      <h6>Other Information</h6>
                    </center>
                    <Descriptions
                      size="small"
                      // layout="vertical"
                      style={{
                        paddingBottom: "10px",
                      }}
                      column={{ xl: 1, lg: 1, xs: 1, md: 1, sm: 1 }}
                    >
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
                  </Col>
                </Row>
              </Card>
            </Col> */}
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
          </Row>
          <Row className="px-2">
            {/* <Col lg={12} md={12}>
                <Card className="loandetail-custom-card" title="Personal Details">
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Name">
                      {record.firstname}{" "}{record.lastname}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email Id">
                      {record.email}
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
                    <Descriptions.Item label="Contact ">
                      {record.contactNumber}
                    </Descriptions.Item>
                    
                  </Descriptions>
                </Card>
              </Col> */}
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Tax Details">
                <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="bussiness Type">
                    {record.businessType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Annual Income">
                    {record.annualIncome}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax Type">
                    {record.taxType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Sub Category">
                    {record.subCategory}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="Income Tax Status">
                    {record.status}
                  </Descriptions.Item> */}
                </Descriptions>
              </Card>
            </Col>
          </Row>
          <Row className="px-2">
            <Col lg={12} md={12}>
              <Card className="loandetail-custom-card" title="Tax Status">
                <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Approval Status">
                    {record.status === "1" ? (
                      <p style={{ color: "green", fontSize: "14px" }}>
                        Approved
                      </p>
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

export default TaxDetails;
