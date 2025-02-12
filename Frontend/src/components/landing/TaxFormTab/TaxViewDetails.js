import React, { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Descriptions, Button, Tag } from "antd";
import "../../dashboard/user/LoanDetails.css";
import { DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const TaxViewDetails = ({ collapsed }) => {
  const pdfRef = useRef();

  const { state } = useLocation();
  const record = state?.record;
  const handleDownloadPDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`Tax_Details_${record._id}.pdf`);
  };
  return (
    <div>
      <div className="loandetail-container" ref={pdfRef}>
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
          <Row className="px-4 py-3">
            <Col>
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
                  {/* <Col 
                    className="firstrowcol px-1 py-1"
                    lg={12}
                    style={{
                      height: "auto",
                      alignContent: "center",
                      textAlign: "-webkit-center",
                    }}>
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
                    </Col> */}

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
            </Col>
          </Row>
          <Row>
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
                  <Descriptions.Item label="Tax Sub-Category">
                    {record.subCategory}
                  </Descriptions.Item>
                  {/* <Descriptions.Item label="Income Tax Status">
                                        {record.incomeTaxStatus}
                                      </Descriptions.Item> */}
                </Descriptions>
              </Card>
            </Col>
          </Row>
          <Row>
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
        </div>
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          onClick={handleDownloadPDF}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "10px",
          }}
        >
          Download as PDF
        </Button>
      </div>
    </div>
  );
};

export default TaxViewDetails;
