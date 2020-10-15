import { CardGroup, Col } from "reactstrap";
import Card from "./Card";
import React from "react";

const CustomCardDeck = ({ data, onClick }) => {
  const Cards = data.map((card) => (
    <Card
      key={card.title}
      title={card.name}
      details={card.details}
      color={card.color}
      stock={card.stock}
      timestamp={card.createdAt}
      onClick={onClick}
      id={card._id}
    />
  ));
  return (
    <Col>
      <CardGroup>{Cards}</CardGroup>
    </Col>
  );
};

export default CustomCardDeck;
