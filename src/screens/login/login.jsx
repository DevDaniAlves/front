import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./login.css"; // Importe o arquivo CSS

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para autenticar o usuário
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} className="border p-4 rounded">
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={username}
                onChange={handleUsernameChange}
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
