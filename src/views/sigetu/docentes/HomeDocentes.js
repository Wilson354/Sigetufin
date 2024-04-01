import React, { useState, useEffect } from "react";
import { useLocation, } from "react-router-dom";
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Col,
  CardBody,
  CardTitle,
  Button
} from "reactstrap";

const HomeEstudiante = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    // Devolvemos una función de limpieza para detener el temporizador cuando el componente se desmonte
    return () => {
      clearInterval(timerID);
    };
  }, []); // Usamos un arreglo vacío para indicar que este efecto solo se ejecuta una vez, similar a componentDidMount()

  const tick = () => {
    setTime(new Date());
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Container fluid>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div>
              </CardHeader>
        </Container>
      </div>
    </>
  );
};

export default HomeEstudiante;
