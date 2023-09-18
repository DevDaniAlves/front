import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Importe o componente Select

function CreateManutencaoSala() {
  const [IdItem, setIdItem] = useState("");
  const [ItemOptions, setItemOptions] = useState([]); // Opções para o dropdown de itens
  const [Quantidade, setQuantidade] = useState(0); // Quantidade inicializada como 0
  const navigate = useNavigate();
  const { id: IdSala } = useParams(); // Obtém o ID da sala dos parâmetros da URL

  useEffect(() => {
    // Buscar todas os itens disponíveis
    async function fetchItens() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const itemResponse = await axios.get(
          "http://localhost:3000/item/getAll",
          config
        );

        // Mapeie os dados de resposta para o formato esperado pelo react-select
        const itemOptionsData = itemResponse.data.map((item) => ({
          value: item.id,
          label: item.nome_item,
        }));

        setItemOptions(itemOptionsData);
      } catch (error) {
        console.error("Erro ao buscar dados de itens:", error);
      }
    }

    fetchItens();
  }, []); // Execute isso apenas uma vez no carregamento inicial

  const handleItemChange = (selectedOption) => {
    setIdItem(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado");
    console.log(IdItem, Quantidade)
    // Verifique se todos os campos obrigatórios estão preenchidos
    if (!IdItem || Quantidade <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Construa o objeto JSON a ser enviado
    const manutencaoData = {
      id_item: IdItem,
      id_sala: IdSala,
      quantidade: Quantidade,
      resolvido: false, // Definir 'resolvido' como false
    };
    console.log(manutencaoData)
    // Verifique se o ID já foi usado
    try {
      // Se o ID for único, continue com o envio do formulário
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const createResponse = await axios.post(
        "http://localhost:3000/manutencao/create",
        manutencaoData,
        config
      );

      if (!createResponse.data.error) {
        // Se a resposta não contiver um erro
        console.log(createResponse);
        navigate(-1);
      } else {
        // Se a resposta contiver um erro, exiba a mensagem de erro em um alerta
        alert("Erro ao Adicionar Manutenção à Sala: " + createResponse.data.error);
      }
    } catch (error) {
      console.error("Erro ao criar a manutenção:", error);
      alert("Erro ao Adicionar Manutenção à Sala: " + error.message);
    }
  };

  return (
    <Container className="appContainer">
      <Container fluid className="topBar"></Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6}>
          <Form
            onSubmit={handleSubmit}
            id="form"
            className="border p-4 rounded"
          >
            <h1 className="title">Adicionar Manutenção à Sala</h1>
            <Form.Group className="mb-3">
              <label>Item</label>
              <Select
                options={ItemOptions}
                value={ItemOptions.find((option) => option.value === IdItem)}
                onChange={handleItemChange}
              />
            </Form.Group>
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
              Adicionar Manutenção
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateManutencaoSala;
