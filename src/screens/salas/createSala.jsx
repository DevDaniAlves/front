import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CreateSala() {
  const [Id, setId] = useState("");
  const [Capacidade, setCapacidade] = useState("");
  const [Localizacao, setLocalizacao] = useState("");
  const [Responsavel, setResponsavel] = useState("");
  const [Tamanho, setTamanho] = useState("");
  const [mat_disp, setMat_disp] = useState(true);
  const [vesp_disp, setVesp_disp] = useState(true);
  const [not_disp, setNot_disp] = useState(true);
  const [isIdUsed, setIsIdUsed] = useState(false); // Estado para armazenar se o ID já foi utilizado
  const [isCheckingId, setIsCheckingId] = useState(false); // Estado para indicar se a verificação está em andamento
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleCapacidadeChange = (e) => {
    setCapacidade(e.target.value);
  };

  const checkIdAvailability = async () => {
    setIsCheckingId(true); // Indica que a verificação está em andamento
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json', // Defina o tipo de conteúdo aqui, se necessário
      },
    };
    try {
      const response = await axios.get("https://api-emb3.onrender.com/sala/getAll", config);
      const salas = response.data;

      // Verifique se o ID já existe
      const idExists = salas.some((sala) => sala.Id === Id);

      if (idExists) {
        alert("O ID já está em uso. Escolha outro ID único.");
        setIsIdUsed(true); // Define o estado como verdadeiro se o ID já existir
      } else {
        setIsIdUsed(false); // Define o estado como falso se o ID for único
      }

      setIsCheckingId(false); // Indica que a verificação foi concluída
    } catch (error) {
      console.error("Erro ao verificar o ID:", error);
      setIsCheckingId(false); // Em caso de erro, indica que a verificação foi concluída
    }
  };

  const handleSubmit = async (e) => {
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
    if ( !Capacidade || !Localizacao || !Responsavel || !Tamanho) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Verifique se o ID já foi usado
    if (isIdUsed) {
      alert("O ID já está em uso. Escolha outro ID único.");
      return;
    }

    try {
      // Se o ID for único, continue com o envio do formulário
      const createResponse = await axios.post(
        "https://api-emb3.onrender.com/sala/create",
        {
          capacidade: Capacidade,
          localizacao: Localizacao,
          tamanho: Tamanho,
          mat_disp: mat_disp,
          vesp_disp: vesp_disp,
          not_disp: not_disp,
          responsavel: Responsavel,
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
            id="form"
            className="border p-4 rounded"
          >
            <h1 className="title">Criar Sala</h1>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="number"
                placeholder=" "
                value={Capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                required
              />
              <Form.Label>Capacidade</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="number"
                placeholder=" "
                value={Tamanho}
                onChange={(e) => setTamanho(e.target.value)}
                required
              />
              <Form.Label>Tamanho</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={Localizacao}
                onChange={(e) => setLocalizacao(e.target.value)}
                required
              />
              <Form.Label>Localização</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={Responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                required
              />
              <Form.Label>Responsável</Form.Label>
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
              Criar Sala
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateSala;
