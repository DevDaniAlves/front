import { faBalanceScale, faInfo, faPeopleGroup, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MyNavbar from '../navBar/navBar';
import { useParams } from 'react-router-dom';

function Sala() {
    const { id } = useParams();

    return (
        <div>
            <MyNavbar />
            <Container className="content">
                <h1>Sala {id}</h1>
                <Row>
                    <div className="card-container">
                        <Card style={{ width: "30vw", height: "30vh", textAlign: "center" }}>
                            <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <FontAwesomeIcon id='icon'  icon={faBalanceScale} size="5x" />
                                <Card.Title className='title' style={{ fontSize: '32px', marginTop: "25%" }}>Patrimônio</Card.Title> {/* Defina o tamanho da fonte aqui */}
                            </Card.Body>
                        </Card>

                        <Card style={{ width: "30vw", height: "30vh", textAlign: "center" }}>
                            <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <FontAwesomeIcon id='icon' icon={faPeopleGroup} size="5x" />
                                <Card.Title className='title' style={{ fontSize: '32px', marginTop: "25%" }}>Turmas</Card.Title> {/* Defina o tamanho da fonte aqui */}
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="card-container">
                        <Card style={{ width: "30vw", height: "30vh", textAlign: "center" }}>
                            <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <FontAwesomeIcon id='icon' icon={faInfo} size="5x" />
                                <Card.Title className='title' style={{ fontSize: '32px', marginTop: "25%" }}>Informações</Card.Title> {/* Defina o tamanho da fonte aqui */}
                            </Card.Body>
                        </Card>

                        <Card style={{ width: "30vw", height: "30vh", textAlign: "center" }}>
                            <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <FontAwesomeIcon id='icon' icon={faWrench} size="5x" />
                                <Card.Title className='title' style={{ fontSize: '32px', marginTop: "25%"}}>Manutenções</Card.Title> {/* Defina o tamanho da fonte aqui */}
                            </Card.Body>
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default Sala;
