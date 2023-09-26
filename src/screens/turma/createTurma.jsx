import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CreateTurma() {
  const [professor, setProfessor] = useState("");
  const [nomeTurma, setNomeTurma] = useState("");
  const [turno, setTurno] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifique se o turno é válido (1, 2 ou 3)
    if (![1, 2, 3].includes(Number(turno))) {
      alert("Turno inválido. Insira 1 para Matutino, 2 para Vespertino, ou 3 para Noturno.");
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Defina o tipo de conteúdo aqui, se necessário
      },
    };
    e.preventDefault();
    console.log("Formulário enviado");
    // Verifique se todos os campos obrigatórios estão preenchidos
    if ( !professor || !nomeTurma || !turno ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Verifique se o ID já foi usad

    try {
      // Se o ID for único, continue com o envio do formulário
      const createResponse = await axios.post(
        "http://localhost:3000/turma/create",
        {
          professor: professor,
          nome_turma: nomeTurma,
          turno: turno,
        },
        config
      );

      console.log(createResponse);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao criar a sala:", error);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container className="appContainer">
      <Container fluid className="topBar d-flex justify-content-start align-items-center">
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="back-icon text-white"
          onClick={handleGoBack}
          size="2x"
        />
      </Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6}>
          <Form
            onSubmit={handleSubmit}
            nomeItem="form"
            className="border p-4 rounded"
          >
            <h1 className="title">Criar Turma</h1>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}
                required
              />
              <Form.Label>Professor</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={nomeTurma}
                onChange={(e) => setNomeTurma(e.target.value)}
                required
              />
              <Form.Label>Nome da Turma</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={turno}
                onChange={(e) => setTurno(e.target.value)}
                required
              />
              <Form.Label>Turno(1 Matutino, 2 Vespertino, 3 Noturno)</Form.Label>
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="custom-button"
              style={{
                width: "100%",
                backgroundColor: "#9e933a",
                borderColor: "#9e933a",
              }}
            >
              Criar Turma
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateTurma;
