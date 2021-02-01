import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import {Button,Form,FormGroup,Label,FormText,Input} from "reactstrap";
import NavbarComp from "./Components/navbar-component.jsx";
import FooterComp from "./Components/footer.jsx";


// import "./upload.css";
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
        Payload: JSON.stringify(filename), 
       };
       
    lambda.invoke(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
    });
       
    

    // const response = await fetch(
    //     'https://ihtv21121m.execute-api.us-east-2.amazonaws.com/Development/detecttextpy',
    //     {
    //     method: "POST",
    //     headers: {
    //         Accept : "application/json",
    //         "Content-Type": "application.json"
    //     },
    //     body : JSON.stringify(targetImage)
       
    //     }
       
    // );
    // this.setState({confirmation : ""});

    // const OCRBody = await response.json();
    // console.log("OCRBody",OCRBody);

    // this.setState({Date :OCRBody.body[0] })
    // this.setState({Amount :OCRBody.body[1] })
    
    // this.setState({InvoiceDate :OCRBody.body[2] })


    }

    render() { 
        const processing=this.state.confirmation;
        return ( 
            <div className="row">
            <NavbarComp/>
               <div className="col-6 offset-3">
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                           <h3 className="text-danger">{processing}</h3>    
                           <h6>Upload Invoice</h6>
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
                                <h6>Date</h6>
                            </Label>
                            <Input 
                                type="text"
                                name="InvoiceDate"
                                id="InvoiceDate"
                                required
                                value={this.state.InvoiceDate}
                                onChange={this.handleChange}
                            />
                        </FormGroup>


                        <FormGroup>
                            <Label>
                                <h6>Vendor</h6>
                            </Label>
                            <Input 
                                type="text"
                                name="Vendor"
                                id="Vendor"
                                required
                                value={this.state.Vendor}
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <h6>Description</h6>
                            </Label>
                            <Input 
                                type="text"
                                name="Description"
                                id="Description"
                                required
                                value={this.state.Description}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button className="btn btn-lg btn-block  btn-success">
                            Submit
                        </Button>
                    </Form>   
                </div>
                <FooterComp/>  
           </div>
         );
    }
}
 
export default Upload;
