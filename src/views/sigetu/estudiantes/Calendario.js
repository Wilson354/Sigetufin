import React from 'react';
import { Badge, Calendar } from 'antd';
import {
  Button,
  Card,
  Container,
  Row,
  Col,
} from 'reactstrap';

const Calendario = () => {

    const headerRender = ({ value, type, onChange, onTypeChange }) => {
        const current = value.clone();
        const localeData = value.localeData();
        const month = localeData.months()[value.month()]; // Obtener el nombre del mes
        
        const year = value.year();
      
        const options = [];
        for (let i = year - 10; i < year + 10; i += 1) {
          options.push(
            <option key={i} value={i} className="year-item">
              {i}
            </option>,
          );
        }
      
        const goToPreviousMonth = () => {
          const newValue = current.clone().subtract(1, 'month');
          onChange(newValue);
        };
      
        const goToNextMonth = () => {
          const newValue = current.clone().add(1, 'month');
          onChange(newValue);
        };
        
        return (
          <div style={{ padding: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'lightgray' }}>
              <Button onClick={goToPreviousMonth}  style={{ backgroundColor: 'black', border: 'none', color: 'white' }}>&lt;</Button> {/* Botón para ir al mes anterior */}
              <span style={{ fontSize: '2em' }} >{month}</span> {/* Mostrar el nombre del mes */}
              <Button onClick={goToNextMonth} style={{ backgroundColor: 'black', border: 'none', color: 'white' }}>&gt;</Button> {/* Botón para ir al mes siguiente con estilo personalizado */}
            </div>
          </div>
        );
      };
      
    
      
        

  const getListData = (value) => {
    let listData = [];
    const currentMonth = value.month();
    const currentDay = value.date();

    // Definir los días de la Semana vacacional
    const vacacionesData = [
        {date: 25, month: 2, color: 'yellow', content: 'Semana vacacional'},
        {date: 26, month: 2,color: 'yellow', content: 'Semana vacacional'},
        {date: 27, month: 2, color: 'yellow', content: 'Semana vacacional'},
        {date: 28, month: 2, color: 'yellow', content: 'Semana vacacional'},
        {date: 29, month: 2, color: 'yellow', content: 'Semana vacacional'},
        ]; // del 25 al 29 de marzo

    // Definir los días no laborales y sus colores
    const noLaboralData = [
      { date: 5, month: 1, color: 'cyan', content: 'Día no laboral' }, // 5 de febrero
      { date: 1, month: 2, color: 'cyan', content: 'Día no laboral' }, // 1 de marzo
      { date: 18, month: 2, color: 'cyan', content: 'Día no laboral' },// 18 de marzo
      { date: 1, month: 4, color: 'cyan', content: 'Día no laboral' },//1 de mayo
      { date: 6, month: 4, color: 'cyan', content: 'Día no laboral' },//6 demayo
    ];

    // Definir los días relacionados con el cuatrimestre
    const cuatrimestreData = [
      { date: 6, month: 3, color: 'pink', content: 'Fecha de inscripción' }, // 6 de abril
      { date: 5, month: 0, color: 'orange', content: 'Inicio de cuatrimestre' }, // 5 de enero
      { date: 19, month: 3, color: 'orange', content: 'Fin de cuatrimestre' }, // 19 de abril
    
      { date: 3, month: 7, color: 'pink', content: 'Fecha de inscripción' },
      { date: 2, month: 4, color: 'orange', content: 'Inicio de cuatrimestre' }, // 2 de mayo
      { date: 16, month: 7, color: 'orange', content: 'Fin de cuatrimestre' }, //16 de agosto
    ];

    // Verificar si el día actual es uno de los días no laborales
    const noLaboral = noLaboralData.find(
      (data) => data.date === currentDay && data.month === currentMonth
    );

    // Verificar si el día actual es uno de los días relacionados con el cuatrimestre
    const cuatrimestre = cuatrimestreData.find(
      (data) => data.date === currentDay && data.month === currentMonth
    );

    const vacaciones = vacacionesData.find(
      (data) => data.date === currentDay && data.month === currentMonth
    );
    // Agregar los datos correspondientes a la lista de datos
    if (noLaboral) {
      listData.push({ type: 'noLaboral', content: noLaboral.content, color: noLaboral.color });
    }

    if (cuatrimestre) {
      listData.push({ type: 'cuatrimestre', content: cuatrimestre.content, color: cuatrimestre.color });
    }

    if (vacaciones) {
      listData.push({ type: 'vacaciones', content: vacaciones.content, color: vacaciones.color });
    }

    return listData;
  };

  const getMonthData = (value) => {
    if (value.month() === 1) {
      return 1994;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type}
              text={item.content}
              style={{ backgroundColor: item.color }}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <Container fluid>
        <Card style={{ border: '1px solid black' }}>
          <Row>
            <Col className="order-xl-1 mb-5 mb-xl-0">
              <Calendar
                style={{ border: '3px solid black' }}
                className="custom-calendar"
                cellRender={cellRender}
                headerRender={headerRender}
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
};

export default Calendario;
