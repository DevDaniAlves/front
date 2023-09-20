import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Importe o componente Select
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CreatePatrimonio() {
  const [IdItem, setIdItem] = useState("");
  const [IdSala, setIdSala] = useState("");
  const [Quantidade, setQuantidade] = useState("");
  const [itemOptions, setItemOptions] = useState([]); // Opções para o dropdown de itens
  const [salaOptions, setSalaOptions] = useState([]); // Opções para o dropdown de salas
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o id dos parâmetros da URL

  useEffect(() => {
    // Buscar todos os itens disponíveis
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
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
        console.log(itemOptions)
      } catch (error) {
        console.error("Erro ao buscar dados de itens:", error);
      }
    }

    fetchData();
  }, []); // Execute isso apenas uma vez no carregamento inicial

  useEffect(() => {
    // Buscar informações da sala com base no id dos parâmetros
    async function fetchSalaInfo() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        const salaResponse = await axios.get(
          `http://localhost:3000/sala/getById/${id}`,
          config
        );

        // Mapeie os dados da sala para o formato esperado pelo react-select
        const salaOptionData = {
          value: salaResponse.data.id,
          label: salaResponse.data.id,
        };

        setSalaOptions([salaOptionData]);
        console.log(salaOptions)
      } catch (error) {
        console.error("Erro ao buscar dados da sala:", error);
      }
    }

    fetchSalaInfo();
  }, [id]); // Execute isso sempre que o id dos parâmetros mudar

  const handleSubmit = async (e) => {
    const {id} = useParams() 
    e.preventDefault();
    console.log("Formulário enviado");
    // Verifique se todos os campos obrigatórios estão preenchidos
    if (!IdItem || !IdSala || !Quantidade) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Verifique se o ID já foi usado
    try {
      // Se o ID for único, continue com o envio do formulário
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      const createResponse = await axios.post(
        "http://localhost:3000/patrimonio_sala/create",
        {
          id_item: IdItem,
          id_sala: id,
          quantidade: Quantidade,
        },
        config
      );

      console.log(createResponse);
      navigate(-1);
    } catch (error) {
      console.error("Erro ao criar o patrimônio:", error);
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
        /></Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6}>
          <Form
            onSubmit={handleSubmit}
            id="form"
            className="border p-4 rounded"
          >
            <h1 className="title">Adicionar Patrimônio à Sala</h1>
            <Form.Group className="mb-3">
              <label>Item</label>
              <Select
                options={itemOptions}
                value={itemOptions.find((option) => option.value === IdItem)}
                onChange={(selectedOption) => setIdItem(selectedOption.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-3 floating-label">
              <Form.Control
                type="text"
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
              Adicionar Patrimônio
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePatrimonio;
