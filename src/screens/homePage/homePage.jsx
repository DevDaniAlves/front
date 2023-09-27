import React, { useState, useEffect } from "react";
import { Container, Card, Table, Col } from "react-bootstrap";
import "./HomePage.css"; // Importe o arquivo CSS
import MyNavbar from "../navBar/navBar";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"; // Importe o CircularProgress
import { Link } from "react-router-dom";
import ReactECharts from "echarts-for-react";

function HomePage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [man, setMan] = useState([]);
  const [manRes, setManRes] = useState([]);

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
      .get("https://api-emb3.onrender.com/sala/getAll", config) // Substitua pela URL da sua API
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
      .get("https://api-emb3.onrender.com/manutencao/getAll", config) // Substitua pela URL da sua API
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
        const formattedItemsRes = response.data
          .filter((item) => item.Manutencao.resolvido === true)
          .map((item) => ({
            id: item.Manutencao.id,
            id_sala: item.sala.id,
            nome_item: item.turma.nome_item,
            quantidade: item.Manutencao.quantidade,
            situacao: item.Manutencao.resolvido,
          }));
        setMan(formattedItems);
        setManRes(formattedItemsRes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados da API:", error);
        setLoading(false);
      });
  }, []);

  // Contagem de manutenções resolvidas e a resolver
  const manutencoesResolvidas = manRes.filter((item) => item.situacao);
  console.log("Manutenções resolvidas", manutencoesResolvidas);
  const manutencoesAResolver = man.filter((item) => !item.situacao);

  // Dados para o gráfico de pizza
  const pieChartData = [
    { name: "Manutenções Resolvidas", value: manutencoesResolvidas.length },
    { name: "Manutenções a Resolver", value: manutencoesAResolver.length },
  ];

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10, // Ajuste a posição da legenda para a direita
      bottom: 10, // Ajuste a posição da legenda para a parte inferior
      data: pieChartData.map((item) => item.name),
    },
    series: [
      {
        name: "Status",
        type: "pie",
        radius: "55%",
        center: ["50%", "40%"], // Ajuste a posição do gráfico
        data: pieChartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <div>
      <MyNavbar />

      <div className="d-flex align-items-center justify-content-center ">
        <Container className="content">
          <h2>Bem-vindo à HomePage</h2>
          <Col>
  
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
                        <Table striped bordered hover responsive>
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
              
              <Card className="centered-card" style={{ width: "100%" }}>
                <Card.Title>Manutenções</Card.Title>
                <ReactECharts option={option} style={{ height: "40vh" }} />
              </Card>
  
              <Card style={{ width: "18rem" }}>
                <Link to="/manutencoes_pendentes" className="card-link">
                  <Card.Body>
                    <Card.Title>Manutenções Pendentes</Card.Title>
                    <div className="d-flex align-items-center justify-content-center h-100">
                      {loading ? (
                        <div className="d-flex justify-content-center">
                          <CircularProgress />
                        </div>
                      ) : man.length === 0 ? (
                        <p>Nenhuma manutenção pendente</p>
                      ) : (
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>Sala</th>
                              <th>Item</th>
                              <th>Quantidade</th>
                            </tr>
                          </thead>
                          <tbody>
                            {man.map((item, index) => (
                              <tr key={index}>
                                <td> Sala {item.id_sala}</td>
                                <td>{item.nome_item}</td>
                                <td>{item.quantidade}</td>
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
          </Col>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
