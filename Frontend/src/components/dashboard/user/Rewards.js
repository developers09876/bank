import React, { useState } from "react";
import { Card, Typography, Row, Col, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Rewards.css";

const { Title, Text } = Typography;

const Rewards = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const data = [
    {
      key: "1",
      title: "Loans",
      image:
        "https://blog.jeton.com/wp-content/uploads/2021/01/personal_loan.png",
      details: ["Click to refer a loan"],
      subCategories: [
        {
          key: "1-1",
          title: "Business Loan",
          rewards: "2 members = 0.5% rewards",
        },
        {
          key: "1-2",
          title: "Vehicle Loan",
          rewards: "3 members = 1% rewards",
        },
        { key: "1-3", title: "Home Loan", rewards: "4 members = 1.5% rewards" },
      ],
    },
    {
      key: "2",
      title: "Insurance",
      image:
        "https://www.hdfclife.com/content/dam/hdfclifeinsurancecompany/knowledge-center/images/about-life-insurance/HDFC-Importance-Of-Insurance-Insurance-Needs-And-Types.png",
      details: ["Click to refer insurance"],
      subCategories: [
        {
          key: "2-1",
          title: "Life Insurance",
          rewards: "2 members = 0.7% rewards",
        },
        {
          key: "2-2",
          title: "Health Insurance",
          rewards: "3 members = 1.2% rewards",
        },
        {
          key: "2-3",
          title: "Vehicle Insurance",
          rewards: "4 members = 1.8% rewards",
        },
      ],
    },
    {
      key: "3",
      title: "CIBIL",
      image:
        "https://img.etimg.com/thumb/width-1600,height-900,imgsize-88046,resizemode-75,msid-76745277/wealth/borrow/what-is-a-cibil-score.jpg",
      details: ["Click to refer CIBIL"],
      subCategories: [
        {
          key: "3-1",
          title: "Monthly Plan",
          rewards: "1 member = 0.3% rewards",
        },
        {
          key: "3-2",
          title: "Quarterly Plan",
          rewards: "2 members = 0.5% rewards",
        },
        { key: "3-3", title: "Annual Plan", rewards: "3 members = 1% rewards" },
        {
          key: "3-4",
          title: "Custom Plan",
          rewards: "4 members = 1.2% rewards",
        },
      ],
    },
  ];

  const handleAddReferral = (title) => {
    console.log(`Add Referral clicked for ${title}`);
  };

  const handleCardClick = (key) => {
    setSelectedCategory((prev) => (prev === key ? null : key));
  };

  return (
    <div className="rewards-container">
      <div className="dashboard-header">
        <Title level={4} className="dashboard-title">
          Income Dashboard
        </Title>
        <div className="summary-cards">
          <Card className="summary-card">
            <Title level={5}>Total Referrals: 1</Title>
          </Card>
          <Card className="summary-card">
            <Title level={5}>Total Bonus: ₹0.50</Title>
          </Card>
        </div>
      </div>

      <Row className="rewards-row">
        {data.map((item) => (
          <Col xs={10} sm={6} lg={6} key={item.key}>
            <Card
              className="reward-card"
              cover={<img alt={item.title} src={item.image} />}
              onClick={() => handleCardClick(item.key)}
            >
              <div className="card-header">
                <Title level={5} className="card-title">
                  {item.title}
                </Title>
              </div>
              <div className="card-details">
                {item.details.map((detail, index) => (
                  <Text key={index} className="card-detail">
                    {detail}
                  </Text>
                ))}
              </div>
            </Card>

            {selectedCategory === item.key && (
              <>
                {item.subCategories.map((subItem) => (
                  <Row key={subItem.key} className="sub-cards-row">
                    <Col xs={24} sm={12} lg={8}>
                      <Card className="sub-card">
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
                          onClick={() => handleAddReferral(subItem.title)}
                        >
                          Add Referral
                        </Button>
                      </Card>
                    </Col>
                  </Row>
                ))}
              </>
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Rewards;
