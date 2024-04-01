import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from 'firebase.config';
import { Container } from "reactstrap";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Modal as AntdModal } from 'antd';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const TablaDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [selectedDocentes, setSelectedDocentes] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const mainContent = React.useRef(null);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const docentesCollection = collection(db, 'profesores');
        const docentesSnapshot = await getDocs(docentesCollection);
        const docentesData = await Promise.all(docentesSnapshot.docs.map(async (doc) => {
          const docenteData = doc.data();
          const gruposAsignados = docenteData.grupos_asignados || [];
          const materiasAsignadas = docenteData.materias_asignadas || [];
          return {
            id: doc.id,
            nombres: docenteData.nombre,
            apellidos: docenteData.apellidos,
            genero: docenteData.genero,
            gruposAsignados,
            materiasAsignadas
          };
        }));
        setDocentes(docentesData);
      } catch (error) {
        console.error('Error al obtener docentes:', error);
      }
    };
    fetchDocentes();
  }, []);

  const deleteSelectedDocentes = async () => {
    try {
      const deletePromises = selectedDocentes.map(async (docenteId) => {
        await deleteDoc(doc(db, 'profesores', docenteId));
      });
      await Promise.all(deletePromises);
      setDocentes(docentes.filter((docente) => !selectedDocentes.includes(docente.id)));
      setSelectedDocentes([]);
      setConfirmModalVisible(false);
    } catch (error) {
      console.error('Error eliminando Docentes: ', error);
    }
  };

  const showConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const handleEliminarClick = async () => {
    deleteSelectedDocentes();
  };

  const handleCheckboxChange = (e, docenteId) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedDocentes([...selectedDocentes, docenteId]);
    } else {
      setSelectedDocentes(selectedDocentes.filter(id => id !== docenteId));
    }
  };

  return (
    <>
      <div className="main-content" ref={mainContent}>
        <Container fluid className='bg-white'>
          <h2>Tabla de Docentes</h2>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Button
              size="small"
              onClick={showConfirmModal}
              disabled={selectedDocentes.length === 0}
              variant="contained"
              color="error"
              style={{ fontWeight: 'bold' }}
            >
              Eliminar seleccionados
            </Button>
            <Link to="/crear-docente">
              <Button
                size="small"
                variant="contained"
                color="primary"
              >
                Registrar Docente
              </Button>
            </Link>
          </Stack>
          <DataGrid
            rows={docentes}
            columns={[
              {
                field: 'checkbox',
                headerName: '',
                width: 50,
                renderCell: (params) => (
                  <Checkbox
                    onChange={(e) => handleCheckboxChange(e, params.row.id)}
                    checked={selectedDocentes.includes(params.row.id)}
                  />
                )
              },
              { field: 'id', headerName: 'ID', width: 150 },
              { field: 'nombres', headerName: 'Nombres', width: 150 },
              { field: 'apellidos', headerName: 'Apellidos', width: 150 },
              { field: 'genero', headerName: 'Género', width: 130 },
              { field: 'telefono', headerName: 'Teléfono', width: 130 },
              {
                field: 'gruposAsignados',
                headerName: 'Grupos Asignados',
                width: 180,
                renderCell: (params) => (
                  <div>
                    {params.row.gruposAsignados.join(", ")}
                  </div>
                )
              },
              {
                field: 'materiasAsignadas',
                headerName: 'Materias Asignadas',
                width: 200,
                renderCell: (params) => (
                  <div>
                    {params.row.materiasAsignadas.join(", ")}
                  </div>
                )
              },
              {
                field: 'editar',
                headerName: 'Editar',
                width: 100,
                renderCell: (params) => (
                  <Link to={`/editar-docente/${params.row.id}`}>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      startIcon={<EditIcon />}
                      style={{ fontWeight: 'bold' }}
                    >
                      Editar
                    </Button>
                  </Link>
                ),
              },
            ]}
            autoHeight
            components={{
              Toolbar: GridToolbar,
            }}
            disableSelectionOnClick
            pagination={false}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{`Docentes seleccionados: ${selectedDocentes.length}`}</div>
          </div>
        </Container>
      </div>
      <AntdModal
        title="Confirmar Eliminación"
        visible={confirmModalVisible}
        onCancel={() => setConfirmModalVisible(false)}
        onOk={handleEliminarClick}
        style={{ zIndex: 9999 }}
      >
        <p>¿Está seguro de que desea eliminar los docentes seleccionados?</p>
      </AntdModal>
    </>
  );
};

export default TablaDocentes;
