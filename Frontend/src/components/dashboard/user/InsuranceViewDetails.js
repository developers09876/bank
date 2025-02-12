import { Descriptions } from "antd";
import React from "react";
import { Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

function InsuranceViewDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state?.record;
  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Loan Details</h3>
            </center>
          </div>
          <Row>
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
          </Row>
        </div>
      </div>
    </div>
  );
}

export default InsuranceViewDetails;
