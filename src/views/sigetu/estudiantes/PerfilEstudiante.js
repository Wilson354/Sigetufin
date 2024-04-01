import { Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col, Modal, } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useAuth } from "context/AuthContext";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from '../../../firebase.config';
import { Button, Image, Flex,Table } from 'antd';

const data = [
  {
    key: '1',
    numeroAdeudo: '001',
    fecha: '2024-03-31',
    comentario: 'Adeudo por falta de entrega en documentacion',
    fechaCreacion: '2024-03-30',
  },
];

const columns = [
  {
    title: 'Número de Adeudo',
    dataIndex: 'numeroAdeudo',
    key: 'numeroAdeudo',
  },
  {
    title: 'Fecha',
    dataIndex: 'fecha',
    key: 'fecha',
  },
  {
    title: 'Comentario',
    dataIndex: 'comentario',
    key: 'comentario',
  },
  {
    title: 'Fecha de Creación',
    dataIndex: 'fechaCreacion',
    key: 'fechaCreacion',
  },
];


const PerfilEstudiante = () => {
  <Flex
    vertical
    gap="small"
    style={{
      width: '100%',
    }}
  ></Flex>

  const [visible, setVisible] = useState(false);
  const [scaleStep, setScaleStep] = useState(0.5);
  const [userData, setUserData] = useState(null);
  const [defaultModal, setDefaultModal] = useState(false);
  const [AdeudoModal, setAdeudoModal] = useState(false);
  const [solicitudModal, setSolicitudModal] = useState(false);
  const toggleModal = (modal) => {
    switch (modal) {
      case 'defaultModal':
        setDefaultModal(!defaultModal);
        break;
      case 'AdeudoModal':
        setAdeudoModal(!AdeudoModal);
        break;
      case 'solicitudModal':
        setSolicitudModal(!solicitudModal);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const userDocRef = doc(db, 'alumnos', userId);
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
          <Col className="order-xl-2 mb-3 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <Image
                  alt="Perfil"
                  width={200}
                  src={userData && userData.imgperfil}
                />
              </CardHeader>
              <Image
                width={200}
                style={{
                  display: 'none',
                }}
                preview={{
                  visible,
                  src: 'https://firebasestorage.googleapis.com/v0/b/pruebareact-33214.appspot.com/o/biblioteca.jpg?alt=media&token=2663d9a7-0bbf-4934-9624-36c786045033',
                  onVisibleChange: (value) => {
                    setVisible(value);
                  },
                }}
              />
              <CardBody className="pt-0 pt-md-2">
                <div className="text-center h2">
                  {userData && userData.nombres} {userData && userData.apellidos}
                  <div className="h3 mt-4">
                    {userData && userData.informacion && userData.informacion.escolar && userData.informacion.escolar.carrera}
                  </div>
                  <hr className="my-4" />
                  <Col className="centered-container" >
                    <Button type="primary" size="large" onClick={() => setVisible(true)}>
                      Biblioteca digital
                    </Button>
                  </Col>
                  <Col className="centered-container mt-2">
                    <Button type="primary" size="large" onClick={() => window.open('https://firebasestorage.googleapis.com/v0/b/pruebareact-33214.appspot.com/o/HORARIO%2010IDS1.pdf?alt=media&token=5821dbc0-e75a-4074-90ef-f77ef3ddb6d4')}>
                      Horario
                    </Button>
                  </Col>
                  <Col className="centered-container mt-2">
                    <Button
                      type="primary" size="large"
                      onClick={() => toggleModal("AdeudoModal")}
                    >
                      Adeudos
                    </Button>
                    <Modal
                      className="modal-dialog-centered"
                      style={{ maxWidth: '800px' }}
                      isOpen={AdeudoModal}
                      toggle={() => toggleModal("AdeudoModal")}
                    >
                      <div className="modal-header">
                        <h6 className="modal-title" id="modal-title-default">
                          Adeudos
                        </h6>
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => toggleModal("AdeudoModal")}
                        >
                          <span aria-hidden={true}>×</span>
                        </button>
                      </div>
                      <div className="modal-body">
                      <Table dataSource={data} columns={columns} />
                      </div>
                      <div className="modal-footer">
                        <Button
                          className="ml-auto"
                          color="link"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => toggleModal("AdeudoModal")}
                        >
                          Cerrar
                        </Button>
                      </div>
                    </Modal>
                  </Col>
                  <Col className="centered-container mt-2">
                  <Button
                      type="primary"
                      size="large"
                      onClick={() => toggleModal("solicitudModal")}
                    >
                      Solicitud cambio carrera
                    </Button>
                    <Modal
                      className="modal-dialog-centered modal-danger"
                      contentClassName="bg-gradient-danger"
                      isOpen={solicitudModal}
                      toggle={() => toggleModal("solicitudModal")}
                    >
                      <div className="modal-header">
                        <button
                          aria-label="Close"
                          className="close"
                          data-dismiss="modal"
                          type="button"
                          onClick={() => toggleModal("solicitudModal")}
                        >
                          <span aria-hidden={true}>x</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="py-3 text-center">
                          <h4 className="heading mt-4">No puedes cambiar de carrera en INGENIERIA!</h4>
                          <p>
                            Desafortunadamente no se puede cambiar de carrera
                          </p>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <Button className="btn-white" color="default" type="button"
                        data-dismiss="modal"
                        onClick={() => toggleModal("solicitudModal")}>
                          ENTERADO
                        </Button>
                      </div>
                    </Modal>
                  </Col>
                  <Col className="centered-container mt-2">
                    <Button type="primary" size="large">
                      Cambio de contraseña
                    </Button>
                  </Col>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Mi cuenta</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      AYUDA
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

export default PerfilEstudiante;
