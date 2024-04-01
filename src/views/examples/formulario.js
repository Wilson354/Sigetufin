import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";

import { useAuth } from "context/AuthContext";

function FormsFirebase () {
    const auth = useAuth();
    const {displayName} = auth.user
    console.log(displayName)

    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = () => {
        auth.register(emailRegister, passwordRegister);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        auth.login(email, password)
    }

    const handleGoogle = (e) => {
        e.preventDefault();
        auth.loginWithGoogle()
    }

    const handleLogout = () => {
        auth.logout();
    }


    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-danger shadow border-0">
                    <CardHeader className="bg-transparent pb-1">
                        <div className="text-muted text-center mt-2 mb-3">
                            <h1>registro</h1>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <Form className="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        onChange={(e) => setEmailRegister(e.target.value)}
                                        className="input"
                                        placeholder="Email"
                                        type="email"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        onChange={(e) => setPasswordRegister(e.target.value)}
                                        className="input"
                                        placeholder="Password"
                                        type="password"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                                <button
                                    onClick={handleRegister}
                                    className="button"
                                >
                                    submit
                                </button>
                            </div>
                            <Col xs="8">
                                <a
                                    className="text-light"
                                    href="sigetu/estudiantes/HomeEstudiante"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <small>Olvidaste tu contraseña?</small>
                                </a>
                            </Col>
                        </Form>
                    </CardBody>
                </Card>
            </Col>

            <Col lg="5" md="7">
                <Card className="bg-warning shadow border-0">
                    <CardHeader className="bg-transparent pb-1">
                        <div className="text-muted text-center mt-2 mb-3">
                            <h1>Login</h1>
                        </div>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-5">
                        <Form role="form">
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="input"
                                        placeholder="Email"
                                        type="email"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input"
                                        placeholder="Password"
                                        type="password"
                                    />
                                </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                                <button 
                                onClick={(e)=> handleLogin(e)}
                                className="button">submit</button>
                            </div>
                            <div className="text-center">
                                <button 
                                onClick={(e)=> handleGoogle(e)}
                                className="button">Google</button>
                            </div>
                            <Col xs="8">
                                <a
                                    className="text-light"
                                    href="sigetu/estudiantes/HomeEstudiante"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <small>Olvidaste tu contraseña?</small>
                                </a>
                                <div className="text-center">
                                <button 
                                onClick={(e)=> handleLogout(e)}
                                className="button">logout</button>
                            </div>
                            </Col>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default FormsFirebase;
