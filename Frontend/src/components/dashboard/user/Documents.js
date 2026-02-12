// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Container, Row, Col } from "react-bootstrap";
// import "./Documents.css";
// import Api from "../../../Api";

// const Documents = () => {
//   const [hovered, setHovered] = useState(null);
//   const [hoveredLoan, setHoveredLoan] = useState(null);
//   const [hoveredInsurance, setHoveredInsurance] = useState(null);
//   const [hoveredTax, setHoveredTax] = useState(null);
//   const [showLoans, setShowLoans] = useState(false);
//   const [showInsurances, setShowInsurances] = useState(false);
//   const [showTaxes, setShowTaxes] = useState(false);
//   const [data, setData] = useState({});
//   const [loanData, setLoanData] = useState([]);
//   const [insuranceData, setInsuranceData] = useState([]);
//   const [taxData, setTaxData] = useState([]);
//   const navigate = useNavigate();

//   console.log("data", data);
//   console.log("loanData", loanData);
//   console.log("insuranceData", insuranceData);
//   console.log("taxData", taxData);

//   const userid = localStorage.getItem("id");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [userRes, loanRes, insuranceRes, taxRes] = await Promise.all([
//           Api.get(`signup/getby/${userid}`),
//           Api.get(`loanform/getbyid/${userid}`),
//           Api.get(`insuranceManagement/getByIdInsuranceManagement/${userid}`),
//           Api.get(`taxManagement/getByIdTaxManagement/${userid}`),
//         ]);
//         setData(userRes.data || {});
//         setLoanData(loanRes.data || []);
//         setInsuranceData(insuranceRes.data || []);
//         setTaxData(taxRes.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, [userid]);

//   const handleViewDetails = (item, type) => {
//     navigate(`/details`, { state: { item, type } });
//   };

//   return (
//     <Container className="mt-4 d-block">
//       <Row className="g-4">
//         {/* Personal Details Card */}
//         <Col lg={3} md={6} sm={12}>
//           <div
//             className={`documentcard personal-card ${
//               hovered === "personal" ? "expanded" : ""
//             }`}
//             onMouseEnter={() => setHovered("personal")}
//             onMouseLeave={() => setHovered(null)}
//           >
//             <h3 className="documentcard-title">Personal Details</h3>
//             {hovered === "personal" && (
//               <ul className="documentcard-list">
//                 {[
//                   { label: "Profile", value: data?.photographs },
//                   { label: "Spouse Pay Slip", value: data?.coApplicantDocs },
//                   { label: "Aadhaar Or PAN", value: data?.panOrAdharUpload },
//                   { label: "Voter ID Proof", value: data?.voterIdUpload },
//                 ].map((item, i) => (
//                   <li key={i} className="documentcard-item">
//                     <span>{item.label}: </span>
//                     {item.value ? (
//                       <a
//                         href={item.value}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="documentcard-link"
//                       >
//                         View Document
//                       </a>
//                     ) : (
//                       <span className="documentcardtext-gray">
//                         Not Available
//                       </span>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </Col>

//         {/* Loan Details Card */}
//         <Col lg={3} md={6} sm={12}>
//           <div
//             className="documentcard loan-card"
//             onClick={() => setShowLoans(!showLoans)}
//           >
//             <h3 className="documentcard-title">Loan Details</h3>
//           </div>
//         </Col>

//         {/* Insurance Details Card */}
//         <Col lg={3} md={6} sm={12}>
//           <div
//             className="documentcard insurance-card"
//             onClick={() => setShowInsurances(!showInsurances)}
//           >
//             <h3 className="documentcard-title">Insurance Details</h3>
//           </div>
//         </Col>

//         <Col lg={3} md={6} sm={12}>
//           <div
//             className="documentcard tax-card"
//             onClick={() => setShowTaxes(!showTaxes)}
//           >
//             <h3 className="documentcard-title">Tax Details</h3>
//           </div>
//         </Col>
//       </Row>

