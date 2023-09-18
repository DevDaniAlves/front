import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function EditSala() {
  const { id } = useParams(); // Obtém o parâmetro de ID da URL
  const navigate = useNavigate();

  // Constantes e funções de atualização separadas para cada campo
  const [capacidade, setCapacidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [tamanho, setTamanho] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    // Fazendo uma solicitação GET para obter os detalhes da sala com base no ID
    axios
      .get(`http://localhost:3000/sala/getById/${id}`, config)
      .then((response) => {
        const salaData = response.data;
        // Definindo os valores iniciais dos campos após a resposta chegar
        setCapacidade(salaData.capacidade);
        setLocalizacao(salaData.localizacao);
        setResponsavel(salaData.responsavel);
        setTamanho(salaData.tamanho);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes da sala:", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    e.preventDefault();
    console.log("Formulário enviado");

    const salaData = {
      Capacidade: capacidade,
      Localizacao: localizacao,
      Responsavel: responsavel,
      Tamanho: tamanho,
    };

    try {
      // Faça uma solicitação PUT para atualizar os detalhes da sala com base no ID
      const updateResponse = await axios.put(
        `http://localhost:3000/sala/update/${id}`,
        salaData,
        config
      );

      console.log(updateResponse);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao atualizar a sala:", error);
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
          <Form onSubmit={handleSubmit} id="form" className="border p-4 rounded">
            <h1 className="title">Editar Sala</h1>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="number"
                placeholder=" "
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                required
              />
              <Form.Label>Capacidade</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
              />
              <Form.Label>Localização</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                required
              />
              <Form.Label>Responsável</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="number"
                placeholder=" "
                value={tamanho}
                onChange={(e) => setTamanho(e.target.value)}
                required
              />
              <Form.Label>Tamanho</Form.Label>
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
              Atualizar Sala
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditSala;
