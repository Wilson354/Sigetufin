import React, { useState, useEffect } from 'react';
import { Form, Select, Button, notification } from 'antd';
import { setDoc, doc, collection, onSnapshot, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from 'firebase.config';

const { Option } = Select;

const AsignarG = () => {
  const [grados, setGrados] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [gradoId, setGradoId] = useState(null);
  const [form] = Form.useForm();
  const [grupoId, setGrupoId] = useState(null);
  const [materiasGrupo, setMateriasGrupo] = useState([]);
  const [grupoNombres, setGrupoNombres] = useState({});

  useEffect(() => {
    let unsubscribeGrados;

    const cargarGrados = async () => {
      const gradosCollection = collection(db, 'grados');
      unsubscribeGrados = onSnapshot(gradosCollection, snapshot => {
        const listaGrados = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGrados(listaGrados);
      });
    };

    cargarGrados();

    return () => {
      if (unsubscribeGrados) {
        unsubscribeGrados();
      }
    };
  }, []);

  useEffect(() => {
    let unsubscribeProfesores;

    const cargarProfesores = async () => {
      const profesoresCollection = collection(db, 'profesores');
      unsubscribeProfesores = onSnapshot(profesoresCollection, snapshot => {
        const listaProfesores = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfesores(listaProfesores);
      });
    };

    cargarProfesores();

    return () => {
      if (unsubscribeProfesores) {
        unsubscribeProfesores();
      }
    };
  }, []);

  useEffect(() => {
    let unsubscribeMaterias;

    const cargarMaterias = async () => {
      const materiasCollection = collection(db, 'materias');
      unsubscribeMaterias = onSnapshot(materiasCollection, snapshot => {
        const listaMaterias = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMaterias(listaMaterias);
      });
    };

    cargarMaterias();

    return () => {
      if (unsubscribeMaterias) {
        unsubscribeMaterias();
      }
    };
  }, []);

  useEffect(() => {
    let unsubscribeGrupos;

    const cargarGrupos = async (gradoId) => {
      if (gradoId) {
        const gruposCollection = collection(db, `grados/${gradoId}/grupos`);
        unsubscribeGrupos = onSnapshot(gruposCollection, snapshot => {
          const listaGrupos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setGrupos(listaGrupos);
        });
      } else {
        setGrupos([]);
      }
    };

    cargarGrupos(gradoId);

    return () => {
      if (unsubscribeGrupos) {
        unsubscribeGrupos();
      }
    };
  }, [gradoId]);

  useEffect(() => {
    const fetchMateriasGrupo = async () => {
      if (grupoId) {
        try {
          const grupoDoc = await getDoc(doc(db, 'grados','ING', 'grupos',grupoId));
          if (grupoDoc.exists()) {
            const { materias_pred } = grupoDoc.data();
  
            // Array para almacenar los nombres de las materias
            const materiasNombres = [];
  
            // Recorre las referencias de materias y obtén los nombres de las materias
            for (const materiaRef of materias_pred) {
              const materiaDoc = await getDoc(materiaRef);
              if (materiaDoc.exists()) {
                const { nombre } = materiaDoc.data();
                materiasNombres.push(nombre);
              }
            }
  
            // Actualiza el estado con los nombres de las materias
            setMateriasGrupo(materiasNombres);
          } else {
            setMateriasGrupo([]);
          }
        } catch (error) {
          console.error('Error al obtener las materias del grupo:', error);
          notification.error('Hubo un error al cargar las materias del grupo. Por favor, inténtelo de nuevo más tarde.');
        }
      }
    };
  
    fetchMateriasGrupo();
  }, [grupoId]);
  

  const onFinish = async (values) => {
    try {
      const { profesorId, materiaNombre, grupoId } = values;
  
      // Obtener los datos del profesor seleccionado
      const profesorSeleccionado = profesores.find(profesor => profesor.id === profesorId);
  
      if (!profesorSeleccionado) {
        throw new Error('El profesor seleccionado no se encontró en la lista de profesores.');
      }
  
      // Crear referencia al documento del profesor en la colección de profesores
      const profesorDocRef = doc(db, 'profesores', profesorId);
      const profesorDocSnap = await getDoc(profesorDocRef);
  
      if (!profesorDocSnap.exists()) {
        // Si el documento del profesor no existe, crearlo con los campos requeridos
        await setDoc(profesorDocRef, {
          nombre: profesorSeleccionado.nombre,
          apellidos: profesorSeleccionado.apellidos,
          grupos_asignados: [grupoId],
          materias_asignadas: [materiaNombre],
        });
      } else {
        // Si el documento del profesor ya existe, actualizar los campos grupos_asignados y materias_asignadas
        await updateDoc(profesorDocRef, {
          grupos_asignados: arrayUnion(grupoId),
          materias_asignadas: arrayUnion(materiaNombre),
        });
      }
  
      // Crear referencia al documento del grupo en la colección de grados
      const grupoDocRef = doc(db, `grados/${gradoId}/grupos/${grupoId}/profesores`, profesorId);
      const grupoDocSnap = await getDoc(grupoDocRef);
  
      if (!grupoDocSnap.exists()) {
        // Si el documento del grupo no existe, crearlo con los campos requeridos
        await setDoc(grupoDocRef, {
          materia_asignada: materiaNombre,
          nombre_profesor: profesorSeleccionado.nombre,
          apellidos_profesor: profesorSeleccionado.apellidos,
        });
      }
  

    // Notificación de éxito utilizando notification.success
    notification.success({
      message: 'Grupo asignado exitosamente',
      description: 'El grupo ha sido asignado correctamente.',
    });
  } catch (error) {
    // Tu código de manejo de error existente aquí...


    // Notificación de error utilizando notification.error
    notification.error({
      message: 'Error al asignar grupo',
      description: 'Hubo un error al asignar el grupo. Por favor, inténtalo de nuevo.',
    });
    }
  };

  // Función para limpiar el formulario
const handleReset = () => {
    form.resetFields();
  };

  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <Form.Item name="gradoId" label="Seleccionar Grado" rules={[{ required: true, message: 'Por favor selecciona un grado.' }]}>
        <Select onChange={(value) => setGradoId(value)}>
          {grados.map(grado => (
            <Option key={grado.id} value={grado.id}>{grado.nombre}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="grupoId" label="Seleccionar Grupo" rules={[{ required: true, message: 'Por favor, seleccione un grupo.' }]}>
        <Select placeholder="Seleccione un grupo" onChange={value =>
          setGrupoId(value)}>
          {grupos.map(grupo => (
            <Option key={grupo.id} value={grupo.id}>{grupoNombres[grupo.id]}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="profesorId" label="Seleccionar Profesor" rules={[{ required: true, message: 'Por favor selecciona un profesor.' }]}>
        <Select>
          {profesores.map(profesor => (
            <Option key={profesor.id} value={profesor.id}>{`${profesor.nombre} ${profesor.apellidos}`}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="materiaNombre" label="Materias del Grupo" rules={[{ required: true, message: 'Por favor selecciona una materia.' }]}>
  <Select onChange={value => form.setFieldsValue({ materiaNombre: value })}>
    {materiasGrupo.map(materia => (
      <Option key={materia} value={materia}>{materia}</Option>
    ))}
  </Select>
</Form.Item>
      <Form.Item>
      <Button type="primary" htmlType="submit">Asignar Grupo</Button>
      <Button onClick={handleReset}>Limpiar Formulario</Button>
    </Form.Item>
    </Form>
  );
};

export default AsignarG;