//       {/* Loan Cards (Shown Only When Loan Details Card is Clicked) */}
//       {showLoans && (
//         <>
//           <h3 className="mt-4">Loan Documents</h3>
//           <Row className="px-1 py-2">
//             {loanData.map((loan, index) => (
//               <Col key={index} lg={4} md={6} sm={12}>
//                 <div
//                   className={`documentcard loan-details-card ${
//                     hoveredLoan === index ? "expanded" : ""
//                   }`}
//                   onMouseEnter={() => setHoveredLoan(index)}
//                   onMouseLeave={() => setHoveredLoan(null)}
//                 >
//                   <h3 className="documentcard-title">Loan {index + 1}</h3>
//                   {hoveredLoan === index && (
//                     <ul className="documentcard-list">
//                       {[
//                         { label: "Address Proof", value: loan?.addressProof },
//                         {
//                           label: "Employee Pay Slip",
//                           value: loan?.employeePayslipProof,
//                         },
//                         { label: "Identity Proof", value: loan?.identityProof },
//                         { label: "Nominee Proof", value: loan?.nomineeDocs },
//                         { label: "Signature", value: loan?.signature },
//                         {
//                           label: "Property Ownership",
//                           value: loan?.propertyOwnershipProof,
//                         },
//                       ].map((item, i) => (
//                         <li key={i} className="documentcard-item">
//                           <span>{item.label}: </span>
//                           {item.value ? (
//                             <a
//                               href={item.value}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="documentcard-link"
//                             >
//                               View
//                             </a>
//                           ) : (
//                             <span className="documentcardtext-gray">
//                               Not Available
//                             </span>
//                           )}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </>
//       )}

//       {/* Insurance Cards (Shown Only When Insurance Details Card is Clicked) */}
//       {showInsurances && (
//         <>
//           <h3 className="mt-4">Insurance Documents</h3>
//           <Row className="g-4">
//             {insuranceData.map((insurance, index) => (
//               <Col key={index} lg={4} md={6} sm={12}>
//                 <div
//                   className={`documentcard insurance-details-card ${
//                     hoveredInsurance === index ? "expanded" : ""
//                   }`}
//                   onMouseEnter={() => setHoveredInsurance(index)}
//                   onMouseLeave={() => setHoveredInsurance(null)}
//                 >
//                   <h3 className="documentcard-title">Insurance {index + 1}</h3>
//                   {hoveredInsurance === index && (
//                     <ul className="documentcard-list">
//                       {[
//                         { label: "Policy Type", value: insurance.PolicyType },
//                         {
//                           label: "Policy Term",
//                           value: insurance.policyTerm,
//                         },
//                         { label: "Sum Assured", value: insurance.sumAssured },
//                       ].map((item, i) => (
//                         <li key={i} className="documentcard-item">
//                           <span>{item.label}: </span>
//                           <span>{item.value || "Not Available"}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </>
//       )}

//       {showTaxes && (
//         <>
//           <h3 className="mt-4">Tax Documents</h3>
//           <Row className="g-4">
//             {taxData.map((tax, index) => (
//               <Col key={index} lg={4} md={6} sm={12}>
//                 <div
//                   className={`documentcard tax-details-card ${
//                     hoveredTax === index ? "expanded" : ""
//                   }`}
//                   onMouseEnter={() => setHoveredTax(index)}
//                   onMouseLeave={() => setHoveredTax(null)}
//                 >
//                   <h3 className="documentcard-title">Tax {index + 1}</h3>
//                   {hoveredTax === index && (
//                     <ul className="documentcard-list">
//                       {[
//                         { label: "Business Type", value: tax.businessType },
//                         {
//                           label: "IncomeTax Status",
//                           value: tax.incomeTaxStatus,
//                         },
//                         { label: "Tax Paid", value: tax.taxPaid },
//                       ].map((item, i) => (
//                         <li key={i} className="documentcard-item">
//                           <span>{item.label}: </span>
//                           <span>{item.value || "Not Available"}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         </>
//       )}
//     </Container>
//   );
// };

