import React, { useState, useEffect } from "react";
import { Container, Card, Table } from "react-bootstrap";
import "./HomePage.css"; // Importe o arquivo CSS
import MyNavbar from "../navBar/navBar";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"; // Importe o CircularProgress
import { Link } from "react-router-dom";

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [man, setMan] = useState([])
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Agora você pode usar o token como desejar no componente "/home"
    console.log("Token JWT:", token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Adicione o cabeçalho de autorização com o token Bearer
      },
    };

    axios
      .get("http://localhost:3000/sala/getAll", config) // Substitua pela URL da sua API
      .then((response) => {
        const newData = [];

        response.data.forEach((item) => {
          if (item.mat_disp) {
            newData.push({ sala: item.id, turno: "Manhã" });
          }
          if (item.vesp_disp) {
            newData.push({ sala: item.id, turno: "Vespertino" });
          }
          if (item.not_disp) {
            newData.push({ sala: item.id, turno: "Noturno" });
          }
        });

        setData(newData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Agora você pode usar o token como desejar no componente "/home"
    console.log("Token JWT:", token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Adicione o cabeçalho de autorização com o token Bearer
      },
    };

    axios
      .get("http://localhost:3000/manutencao/getAll", config) // Substitua pela URL da sua API
      .then((response) => {
        const formattedItems = response.data
          .filter((item) => item.Manutencao.resolvido === false)
          .map((item) => ({
            id: item.Manutencao.id,
            id_sala: item.sala.id,
            nome_item: item.turma.nome_item,
            quantidade: item.Manutencao.quantidade,
            situacao: item.Manutencao.resolvido,
          }));
        setMan(formattedItems);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <MyNavbar />

      <div className="d-flex align-items-center justify-content-center h-100">
        <Container className="content">
          <h2>Bem-vindo à HomePage</h2>

          {/* Cards */}
          <div className="card-container">
            <Card style={{ width: "18rem" }}>
              <Link to="/salas_disponiveis" className="card-link">
                <Card.Body>
                  <Card.Title>Salas Desocupadas</Card.Title>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <CircularProgress />
                      </div>
                    ) : data.length === 0 ? (
                      <p>Nenhuma sala disponível</p>
                    ) : (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Sala</th>
                            <th>Turno</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td> Sala {item.sala}</td>
                              <td>{item.turno}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                </Card.Body>
              </Link>
            </Card>
            <Card style={{ width: "18rem" }}>
              <Link to="/salas_disponiveis" className="card-link">
                <Card.Body>
                  <Card.Title>Salas Desocupadas</Card.Title>
                  <div className="d-flex align-items-center justify-content-center h-100">
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <CircularProgress />
                      </div>
                    ) : data.length === 0 ? (
                      <p>Nenhuma sala disponível</p>
                    ) : (
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Sala</th>
                            <th>Turno</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td> Sala {item.sala}</td>
                              <td>{item.turno}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                </Card.Body>
              </Link>
            </Card>

            {/* Outros cards aqui */}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
