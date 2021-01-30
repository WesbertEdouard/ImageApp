import './App.css';
import React, {Component} from 'react';
import Value from "./Components/input.jsx";
import NavbarComp from "./Components/navbar-component.jsx";

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
      <Value label={this.label="Name"}/>
      <Value label={this.label="Date"}/>
      <Value label={this.label="Amount"}/>
      <Value label={this.label="Bank"}/>
      <Value label={this.label="Routing Number"}/>
      <Value label={this.label="Account Number"}/>
      </div>
    );
  }
}

export default App;
