import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { collection, getDocs, query, getDoc, doc } from 'firebase/firestore';
import { db } from 'firebase.config';
import { Container } from 'reactstrap';

const Grupos = () => {
    const mainContent = React.useRef(null);
    const [selectedGrupo, setSelectedGrupo] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [selectedOption, setSelectedOption] = useState('alumnos');
    const [profesorAsignado, setProfesorAsignado] = useState('');

    useEffect(() => {
        fetchAlumnos(selectedGrupo);
        fetchProfesores(selectedGrupo);
        fetchProfesorAsignado(selectedGrupo);
    }, [selectedGrupo]);

    const fetchAlumnos = async (grupo) => {
        try {
            if (grupo) {
                const alumnosQuery = query(collection(db, `grados/ING/grupos/${grupo}/alumnos`));
                const alumnosSnapshot = await getDocs(alumnosQuery);
                const alumnosData = [];
    
                await Promise.all(alumnosSnapshot.docs.map(async (doc) => {
                    const alumnoData = doc.data();
                    const alumnoRef = alumnoData.alumn_ref; // Obtener la referencia del alumno
                    if (alumnoRef) {
                        const alumnoDoc = await getDoc(alumnoRef);
                        if (alumnoDoc.exists()) {
                            const datosAlumno = alumnoDoc.data();
                            alumnosData.push({
                                id: doc.id,
                                nombres: datosAlumno.nombres,
                                apellidos: datosAlumno.apellidos,
                                matricula: datosAlumno.matricula
                            });
                        } else {
                            console.error('El documento del alumno referenciado no existe');
                        }
                    } else {
                        console.error('No se encontró referencia al alumno en el documento');
                    }
                }));
    
                setAlumnos(alumnosData);
            } else {
                setAlumnos([]);
            }
        } catch (error) {
            console.error('Error obteniendo alumnos:', error);
        }
    };

    const fetchProfesores = async (grupo) => {
        try {
            if (grupo) {
                const profesoresQuery = query(collection(db, `grados/ING/grupos/${grupo}/profesores/`));
                const profesoresSnapshot = await getDocs(profesoresQuery);
                const profesoresData = [];
    
                profesoresSnapshot.forEach(doc => {
                    const profesorData = doc.data();
                    const nombreProfesor = profesorData.nombre_profesor; // Acceder al campo 'nombre_profesor'
                    const apellidosProfesor = profesorData.apellidos_profesor; // Acceder al campo 'apellidos_profesor'
                    const materiaAsignada = profesorData.materia_asignada; // Acceder al campo 'materia_asignada'
                    profesoresData.push({
                        id: doc.id,
                        nombreProfesor: `${nombreProfesor} ${apellidosProfesor}`, // Concatenar nombre y apellidos
                        materia: materiaAsignada
                    });
                });
    
                setProfesores(profesoresData);
            } else {
                setProfesores([]);
            }
        } catch (error) {
            console.error('Error obteniendo profesores:', error);
        }
    };
    
    const fetchProfesorAsignado = async (grupo) => {
        try {
            if (grupo) {
                const grupoDoc = doc(db, 'grados', 'ING', 'grupos', grupo);
                const grupoDocSnapshot = await getDoc(grupoDoc);
                const grupoData = grupoDocSnapshot.data();
                if (grupoData && grupoData.profesor_asignado) {
                    const profesorRef = grupoData.profesor_asignado;
                    const profesorDocSnapshot = await getDoc(profesorRef);
                    if (profesorDocSnapshot.exists()) {
                        const profesorData = profesorDocSnapshot.data();
                        // Actualizar el estado profesorAsignado con el nombre del profesor
                        setProfesorAsignado(profesorData.nombre);
                    } else {
                        console.error('El documento del profesor asignado no existe');
                    }
                } else {
                    console.error('No se ha asignado un profesor para este grupo');
                }
            } else {
                console.error('El grupo no está seleccionado');
            }
        } catch (error) {
            console.error('Error obteniendo profesor asignado:', error);
        }
    };

    const handleGrupoChange = (event) => {
        setSelectedGrupo(event.target.value);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const columnsAlumnos = [
        { field: 'id', headerName: 'Matricula', width: 150 },
        { field: 'apellidos', headerName: 'Apellidos', width: 150 },
        { field: 'nombres', headerName: 'Nombres', width: 150 },
        // Agrega más columnas según tus necesidades
    ];

    const columnsProfesores = [
        { field: 'id', headerName: 'ID del Profesor', width: 200 },
        { field: 'nombreProfesor', headerName: 'Nombre del Profesor', width: 200 },
        { field: 'materia', headerName: 'Materia', width: 200 },
    ];

    return (
        <div className="main-content" ref={mainContent}>
            <Container fluid className='bg-white'>
                <div className="tabla-container">
                    <h2>Tabla de grupos</h2>
                    <div>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <select value={selectedGrupo} onChange={handleGrupoChange}>
                                <option value="">Seleccionar Grupo</option>
                                <option value="1TSM2">1TSM2</option>
                                <option value="7IDS1">7IDS1</option>
                                <option value="8IDS1">8IDS1</option>
                                <option value="9IDS1">9IDS1</option>
                                <option value="10IDS1">10IDS1</option>
                            </select>
                            <select value={selectedOption} onChange={handleOptionChange}>
                                <option value="alumnos">Alumnos</option>
                                <option value="profesores">Profesores</option>
                            </select>

                        </Stack>
                        {selectedOption === 'alumnos' ? (
                            <DataGrid
                                rows={alumnos}
                                columns={columnsAlumnos}
                                autoHeight
                                disableRowSelectionOnClick
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                toolbar
                            />
                        ) : (
                            <DataGrid
                                rows={profesores}
                                columns={columnsProfesores}
                                autoHeight
                                disableSelectionOnClick
                                components={{
                                    Toolbar: GridToolbar,
                                }}
                                toolbar
                            />
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Grupos;