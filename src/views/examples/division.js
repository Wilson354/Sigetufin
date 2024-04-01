import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Corregido aquí
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Importar doc desde 'firebase/firestore'
import { db } from 'firebase.config';

const Showd = () => {
    // configurar hooks (ganchos)
    const [divisiones, setDivisiones] = useState([]);

    // referenciar a bd
    const divisionesCollection = collection(db, "divisiones");

    // mostrar docs
    const getDivisiones = async () => {
        const data = await getDocs(divisionesCollection);
        setDivisiones(
            data.docs.map((doc) => ({...doc.data(), id: doc.id}))
        );
    };


    // useEffect
    useEffect(() => {
        getDivisiones();
    }, []);

    // devolver la vista al componente

    return (
        <>
            <div className='container mt--4'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>CREAR</Link>
                        </div>

                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {divisiones.map((division) => (
                                    <tr key={division.id}>
                                        <td>{division.codigo}</td>
                                        <td>{division.nombre}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Showd;
