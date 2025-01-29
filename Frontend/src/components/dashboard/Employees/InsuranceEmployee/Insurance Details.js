// import React from "react";import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Typography, Descriptions } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const { Title } = Typography;

function InsuranceDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { record } = location.state || {};
  console.log("record", record);

  if (!record) {
    return <p>No details available.</p>;
  }

  return (
    <div className="loandetail-container" style={{ marginTop: "50px", padding: "20px" }}>
      <center>
        <Title level={3}>Insurance Details</Title>
      </center>

      <Row className="px-4 py-3" style={{ justifyContent: "center", width: "100%" }}>
        <Col lg={12}>
          <Card style={{ width: "100%" }}>
            <Row>
              <Col lg={6} md={12} style={{ textAlign: "center", borderRight: "1px solid #e5e7eb" }}>
                <img
                  src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                  alt="Profile"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    border: "4px solid #80808040",
                    marginBottom: "10px",
                  }}
                />
                <p>{record.firstname} {record.lastname}</p>
                <p>{record.email}</p>
                <p>{record.contactNumber}</p>
              </Col>

              <Col lg={18} md={12} className="px-3 py-1">
                <center>
                  <Title level={5} style={{color:"#00397FED"}}>Other Information</Title>
                </center>
                <Descriptions column={1}>
                  <Descriptions.Item label="Adhaar Number">{record.aadhar}</Descriptions.Item>
                  <Descriptions.Item label="PanCard Number">{record.panno}</Descriptions.Item>
                  <Descriptions.Item label="GST Number">{record.gst}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row style={{ justifyContent: "center", marginTop: "20px" }}>
        <Col lg={12}>
          <Card  className="loandetail-custom-card" title="Insurance Details" style={{ width: "100%" ,}}>
            <Descriptions column={2}>
              <Descriptions.Item label="Policy Type">{record.PolicyType}</Descriptions.Item>
              <Descriptions.Item label="Sum Assured">{record.sumAssured}</Descriptions.Item>
              <Descriptions.Item label="Policy Term">{record.policyTerm}</Descriptions.Item>
              <Descriptions.Item label="Annual Income">{record.annualIncome}</Descriptions.Item>
              <Descriptions.Item label="Purpose Of Insurance">{record.purpose}</Descriptions.Item>
              <Descriptions.Item label="How Immediate">{record.howimidiate}</Descriptions.Item>
              <Descriptions.Item label="Previously Applied">{record.previouslyapplied}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <h3 style={{ margin: "20px 0" }}>Reminders</h3>

      {/* Displaying reminders */}
      {record.addremarks && record.addremarks.length > 0 ? (
        record.addremarks.map((remark, index) => (
          <Card key={index} style={{ marginBottom: "10px", width: "100%" }}>
            <Row>
              <Col span={6}><strong>Date:</strong></Col>
              <Col span={18}>{remark.date}</Col>
            </Row>
            <Row>
              <Col span={6}><strong>Message:</strong></Col>
              <Col span={18}>{remark.remarks}</Col>
            </Row>
          </Card>
        ))
      ) : (
        <p>No reminders available.</p>
      )}

      <Button type="primary" style={{ marginTop: "20px" }} onClick={() => navigate(-1)}>
        Back
      </Button>
    </div>
  );
}

export default InsuranceDetails;

// import { useLocation, useNavigate } from "react-router-dom";
// import { Row, Col, Card, Button, Typography, Descriptions } from "antd";
// import "bootstrap/dist/css/bootstrap.min.css";

// const { Title, Text } = Typography;

// function InsuranceDetails() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { record } = location.state || {};
//   console.log("record", record);

//   if (!record) {
//     return <p>No details available.</p>;
//   }

//   return (
//     <div className="loandetail-container" 
//     style={{ marginTop: "50px", padding: "20px" }}>
//       <center>
//         <h3>Insurance Details</h3>
//       </center>

//       <Row className="px-4 py-3" style={{ justifyContent: "center" ,width:"100%"}}>
//         <Col lg={8}>
//           <Card >
//             <Row className="personal_card_row">
//               <Col
//                 className="firstrowcol px-1 py-1"
//                 lg={6}
//                 md={12}
//                 style={{
//                   height: "auto",
//                   alignContent: "center",
//                   borderRight: "1px #e5e7eb solid",
//                   textAlign: "-webkit-center",
//                 }}
//               >
//                 <div className="photo-preview mb-2">
//                   <img
//                     src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
//                     alt="Photograph"
//                     className="photo-image"
//                     style={{
//                       width: "100px",
//                       height: "100px",
//                       borderRadius: "50%",
//                       border: "6px solid #80808040",
//                     }}
//                   />
//                 </div>
//                 <p>
//                   {record.firstname} {record.lastname}
//                 </p>
//                 <p>{record.email}</p>
//                 <p>{record.contactNumber}</p>
//               </Col>

//               <Col lg={6} md={12} className="px-3 py-1">
//                 <center>
//                   <h6>Other Information</h6>
//                 </center>
//                 <Descriptions
//                   size="small"
//                   style={{ paddingBottom: "10px" }}
//                   column={{ xl: 1, lg: 1, xs: 1, md: 1, sm: 1 }}
//                 >
//                   <Descriptions.Item label="Adhaar Number">
//                     {record.aadhar}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="PanCard Number">
//                     {record.panno}
//                   </Descriptions.Item>
//                   <Descriptions.Item label="GST Number">
//                     {record.gst}
//                   </Descriptions.Item>
//                 </Descriptions>
//               </Col>
//             </Row>
//           </Card>
//         </Col>
//       </Row>

//       <Row style={{ textAlign: "-webkit-center" }}>
//         <Col lg={12} md={12}>
//           <Card
//             style={{ width: "60%" }}
//             className="loandetail-custom-card"
//             title="Insurance Details"
//           >
//             <Descriptions column={{ xl: 2, lg: 2, xs: 1, md: 1, sm: 1 }}>
//               <Descriptions.Item label="Policy Type">
//                 {record.PolicyType}
//               </Descriptions.Item>
//               <Descriptions.Item label="Sum Assured">
//                 {record.sumAssured}
//               </Descriptions.Item>
//               <Descriptions.Item label="Policy Term">
//                 {record.policyTerm}
//               </Descriptions.Item>
//               <Descriptions.Item label="Annual Income">
//                 {record.annualIncome}
//               </Descriptions.Item>
//             </Descriptions>
//           </Card>
//         </Col>
//       </Row>
//       <h3 style={{ marginBottom: "20px", marginTop: "20px" }}>Reminders</h3>

// {/* Displaying reminders */}
// {record.addremarks && record.addremarks.length > 0 ? (
//   record.addremarks.map((remark, index) => (
//     <div key={index} style={{ marginBottom: "10px" }}>
//       <Row>
//         <Col span={6}><strong>Date:</strong></Col>
//         <Col span={18}>{remark.date}</Col>
//       </Row>
//       <Row>
//         <Col span={6}><strong>Message:</strong></Col>
//         <Col span={18}>{remark.remarks}</Col>
//       </Row>
    
//       <hr style={{ margin: "10px 0" }} />
//     </div>
//   ))
// ) : (
//   <p>No reminders available.</p>
// )}
//       <Button
//         type="primary"
//         style={{ marginTop: "20px" }}
//         onClick={() => navigate(-1)}
//       >
//         Back
//       </Button>
//     </div>
//   );
// }

// export default InsuranceDetails;