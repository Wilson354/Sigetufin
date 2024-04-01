import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const Error404 = ({ user }) => (
    <Result
    status="404"
    title={<span style={{ fontSize: '36px' }}>404</span>}
    subTitle={<span style={{ fontSize: '24px' }}>Disculpa. La página que buscas no existe</span>}
    extra={
        <Link to={user.rol === 'admin' ? '/admin/inicio' : (user.rol === 'docente' ? '/docente/inicio' : '/alumno/inicio')}>
          {/* Reemplaza '/admin/inicio', '/docente/inicio', '/alumno/inicio' con las rutas correctas para cada rol */}
          <Button type="primary">Volver al Inicio</Button>
        </Link>
    }
  />
);

export default Error404;
