import { Card, CardTitle, CardImg, CardBody, CardSubtitle, CardText, Col, Button } from "reactstrap";
import React from "react";
import picture from "../assets/no_image.png";


const CustomCard = ({title, color, stock, timestamp, id, onClick }) => {
  return (
    <div>
      <Card id={id} className="mt-3 ml-3" body outline color="primary">
        <CardImg top src={picture} width="20%" alt="Card image cap" />
        <CardBody >
        <CardSubtitle>Name: <b>{title}</b></CardSubtitle>
          <CardSubtitle>Color: <b>{color}</b></CardSubtitle>
          <CardSubtitle>Stock: <b>{stock}</b></CardSubtitle>
          <CardSubtitle>Date Added: <b>{timestamp}</b></CardSubtitle>
        </CardBody>
        <Button value={id} color="primary" onClick={(e)=>onClick(e)}>Details</Button>
      </Card>
    </div>
  );
};

export default CustomCard;

