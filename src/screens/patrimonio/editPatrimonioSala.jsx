import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function EditPatrimonioSala() {
  const { id } = useParams(); // Obtém o parâmetro de ID da URL
  const navigate = useNavigate();

  // Constantes e funções de atualização separadas para cada campo
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fazendo uma solicitação GET para obter os detalhes do patrimônio da sala com base no ID
    axios
      .get(`http://localhost:3000/patrimonio_sala/getById/${id}`, config)
      .then((response) => {
        const patrimonioSalaData = response.data;
        // Definindo os valores iniciais dos campos
        setQuantidade(patrimonioSalaData.quantidade);

      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do patrimônio da sala:", error);
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

    const patrimonioSalaData = {
      quantidade: quantidade,
      // Outros campos não são editáveis, então você não precisa incluí-los aqui
    };

    try {
      // Faça uma solicitação PUT para atualizar a quantidade do patrimônio da sala com base no ID
      const updateResponse = await axios.put(
        `http://localhost:3000/patrimonio_sala/update/${id}`,
        patrimonioSalaData,
        config
      );

      console.log(updateResponse);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao atualizar o patrimônio da sala:", error);
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
            <h1 className="title">Editar Patrimônio da Sala</h1>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="number"
                placeholder=" "
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
              <Form.Label>Quantidade</Form.Label>
            </Form.Group>
            {/* Exibir informações não editáveis */}
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
              Atualizar Quantidade
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditPatrimonioSala;
