import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const NavbarComp = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                HouseOfCode
                </Navbar.Brand>
            </Navbar>
        </div>
    );
}

export default NavbarComp;