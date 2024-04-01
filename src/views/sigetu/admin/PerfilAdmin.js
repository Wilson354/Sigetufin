import { Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Modal, } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from '../../../firebase.config';
import { Button, Image, Flex,Table } from 'antd';

  const PerfilAdmin = () => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const user = auth.currentUser;
          if (user) {
            const userId = user.uid;
            const userDocRef = doc(db, 'administradores', userId);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              setUserData(userData); // Establece los datos del documento principal de alumno
  
              // Accede a la subcolección 'informacion'
              const informacionRef = collection(userDocRef, 'informacion');
              const informacionSnapshot = await getDocs(informacionRef);
              if (!informacionSnapshot.empty) {
                const informacionData = {};
                informacionSnapshot.forEach(doc => {
                  informacionData[doc.id] = doc.data();
                });
                console.log('Datos de la subcolección "informacion":', informacionData);
                setUserData(prevUserData => ({ ...prevUserData, informacion: informacionData }));
              } else {
                console.log('No hay datos en la subcolección "informacion"');
              }
            } else {
              console.log('No se encontraron datos para el usuario con el ID proporcionado');
            }
          } else {
            console.log('No hay usuario autenticado');
          }
        } catch (error) {
          console.error('Error al cargar los datos del usuario:', error);
        }
      };
  
      fetchUserData();
    }, []);

    return (
      <>
        <Container fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-box"
                          src={require("../../../assets/img/users/prueba.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
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
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Jessica Jones
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informacion Personal
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Matricula
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.matricula}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Correo
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.correo}
                            id="input-email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Curp
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.informacion && userData.informacion.datos_personales && userData.informacion.datos_personales.curp}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Vidas academicas
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.vidas}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Información Escolar
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Carrera
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.informacion && userData.informacion.escolar && userData.informacion.escolar.carrera}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Carrera
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.informacion && userData.informacion.escolar && userData.informacion.escolar.area}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Grupo
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.informacion && userData.informacion.escolar && userData.informacion.escolar.grupo}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Grupo inglés
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.informacion && userData.informacion.escolar && userData.informacion.escolar.grupo_i}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            situacion
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.informacion && userData.informacion.escolar && userData.informacion.escolar.situacion}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Seguro Facultativo</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                          >
                            Institucion
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.informacion && userData.informacion.datos_personales && userData.informacion.datos_personales.institucion}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Número de afiliación
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={userData && userData.informacion && userData.informacion.datos_personales && userData.informacion.datos_personales.nss}
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default PerfilAdmin;
  