/*!
=======================================
LOGIN autentificador principal
=========================================
*/
import React from "react";
// reactstrap components
import { Container } from "reactstrap";

import AuthNavbar from "components/Navbars/AuthNavbar.js";
import AuthFooter from "components/Footers/AuthFooter.js";
import Login from "../views/screens/Login";



const Auth = (props) => {

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url(" + require("../assets/img/theme/uttecamac.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <AuthNavbar />
        <Container>
          <div className="header-body text-center">
            <h1 className="text-dark">BIENVENIDO A <strong>SIGETU</strong></h1>
            <p className="text-dark"><strong>
              Sistema Integral de Gestion Estudiantil y Tramites Universitarios
            </strong>
            </p>
          </div>
        </Container>
        {/* contenido del login */}
        <Container fluid>
          <Login />
        </Container>
        <AuthFooter />
      </div>
    </>
  );
};

export default Auth;
