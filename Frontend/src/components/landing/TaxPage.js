import React, { useState } from 'react';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const taxData = [
    {
      service: "Income Tax Filing",
      provider: "State Bank of India Tax Services",
      fees: "₹500 onwards",
      processingTime: "2-3 working days",
      eligibility: "All salaried and self-employed individuals",
      additionalBenefits: "CA Assistance, E-verification support",
    },
    {
      service: "GST Registration & Filing",
      provider: "HDFC Tax Solutions",
      fees: "₹1,000 onwards",
      processingTime: "4-5 working days",
      eligibility: "Businesses with turnover above ₹20 Lakhs",
      additionalBenefits: "Regular GST filing support, GST advisory",
    },
    {
      service: "TDS Returns Filing",
      provider: "Kotak Mahindra Tax Services",
      fees: "₹750 onwards",
      processingTime: "2 working days",
      eligibility: "Businesses with TDS obligations",
      additionalBenefits: "Monthly return tracking, late fee reminders",
    },
    {
      service: "Property Tax Management",
      provider: "Axis Bank Property Tax Solutions",
      fees: "₹1,500 onwards",
      processingTime: "3-4 working days",
      eligibility: "Property owners and landlords",
      additionalBenefits: "Penalty waiver support, municipal compliance",
    },
    {
      service: "Wealth Tax Consultation",
      provider: "Bank of Baroda Wealth Tax Advisory",
      fees: "₹2,000 onwards",
      processingTime: "5-7 working days",
      eligibility: "High-net-worth individuals",
      additionalBenefits: "Wealth management advice, tax-saving strategies",
    }
  ];
  

const TaxCards = () => {
  const [show, setShow] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (service) => {
    setSelectedService(service);
    setShow(true);
  };

  return (
    <>
    <Header/>
    <br/>
    <br/>
    <br/>

    <Container style={{marginTop:"5%"}}>
      <Row className="justify-content-center">
        {taxData.map((tax, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card style={{width:"85 %",textAlign:"center",backgroundColor:"#efefef"}}>
              <Card.Body>
                <Card.Title>{tax.service}</Card.Title>
                <Card.Text>
                  <strong>Provider:</strong> {tax.provider} <br />
                  <strong>Fees:</strong> {tax.fees}
                </Card.Text>
                <Button variant="primary" onClick={() => handleShow(tax)}>
                  Get Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedService && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedService.service} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Provider:</strong> {selectedService.provider}</p>
            <p><strong>Fees:</strong> {selectedService.fees}</p>
            <p><strong>Processing Time:</strong> {selectedService.processingTime}</p>
            <p><strong>Eligibility:</strong> {selectedService.eligibility}</p>
            <p><strong>Additional Benefits:</strong> {selectedService.additionalBenefits}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" href="/taxform">
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

export default TaxCards;
