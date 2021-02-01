import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import {Button,Form,FormGroup,Label,FormText,Input} from "reactstrap";
// import num2words from 'num2words';
import numtowords from 'num2words';
import NavbarComp from "./Components/navbar-component.jsx";
import FooterComp from "./Components/footer.jsx";

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
            Amount : "",
            Amount_words: ""
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
        this.setState({confirmation : "Uploading..."});

    }

    async getFiles(files){
        this.setState({
            isLoading : "Extracting data",
            files : files
    });


    var filename = files[0].name;

    var data={
        imageID: filename,
        folder:filename,
        img : this.state.files[0].base64
    };

    this.setState({confirmation : "Processing data..."})

    //Calling Node.js lambda function to API Gateway to upload given files to S3 bucket
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

    //Invoking Python lambda function running check image through AWS Textract
    var params = {
        FunctionName: "arn:aws:lambda:us-east-1:855959782814:function:DetectTextPy", 
        InvocationType: "RequestResponse", 
        Payload: JSON.stringify(filename)
       };
       
    lambda.invoke(params, function(err, data)  {
    if (err) console.log(err, err.stack); // an error occurred
    else {    
        console.log(data.Payload);
        } 
        
        var jsonData = JSON.parse(data.Payload);
        let amount_in_words = numtowords(jsonData["body"][1]);

        this.setState({Date :jsonData["body"][0] });
        this.setState({Amount :jsonData["body"][1] });
        this.setState({Amount_words :amount_in_words});              
    }.bind(this));
    

    }

    render() { 
        const processing=this.state.confirmation;
        return ( 
            <div className="row">
            <NavbarComp/>
               <div className="col-6 offset-3">
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                           <h3>Digital Check Deposits Available Now!</h3>
                           <h5 className="text-danger">{processing}</h5>    
                           <FormText color="muted">PNG,JPG</FormText>
                       
                       
                        <div className="form-group files color">
                            <FileBase64 
                            multiple={true} 
                            onDone={this.getFiles.bind(this)}></FileBase64>

                        </div>
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
                            />

                        </FormGroup>


                        <FormGroup>
                            <Label>
                                <h6>Amount ($)</h6>
                            </Label>
                            <Input 
                                type="text"
                                name="Amount"
                                id="Amount"
                                required
                                value={this.state.Amount}
                                onChange={this.handleChange}
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label>
                                <h6>Written Amount</h6>
                            </Label>
                            <Input 
                                type="text"
                                name="Amount_words"
                                id="Amount_words"
                                required
                                value={this.state.Amount_words}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </Form>   
                </div>
                <FooterComp/>  
           </div>
         );
    }
}
 
export default Upload;
