import React from "react";
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCardTitle, MDBCardImage} from "mdbreact";
import FileUpload from "./imgUploadComp";

const Jumbotron = () => {
  return (
    <MDBContainer className="mt-5 text-center myLabel">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron className="text-center">
            <MDBCardTitle className="card-title h4 pb-2">
              <strong>Check Upload</strong>
            </MDBCardTitle>

            <MDBCardImage
              src="#"
              className="img-fluid" alt="check image will appear here"
            />
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Jumbotron;