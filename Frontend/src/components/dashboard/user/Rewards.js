import React from "react";
import { Card, Typography, Row, Col, Image, Space, Button, notification } from "antd";
import { TrophyOutlined, GiftOutlined } from "@ant-design/icons";
import './Rewards.css';


const { Text, Title } = Typography;

const Rewards = () => {
  const rewards = [
    {
      key: "1",
      title: "Referral Reward",
      points: "+100 Rewards",
      image: "https://cdn3.invitereferrals.com/blog/wp-content/uploads/2020/01/16122055/Referral-Program-min.png",
      description: "Invite your friends and earn 100 reward points for every successful referral!",
      encouragement: "Refer more friends to earn extra rewards!",
    },
  ];

  const handleRewardClick = (reward) => {
    notification.success({
      message: "Reward Redeemed!",
      description: `You have successfully redeemed ${reward.points}.`,
      placement: "topRight",
    });
  };

  return (
    <div className="rewards-container">
      <Title level={3} className="rewards-title">
        Rewards
      </Title>

      <div className="rewards-balance">
      <Title level={1} style={{ color: "#1890ff" }}>
          500 Points
        </Title>
        <Text>Your current reward points balance</Text>
      </div>

      <div style={{ marginLeft:"300px"}} className="rewards-cards">
        <Row >
          {rewards.map((reward) => (
            <Col key={reward.key} xs={24} sm={12} md={10} lg={8}>
              <Card
                hoverable
                cover={
                  <div className="reward-image-container">
                    <Image
                      src={reward.image}
                      alt={reward.title}
                      preview={false}
                      className="reward-image"
                    />
                  </div>
                }
                className="reward-card"
              >
                <Title level={4} className="reward-card-title">
                  {reward.title}
                </Title>
                <Button
                  type="primary"
                  icon={<GiftOutlined />}
                  className="reward-button"
                  onClick={() => handleRewardClick(reward)}
                >
                  {reward.points}
                </Button>

                <Space direction="vertical" size="small" className="reward-description">
                  <Text className="reward-text">
                    <TrophyOutlined className="reward-icon" />
                    {reward.description}
                  </Text>
                  <Text className="reward-encouragement">
                    {reward.encouragement}
                  </Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Rewards;
