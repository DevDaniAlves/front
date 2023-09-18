import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select"; // Importe o componente Select

function CreateSalaTurma() {
  const [IdTurma, setIdTurma] = useState("");
  const [IdSala, setIdSala] = useState("");
  const [TurmaOptions, setTurmaOptions] = useState([]); // Opções para o dropdown de turmas
  const [SalaOptions, setSalaOptions] = useState([]); // Opções para o dropdown de salas
  const [Turno, setTurno] = useState(""); // O turno será definido com base na turma
  const navigate = useNavigate();
  const { id } = useParams(); // Obtém o id dos parâmetros da URL

  useEffect(() => {
    // Buscar todas as turmas disponíveis
    async function fetchTurmas() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const turmaResponse = await axios.get(
          "http://localhost:3000/turma/getAll",
          config
        );

        // Mapeie os dados de resposta para o formato esperado pelo react-select
        const turmaOptionsData = turmaResponse.data.map((turma) => ({
          value: turma.id,
          label: turma.nome_turma,
          turno: turma.turno, // Salvar o turno da turma como uma propriedade
        }));

        setTurmaOptions(turmaOptionsData);
      } catch (error) {
        console.error("Erro ao buscar dados de turmas:", error);
      }
    }

    fetchTurmas();
  }, []); // Execute isso apenas uma vez no carregamento inicial

  useEffect(() => {
    // Buscar informações da sala com base no id dos parâmetros
    async function fetchSalaInfo() {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
      } catch (error) {
        console.error("Erro ao buscar dados da sala:", error);
      }
    }

    fetchSalaInfo();
  }, [id]); // Execute isso sempre que o id dos parâmetros mudar

  const handleTurmaChange = (selectedOption) => {
    setIdTurma(selectedOption.value); // Definir o IdTurma com base na turma selecionada
    setSalaOptions([]); // Limpar as opções de sala quando a turma muda
    setTurno(selectedOption.turno); // Definir o turno com base na turma selecionada
  };

  const handleSalaChange = (selectedOption) => {
    setIdSala(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulário enviado");
    // Verifique se todos os campos obrigatórios estão preenchidos
    if (!IdTurma || !IdSala) {
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
            "Content-Type": "application/json",
          },
        };
        const createResponse = await axios.post(
          "http://localhost:3000/sala_recebe_turma/create",
          {
            id_sala: IdSala,
            id_turma: IdTurma,
            turno: Turno, // Inclua o turno no envio
          },
          config
        );
      
        if (!createResponse.data.error) {
          // Se a resposta não contiver um erro
          console.log(createResponse);
          navigate(-1);
        } else {
          // Se a resposta contiver um erro, exiba a mensagem de erro em um alerta
          alert("Erro ao Adicionar Turma a Sala: " + createResponse.data.error);
        }
      } catch (error) {
        console.error("Erro ao criar o patrimônio:", error);
        alert("Erro ao Adicionar Turma a Sala: " + error.message);
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
            <h1 className="title">Adicionar Turma à Sala</h1>
            <Form.Group className="mb-3">
              <label>Turma</label>
              <Select
                options={TurmaOptions}
                value={TurmaOptions.find((option) => option.value === IdTurma)}
                onChange={handleTurmaChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <label>Sala</label>
              <Select
                options={SalaOptions}
                value={SalaOptions.find((option) => option.value === IdSala)}
                onChange={handleSalaChange}
              />
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
              Adicionar Turma
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateSalaTurma;
