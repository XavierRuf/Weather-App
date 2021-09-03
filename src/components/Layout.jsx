import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Layout({ temperature, children }) {
  const getTempClassName = () => {
    const temp = temperature;
    if (temp >= 30) {
      return " heat";
    }
    if (temp >= 10 && temp > -10) {
      return " medium-cold";
    }
    return " cold";
  };

  return (
    <Container
      className={temperature ? "app" + getTempClassName() : "app medium-cold"}
      fluid
    >
      <Row className="main">
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  );
}

export default Layout;
