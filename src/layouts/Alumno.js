import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { Routes, Route, useNavigate } from 'react-router-dom'; // Agrega Routes y Route para manejar las rutas
import routes from '../routes'; // Importa tus rutas desde routes.js
import {
  HomeFilled,
  IdcardFilled,
  CalendarFilled,
} from '@ant-design/icons';

//iconos
import FeedIcon from '@mui/icons-material/Feed';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SchoolIcon from '@mui/icons-material/School';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import CachedIcon from '@mui/icons-material/Cached';
import LogoutIcon from '@mui/icons-material/Logout';

import AlumNavbar from 'components/Navbars/AlumNavbar';

import { getAuth, signOut } from "firebase/auth";

const { SubMenu } = Menu;

const { Content, Footer, Sider } = Layout;

const iconSize = 20; 
// Define tus elementos de menú
const items = [

  { key: '1', label: 'INICIO', icon: <HomeFilled style={{ fontSize: iconSize }}/>, path: '/alumno/inicio/Alumno' },
  { key: '2', label: 'PERFIL', icon: <IdcardFilled style={{ fontSize: iconSize }}/>, path: '/alumno/perfil' },
  { key: '3', label: 'CALENDARIO', icon: <CalendarFilled style={{ fontSize: iconSize }}/>, path: '/alumno/calendario' },
  { key: '4', label: 'EVALUACIONES', icon: <FeedIcon style={{ fontSize: iconSize }}/>, path: '/alumno/evaluaciones' },
  {
    key: '5',
    label: 'ENCUESTAS',
    icon: <FactCheckIcon style={{ fontSize: iconSize }} />,
    children: [
      { key: '6', label: 'DOCENTE', icon: <GroupsIcon style={{ fontSize: iconSize }}/>, path: '/alumno/evaluacion/docente' },
      { key: '7', label: 'ESTUDIANTIL', icon: <PersonIcon style={{ fontSize: iconSize }} />, path: '/alumno/evaluacion/estudiante' },
    ]
  },
  {
    key: '8',
    label: 'TRAMITES',
    icon: <HistoryEduIcon style={{ fontSize: iconSize }} />,
    children: [
      { key: '9', label: 'TITULACIÓN', icon: <SchoolIcon style={{ fontSize: iconSize }} />, path: '/alumno/' },
      { key: '10', label: 'CERT NO ADEUDO', icon: <AssignmentLateIcon style={{ fontSize: iconSize }}/>, path: '/alumno/' },
      { key: '11', label: 'CAMBIO DE CARRERA', icon: <CachedIcon style={{ fontSize: iconSize }}/>, path: '/alumno/' },
    ]
  },


  // Agrega más elementos de menú según sea necesario
];

const Alumno = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/alumno") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: 'white' }}>
      <Menu  defaultSelectedKeys={['1']} mode="inline" >
  <div style={{ margin: "10px" }}>
    <img
      alt="..."
      style={{
        width: "50px",
        height: "auto",
        position: "relative",
        left: "10px",
        top: "0px",
      }}
      src={require("assets/img/theme/sigetu_logo.png")}
    />
  </div>
  
  {items.map((item) => (
    // Verifica si el elemento tiene hijos (es un submenú)
    item.children ? (
      <SubMenu key={item.key} title={item.label} icon={item.icon}>
        {item.children.map((child) => (
          <Menu.Item key={child.key} icon={child.icon}>
            <Link to={child.path}>{child.label}</Link>
          </Menu.Item>
        ))}
      </SubMenu>
    ) : (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.path}>{item.label}</Link>
      </Menu.Item>
    )
  ))}
  <Menu.Divider style={{ margin: '8px 0', borderTop: '2px solid #616161' }} />
  {/* Botón de logout */}
  <Menu.Item key="logout" icon={<LogoutIcon style={{ fontSize: iconSize }}/>} onClick={handleLogout} style={{ color: 'red' }}>
    SALIR
  </Menu.Item>
</Menu>
      </Sider>
      <Layout>
        <AlumNavbar />
        <Content style={{
          padding: "15px",
          minHeight: "100vh",
          backgroundImage:
          "url(" + require("assets/img/theme/uttecamac2.jpeg")+")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          }}
          >
          <Routes>
            {getRoutes(routes)}
          </Routes>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          UTTECAMAC ©{new Date().getFullYear()} INKOVA
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Alumno;

