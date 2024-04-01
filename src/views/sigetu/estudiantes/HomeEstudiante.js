import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  CardTitle,
} from "reactstrap";

import { Alert, Space, Table, Tag } from 'antd';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { doc, getDoc } from "firebase/firestore";
import { db, auth } from 'firebase.config';

// Obtener el usuario actualmente autenticado
const user = auth.currentUser;

// Verificar si hay un usuario autenticado
if (user) {
  // Obtener el ID del usuario autenticado
  const userId = user.uid;
  console.log(userId);
} else {
  // No hay usuario autenticado
  console.log('No hay usuario autenticado');
}

const HomeEstudiante = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [time, setTime] = useState(new Date());
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => {
      clearInterval(timerID);
    };
  }, []); // Usamos un arreglo vacío para indicar que este efecto solo se ejecuta una vez, similar a componentDidMount()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userId = user.uid;
          const userData = await getAlumnoById(userId);
          setUserData(userData);
        } else {
          console.log('No hay usuario autenticado');
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };
    fetchUserData();
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  //tabla
  const columns = [
    {
      title: 'Asignatura',
      dataIndex: 'asignatura',
      key: 'asignatura',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Profesor',
      dataIndex: 'profesor',
      key: 'profesor',
    },
    {
      title: 'Parcial 1',
      key: 'tags1',
      dataIndex: 'tags1',
      render: (_, { tags1 }) => (
        <>
          {tags1 && tags1.map((tag) => {
            let color = 'green';
            if (tag === 'NA') {
              color = 'volcano';
            } else if (tag === 'SE') {
              color = 'yellow';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Parcial 2',
      key: 'tags2',
      dataIndex: 'tags2',
      render: (_, { tags2 }) => (
        <>
          {tags2 && tags2.map((tag) => {
            let color = 'green';
            if (tag === 'NA') {
              color = 'volcano';
            } else if (tag === 'SE') {
              color = 'yellow';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Parcial 3',
      key: 'tags3',
      dataIndex: 'tags3',
      render: (_, { tags3 }) => (
        <>
          {tags3 && tags3.map((tag) => {
            let color = 'green';
            if (tag === 'NA') {
              color = 'volcano';
            } else if (tag === 'SE') {
              color = 'yellow';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Final',
      key: 'tagsf',
      dataIndex: 'tagsf',
      render: (_, { tagsf }) => (
        <>
          {tagsf && tagsf.map((tag) => {
            let color = 'green';
            if (tag === 'NA') {
              color = 'volcano';
            } else if (tag === 'SE') {
              color = 'yellow';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      asignatura: 'John Brown',
      profesor: 32,
      tags1: ['NA'],
      tags2: ['DE'],
      tags3: ['SA'],
      tagsf: ['DE'],
    },
    {
      key: '2',
      asignatura: 'John ds',
      profesor: 32,
      tags1: ['AU'],
      tags2: ['DE'],
      tags3: ['NA'],
      tagsf: ['DE'],
    },
    {
      key: '3',
      asignatura: 'John es',
      profesor: 32,
      tags1: ['DE'],
      tags2: ['DE'],
      tags3: ['SE'],
      tagsf: ['DE'],
    },
    {
      key: '4',
      asignatura: 'John es',
      profesor: 32,
      tags1: ['DE'],
      tags2: ['DE'],
      tags3: ['SE'],
      tagsf: ['DE'],
    },
    {
      key: '5',
      asignatura: 'John es',
      profesor: 32,
      tags1: ['DE'],
      tags2: ['DE'],
      tags3: ['SE'],
      tagsf: ['DE'],
    },
    {
      key: '6',
      asignatura: 'John es',
      profesor: 32,
      tags1: ['DE'],
      tags2: ['DE'],
      tags3: ['SE'],
      tagsf: ['DE'],
    },
    {
      key: '7',
      asignatura: 'John es',
      profesor: 32,
      tags1: ['DE'],
      tags2: ['DE'],
      tags3: ['SE'],
      tagsf: ['DE'],
    },
  ];

  const getAlumnoById = async (userId) => {
    try {
      const docRef = doc(db, 'usuarios', userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log(userData);
        return userData;
      } else {
        console.log('No se encontraron datos para el usuario con el ID proporcionado');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      return null;
    }
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Container fluid>
          <Card>
            <Row>
              <Col className="order-xl-1" xl="9">
                <Card className="bg-red" >
                  <CardHeader>
                    <Card>
                      <Col xl="8">
                        <div className="h1 mb-0 text-uppercase d-none d-lg-inline-block">
                          Bienvenido a sigetu alumno
                        </div>
                        <h1>
                          {userData && userData.nombres} {userData && userData.apellidos}
                        </h1>
                      </Col>
                    </Card>
                  </CardHeader>
                  <CardBody >
                    <Card>
                      <h3>Evaluaciones Actuales</h3>
                      <div className="table-responsive">
                        <Table className="table-content" columns={columns} dataSource={data} pagination={false} />
                      </div>
                    </Card>
                  </CardBody>
                </Card>
              </Col>

              <Col className="order-xl-1 mb-5 mb-xl-0" xl="3" >
                <Card className="card-profile shadow">

                  <CardHeader className="bg-white border-0 text-center">
                    <div style={{ fontFamily: 'Digital-7', color: '#ffffff', backgroundColor: '#000000', borderRadius: '15px', textAlign: 'center' }}>
                      <h1 style={{ color: '#ffffff', fontSize: '30px', padding: '10px' }}>
                        {time.toLocaleTimeString()}</h1>
                    </div>
                    <div >
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar />
                      </LocalizationProvider>
                    </div>
                  </CardHeader>
                  <hr className="my-1" />
                  <CardBody style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <Row>
                      <Col md="12">
                        <Space
                          direction="vertical"
                          style={{
                            width: '100%',
                          }}
                        >
                          <Alert message="Success Tips" type="success" showIcon />
                          <Alert message="Informational Notes" type="info" showIcon />
                          <Alert message="Warning" type="warning" showIcon closable />
                          <Alert message="Error" type="error" showIcon />
                          <Alert
                            message="Success Tips"
                            description="Detailed description and advice about successful copywriting."
                            type="success"
                            showIcon
                          />
                          <Alert
                            message="Informational Notes"
                            description="Additional description and information about copywriting."
                            type="info"
                            showIcon
                          />
                          <Alert
                            message="Warning"
                            description="This is a warning notice about copywriting."
                            type="warning"
                            showIcon
                            closable
                          />
                          <Alert
                            message="Error"
                            description="This is an error message about copywriting."
                            type="error"
                            showIcon
                          />
                        </Space>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default HomeEstudiante;
