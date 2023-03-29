import React from "react";
import { Navbar, Container, Nav, DropdownButton, Dropdown, Row   } from "react-bootstrap";
import './navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'universal-cookie'; 

const cookies = new Cookies();

export default class menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
logout() {
  cookies.remove('_s');
  window.location.reload();
}
  render() {
    return (
      <Navbar fixed = "top"  id = "navbar" bg="primary" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">BILSYSTEMS <span id = "usuario-sub-branm"></span> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
           
            </Nav>

            <DropdownButton id="dropdown-basic-button" title="Usuario">
              <Dropdown.Header id = "dropdown-header">
              <Row>
              <FontAwesomeIcon icon={faUser} />
              </Row>
               <Row>
                        Usuario
              </Row> 

              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => this.logout()}>
                CERRAR SESION
              </Dropdown.Item>
           
            </DropdownButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
