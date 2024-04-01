import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebase.config';
import { Button, message } from 'antd';


const TablaUsuarios = ({ usuarios, updateRol, deleteUsuario }) => {
    const handleChangeRol = (userId, newRol) => {
        updateRol(userId, newRol);
    };

    return (
        <tbody>
            {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                    <td>{usuario.correo}</td>
                    <td>{usuario.nombres}</td>
                    <td>{usuario.apellidos}</td>
                    <td>
                        <label>
                            Rol:
                            <select
                                value={usuario.rol}
                                onChange={(e) => handleChangeRol(usuario.id, e.target.value)}>
                                <option value="admin">Administrador</option>
                                <option value="docente">Docente</option> {/* Corregir el valor aquí */}
                                <option value="user">Usuario</option>
                            </select>
                        </label>
                    </td>
                    <td>
                        <Button onClick={() => handleChangeRol(usuario.id, usuario.rol)}>
                            Actualizar
                        </Button>
                        <Button onClick={() => deleteUsuario(usuario.id)} danger>
                            Eliminar
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

const Crudshow = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [mensaje, setMensaje] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const updateRol = async (id, newRol) => {
        try {
            message.loading({ content: 'Actualizando rol...', key: 'loading', duration: 2.5 })
                .then(async () => {
                    const usuarioDoc = doc(db, "usuarios", id);
                    await updateDoc(usuarioDoc, { rol: newRol });
                    await getUsuarios();
                    message.success({ content: 'Rol actualizado correctamente', key: 'success' });
                });
        } catch (error) {
            console.error("Error al actualizar el rol del usuario:", error);
            message.error({ content: 'Error al actualizar el rol del usuario', key: 'error' });
        }
    };
    

    const usuariosCollection = collection(db, "usuarios");

    const getUsuarios = async () => {
        const data = await getDocs(usuariosCollection);
        setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const deleteUsuario = async (id) => {
        const usuarioDoc = doc(db, "usuarios", id);
        await deleteDoc(usuarioDoc);
        await getUsuarios();
    };

    useEffect(() => {
        getUsuarios();
    }, []);

    return (
        <>

            {mensaje && <div className="alert alert-success mt--2">{mensaje}</div>}
            <div className='container mt--4'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to={`/usuarios/crear`} className='btn btn-secondary mt-2 mb-2'>CREAR</Link>
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Correo</th>
                                    <th>Nombres</th>
                                    <th>Apellidos</th>
                                    <th>Rol</th>
                                </tr>
                            </thead>
                            <TablaUsuarios
                                usuarios={usuarios}
                                updateRol={updateRol}
                                deleteUsuario={deleteUsuario}
                            />
                        </table>
                    </div>
                </div>
            </div>
            {contextHolder}
        </>
    );
};

export default Crudshow;
