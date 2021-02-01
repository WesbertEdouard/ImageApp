import React, { Component, useCallback } from 'react';
import FileBase64 from 'react-file-base64';
import {Button,Form,FormGroup,Label,FormText,Input} from "reactstrap";
import numtowords from 'num2words';
import NavbarComp from "./Components/navbar-component.jsx";
import FooterComp from "./Components/footer.jsx";
import FileUpload from './Components/imgUploadComp.jsx';
import Effect from './Components/particle';

import "./App.css";

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:fbe229a3-b3c0-4eff-84a8-3184a9561470',
});

var lambda = new AWS.Lambda();
class Upload extends Component {

    constructor(props){
        super(props);

    
    this.state = {
            confirmation : "",
            isLoading : "",
            files : "",
            Invoice : "",
            Amount : "",
            InvoiceDate: "",
            Vendor : "",
            Description : ""
      }

    this.handleChange= this.handleChange.bind(this);
    
    }


    handleChange(event){
        event.preventDefault();
        const target = event.target;
        const value=target.value;
        const name=target.name;

        this.setState({name:value});

    }

    async handleSubmit(event){
        event.preventDefault();
        this.setState({confirmation : " "});

    }

    async getFiles(files){
        this.setState({
            isLoading : " ",
             files : files
    });


    var filename = files[0].name;

    var data={
        imageID: filename,
        folder:filename,
        img : this.state.files[0].base64
    };

    this.setState({confirmation : "Processing..."})
    await fetch(
        'https://ihtv21121m.execute-api.us-east-2.amazonaws.com/Development',
        {
        method: "POST",
        headers: {
            Accept : "application/json",
            "Content-Type": "application.json"
        },
        body : JSON.stringify(data)
        }
    );

    
    var params = {
        FunctionName: "arn:aws:lambda:us-east-1:855959782814:function:DetectTextPy", 
        InvocationType: "RequestResponse", 
        Payload: JSON.stringify(filename)
       };
       
    const response = lambda.invoke(params, function(err, data)  {
    if (err) console.log(err, err.stack); // an error occurred
    else {    
        console.log(data.Payload);
        } 
        
        var jsonData = JSON.parse(data.Payload);
        let amount_in_words = numtowords(jsonData["body"][1])
        // return jsonData["body"]
        // console.log(jsonData["body"][0]);
        this.setState({Date :jsonData["body"][0] });
        this.setState({Amount :jsonData["body"][1] });
        this.setState({Vendor :amount_in_words});              // successful response
    }.bind(this));
    



    }

    render() { 
        const processing=this.state.confirmation;
        return ( 
            <div className="row">
            <NavbarComp/>
               <div className="col-6 offset-3">
               <Effect/>
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                           <h3 className="text-danger">{processing}</h3>    
                           <h2>Check Text Extractor</h2>
                           
                        </FormGroup>  

                        <FormGroup>
                            <Label>
                                <h6>Date</h6>
                            </Label>
                            <Input 
                                type="text"
                                name="Date"
                                id="Date"
                                required
                                value={this.state.Date}
                                onChange={this.handleChange}
                                className="input-comp"
                            />

                        </FormGroup>

                        
                        <FormGroup>
                            <Label>
                                <h6>Amount in Numbers ($)</h6>
                            </Label>
                            <Input 
                                type="text"
                                name="Amount"
                                id="Amount"
                                required
                                value={this.state.Amount}
                                onChange={this.handleChange}
                                className="input-comp"
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label>
                                <h6>Amount in Words</h6>
                            </Label>
                            <Input 

                                type="text"
                                name="Vendor"
                                id="Vendor"
                                required
                                value={this.state.Vendor}
                                onChange={this.handleChange}
                                className="input-comp"
                            />
                        </FormGroup>

                        <div className="form-group files color">
                            <FileBase64 
                            multiple={true} 
                            onDone={this.getFiles.bind(this)}></FileBase64>
                            <FormText color="muted">Accepted formats are: PNG,JPG</FormText>
                        </div>
                    </Form>  
                    <FileUpload/> 
                </div>
                <FooterComp/>  
           </div>
         );
    }
}
 
export default Upload;
