import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Row, Select, Card, message } from 'antd';
import { CardHeader, Container } from 'reactstrap';
import firebaseApp from "../../../../firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

function RegAdmin() {
    const [form] = Form.useForm();
    const firestore = getFirestore(firebaseApp);
    const [rol, setRol] = useState("admin");
    const [passwordLength, setPasswordLength] = useState(8);
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [matricula, setMatricula] = useState("");
    

    useEffect(() => {
        async function obtenerUltimaMatricula() {
            const docSnap = await getDoc(doc(firestore, 'contadores', 'matricula'));
            if (docSnap.exists()) {
                const ultimoNumero = docSnap.data().ultimoNumero;
                let nuevaMatricula;
                if (rol === 'admin') {
                    nuevaMatricula = `adm${ultimoNumero + 1}`.padStart(8, '0');
                } else if (rol === 'docente') {
                    nuevaMatricula = `doce${ultimoNumero + 1}`.padStart(8, '0');
                }
                setMatricula(nuevaMatricula);

                // Guardar el nuevo número incrementado en Firestore
                await setDoc(doc(firestore, 'contadores', 'matricula'), { ultimoNumero: ultimoNumero + 1 });
            } else {
                // Si no existe el contador, comenzar desde 1
                setMatricula("adm00000001");

                // Guardar el primer número en Firestore
                await setDoc(doc(firestore, 'contadores', 'matricula'), { ultimoNumero: 1 });
            }
        }

        // Llama a la función obtenerUltimaMatricula al montar el componente
        obtenerUltimaMatricula();
    }, [firestore, rol]);

    // Dentro de la función onFinish
    const onFinish = async (values) => {
        try {
            if (!matricula) {
                throw new Error("La matrícula es requerida.");
            }

            console.log('Received values of form: ', values);
            await registrarUsuario(values);
        } catch (error) {
            message.error("Error al registrar usuario: " + error.message);
        }
    };

    const limpiarFormulario = () => {
        form.resetFields();
    };

    async function registrarUsuario(values) {
        try {
            setLoading(true);
            const { email, password } = values;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const { user } = userCredential;


            const matriculaExistente = await verificarMatriculaExistente(matricula);
            if (matriculaExistente) {
                message.error("La matrícula ingresada ya está en uso. Por favor, elige otra.");
                return;
            }

            const idDocumento = matricula;

            const userDataUsuarios = {
                correo: values.email,
                rol: values.select,
                nombres: values.nombres,
                apellidos: values.apellidos,
                matricula: matricula,
            };
            const docuRefUsuarios = doc(firestore, `usuarios/${idDocumento}`);
            await setDoc(docuRefUsuarios, userDataUsuarios);

            let userDataAdicional = {
                nombres: values.nombres,
                apellidos: values.apellidos,
                genero: values.genero,
            };
            let collectionPath = "";
            switch (values.select) {
                case "docente":
                    collectionPath = "profesores";
                    break;
                case "admin":
                    collectionPath = "administradores";
                    break;
                default:
                    break;
            }
            if (collectionPath !== "") {
                const docuRefAdicional = doc(firestore, `${collectionPath}/${idDocumento}`);
                await setDoc(docuRefAdicional, userDataAdicional);
                console.log(`Información adicional para ${values.select} guardada correctamente.`);
            } else {
                console.log("No se encontró una colección válida para guardar la información adicional.");
            }

            // Incrementar el contador de matrículas
            const contadorRef = doc(firestore, 'contadores', 'matricula');
            const docSnap = await getDoc(contadorRef);
            const ultimoNumero = docSnap.data().ultimoNumero;
            const nuevoNumero = ultimoNumero + 1;
            await setDoc(contadorRef, { ultimoNumero: nuevoNumero });

            message.success("¡Usuario registrado exitosamente!");
        } catch (error) {
            message.error("Error al registrar usuario: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    async function verificarMatriculaExistente(matricula) {
        const docSnap = await getDoc(doc(firestore, `usuarios/${matricula}`));
        return docSnap.exists();
    }

    function generateRandomPassword(length) {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    const handleGeneratePassword = () => {
        const newPassword = generateRandomPassword(passwordLength);
        setGeneratedPassword(newPassword);
    };

    const handlePasswordLengthChange = (event) => {
        setPasswordLength(parseInt(event.target.value));
    };

    return (
        <div>
            {matricula && (
                <Container className="main-content" fluid>
                    <Card>
                        <CardHeader>
                            {successMessage && <div style={{ textAlign: 'center', marginTop: '40px', color: 'green' }}>{successMessage}</div>}
                        </CardHeader>
                        <Row>
                            <Col className="order-xl-1" xl="9">
                                <Form
                                    onSubmit={onFinish}
                                    {...formItemLayout}
                                    form={form}
                                    name="register"
                                    onFinish={onFinish}
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    scrollToFirstError
                                >
                                    <Form.Item
                                        name="email"
                                        type="email"
                                        id="email"
                                        label="Correo"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        type="password"
                                        id="password"
                                        label="Contraseña"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Form.Item
                                        label="Rol"
                                        name="select"  // Nombre del campo para recopilar el valor del rol
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor, selecciona un rol!',
                                            },
                                        ]}
                                    >
                                        <Select defaultValue="" onChange={(value) => setRol(value)}>
                                            <Select.Option value="admin">Administrador</Select.Option>
                                            <Select.Option value="docente">Docente</Select.Option>
                                            {/* Agrega más opciones de rol según sea necesario */}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="nombres"
                                        label="Nombres"
                                        id="nombres"
                                        tooltip="Nombre completo"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor, ingresa tu nombre completo!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="apellidos"
                                        label="Apellidos"
                                        id="apellidos"
                                        tooltip="Apellidos completos"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor, ingresa tus apellidos completos!',
                                                whitespace: true,
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="genero"
                                        label="Género"
                                        id='genero'
                                        rules={[
                                            {
                                                required: true,
                                                message: '¡Selecciona un género!',
                                            },
                                        ]}
                                    >
                                        <Select placeholder="Selecciona tu género">
                                            <Option value="masculino">Masculino</Option>
                                            <Option value="femenino">Femenino</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="matricula"
                                        label="Matrícula"
                                        id="matricula"
                                        tooltip="Matrícula del usuario"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'La matrícula es requerida!',
                                                whitespace: true,
                                            },
                                        ]}
                                        initialValue={matricula} // Establece el valor inicial del campo de matrícula
                                    >
                                        <Input readOnly />
                                    </Form.Item>

                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Registrar
                                        </Button>
                                        <Button onClick={limpiarFormulario} style={{ marginLeft: 8 }}>
                                            Limpiar
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                            <Col className="order-xl-2" xl="3">
                                <div>
                                    <h2>Generador de Contraseñas Aleatorias</h2>
                                    <div>
                                        <label>Longitud de la contraseña: </label>
                                        <input
                                            type="number"
                                            value={passwordLength}
                                            onChange={handlePasswordLengthChange}
                                        />
                                    </div>
                                    <div>
                                        <button onClick={handleGeneratePassword}>Generar Contraseña</button>
                                    </div>
                                    {generatedPassword && (
                                        <div>
                                            <h3>Contraseña generada:</h3>
                                            <p>{generatedPassword}</p>
                                        </div>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            )}
        </div>
    );
}

export default RegAdmin;
