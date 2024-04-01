import React, { useState } from 'react';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Card,
    message // Importa el componente de mensaje de Ant Design
} from 'antd';
import { CardHeader, Container } from 'reactstrap';
import firebaseApp from 'firebase.config';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

function CrudUsers() {
    const [form] = Form.useForm();
    const firestore = getFirestore(firebaseApp);
    const [rol, setRol] = useState("admin");
    const [passwordLength, setPasswordLength] = useState(8);
    const [generatedPassword, setGeneratedPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const limpiarFormulario = () => {
        form.resetFields(); // Limpia todos los campos del formulario
    };

    async function registrarUsuario(values) {
        try {
            setLoading(true); // Establecer el estado de carga a verdadero
            const infoUsuario = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            // Guardar información básica del usuario en la colección "usuarios"
            const userDataUsuarios = {
                correo: values.email,
                rol: values.select,
                nombres: values.nombres,
                apellidos: values.apellidos,
            };
            const docuRefUsuarios = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
            await setDoc(docuRefUsuarios, userDataUsuarios);

            // Guardar información adicional según el rol en la colección correspondiente
            let userDataAdicional = {
                nombres: values.nombres,
                apellidos: values.apellidos,
                genero: values.genero,
            };
            let collectionPath = "";
            switch (values.select) {
                case "alumno":
                    collectionPath = "alumnos";
                    break;
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
                const docuRefAdicional = doc(firestore, `${collectionPath}/${infoUsuario.user.uid}`);
                await setDoc(docuRefAdicional, userDataAdicional);
                console.log(`Información adicional para ${values.select} guardada correctamente.`);
            } else {
                console.log("No se encontró una colección válida para guardar la información adicional.");
            }
            message.success("¡Usuario registrado exitosamente!"); // Mostrar mensaje de éxito
        } catch (error) {
            message.error("Error al registrar usuario: " + error.message);
        } finally {
            setLoading(false); // Establecer el estado de carga a falso, independientemente del resultado
        }
    }

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        registrarUsuario(values); // Llama a registrarUsuario con los valores del formulario
    };


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

            <Container className="main-content" fluid>
                <Card>
                    <CardHeader>
                        {successMessage && <div style={{ textAlign: 'center', marginTop: '40px', color: 'green' }}>{successMessage}</div>} {/* Muestra el mensaje de éxito si existe */}
                    </CardHeader>
                    <Row>
                        <Col className="order-xl-1" xl="9">
                            <Form
                                onSubmit={onFinish}
                                {...formItemLayout}
                                form={form}
                                name="register"
                                onFinish={onFinish}
                                initialValues={{
                                    residence: ['zhejiang', 'hangzhou', 'xihu'],
                                    prefix: '52',
                                }}
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
                                    name="select"
                                    label="Rol"
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Selecciona un rol!',
                                        },
                                    ]}
                                >
                                    <Select value={rol} onChange={(value) => setRol(value)} placeholder="Selecciona un rol">
                                        <Option value="admin">Administrador</Option>
                                        <Option value="docente">Docente</Option>
                                        <Option value="alumno">Alumno</Option>
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
                                            message: 'Ingresa tu nombre o ambos!',
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
                                    tooltip="Empezando por el paterno"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Ingresa tus apellidos empezando por el paterno!',
                                            whitespace: true,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="genero"
                                    label="Genero"
                                    id='genero'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Selecciona un genero!',
                                        },
                                    ]}
                                >
                                    <Select placeholder="Selecciona tu genero">
                                        <Option value="masculino">Masculino</Option>
                                        <Option value="femenino">Femenino</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit" value="Registrar">
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

        </div>
    );
}

export default CrudUsers;