import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import {Button,Form,FormGroup,Label,FormText,Input} from "reactstrap";

// import "./upload.css";


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



    // let targetImage= UID + ".png";
    // const response=await fetch(
    //     'https://31gv9av7oe.execute-api.us-west-1.amazonaws.com/Production/ocr',
    //     {
    //     method: "POST",
    //     headers: {
    //         Accept : "application/json",
    //         "Content-Type": "application.json"
    //     },
    //     body : JSON.stringify(targetImage)
       
    //     }
       
    // );
    // this.setState({confirmation : ""})

    // const OCRBody = await response.json();
    // console.log("OCRBody",OCRBody);

    // this.setState({Amount :OCRBody.body[0] })
    // this.setState({Invoice :OCRBody.body[1] })
    // this.setState({InvoiceDate :OCRBody.body[2] })


    }

    render() { 
        const processing=this.state.confirmation;
        return ( 
           <div className="row">
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
                                <h6>Invoice</h6>
                            </Label>
                            <Input 
                                type="text"
                                name="Invoice"
                                id="Invoice"
                                required
                                value={this.state.Invoice}
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
           </div>
         );
    }
}
 
export default Upload;