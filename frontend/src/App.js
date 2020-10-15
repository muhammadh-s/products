import React, {useState} from 'react';
import './App.css';
import Request from "./utils/request";
import { FormGroup, 
  Col, 
  Row, 
  Label, 
  Button, 
  Modal, 
  ModalBody, 
  ModalFooter,  
  Navbar,
  NavbarBrand,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert
} from 'reactstrap';
import Dropdown from "./components/Dropdown";
import CardDeck from "./components/CardDeck";
// import axios from "axios";


function App() {
  const [color, setColor] = useState("");
  const [date, setDate] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const colors = [  
  { value: 'black', label: 'Black' },
  { value: 'red', label: 'Red' },
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },];
  const [data, setData] = useState([]);

    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const [token, setToken] = useState("");
    const [details, setDetails] = useState("");

    const changeData = (data) => {
      let resultant = [];
      for (let index = 0; index < data.length; index++) {
        const date = data[index].createdAt;
        const id = data[index]._id;
        const color = data[index].color;
        const stock = data[index].stock;
        const name = data[index].name;
        let result = date.split("T")[0];
        resultant.push({
          "_id": id,
          "createdAt": result,
          "name": name,
          "color": color,
          "stock": stock,
        });
      }
      return resultant;
    }

    const onDetailsClick = (value) => {
      setModal(true);
      Request.common.getProductDetails(token, value)
      .then((res) => {
        if (
          res.data.PAYLOAD.length !== 0 &&
          res.data.OK === true &&
          res.data.MESSAGE === null
        ) {
          const payload = res.data.PAYLOAD[0].details;
          setDetails(payload);
        } else {
          setAlert(
            <Alert color="warning">
              {res.data.MESSAGE}
            </Alert>
          );
        }
      })
      .catch((err) => {
        setAlert(
          <Alert color="danger" >
            {"Error Occured"}
          </Alert>
        );
      });
    }

    const getData = (token) =>{
        Request.common.getAllProduct(token)
          .then((res) => {
            if (
              res.data.PAYLOAD.length !== 0 &&
              res.data.OK === true &&
              res.data.MESSAGE === null
            ) {
              const payload = res.data.PAYLOAD[0];
              const filtering = changeData(payload);
              setData(filtering);
            } else {
              setAlert(
                <Alert color="warning">
                  {res.data.MESSAGE}
                </Alert>
              );
            }
          })
          .catch((err) => {
            setAlert(
              <Alert color="danger" >
                {"Error Occured"}
              </Alert>
            );
          });
    }

    const onLoginClick = () => {
      setAlert();
        Request.auth
          .userLogin({
            userId: userId,
            password: password,
          })
          .then((res) => {
            if (
              res.data.PAYLOAD.length !== 0 &&
              res.data.OK === true &&
              res.data.MESSAGE === null
            ) {
              const token = res.data.PAYLOAD[0].token;
              setToken(token);
              setAlert(
                <Alert color="success">
                  {"Login Successful"}
                </Alert>
              );
              getData(token);
            } else {
              setAlert(
                <Alert color="warning">
                  {res.data.MESSAGE}
                </Alert>
              );
            }
          })
          .catch((err) => {
            setAlert(
              <Alert color="danger" >
                {"Error Occured"}
              </Alert>
            );
          });
    }

    const colorChanged = (value) => {
      setColor(value);
    }

    const dateChanged = (value) => {
      setDate(value);
    }

    const feedData = () => {
      if (date.length!== 0 && color.length!== 0){
        const newData = data.filter(obj=> obj.createdAt === date && obj.color === color)
        return newData;
      }
      if (date.length!== 0 || color.length!== 0){
        const newData = data.filter(obj=> obj.createdAt === date || obj.color === color)
        return newData;
      }
      return data;
    }

  return (
    <>
      <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
      <ModalBody>
        {details}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={()=>setModal(!modal)}>Add to Cart</Button>{' '}
      </ModalFooter>
    </Modal>
    <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Products</NavbarBrand>
        <Col xs={{size:3, offset: 3}}>
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>ID</InputGroupText>
        </InputGroupAddon>
        <Input type="text" placeholder="12345" value={userId} onChange={(e)=>setUserId(e.target.value)}/>
      </InputGroup>
        </Col>
        <Col xs={{size:3, offset: 0}}>
        <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Password</InputGroupText>
        </InputGroupAddon>
        <Input type="text" placeholder="hamza" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      </InputGroup>
        </Col>
        <Col>
        <Button color="success" onClick={()=>onLoginClick()}>Login</Button>
        </Col>
      </Navbar>
      {alert}
      <h2 className="ml-5 mt-5">Filter</h2>
      <Row>
        <Col xs={{ size: 2, offset: 3 }}>
          <Dropdown options={colors} value={color} changedValue={(e)=>colorChanged(e.target.value)}/>
        </Col>
        <Col xs={{ size: 2, offset: 1 }}>
        <Label for="select">Date</Label>
        <Input type="date" name="date" id="date" value={date} onChange={(e)=>dateChanged(e.target.value)}/>
        </Col>
        </Row>
        <hr/>
        <Row>
        <CardDeck data={feedData()} onClick={(e)=> onDetailsClick(e.target.value)}/>
        </Row>
    </>
  );
}

export default App;

