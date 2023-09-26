import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function EditItem() {
  const [nomeItem, setNomeItem] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Faz uma solicitação GET para obter os detalhes do item pelo ID
        const response = await axios.get(
          `http://54.233.233.32:3000/item/getById/${id}`,
          config
        );

        // Define o nome do item no estado para preencher o campo de texto
        setNomeItem(response.data.nome_item);
      } catch (error) {
        console.error("Erro ao buscar o item:", error);
      }
    };

    fetchItem();
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

    // Verifique se todos os campos obrigatórios estão preenchidos
    if (!nomeItem) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      // Se o ID for único, continue com o envio do formulário
      const updateResponse = await axios.put(
        `http://54.233.233.32:3000/item/update/${id}`,
        {
          nome_item: nomeItem,
        },
        config
      );

      console.log(updateResponse);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao editar o item:", error);
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
            <h1 className="title">Editar Item</h1>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
                placeholder=" "
                value={nomeItem}
                onChange={(e) => setNomeItem(e.target.value)}
                required
              />
              <Form.Label>Nome do Item</Form.Label>
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
              Editar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditItem;