// export default Documents;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./Documents.css";
import Api from "../../../Api";

const Documents = () => {
  const [hovered, setHovered] = useState(null);
  const [hoveredLoan, setHoveredLoan] = useState(null);
  const [hoveredInsurance, setHoveredInsurance] = useState(null);
  const [hoveredTax, setHoveredTax] = useState(null);
  const [showLoans, setShowLoans] = useState(false);
  const [showInsurances, setShowInsurances] = useState(false);
  const [showTaxes, setShowTaxes] = useState(false);
  const [data, setData] = useState({});
  const [loanData, setLoanData] = useState([]);
  const [insuranceData, setInsuranceData] = useState([]);
  const [taxData, setTaxData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userid = localStorage.getItem("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, loanRes, insuranceRes, taxRes] = await Promise.all([
          Api.get(`signup/getby/${userid}`),
          Api.get(`loanform/getbyid/${userid}`),
          Api.get(`insuranceManagement/getByIdInsuranceManagement/${userid}`),
          Api.get(`taxManagement/getByIdTaxManagement/${userid}`),
        ]);
        console.log("User Response:", userRes.data);
        console.log("Loan Response:", loanRes.data);
        console.log("Insurance Response:", insuranceRes.data);
        console.log("Tax Response:", taxRes.data);
        setData(userRes.data || {});
        setLoanData(loanRes.data || []);
        setInsuranceData(insuranceRes.data || []);
        setTaxData(taxRes.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      }
    };
    if (userid) {
      fetchData();
    } else {
      setError("User ID not found. Please log in again.");
    }
  }, [userid]);

  const handleViewDetails = (item, type) => {
    navigate(`/details`, { state: { item, type } });
  };

  return (
    <Container className="mt-4 d-block">
      {error && <div className="alert alert-danger">{error}</div>}
      <Row className="g-4">
        {/* Personal Details Card */}
        <Col lg={3} md={6} sm={12}>
          <div
            className={`documentcard personal-card ${
              hovered === "personal" ? "expanded" : ""
            }`}
            onMouseEnter={() => setHovered("personal")}
            onMouseLeave={() => setHovered(null)}
          >
            <h3 className="documentcard-title">Personal Details</h3>
            {hovered === "personal" && (
              <ul className="documentcard-list">
                {[
                  { label: "Profile", value: data?.photographs },
                  { label: "Spouse Pay Slip", value: data?.coApplicantDocs },
                  { label: "Aadhaar Or PAN", value: data?.panOrAdharUpload },
                  { label: "Voter ID Proof", value: data?.voterIdUpload },
                ].map((item, i) => (
                  <li key={i} className="documentcard-item">
                    <span>{item.label}: </span>
                    {item.value ? (
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="documentcard-link"
                      >
                        View Document
                      </a>
                    ) : (
                      <span className="documentcardtext-gray">
                        Not Available
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Col>

        {/* Loan Details Card */}
        <Col lg={3} md={6} sm={12}>
          <div
            className="documentcard loan-card"
            onClick={() => setShowLoans(!showLoans)}
          >
            <h3 className="documentcard-title">Loan Details</h3>
          </div>
        </Col>

        {/* Insurance Details Card */}
        <Col lg={3} md={6} sm={12}>
          <div
            className="documentcard insurance-card"
            onClick={() => setShowInsurances(!showInsurances)}
          >
            <h3 className="documentcard-title">Insurance Details</h3>
          </div>
        </Col>

        {/* Tax Details Card */}
        <Col lg={3} md={6} sm={12}>
          <div
            className="documentcard tax-card"
            onClick={() => setShowTaxes(!showTaxes)}
          >
            <h3 className="documentcard-title">Tax Details</h3>
          </div>
        </Col>
      </Row>

      {/* Loan Cards */}
      {showLoans && (
        <>
          <h3 className="mt-4">Loan Documents</h3>
          {loanData.length === 0 ? (
            <p>No loan documents available.</p>
          ) : (
            <Row className="px-1 py-2">
              {loanData.map((loan, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <div
                    className={`documentcard loan-details-card ${
                      hoveredLoan === index ? "expanded" : ""
                    }`}
                    onMouseEnter={() => setHoveredLoan(index)}
                    onMouseLeave={() => setHoveredLoan(null)}
                  >
                    <h3 className="documentcard-title">
                      {loan.loanType || `Loan ${index + 1}`}
                    </h3>
                    {hoveredLoan === index && (
                      <ul className="documentcard-list">
                        {[
                          { label: "Address Proof", value: loan?.addressProof },
                          {
                            label: "Employee Pay Slip",
                            value: loan?.employeePayslipProof,
                          },
                          { label: "Identity Proof", value: loan?.identityProof },
                          { label: "Nominee Proof", value: loan?.nomineeDocs },
                          { label: "Signature", value: loan?.signature },
                          {
                            label: "Property Ownership",
                            value: loan?.propertyOwnershipProof,
                          },
                          { label: "Loan Amount", value: loan?.loanAmount },
                        ].map((item, i) => (
                          <li key={i} className="documentcard-item">
                            <span>{item.label}: </span>
                            {item.value ? (
                              item.label === "Loan Amount" ? (
                                <span>${item.value}</span>
                              ) : (
                                <a
                                  href={item.value}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="documentcard-link"
                                >
                                  View
                                </a>
                              )
                            ) : (
                              <span className="documentcardtext-gray">
                                Not Available
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      {/* Insurance Cards */}
      {showInsurances && (
        <>
          <h3 className="mt-4">Insurance Documents</h3>
          {insuranceData.length === 0 ? (
            <p>No insurance documents available.</p>
          ) : (
            <Row className="g-4">
              {insuranceData.map((insurance, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <div
                    className={`documentcard insurance-details-card ${
                      hoveredInsurance === index ? "expanded" : ""
                    }`}
                    onMouseEnter={() => setHoveredInsurance(index)}
                    onMouseLeave={() => setHoveredInsurance(null)}
                  >
                    <h3 className="documentcard-title">
                      {insurance.PolicyType || `Insurance ${index + 1}`}
                    </h3>
                    {hoveredInsurance === index && (
                      <ul className="documentcard-list">
                        {[
                          { label: "Policy Type", value: insurance.PolicyType },
                          { label: "Policy Term", value: insurance.policyTerm },
                          { label: "Sum Assured", value: insurance.sumAssured },
                        ].map((item, i) => (
                          <li key={i} className="documentcard-item">
                            <span>{item.label}: </span>
                            <span>{item.value || "Not Available"}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}

      {/* Tax Cards */}
      {showTaxes && (
        <>
          <h3 className="mt-4">Tax Documents</h3>
          {taxData.length === 0 ? (
            <p>No tax documents available.</p>
          ) : (
            <Row className="g-4">
              {taxData.map((tax, index) => (
                <Col key={index} lg={4} md={6} sm={12}>
                  <div
                    className={`documentcard tax-details-card ${
                      hoveredTax === index ? "expanded" : ""
                    }`}
                    onMouseEnter={() => setHoveredTax(index)}
                    onMouseLeave={() => setHoveredTax(null)}
                  >
                    <h3 className="documentcard-title">
                      {tax.businessType || `Tax ${index + 1}`}
                    </h3>
                    {hoveredTax === index && (
                      <ul className="documentcard-list">
                        {[
                          { label: "Business Type", value: tax.businessType },
                          {
                            label: "Income Tax Status",
                            value: tax.incomeTaxStatus,
                          },
                          { label: "Tax Paid", value: tax.taxPaid },
                        ].map((item, i) => (
                          <li key={i} className="documentcard-item">
                            <span>{item.label}: </span>
                            <span>{item.value || "Not Available"}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </>
      )}
    </Container>
  );
};

export default Documents;