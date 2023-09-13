
import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import "./navBar.css"
function MyNavbar() {
  return (
    <Navbar className="nav"  variant="dark">
        <Container>
          <div className="ml-auto">
            <Button variant="light" className="mr-2">
              <Container className="iconButton">
              <FontAwesomeIcon
                style = {{color: "white"}}
                icon={faHome}
              />
              <div className="label">Home</div>
              </Container>
              
            </Button>
            <Button variant="light" className="mr-2">
            <Container className="iconButton">
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "white"}}
              />
              <div className="label">Usuário</div>
              </Container>
            </Button>
            <Button variant="light" className="mr-2">
            <Container className="iconButton">
              <FontAwesomeIcon
                icon={faCog}
                style = {{color: "white"}}
              />
              <div className="label">Configurações</div>
              </Container>
            </Button>
          </div>
        </Container>
      </Navbar>
  );
}

export default MyNavbar;
