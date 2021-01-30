import React from 'react';
import {Container, Row, Col} from 'react-bootstrap/';

const Value = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col><label>HELLO WORLD</label></Col>
                    <Col><input type="text"></input></Col>
                </Row>
            
            </Container>
            
        </div>
    );
}

export default Value;