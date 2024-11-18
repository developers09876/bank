import React, { useState } from 'react'
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const loanData = [
    {
      bank: "State Bank of India",
      interestRate: "10.55% onwards",
      processingFee: "1%",
      loanDetails: {
        interestRate: "Starting at 11.00% p.a. up to 15.00% p.a.",
        loanAmount: "Up to ₹20 lakhs",
        tenure: "Up to 6 years",
        minimumSalary: "₹15,000 per month",
        processingFee: "Up to 1.50% (₹1,000 - ₹15,000)"
      }
    },
    {
      bank: "HDFC Bank",
      interestRate: "10.50% onwards",
      processingFee: "Up to ₹4,999/-",
      loanDetails: {
        interestRate: "Starting at 12.00% p.a. up to 16.00% p.a.",
        loanAmount: "Up to ₹25 lakhs",
        tenure: "Up to 7 years",
        minimumSalary: "₹18,000 per month",
        processingFee: "Up to 2.00% (₹2,000 - ₹20,000)"
      }
    },
    {
      bank: "Kotak Mahindra Bank",
      interestRate: "10.99% onwards",
      processingFee: "Up to 3%",
      loanDetails: {
        interestRate: "Starting at 10.99% p.a. up to 14.99% p.a.",
        loanAmount: "Up to ₹15 lakhs",
        tenure: "Up to 5 years",
        minimumSalary: "₹12,000 per month",
        processingFee: "Up to 2.50% (₹1,500 - ₹10,000)"
      }
    },
    {
      bank: "Axis Bank",
      interestRate: "10.49% onwards",
      processingFee: "Up to 2%",
      loanDetails: {
        interestRate: "Starting at 10.00% p.a. up to 14.00% p.a.",
        loanAmount: "Up to ₹30 lakhs",
        tenure: "Up to 8 years",
        minimumSalary: "₹20,000 per month",
        processingFee: "Up to 1.75% (₹2,000 - ₹15,000)"
      }
    },
    {
      bank: "Bank of Baroda",
      interestRate: "10.65% onwards",
      processingFee: "Nil",
      loanDetails: {
        interestRate: "Starting at 11.25% p.a. up to 13.50% p.a.",
        loanAmount: "Up to ₹40 lakhs",
        tenure: "Up to 10 years",
        minimumSalary: "₹25,000 per month",
        processingFee: "No processing fee"
      }
    }
  ];
  

function LoanPage() {
    const [show, setShow] = useState(false);
    const [selectedBank, setSelectedBank] = useState(null);
  
    const handleClose = () => setShow(false);
    const handleShow = (bank) => {
      setSelectedBank(bank);
      setShow(true);
    };
  return (
    <div>
      <Header/>
        <br/>
        <br/>
        <br/>

      <center><h2 style={{marginTop:"5%"}}>Banks Offering Loans</h2></center>
      <Container>
      <Row className="mt-4">
        {loanData.map((loan, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card style={{width:"85 %",textAlign:"center",backgroundColor:"#efefef"}}>
              <Card.Body>
                <Card.Title>{loan.bank}</Card.Title>
                <Card.Text>
                  <strong>Interest Rate:</strong> {loan.interestRate} <br />
                  <strong>Processing Fee:</strong> {loan.processingFee}
                </Card.Text>
                <Button variant="primary" onClick={() => handleShow(loan)}>
                  Apply Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedBank && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBank.bank} Loan Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Interest Rate:</strong> {selectedBank.loanDetails.interestRate}</p>
            <p><strong>Loan Amount:</strong> {selectedBank.loanDetails.loanAmount}</p>
            <p><strong>Tenure:</strong> {selectedBank.loanDetails.tenure}</p>
            <p><strong>Minimum Salary:</strong> {selectedBank.loanDetails.minimumSalary}</p>
            <p><strong>Processing Fee:</strong> {selectedBank.loanDetails.processingFee}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" href="/loanform">
              Proceed to Apply
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
    <br/>
    <br/>
<Footer/>
    </div>
  )
}

export default LoanPage
