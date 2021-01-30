import './App.css';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap/';

import Value from "./Components/input.jsx";
import NavbarComp from "./Components/navbar-component.jsx";
<<<<<<< HEAD
import FooterComp from "./Components/footer.jsx";
import FileUpload from "./Components/imgUploadComp.jsx";
=======
import StickyFooter from "./Components/footer.jsx";
import Jumbotron from "./Components/jumbotron-component.jsx";
>>>>>>> c0d1073d2a8f0c73e24eadac74a1567e6b6754e9

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
<<<<<<< HEAD
      <Value label={this.label="Name"}/>
      <Value label={this.label="Date"}/>
      <Value label={this.label="Amount"}/>
      <Value label={this.label="Bank"}/>
      <Value label={this.label="Routing Number"}/>
      <Value label={this.label="Account Number"}/>
      <FileUpload/>
      <FooterComp/>
=======
        <Button variant="outline-dark" className="px-md-4 space">Upload</Button>
        <Button variant="outline-dark" className="px-md-4 space">Submit</Button>
        <Button variant="outline-dark" className="px-md-4 space">Clear</Button>
      <div className="fields">
        <Value label={this.label="Name"}/>
        <Value label={this.label="Date"}/>
        <Value label={this.label="Amount"}/>
        <Value label={this.label="Bank"}/>
        <Value label={this.label="Routing Number"}/>
        <Value label={this.label="Account Number"}/>
      </div>
      <Jumbotron/>
      <StickyFooter/>
>>>>>>> c0d1073d2a8f0c73e24eadac74a1567e6b6754e9
      </div>
    );
  }
}

export default App;
