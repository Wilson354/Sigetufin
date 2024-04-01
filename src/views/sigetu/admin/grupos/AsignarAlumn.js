import React, { useState, useEffect } from 'react';
import { Form, Button, Select, message } from 'antd';
import { updateDoc, doc, collection, getDoc, setDoc, getDocs } from 'firebase/firestore';
import { db } from 'firebase.config';

const { Option } = Select;

const AddGroupForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [alumnos, setAlumnos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [grupoId, setGrupoId] = useState(null);
  const [materiasGrupo, setMateriasGrupo] = useState([]);
  const [grupoNombres, setGrupoNombres] = useState({});

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const alumnosSnapshot = await getDocs(collection(db, 'alumnos'));
        const alumnosData = alumnosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAlumnos(alumnosData);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
        message.error('Hubo un error al cargar los alumnos. Por favor, inténtelo de nuevo más tarde.');
      }
    };

    const fetchGrupos = async () => {
      try {
        const gruposSnapshot = await getDocs(collection(db, 'grados', 'ING', 'grupos'));
        const gruposData = gruposSnapshot.docs.map(doc => {
          const grupoData = doc.data();
          setGrupoNombres(prevState => ({
            ...prevState,
            [doc.id]: grupoData.nombre // Almacenar nombre del grupo por ID
          }));
          return {
            id: doc.id,
            ...grupoData
          };
        });
        setGrupos(gruposData);
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
        message.error('Hubo un error al cargar los grupos. Por favor, inténtelo de nuevo más tarde.');
      }
    };

    fetchAlumnos();
    fetchGrupos();
  }, []);

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
          message.error('Hubo un error al cargar las materias del grupo. Por favor, inténtelo de nuevo más tarde.');
        }
      }
    };
  
    fetchMateriasGrupo();
  }, [grupoId]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const { alumnoId, grupoId } = values;
  
      // Verificar si el documento del alumno existe
      const alumnoDoc = await getDoc(doc(db, 'alumnos', alumnoId));
      if (!alumnoDoc.exists()) {
        // Si no existe, crear el documento del alumno con un campo de referencia al documento del alumno
        await setDoc(doc(db, 'alumnos', alumnoId), {
          alumno_ref: alumnoId,
          grupo: doc(db, `grados/ING/grupos/${grupoId}`), // Agregar referencia al grupo seleccionado
        });
      } else {
        // Si existe, actualizar el campo de grupo en el documento del alumno
        await updateDoc(doc(db, 'alumnos', alumnoId), {
          grupo: doc(db, `grados/ING/grupos/${grupoId}`), // Actualizar referencia al grupo seleccionado
        });
      }
  
      // Agregar al alumno al grupo seleccionado en la subcolección "alumnos" dentro del grupo
      await setDoc(doc(db, `grados/ING/grupos/${grupoId}/alumnos`, alumnoId), {
        alumno_ref: doc(db, 'alumnos', alumnoId),
      });
  
      message.success('Alumno asignado al grupo exitosamente.');
      form.resetFields();
    } catch (error) {
      console.error('Error al asignar alumno al grupo:', error);
      message.error('Hubo un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLimpiar = () => {
    form.resetFields();
    setMateriasGrupo([]);
  };
  
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="alumnoId" label="Seleccionar Alumno" rules={[{ required: true, message: 'Por favor, seleccione un alumno.' }]}>
        <Select placeholder="Seleccione un alumno">
          {alumnos.map(alumno => (
            <Option key={alumno.id} value={alumno.id}>{alumno.nombre}</Option>
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

      <Form.Item label="Materias del Grupo">
        <Select mode="multiple" value={materiasGrupo}>
          {materiasGrupo.map(materia => (
            <Option key={materia} value={materia}>{materia}</Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Asignar Alumno al Grupo
        </Button>
        <Button onClick={handleLimpiar} style={{ marginLeft: 8 }}>
          Limpiar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddGroupForm;
