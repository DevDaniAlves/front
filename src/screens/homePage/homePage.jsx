import React from "react";
import { Container, Card } from "react-bootstrap";
import "./HomePage.css"; // Importe o arquivo CSS
import { Table } from "react-bootstrap";

import MyNavbar from "../navBar/navBar";


function HomePage() {
  return (
    <div>
      {/* AppBar */}
      <MyNavbar/>
        
      {/* Conteúdo da HomePage */}
      <div className="d-flex align-items-center justify-content-center h-100">
      <Container className="content">
        
        <h2>Bem-vindo à HomePage</h2>

        {/* Cards */}
        <div className="card-container">
          <Card style={{ width: "18rem" }}>

            <Card.Body>
              <Card.Title>Salas Desocupadas</Card.Title>
              <div className="d-flex align-items-center justify-content-center h-100">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sala</th>
                    <th>Turno</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sala 101</td>
                    <td>Manhã</td>
                  </tr>
                  <tr>
                    <td>Sala 102</td>
                    <td>Tarde</td>
                  </tr>
                  <tr>
                    <td>Sala 103</td>
                    <td>Noite</td>
                  </tr>
                </tbody>
                
              </Table>
              </div>
            </Card.Body>
          </Card>

          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Manutenções Pendentes</Card.Title>
              <div className="d-flex align-items-center justify-content-center h-100">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sala</th>
                    <th>Item</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Sala 101</td>
                    <td>Cadeira Professor</td>
                    <td>5</td>
                  </tr>
                  <tr>
                    <td>Sala 102</td>
                    <td>Cadeira Aluno</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>Sala 103</td>
                    <td>Projetor</td>
                    <td>1</td>
                  </tr>

                </tbody>
              </Table>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
      </div>
    </div>
  );
}

export default HomePage;
