import React, { useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Card, Descriptions, Button } from "antd";
import "../../dashboard/user/LoanDetails.css";
import { DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InsuranceViewDetails = ({ collapsed }) => {
  const pdfRef = useRef();

  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);
  const handleDownloadPDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`Insurance_Details_${record._id}.pdf`);
  };
  return (
    <div>
      <div className="loandetail-container" ref={pdfRef}>
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Insurance Details</h3>
            </center>
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
              <Card
                style={{ width: "100%" }}
                className="loandetail-custom-card"
                title="Insurance Details"
              >
                <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="Policy Type">
                    {record.PolicyType}
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
          </Row>
          {record.employeeId && (
            <Row className="px-2">
              <Col lg={12} md={12}>
                <Card
                  style={{ width: "100%" }}
                  className="loandetail-custom-card"
                  title="Task Assigned Details"
                >
                  <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    {/* <Descriptions.Item label="Employee Name">
                                      {employeeName}
                                    </Descriptions.Item> */}
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
          )}
        </div>
      </div>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={handleDownloadPDF}
        style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "10px" }}
      >
        Download as PDF
      </Button>
    </div>
  );
};

export default InsuranceViewDetails;
