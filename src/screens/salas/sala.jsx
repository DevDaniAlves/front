import { faBalanceScale, faInfo, faPeopleGroup, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import MyNavbar from '../navBar/navBar';
import { Link, useParams } from 'react-router-dom';

function Sala() {
    const { id } = useParams();

    return (
        <div>
            <MyNavbar />
            <Container className="content">
                <h1>Sala {id}</h1>
                <Row>
                    <div className="card-container">
                        <Link className="link" to={`/patrimonio/${id}`}>
                            <Card style={{ width: "40vw", height: "40vh", textAlign: "center" }}>
                                <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <FontAwesomeIcon id='icon' icon={faBalanceScale} size="5x" />
                                    <Card.Title className='title' style={{ fontSize: '32px', marginTop: "25%" }}>Patrimônio</Card.Title> {/* Defina o tamanho da fonte aqui */}
                                </Card.Body>
                            </Card>
                        </Link>

                        <Link className="link" to={`/turma/${id}`}>
                            <Card style={{ width: "40vw", height: "40vh", textAlign: "center" }}>
                                <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <FontAwesomeIcon id='icon' icon={faPeopleGroup} size="5x" />
                                    <Card.Title className='title' style={{ fontSize: '32px', marginTop: "25%" }}>Turmas</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                    <div className="card-container">
                        <Link className="link" to={`/informacao/${id}`}>
                            <Card style={{ width: "40vw", height: "40vh", textAlign: "center" }}>
                                <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <FontAwesomeIcon id='icon' icon={faInfo} size="5x" />
                                    <Card.Title className='title' style={{ fontSize: '32px', marginTop: "25%" }}>Informações</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                        <Link className='link' to={`/manutencao/${id}`}>
                        <Card style={{ width: "40vw", height: "40vh", textAlign: "center" }}>
                            <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                <FontAwesomeIcon id='icon' icon={faWrench} size="5x" />
                                <Card.Title className='title' style={{ fontSize: '32px', marginTop: "25%" }}>Manutenções</Card.Title> {/* Defina o tamanho da fonte aqui */}
                            </Card.Body>
                        </Card>
                        </Link>
                        
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default Sala;
