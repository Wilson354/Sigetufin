import React, { useState } from 'react';
import { Navbar, Container, Col } from 'reactstrap';
import { AutoComplete, Input } from 'antd';
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate y Link desde react-router-dom

const getRandomInt = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

const searchResult = (query) => {
  const category = `${query}`; // Generar un único resultado
  return [
    {
      value: category,
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>
            {query} {' '}
            <Link to={`/docente/${category}`}></Link>
          </span>
        </div>
      ),
    },
  ];
};



const DoceNavbar = (props) => {
  const navigate = useNavigate(); // Utiliza useNavigate para la navegación

  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value) => {
    navigate(`/docente/${value}`); // Cambia '/ruta' por la ruta base de tu aplicación
  };

  return (
    <>
      <Navbar className="navbar-top pt-3 " expand="md" id="navbar-main">
        <Container fluid>
          <Col xl="8">
            <div className="h1 mb-0 text-uppercase d-none d-lg-inline-block">
              Bienvenido a sigetu profesor
            </div>
          </Col>
          <Col xl="3">
            <AutoComplete
              popupMatchSelectWidth={252}
              style={{
                width: 300,
              }}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
              size="large"
            >
              <Input.Search size="large" placeholder="Buscar aquí" enterButton />
            </AutoComplete>
          </Col>
          <Col xl="1">
              
          </Col>
        </Container>
      </Navbar>
    </>
  );
};

export default DoceNavbar;
