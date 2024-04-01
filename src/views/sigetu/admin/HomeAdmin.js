import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CardBody, CardHeader, Container } from "reactstrap";
import { Row, Col, Card, Statistic, Button, Progress, Avatar } from 'antd';
import { UserAddOutlined, UserDeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Box from '@mui/material/Box';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const sample = [1, 10, 30, 50, 70, 90, 100];

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};
const { Meta } = Card;

const HomeAdmin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const [activeUsers, setActiveUsers] = useState(0);
  const [idleUsers, setIdleUsers] = useState(0);

  // Lista de edificios con sus divisiones
  const buildings = [
    { name: "Edificio A", division: "Division de TICS" },
    { name: "Edificio B", division: "Division de Nanotecnologia" },
    { name: "Edificio C", division: "Division de TICS" },
    { name: "Edificio D", division: "Division de TICS" },
    // Agrega más edificios si es necesario
  ];

  //graficas
  const totalApplications = 336;
  const acceptedApplications = 84;
  const acceptanceRate = (acceptedApplications / totalApplications) * 100;
  const Finalizado = 100;
  const Cursos = 10;
  const Resultado = (Finalizado / Cursos) * 100;



  // Función para generar un número aleatorio entre min y max
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    // Actualizar los valores aleatorios cada segundo
    const interval = setInterval(() => {
      setActiveUsers(generateRandomNumber(300, 800)); // Números aleatorios
      setIdleUsers(generateRandomNumber(100, 300));
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const tick = () => {
    setTime(new Date());
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Container fluid>
          <Card>
            <CardHeader>
              <h1 className="h1 mb-0 text-uppercase d-none d-lg-inline-block">
                Bienvenido a sigetu administrador
              </h1>
              <h1>
                NOMBRES
              </h1>
            </CardHeader>
            <Row >
              <Col span={4}>
                <CardBody>
                  <Row>
                    <Col>
                      <Card >
                        <Statistic
                          title=" Usuarios Activos"
                          value={activeUsers}
                          valueStyle={{ color: '#3f8600' }}
                          prefix={<UserAddOutlined />}
                        />
                        <Statistic
                          title="Usuarios saliendo"
                          value={idleUsers}
                          valueStyle={{ color: '#cf1322' }}
                          prefix={<UserDeleteOutlined />}
                        />
                        <Statistic
                          title="Alumnos inscritos"
                          value={4687}
                          suffix="/ 6000" />
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
              </Col>

              <Col span={5} className="text-center">
                <Card title="Estadísticas de Aplicaciones">
                  <Progress type="circle" percent={acceptanceRate} />
                  <h2> Aceptados: {acceptedApplications}/{totalApplications}</h2>
                </Card>
              </Col>
              <Col span={5} className="text-center">
                <Card title="Cursos">
                  <Progress type="dashboard" percent={Resultado} /><h2>Finalizados</h2>
                </Card>
              </Col>

              <Col span={8} className="text-center">
                <Box sx={{ width: '100%', maxWidth: 600 }}>
                  <ResponsiveChartContainer
                    xAxis={[
                      {
                        scaleType: 'band',
                        data: ['Q1', 'Q2', 'Q3'],
                        id: 'quarters',
                        label: 'Quiatrimestre',
                      },
                    ]}
                    yAxis={[{ id: 'money' }, { id: 'quantities' }]}
                    series={[
                      {
                        type: 'line',
                        id: 'revenue',
                        yAxisKey: 'money',
                        data: [3645, 4542, 6135],
                      },
                      {
                        type: 'bar',
                        id: 'cookies',
                        yAxisKey: 'quantities',
                        data: [3905, 3542, 5135],
                      },
                      {
                        type: 'bar',
                        id: 'icecream',
                        yAxisKey: 'quantities',
                        data: [3645, 3642, 5146],
                      },
                    ]}
                    height={400}
                    margin={{ left: 70, right: 70 }}
                    sx={{
                      [`.${axisClasses.left} .${axisClasses.label}`]: {
                        transform: 'translate(-25px, 0)',
                      },
                      [`.${axisClasses.right} .${axisClasses.label}`]: {
                        transform: 'translate(30px, 0)',
                      },
                    }}
                  >
                    <BarPlot />
                    <LinePlot />
                    <ChartsXAxis axisId="quarters" label="2023" labelFontSize={18} />
                    <ChartsYAxis axisId="money" position="right" label="Ingresos" />
                  </ResponsiveChartContainer>
                </Box>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Card title="Edificios">
                  {buildings.map((building, index) => (
                    <Card.Grid style={gridStyle} key={index}>
                      <h3>{building.name}</h3>
                      <Card
                        style={{
                          width: '100%',
                          background: '#6FC0FF',
                        }}

                        title={building.division}
                        cover={
                          <img
                            alt="example"
                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            style={{ width: '100%' }}
                          />
                        }
                        actions={[
                          <SettingOutlined key="setting" />,
                          <EditOutlined key="edit" />,
                          <EllipsisOutlined key="ellipsis" />,
                        ]}
                      >
                      </Card>
                    </Card.Grid>
                  ))}
                </Card>
              </Col>
            </Row>
          </Card>
        </Container>
      </div>
    </>

  );
};

export default HomeAdmin;
