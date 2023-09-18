import React, { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faDoorClosed, faScaleBalanced, faArrowCircleLeft, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navBar.css";

function MyNavbar() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  const navigate = useNavigate();
  const handleVoltar = () => {
    navigate(-1); // Navega para a tela anterior
  };
  return (
    <Navbar className="nav" variant="dark">
      <Container>
        <div className="ml-auto">
        <Button
        className={`nav-button `}
            onClick={handleVoltar}
          >
            <Container className="iconButton">
              <FontAwesomeIcon
                className="icon"
                icon={faArrowCircleLeft}
              />
              <div className="label">Voltar</div>
            </Container>
          </Button>
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
