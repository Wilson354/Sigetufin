import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import React, { useState, useEffect } from "react";
import { AuthProvider } from "context/AuthContext";
import Home from "views/screens/Home";
import Error500 from "../src/views/screens/Error500";
import { Modal, Spin } from "antd";

// Firebase
import firebaseApp from "firebase.config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import Auth from "layouts/Auth";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);
  const [connectionError, setConnectionError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [countdown, setCountdown] = useState(10);

  let timeoutId;

  const resetTimer = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      signOut(auth)
        .then(() => {
          setUser(null);
          console.log("¡Sesión cerrada por inactividad!");
          window.location.href = "/auth/login";
        })
        .catch(error => console.error("Error al cerrar sesión:", error));
    }, 10 * 60 * 1000);
  };

  useEffect(() => {
    const checkConnection = () => {
      fetch("http://localhost:3000")
        .then((res) => {
          if (!res.ok) {
            setConnectionError(true);
            setShowModal(true);
            resetTimer();
          } else {
            setConnectionError(false);
          }
        })
        .catch(() => {
          setConnectionError(true);
          setShowModal(true);
          resetTimer();
        });
    };

    const intervalId = setInterval(checkConnection, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUserWithFirebaseAndRol(usuarioFirebase);
        resetTimer();
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const handleUnload = () => {
    if (user) {
      signOut(auth)
        .then(() => {
          setUser(null);
          console.log("¡Sesión cerrada antes de descargar la página!");
        })
        .catch(error => console.error("Error al cerrar sesión:", error));
    }
  };

  useEffect(() => {
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, [user]);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
  
    if (docuCifrada.exists()) {
      const infoFinal = docuCifrada.data().rol;
      return infoFinal;
    } else {
      return null;
    }
  }

  async function setUserWithFirebaseAndRol(usuarioFirebase) {
    const rol = await getRol(usuarioFirebase.uid);
    if (rol) {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData final", userData);
    } else {
      console.error("No se pudo obtener el rol del usuario.");
    }
  }

  useEffect(() => {
    const handleUserActivity = () => {
      resetTimer();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keypress", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keypress", handleUserActivity);
    };
  }, []);

  useEffect(() => {
    if (showModal && countdown > 0) {
      const delayErrorPage = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000); 

      return () => clearTimeout(delayErrorPage);
    } else if (countdown === 0) {
      setShowErrorPage(true);
    }
  }, [showModal, countdown]);

  return (
    <AuthProvider>
      <>
        {showErrorPage ? (
          <Error500 />
        ) : (
          <>
            {connectionError ? (
              <Modal
                title="Error de conexión"
                visible={showModal}
                footer={null}
                closable={false}
              >
                <h3>Estamos tratando de volver a conectar con el servidor</h3><Spin />
                <p>La página se cerrará en {countdown} segundos.</p>
              </Modal>
            ) : (
              <>
                {user ? <Home user={user} /> : <Auth />}
              </>
            )}
          </>
        )}
      </>
    </AuthProvider>
  );
}

export default App;