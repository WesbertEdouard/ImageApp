import './App.css';
import React, {Component, useState} from 'react';
import {Button, Container, Row, Col} from 'react-bootstrap/';
import FileUpload from "./Components/imgUploadComp.jsx";
import Value from "./Components/input.jsx";
import NavbarComp from "./Components/navbar-component.jsx";
import FooterComp from "./Components/footer.jsx";
import { Form, TextField, SelectField, SubmitButton } from './Components/FormElements.jsx';
import {Check} from "./Checks.js";
import { checkData } from "./checkJSON.js";

function App() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });
  
  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log(values);
    setSubmitting(false);
  }

    return (
      <div className="App">
      {/*<NavbarComp/>
      <h1>Digital Check Deposits Available Now!</h1>
      <FileUpload/>
      <div className="fields">
        <Value label={this.label="Date"}/>
        <Value label={this.label="Deposit Amount As Digit"}/>
        <Value label={this.label="Deposit Amount As Word"}/>
      </div>
      <FooterComp/>*/}
        <NavbarComp/>
        <h1>Digital Check Deposits Available Now!</h1>
        <FileUpload/>
            <Container>
              <Row>
                <Check/>
              </Row>
            </Container>
        <FooterComp/>
      </div>
    
    );
  }
  
  export default App;
  
  /* <h1>Digital Check Deposits Available Now!</h1>
  <FileUpload/>
  <div className="fields">
    <Value label={this.label="Name"}/>
    <Value label={this.label="Date"}/>
    <Value label={this.label="Amount"}/>
    <Value label={this.label="Bank"}/>
    <Value label={this.label="Routing Number"}/>
    <Value label={this.label="Account Number"}/>
  </div> */