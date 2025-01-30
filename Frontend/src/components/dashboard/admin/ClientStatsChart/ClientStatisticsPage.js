import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
import { FaDollarSign, FaShieldAlt, FaFileInvoiceDollar } from "react-icons/fa";
import "./ClientStatisticsPage.css";

const ClientStatisticsPage = () => {
  const { status } = useParams();
  const navigate = useNavigate();

  // Define card data
  const cardData = [
    { category: "loan", icon: <FaDollarSign />, color: "#ff4757" },
    { category: "insurance", icon: <FaShieldAlt />, color: "#1e90ff" },
    { category: "tax", icon: <FaFileInvoiceDollar />, color: "#2ed573" },
  ];

  return (
    <div style={{ marginTop: "50px", width: "100%" }}>
      <Container style={{ width: "90%" }}>
        <div style={{ width: "100%" }}>
          <div className="client-statistics-container">
            <h2>
              {status.charAt(0).toUpperCase() + status.slice(1)} Statistics
            </h2>
            <Row className="justify-content-center">
              {cardData.map(({ category, icon, color }) => (
                <Col md={4} key={category}>
                  <Card
                    className="stat-card"
                    style={{ borderLeft: `5px solid ${color}` }}
                    onClick={() =>
                      navigate(`/admin/client-statistics/${status}/${category}`)
                    }
                  >
                    <Card.Body>
                      <div
                        className="icon-wrapper"
                        style={{ backgroundColor: color }}
                      >
                        {icon}
                      </div>
                      <Card.Title className="stat-card-title">
                        {category.toUpperCase()}
                      </Card.Title>
                      <Card.Text className="stat-card-text">
                        View all {status} {category} records
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ClientStatisticsPage;
