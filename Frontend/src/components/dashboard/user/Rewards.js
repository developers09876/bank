import React, { useState,useEffect } from "react";
import { Card, Typography, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AOS from "aos"; 
import "aos/dist/aos.css";
import "./Rewards.css";

const { Title, Text } = Typography;

const Rewards = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-in-out", 
      once: true, 
    });
  }, []);
  const data = [
    {
      key: "1",
      title: "Loans",
      image:
        "https://png.pngtree.com/png-vector/20220615/ourmid/pngtree-mortgage-loan-debt-instruments-that-are-secured-by-property-assets-such-png-image_5085800.png",
      details: ["Click to refer a loan"],
      subCategories: [
        {
          key: "1-1",
          title: "Business Loan",
          rewards: "Refer 2 members and Earn 0.5% rewards",
        },
        {
          key: "1-2",
          title: "Vehicle Loan",
          rewards: "Refer 3 members and Earn 1% rewards" ,
        },
        { key: "1-3", title: "Home Loan", rewards: "Refer 4 members and Earn 1.5% rewards" },
      ],
    },
    {
      key: "2",
      title: "Insurance",
      image:
        "https://bfmcms.s3.ap-southeast-1.amazonaws.com/websiteimages/health-and-living/2024-07-10_will-medical-insurance-co-payments-be-a-burden/og_b3789569-7f90-4b92-ba7a-ffe04a9b739d.png",
      details: ["Click to refer insurance"],
      subCategories: [
        {
          key: "2-1",
          title: "Life Insurance",
          rewards:"Earn 2% to 25% of Total Premium  by refer 2 ",
        },
        {
          key: "2-2",
          title: "Health Insurance",
          rewards: "For Health Insurance 15% of Total Premium",
        },
        {
          key: "2-3",
          title: "Vehicle Insurance",
          rewards: "For Vehicle 10% of Total Premium",
        },
      ],
    },
    {
      key: "3",
      title: "CIBIL",
      image:
        "https://www.axisbank.com/images/default-source/progress-with-us_new/fix-your-cibil-score-after-late-emi-payment.jpg?sfvrsn=55f0456_2",
      details: ["Click to refer CIBIL"],
      subCategories: [
        {
          key: "3-1",
          title: "Monthly Plan",
          rewards: "For Each Referal You Earn Rs.20",
        },
        {
          key: "3-2",
          title: "Quarterly Plan",
          rewards: "For Each Referal You Earn Rs.50",
        },
        { key: "3-3", title: "Half Yearly Plan", rewards: "For Each Referal You Earn Rs.65" },
        {
          key: "3-4",
          title: "Annual Plan",
          rewards: "For Each Referal You Earn Rs.75",
        },
      ],
    },
  ];

  const handleCardClick = (key) => {
    setSelectedCategory((prev) => (prev === key ? null : key));
  };
  const handleReferralClick = () => {
    navigate("/refer"); 
  };
  return (
    <div className="rewards-container">
      <div className="dashboard-header">
        <Title level={4} style={{fontSize:"larger",color:"#1890ff",marginBottom:"20px",marginTop:"10px"}}>
          Income Dashboard
        </Title>
        <div className="summary-cards">
          <Card className="summary-card">
            <Title level={5}>Total Referrals: 1</Title>
          </Card>
          <Card className="summary-card">
            <Title level={5}>Total Income: ₹0.50</Title>
          </Card>
          <Card className="summary-card">
            <Title level={5}>Monthly Income: ₹500</Title>
          </Card>
        </div>
      </div>

      {selectedCategory ? (
        <div className="full-page-view">
          {data
            .filter((item) => item.key === selectedCategory)
            .slice(0, 3)
            .map((item) => (
              <div key={item.key}>
                <Button
                  type="link"
                  onClick={() => setSelectedCategory(null)}
                  className="back-button"
                >
                  Back
                </Button>
                <Row className="sub-cards-row-full" >
                  {item.subCategories.map((subItem) => (
                    <Col xs={24} sm={8} lg={8}  className="sub-cards-col" key={subItem.key} data-aos="fade-up" >
                      <Card className="sub-card-full">
                        <Title level={5} className="sub-card-title">
                          {subItem.title}
                        </Title>
                        <Text className="sub-card-rewards">
                          {subItem.rewards}
                        </Text>
                        <Button
                          type="primary"
                          icon={<PlusOutlined />}
                          size="small"
                          className="add-referral-button"
                          onClick={handleReferralClick} 
                        >
                          Add Referral
                        </Button>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
        </div>
      ) : (
      
        <Row className="rewards-row" >
          {data.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.key}>
              <Card
                className="reward-card"
                cover={
                  <img
                    alt={item.title}
                    src={item.image}
                    className="reward-card-image"
                  />
                }
                onClick={() => handleCardClick(item.key)}
                hoverable
              >
                <Title level={4} className="card-title">
                  {item.title}
                </Title>
                {item.details.map((detail, index) => (
                  <Text key={index} className="card-detail">
                    {detail}
                  </Text>
                ))}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Rewards;
