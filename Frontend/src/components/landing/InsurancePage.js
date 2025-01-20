import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
// import './InsuranceCards.scss'; // Custom CSS (optional)


  const insuranceData = [
    {
      insurer: "State Bank of India Insurance",
      coverage: "Up to ₹50 Lakhs",
      premium: "₹500/month onwards",
      policyTerm: "Up to 30 years",
      claimSettlementRatio: "97.5%",
      additionalBenefits: "Critical illness cover",
    },
    {
      insurer: "HDFC Life Insurance",
      coverage: "Up to ₹1 Crore",
      premium: "₹600/month onwards",
      policyTerm: "Up to 40 years",
      claimSettlementRatio: "98.2%",
      additionalBenefits: "Accidental death benefit",
    },
    {
      insurer: "Kotak Mahindra Life Insurance",
      coverage: "Up to ₹75 Lakhs",
      premium: "₹550/month onwards",
      policyTerm: "Up to 35 years",
      claimSettlementRatio: "96.8%",
      additionalBenefits: "Income replacement benefit",
    },
    {
      insurer: "Axis Insurance",
      coverage: "Up to ₹80 Lakhs",
      premium: "₹580/month onwards",
      policyTerm: "Up to 25 years",
      claimSettlementRatio: "97%",
      additionalBenefits: "Child education cover",
    },
    {
      insurer: "Bank of Baroda Insurance",
      coverage: "Up to ₹60 Lakhs",
      premium: "₹520/month onwards",
      policyTerm: "Up to 20 years",
      claimSettlementRatio: "95.4%",
      additionalBenefits: "Health check-ups included",
    }
  
  
];

const InsuranceCards = () => {
  const [show, setShow] = useState(false);
  const [selectedInsurer, setSelectedInsurer] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (insurer) => {
    setSelectedInsurer(insurer);
    setShow(true);
  };

  return (
    <>
    <Header/>
    <br/>
    <br/>
    
    <center><h2 style={{marginTop:"5%"}}>Banks Offering Insurance</h2></center>
    <Container>
         
      <Row className="justify-content-center">
        {insuranceData.map((insurance, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card style={{width:"85 %",textAlign:"center",backgroundColor:"#efefef"}}>
              <Card.Body>
                <Card.Title>{insurance.insurer}</Card.Title>
                <Card.Text>
                  <strong>Coverage:</strong> {insurance.coverage} <br />
                  <strong>Premium:</strong> {insurance.premium}
                </Card.Text>
                <Button variant="primary" onClick={() => handleShow(insurance)}>
                  Apply Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedInsurer && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedInsurer.insurer} Insurance Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Coverage:</strong> {selectedInsurer.coverage}</p>
            <p><strong>Premium:</strong> {selectedInsurer.premium}</p>
            <p><strong>Policy Term:</strong> {selectedInsurer.policyTerm}</p>
            <p><strong>Claim Settlement Ratio:</strong> {selectedInsurer.claimSettlementRatio}</p>
            <p><strong>Additional Benefits:</strong> {selectedInsurer.additionalBenefits}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" href="/insurancepolicy">
              Proceed to Apply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
    <br/>
    <br/>

    <Footer/>
    </>
  );
};

export default InsuranceCards;
