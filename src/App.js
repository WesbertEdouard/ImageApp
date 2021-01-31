import './App.css';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap/';
import FileUpload from "./Components/imgUploadComp.jsx";
import Value from "./Components/input.jsx";
import NavbarComp from "./Components/navbar-component.jsx";
import FooterComp from "./Components/footer.jsx";

class App extends Component {
  state = {
    labels: [
      {label: 'Fill in text'}
    ]
  }
 
  render(){
    return (
      <div className="App">
      <NavbarComp/>
      <h1>Digital Check Deposits Available Now!</h1>
      <FileUpload/>
      <div className="fields">
        <Value label={this.label="Date"}/>
        <Value label={this.label="Deposit Amount As Digit"}/>
        <Value label={this.label="Deposit Amount As Word"}/>
      </div>
      <FooterComp/>
      </div>
    
    );
  }
}

export default App;
