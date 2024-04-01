import { Link } from "react-router-dom";
import React from 'react';
import {
  NavbarBrand,
  Navbar,
  Container,
  Col,
} from "reactstrap";

const AdminNavbar = () => {

  return (
    <>
      <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
        <Container >   
          <Col className="text-center">
            <NavbarBrand to="/" tag={Link}>
              <img
                alt="..."
                style={{ width: '130px', height: 'auto' }}
                src={require("../../assets/img/theme/sigetu_logo.png")}
              />
            </NavbarBrand>
          </Col>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
