import React, { Component} from 'react';
import { FileBase64 } from 'react-file-base64';
import {Button, Form, FormGroup, Label, FormText} from'reactstrap';

class Upload extends Component {
    state = {
            confirmation : "",
            isLoading : "",
            files: ""
    }

    async handleSubmit(event){
        event.preventDefault();
        this.setState({confirmation : "Upload..."});

    }

    async getFiles(files){
        this.setState({
            isLoading: "Extracting data",
            files : files
        });
    }

    render(){
        const processing="Processing document..";
        return(
            <div className="row">
                <div className="col-6 offset-3">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <h3 className='text-danger'>{processing}</h3>
                            <h6>Upload check</h6>
                            <FormText color="muted">PNG, JPG</FormText>
                        </FormGroup>
                        <div className="form-group files color">
                            <FileBase64 multiple={true}
                            onDone={this.getFiles.bind(this)}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Upload;