import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateManutencaoSala() {
  const [IdItem, setIdItem] = useState("");
  const [ItemOptions, setItemOptions] = useState([]);
  const [Quantidade, setQuantidade] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [patrimoniosDisponiveis, setPatrimoniosDisponiveis] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        // Busque todos os itens disponíveis
        const itemResponse = await axios.get(
          "https://api-emb3.onrender.com/item/getAll",
          config
        );

        if (!itemResponse.data || !Array.isArray(itemResponse.data)) {
          console.error("Resposta inválida ao buscar itens");
          return;
        }

        const itemOptionsData = itemResponse.data.map((item) => ({
          value: item.id,
          label: item.nome_item,
        }));

        // Busque os patrimônios da sala específica
        const itensAssociados = await fetchItensAssociados(id);

        if (!Array.isArray(itensAssociados)) {
          console.error("Resposta inválida ao buscar itens associados");
          return;
        }
        console.log("Itens: ", itensAssociados)
        // Extrair os IDs dos patrimônios já relacionados à sala em manutenções
        const patrimoniosRelacionadosIds = itensAssociados.map(
          (item) => item.item.id
        );
        console.log(patrimoniosRelacionadosIds)
        // Filtrar os itens disponíveis para excluir aqueles que já estão relacionados à sala em manutenções
        const itensNaoRelacionados = itemOptionsData.filter(
          (item) => !patrimoniosRelacionadosIds.includes(item.value)
        );

        setPatrimoniosDisponiveis(itensNaoRelacionados);
        setItemOptions(itensNaoRelacionados);
      } catch (error) {
        console.error("Erro ao buscar dados de itens:", error);
      }
    }

    fetchData();
  }, [id]);

  async function fetchItensAssociados(IdSala) {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Substitua "54.233.233.32:3000/manutencao_sala/${id}" pelo endpoint correto
      const response = await axios.get(
        `https://api-emb3.onrender.com/manutencao_sala/${IdSala}`,
        config
      );

      return response.data; // Retorne os itens associados à sala em manutenções
    } catch (error) {
      console.error("Erro ao buscar itens associados à sala em manutenções:", error);
      return []; // Retorne um array vazio em caso de erro
    }
  }
  const handleItemChange = (selectedOption) => {
    setIdItem(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!IdItem || Quantidade <= 0) {
      setModalContent("Todos os campos são obrigatórios.");
      setShowModal(true);
      return;
    }

    const manutencaoData = {
      id_item: IdItem,
      id_sala: id,
      quantidade: Quantidade,
      resolvido: false,
    };

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const createResponse = await axios.post(
        "https://api-emb3.onrender.com/manutencao/create",
        manutencaoData,
        config
      );

      if (!createResponse.data.error) {
        setModalContent("Manutenção criada com sucesso.");
        setShowModal(true);
        // Redirecionar para a tela anterior após 2 segundos
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      } else if (createResponse.status === 401) {
        setModalContent(
          "A quantidade de itens de manutenção excede a quantidade disponível na sala."
        );
        setShowModal(true);
      } else if (createResponse.status === 400) {
        setModalContent("Todos os campos são obrigatórios.");
        setShowModal(true);
      } else {
        setModalContent("Erro desconhecido.");
        setShowModal(true);
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        // Verifique o status da resposta para identificar um erro de autorização
        setModalContent(
          "A quantidade de itens de manutenção excede a quantidade disponível na sala."
        );
        setShowModal(true);
      } else if (error.response && error.response.status === 400) {
        // Verifique o status da resposta para identificar um erro de solicitação inválida
        setModalContent("Todos os campos são obrigatórios.");
        setShowModal(true);
      } else {
        // Trate outros erros desconhecidos aqui
        setModalContent("Erro desconhecido.");
        setShowModal(true);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Mensagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default CreateManutencaoSala;
