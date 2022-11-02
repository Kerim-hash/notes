import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { NavLink } from "react-router-dom";

import "./index.css";

const CardItem = ({ content, date, id }) => {
  const { Title, Text } = Typography;
  return (
    <NavLink to={`/${id}`} className="card">
      <Card size="small" bordered={false}>
        <Title level={4} className="card-title">
          {content.replace(/<[^>]+>/g, "").trim() === "" ? "Новая заметка ": content.replace(/<[^>]+>/g, "")}
        </Title>
        <Row width={300 }wrap={false} gutter={[5, 0]}>
          <Col flex="none">
            <Text>{new Date(date).toISOString().slice(0, 10)}</Text>
          </Col>
          <Col flex="auto" className="card-text">
            <Text type="secondary" >
             {content.replace(/<[^>]+>/g, "").trim() === "" ? "нет дополнительного текста" :content.replace(/<[^>]+>/g, "")}
            </Text>
          </Col>
        </Row>
      </Card>
    </NavLink>
  );
};

export default CardItem;
