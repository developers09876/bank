import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Card, Descriptions, Tag, Space, Divider } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../user/LoanDetails.css";
import { Col, Row } from "react-bootstrap";
import { BorderRight, Pending } from "@mui/icons-material";

const EmployeeDetailsPage = ({ collapsed }) => {
  const [loan, setLoan] = useState([]);
  const [dateFormat, setdateFormat] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const record = state?.record;
  console.log("record", record);

  useEffect(() => {
    if (record?.dob) {
      setdateFormat(new Date(record.dob).toISOString().split("T")[0]);
    }
  }, [record?.dob]);

  if (!record) {
    return <div>Loading or No loan details available.</div>;
  }

  return (
    <div>
      <div className="loandetail-container">
        <div className={collapsed ? "main-content.open" : "main-content"}>
          <div>
            <center>
              <h3>Employee Details</h3>
            </center>
            <div className="px-2" style={{ textAlign: "end" }}>
              <Tag>{record.userType && <p>{record.userType}</p>}</Tag>
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
                              //   objectFit: "cover",
                              border: "6px solid #80808040",
                            }}
                          />
                        </div>
                      )}
                      <p>
                        {record.firstname} {record.lastname}
                      </p>
                      <p>{record.email}</p>
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
                <Card
                  className="loandetail-custom-card"
                  title="Professional Details"
                >
                  <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    <Descriptions.Item label="Employee Type">
                      {record.userType}
                    </Descriptions.Item>
                    {record.employeeCategory && (
                      <Descriptions.Item label="Employee Category">
                        {record.employeeCategory}
                      </Descriptions.Item>
                    )}
                     {/* <Descriptions.Item label="Employee Category">
                      {record.employeeCategory}
                    </Descriptions.Item> */}
                    <Descriptions.Item label=" Employee Number">
                      {record.empno}
                    </Descriptions.Item>
                    <Descriptions.Item label="Date of Joining">
                      {record.dateOfJoining}
                    </Descriptions.Item>
                    <Descriptions.Item label="Manager">
                      {record.manager}
                    </Descriptions.Item>
                    <Descriptions.Item label="Branch">
                      {record.branch}
                    </Descriptions.Item>
                    <Descriptions.Item label=" Refer Type">
                      {record.referType}
                    </Descriptions.Item>
                    <Descriptions.Item label=" Referral Code">
                      {record.referralCode}
                    </Descriptions.Item>
                    <Descriptions.Item label=" Loan Type">
                      {record.loanType}
                    </Descriptions.Item>
                    <Descriptions.Item label=" Insurance Type">
                      {record.insuranceType}
                    </Descriptions.Item>
                    <Descriptions.Item label=" CIBIL Type">
                      {record.cibilType}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            {record.bankName && (
              <Row className="px-2">
                <Col lg={12} md={12}>
                  <Card className="loandetail-custom-card" title="KYC Details">
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
              </Row>
            )}

            {record.maritalStatus === "Married" && (
              <Row className="px-2">
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
              </Row>
            )}

            {/* Children Details */}
            {record.children && record.children.length > 0 && (
              <Row className="px-2">
                <Col lg={12} md={12}>
                  <Card
                    className="loandetail-custom-card"
                    title="Children Details"
                  >
                    <Descriptions
                      column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}
                    >
                      {record.children.map((child, index) => (
                        <React.Fragment key={child._id}>
                          <Descriptions.Item label={`Child ${index + 1} Name`}>
                            {child.name}
                          </Descriptions.Item>
                          <Descriptions.Item label="Gender">
                            {child.gender}
                          </Descriptions.Item>
                          <Descriptions.Item label="Age">
                            {child.age}
                          </Descriptions.Item>
                          <Descriptions.Item label="School Name">
                            {child.schoolName}
                          </Descriptions.Item>
                        </React.Fragment>
                      ))}
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            )}
            <Row className="px-2">
              <Col lg={12} md={12}>
                <Card
                  className="loandetail-custom-card"
                  title="Proof Documents"
                >
                  <Descriptions column={{ xl: 3, lg: 2, xs: 1, md: 1, sm: 1 }}>
                    {/* <Descriptions.Item label="Identity Proof">
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
                    </Descriptions.Item> */}
                    <Descriptions.Item label="PAN or Adhaar Image">
                      <a
                        href={record.panOrAdharUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="VoterId Image">
                      <a
                        href={record.voterIdUpload}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item>
                    {/* <Descriptions.Item label="Financial Proof">
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
                    </Descriptions.Item> */}
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
                    {/* <Descriptions.Item label="Nominee Documents">
                      <a
                        href={record.nomineeDocs}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </Descriptions.Item> */}
                  </Descriptions>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
