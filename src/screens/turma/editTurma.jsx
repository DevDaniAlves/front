import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function EditTurma() {
  const [professor, setProfessor] = useState("");
  const [nomeTurma, setNomeTurma] = useState("");
  const [turno, setTurno] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o 'id' dos parâmetros da URL

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fazendo a solicitação GET para obter os dados da turma pelo ID
    axios
      .get(`http://localhost:3000/turma/getById/${id}`, config)
      .then((response) => {
        const turmaData = response.data; // Dados da turma obtidos da API
        setProfessor(turmaData.professor);
        setNomeTurma(turmaData.nome_turma);
        setTurno(turmaData.turno);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados da turma:", error);
      });
  }, [id]); // Certifique-se de incluir 'id' na lista de dependências para recarregar os dados quando o ID for alterado.

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Restante do código permanece inalterado
    // ...
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
            <h1 className="title">Editar Turma</h1>
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
              <Form.Label>Turno (1 Matutino, 2 Vespertino, 3 Noturno)</Form.Label>
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
              Salvar Edição
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditTurma;
