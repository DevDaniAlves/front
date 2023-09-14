
import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faDoorClosed, faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import "./navBar.css"
function MyNavbar() {
  return (
    <Navbar className="nav"  variant="dark">
        <Container>
          <div className="ml-auto">
            <Button variant="light" className="mr-2">
              <Container className="iconButton">
              <FontAwesomeIcon
                className="icon"
                style = {{color: "white"}}
                icon={faHome}
              />
              
              <div className="label">Home</div>
              </Container>
              
            </Button>
            <Button variant="light" className="mr-2">
            <Container className="iconButton">
              <FontAwesomeIcon
                className="icon"
                icon={faDoorClosed}
                style={{ color: "white"}}
              />
              <div className="label">Salas</div>
              </Container>
            </Button>
            <Button variant="light" className="mr-2">
            <Container className="iconButton">
              <FontAwesomeIcon
                className="icon"
                icon={faScaleBalanced}
                style = {{color: "white"}}
              />
              <div className="label">Patrimônio</div>
              </Container>
            </Button>
          </div>
        </Container>
      </Navbar>
  );
}

export default MyNavbar;
