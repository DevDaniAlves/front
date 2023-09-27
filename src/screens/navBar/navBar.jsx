import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faDoorClosed, faScaleBalanced, faArrowCircleLeft, faPeopleGroup, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navBar.css";

function MyNavbar() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);
  const navigate = useNavigate();

  const isHomeRoute = location.pathname === "/home";

  const handleVoltar = () => {
    navigate(-1); // Navega para a tela anterior
  };

  const handleLogout = () => {
    // Coloque a lógica de logout aqui, por exemplo:
    // Limpar os dados de autenticação (por exemplo, token JWT, sessão, etc.)
    // Redirecionar o usuário para a página de login
    // Você pode usar a função navigate para redirecionar o usuário
    // Certifique-se de implementar a lógica de logout de acordo com o seu sistema de autenticação
    // Exemplo fictício:
    localStorage.removeItem("token"); // Remove um token fictício armazenado localmente
    navigate("/"); // Redireciona o usuário para a página de login
  };


  return (
    <Navbar className="nav" variant="dark">
      <Container>
        <div className="ml-auto">
          {isHomeRoute ? (
            <Button
              onClick={handleLogout}
              variant="light"
              className="nav-button"
            >
              <Container className="iconButton">
                <FontAwesomeIcon
                  className="icon"
                  icon={faSignOutAlt}
                />
                <div className="label">Logout</div>
              </Container>
            </Button>
          ) : (
            <Button
              onClick={handleVoltar}
              variant="light"
              className="nav-button"
            >
              <Container className="iconButton">
                <FontAwesomeIcon
                  className="icon"
                  icon={faArrowCircleLeft}
                />
                <div className="label">Voltar</div>
              </Container>
            </Button>
          )}

          <Button
            as={Link}
            to="/home"
            variant="light"
            className={`nav-button ${activeButton === "/home" ? "active-button" : ""}`}
          >
            <Container className="iconButton">
              <FontAwesomeIcon
                className="icon"
                icon={faHome}
              />
              <div className="label">Home</div>
            </Container>
          </Button>
          <Button
            as={Link}
            to="/sala"
            variant="light"
            className={`nav-button ${activeButton === "/sala" ? "active-button" : ""}`}
          >
            <Container className="iconButton">
              <FontAwesomeIcon
                className="icon"
                icon={faDoorClosed}
              />
              <div className="label">Salas</div>
            </Container>
          </Button>
          <Button
            as={Link}
            to="/patrimonio"
            variant="light"
            className={`nav-button ${activeButton === "/patrimonio" ? "active-button" : ""}`}
          >
            <Container className="iconButton">
              <FontAwesomeIcon
                className="icon"
                icon={faScaleBalanced}
              />
              <div className="label">Patrimônio</div>
            </Container>
          </Button>
          <Button
            as={Link}
            to="/turmas"
            variant="light"
            className={`nav-button ${activeButton === "/turmas" ? "active-button" : ""}`}
          >
            <Container className="iconButton">
              <FontAwesomeIcon
                className="icon"
                icon={faPeopleGroup}
              />
              <div className="label">Turmas</div>
            </Container>
          </Button>
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
