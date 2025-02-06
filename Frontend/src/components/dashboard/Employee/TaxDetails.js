import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Card, Descriptions, Tag, Space, Divider } from "antd";
// import "../../dashboard/user/LoanDetails.css";

const TaxDetails = ({ collapsed }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);

  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Tax Details</h3>
            </center>
          </div>
          <Row className="px-4 py-3" style={{ justifyContent: "center" }}>
            <Col lg={8}>
              <Card>
                <Row className="personal_card_row">
                  <Col
                    className="firstrowcol px-1 py-1"
                    lg={6}
                    md={12}
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

                  <Col lg={6} md={12} className="px-3 py-1">
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
          <Row style={{ textAlign: "-webkit-center" }}>
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
                style={{ width: "60%" }}
                className="loandetail-custom-card"
                title="Tax Details"
              >
                <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
                  <Descriptions.Item label="bussiness Type">
                    {record.businessType}
                  </Descriptions.Item>
                  <Descriptions.Item label="Annual Income">
                    {record.annualIncome}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax Paid">
                    {record.taxPaid}
                  </Descriptions.Item>
                  <Descriptions.Item label="Income Tax Status">
                    {record.incomeTaxStatus}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
           {record.employeeId && (
                  <Row style={{ textAlign: "-webkit-center" }}>
                    <Col lg={12} md={12}>
                      <Card
                        style={{ width: "60%" }}
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
                            {record.startDate ? record.startDate.split("T")[0] : "N/A"}
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
    </div>
  );
};

export default TaxDetails;
