import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from 'firebase.config';
import { Container } from 'reactstrap';
import { useLocation } from "react-router-dom";


const TablaUsuarios = () => {
    const mainContent = React.useRef(null);
    const location = useLocation();
    const [nbRows, setNbRows] = React.useState(3);
    const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
    const addRow = () => setNbRows((x) => Math.min(100, x + 1));

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 6,
    });

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const usuariosCollection = collection(db, 'usuarios');
                const usuariosSnapshot = await getDocs(usuariosCollection);
                const usuariosData = usuariosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
                setUsuarios(usuariosData);
            } catch (error) {
                console.error('Error obteniendo usuarios:', error);
            }
        };

        fetchUsuarios();
    }, []);

    const columns = [
        { field: 'correo', headerName: 'Correo', width: 150 },
        { field: 'nombres', headerName: 'Nombres', width: 150 },
        { field: 'apellidos', headerName: 'Apellidos', width: 150 },
        { field: 'rol', headerName: 'Rol', width: 130 },
    ];

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        mainContent.current.scrollTop = 0;
      }, [location]);

    return (
        <>
        <div className="main-content" ref={mainContent} >
        <Container fluid className='bg-white'>
            <div className="tabla-container" >
                <h2>Tabla de todos los usuarios</h2>
                <div>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Button size="small" onClick={addRow}>
                            Add a row
                        </Button>
                        <Button size="small" onClick={removeRow}>
                            Remove a row
                        </Button>
                    </Stack>
                    <DataGrid
                        rows={usuarios}
                        columns={[
                            { field: 'correo', headerName: 'Correo', width: 150 },
                            { field: 'nombres', headerName: 'Nombres', width: 150 },
                            { field: 'apellidos', headerName: 'Apellidos', width: 150 },
                            { field: 'rol', headerName: 'Rol', width: 130 },
                        ]}
                        autoHeight
                        checkboxSelection
                        disableRowSelectionOnClick
                        components={{
                            Toolbar: GridToolbar,
                        }}

                        toolbar
                    />
                </div>
            </div>
            </Container>
      </div>
        </>
    );
};

export default TablaUsuarios;
