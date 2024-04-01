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
import LogoutIcon from '@mui/icons-material/Logout';

import AdminNavbar from 'components/Navbars/AdminNavbar';

import { getAuth, signOut } from "firebase/auth";

const { SubMenu } = Menu;

const { Content, Footer, Sider } = Layout;

const iconSize = 20;

const items = [

  { key: '1', label: 'INICIO', icon: <HomeFilled style={{ fontSize: iconSize }} />, path: '/admin/inicio/Admin' },
  { key: '2', label: 'PERFIL', icon: <IdcardFilled style={{ fontSize: iconSize }} />, path: '/admin/perfil' },
  {
    key: '3',
    label: 'ACADEMIA',
    icon: <FactCheckIcon style={{ fontSize: iconSize }} />,
    children: [
      { key: '4', label: 'ALUMNOS', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/' },
      { key: '5', label: 'DOCENTES', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/' },
      { key: '6', label: 'EVALUACIONES', icon: <PersonIcon style={{ fontSize: iconSize }} />, path: '/admin/' },
    ]
  },
  {
    key: '7',
    label: 'CONTROL ESCOLAR',
    icon: <FactCheckIcon style={{ fontSize: iconSize }} />,
    children: [
      { key: '8', label: 'ASIGNAR GRUPOS', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/asignar/grupos' },
      { key: '20', label: 'ASIGNAR GRUPOS ALUMNOS', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/asignar/grupos/alumnos' },
      { key: '9', label: 'GRUPOS', icon: <FeedIcon style={{ fontSize: iconSize }} />, path: '/admin/grupos' },
      { key: '10', label: 'USUARIOS', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/usuarios/general' },
      { key: '11', label: 'ALUMNOS', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/usuarios/alumnos' },
      { key: '12', label: 'DOCENTES', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/usuarios/docentes' },
    ]
  },
  { key: '13', label: 'ESTADIAS', icon: <IdcardFilled style={{ fontSize: iconSize }} />, path: '/admin/' },
  { key: '14', label: 'EVALUACIÓN 360', icon: <IdcardFilled style={{ fontSize: iconSize }} />, path: '/admin/' },
  { key: '15', label: 'IDIOMAS', icon: <IdcardFilled style={{ fontSize: iconSize }} />, path: '/admin/' },
  { key: '16', label: 'REPORTES', icon: <IdcardFilled style={{ fontSize: iconSize }} />, path: '/admin/' },
  {
    key: '17',
    label: 'REGISTRAR',
    icon: <FactCheckIcon style={{ fontSize: iconSize }} />,
    children: [
      { key: '18', label: 'ALUMNOS', icon: <FeedIcon style={{ fontSize: iconSize }} />, path: '/admin/registrar/alumnos' },
      { key: '19', label: 'ADMINISTRATIVOS', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/registrar/administrativos' },
      { key: '21', label: 'DOCENTES', icon: <GroupsIcon style={{ fontSize: iconSize }} />, path: '/admin/registrar/docentes' },
    ]
  },

];

const Admin = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
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
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{ background: 'dark' }}>
        <Menu defaultSelectedKeys={['1']} mode="inline" >
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
          <Menu.Item key="logout" icon={<LogoutIcon style={{ fontSize: iconSize }} />} onClick={handleLogout} style={{ color: 'red' }}>
            SALIR
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <AdminNavbar />
        <Content style={{
          padding: "15px",
          minHeight: "100vh",
          backgroundImage:
            "url(" + require("assets/img/theme/uttecamac.jpg") + ")",
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

export default Admin;