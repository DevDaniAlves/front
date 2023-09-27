import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function EditManutencaoSala() {
  const [Quantidade, setQuantidade] = useState(0);
  const [Resolvido, setResolvido] = useState(false); // Adicione o estado para 'Resolvido'
  const navigate = useNavigate();
  const { id: IdManutencao } = useParams(); // Obtém o ID da manutenção dos parâmetros da URL
  const [IdItem, setIdItem] = useState(""); // Estado para armazenar o ID do item existente

  useEffect(() => {
    async function fetchManutencao() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const manutencaoResponse = await axios.get(
          `https://api-emb3.onrender.com/manutencao/getById/${IdManutencao}`,
          config
        );

        // Preencha os estados com os dados da manutenção existente
        setIdItem(manutencaoResponse.data.id_item);
        setQuantidade(manutencaoResponse.data.quantidade);
        setResolvido(manutencaoResponse.data.resolvido);
      } catch (error) {
        console.error("Erro ao buscar dados de manutenção:", error);
      }
    }

    fetchManutencao();
  }, [IdManutencao]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado");

    if (Quantidade <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const manutencaoData = {
      quantidade: Quantidade,
      resolvido: Resolvido, // Use o estado 'Resolvido'
    };

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const updateResponse = await axios.put(
        `https://api-emb3.onrender.com/manutencao/update/${IdManutencao}`,
        manutencaoData,
        config
      );

      if (!updateResponse.data.error) {
        console.log(updateResponse);
        navigate(-1);
      } else {
        alert("Erro ao Atualizar Manutenção: " + updateResponse.data.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar a manutenção:", error);
      alert("Erro ao Atualizar Manutenção: " + error.message);
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
            <h1 className="title">Editar Manutenção na Sala</h1>
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="number"
                placeholder=" "
                value={Quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                required
              />
              <Form.Label>Quantidade</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3">
              <label>Status</label>
              <select
                value={Resolvido ? "resolvido" : "a_resolver"}
                onChange={(e) => setResolvido(e.target.value === "resolvido")}
                className="form-select"
              >
                <option value="resolvido">Resolvido</option>
                <option value="a_resolver">A Resolver</option>
              </select>
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
              Atualizar Manutenção
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditManutencaoSala;
