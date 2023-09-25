import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function CreatePatrimonio() {
  const [IdItem, setIdItem] = useState("");
  const [Quantidade, setQuantidade] = useState("");
  const [itemOptions, setItemOptions] = useState([]);
  const [salaOptions, setSalaOptions] = useState([]);
  const [patrimoniosSala, setPatrimoniosSala] = useState([]);
  const [patrimoniosDisponiveis, setPatrimoniosDisponiveis] = useState([]);
  const [loadingPatrimonios, setLoadingPatrimonios] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        };
        
        // Buscar todos os itens disponíveis
        const itemResponse = await axios.get(
          "http://localhost:3000/item/getAll",
          config
        );

        const itemOptionsData = itemResponse.data.map((item) => ({
          value: item.id,
          label: item.nome_item,
        }));

        setItemOptions(itemOptionsData);

        // Buscar informações da sala com base no id dos parâmetros
        const salaResponse = await axios.get(
          `http://localhost:3000/sala/getById/${id}`,
          config
        );

        const salaOptionData = {
          value: salaResponse.data.id,
          label: salaResponse.data.id,
        };

        setSalaOptions([salaOptionData]);

        // Buscar os patrimônios da sala
        const patrimonioSalaResponse = await axios.get(
          `http://localhost:3000/patrimonio_sala/getAll/${id}`,
          config
        );

        setPatrimoniosSala(patrimonioSalaResponse.data);

        // Buscar todos os patrimônios disponíveis
        const patrimonioDisponivelResponse = await axios.get(
          "http://localhost:3000/patrimonio_sala/getAll",
          config
        );

        const patrimoniosNaoRelacionados = patrimonioDisponivelResponse.data.filter(
          (patrimonio) =>
            !patrimonioSalaResponse.data.some(
              (relacionado) => relacionado.id_patrimonio === patrimonio.id
            )
        );

        setPatrimoniosDisponiveis(patrimoniosNaoRelacionados);
        setLoadingPatrimonios(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!IdItem || !Quantidade) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
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
          id_patrimonio: IdItem,
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
        />
      </Container>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit} id="form" className="border p-4 rounded">
            <h1 className="title">Adicionar Patrimônio à Sala</h1>
            <Form.Group className="mb-3">
              <label>Item</label>
              <Select
                options={patrimoniosDisponiveis.map((patrimonio) => ({
                  value: patrimonio.id,
                  label: patrimonio.id,
                }))}
                value={patrimoniosDisponiveis.find(
                  (patrimonio) => patrimonio.value === IdItem
                )}
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
