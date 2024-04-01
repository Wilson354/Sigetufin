import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import firebaseApp from "firebase.config";
import { getAuth, signOut } from "firebase/auth";
import Error404 from "./Error404";
import Error403 from "./Error403";

// vistas
import AdminLayout from "layouts/Admin";
import AlumnoLayout from "layouts/Alumno";
import AuthLayouth from "layouts/Auth";
import DocenteLayout from "layouts/Docente";

// alumnos
import Inicio from "views/sigetu/estudiantes/HomeEstudiante";
import Perfil from "views/sigetu/estudiantes/PerfilEstudiante";
import Evaluaciones from "views/sigetu/estudiantes/EvaluacionesEstudiante";
import Encuestas from "views/sigetu/estudiantes/EncuestasEstudiante"
import Tramites from "views/sigetu/estudiantes/TramitesEstudiante"
import Calendario from "views/sigetu/estudiantes/Calendario";

// administrador
import Inicioa from "views/sigetu/admin/HomeAdmin";
import Crud from "views/examples/crudshow"
import Crear from "views/examples/crudcreate"
import Showd from "views/examples/division"
import ShowU from "views/examples/usuarioShow"

// docente
import Iniciod from "views/sigetu/docentes/HomeDocentes";

const auth = getAuth(firebaseApp);

function Home({ user }) {
  return (
    <div>
      {user.rol === "admin" ? (
        <AdminLayout />
      ) : user.rol === "docente" ? (
        <DocenteLayout />
      ) : (
        <AlumnoLayout />
      )}
    </div>
  );
}

export default function HomeWrapper(props) {
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkConnection = () => {
      console.log("Checking connection...");
      fetch("http://localhost:3000")
        .then((res) => {
          console.log("Response:", res);
          if (!res.ok) {
            console.log("Error: Response is not okay");
            setError(true);
          }
        })
        .catch((error) => {
          console.log("Error:", error);
          setError(true);
        });
    };

    checkConnection();
  }, []);

  if (error) {
    console.log("Showing Error403 component");
    return <Error403 />;
  }

  console.log("Rendering HomeWrapper component");
  return (
    <Routes>
      <Route path="/" element={<AuthLayouth/>} />
      {/* Rutas de alumnos */}
      <Route path="/alumno/*" element={<AlumnoLayout />}>
        <Route path="inicio" element={<Inicio />} />
        <Route path="perfil" element={<Perfil />} />
        <Route path="calendario" element={<Calendario />} />
        <Route path="evaluaciones" element={<Evaluaciones />} />
        <Route path="encuestas" element={<Encuestas />} />
        <Route path="tramites" element={<Tramites />} />
      </Route>

      {/* Rutas de autenticación */}
      <Route path="/auth/*" element={<AuthLayouth />} />

      {/* Rutas de administrador */}
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="inicio" element={<Inicioa />} />
        <Route path="crud" element={<Crud />} />
        <Route path="crear" element={<Crear />} />
        <Route path="showd" element={<Showd />} />
        <Route path="showu" element={<ShowU />} />
      </Route>

      {/* Rutas de docente */}
      <Route path="/docente/*" element={<DocenteLayout />}>
        <Route path="inicio" element={<Iniciod />} />
      </Route>

      {/* Ruta para manejar el error 404 */}
      <Route path="*" element={<Error404 user={props.user} />} />
    </Routes>
  );
}
