import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importe useNavigate para realizar o redirecionamento

function Login() {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Inicialize o useNavigate

  const handlenameChange = (e) => {
    setname(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      axios.post('http://localhost:3000/user/sigin',
      {
        name,
        password
      }) // Substitua pela URL da sua API
      .then(response => {
       const token =  (response.data.accessToken); // Define o estado com os dados da resposta
        console.log(token)
        localStorage.setItem("token", token);
        navigate("/home")
      })
      .catch(error => {
        console.error('Erro ao buscar as salas:', error);
      
      });

      
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <Container className="appContainer">
      <Container fluid className="topBar"></Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} id="form" className="border p-4 rounded">
            <h1 className="title">Faça Login</h1>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={name}
                onChange={handlenameChange}
                required
              />
              <Form.Label>Usuário</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="password"
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <Form.Label>Senha</Form.Label>
            </Form.Group>
            <Button variant="primary" type="submit" className="custom-button">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
