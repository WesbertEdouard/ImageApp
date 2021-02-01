import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button'
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";


const NavbarComp = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
            <DropdownButton id="dropdown-basic-button" title={<span>Connect with us! <AiFillLinkedin/></span>} variant="dark">
                <Dropdown.Item href="https://www.linkedin.com/in/wesberte">Wesbert Edouard</Dropdown.Item>
                <Dropdown.Item href="https://www.linkedin.com/in/nicholas-estrada/">Nicholas Estrada</Dropdown.Item>
                <Dropdown.Item href="https://www.linkedin.com/in/waleedal">Waleed Al-Sayed</Dropdown.Item>
            </DropdownButton>
                <Navbar.Brand className="mx-auto" href="#home">
                    HouseOfCode
                </Navbar.Brand>
                <Button size="lg" variant="dark" href="https://github.com/WesbertEdouard/ImageApp"><AiFillGithub/></Button>
            </Navbar>
        </div>
    );
}

export default NavbarComp;