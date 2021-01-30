import React from 'react';
import '../App.css';
import {Container, Row, Col} from 'react-bootstrap/';

const Value = (props) => {
    return (
        <div>
            <Container className="align-self-center myLabel">
                <Row>
                    <Col xs lg="2"><label>{props.label}</label></Col>
                    <Col xs lg="2"><input type="text" value="enter"></input></Col>
                </Row>
            
            </Container>
            
        </div>
    );
}

export default Value;