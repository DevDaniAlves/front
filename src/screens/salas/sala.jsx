import { faBalanceScale, faInfo, faPeopleGroup, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import MyNavbar from '../navBar/navBar';
import { Link, useParams } from 'react-router-dom';
import './sala.css';

function Sala() {
    const { id } = useParams();

    return (
        <div>
            <MyNavbar />
            <Container className="content">
                <h1>Sala {id}</h1>
                <div className='containerCards'>
                    <Row className="justify-content-center">
                        <Col md={3} className="d-flex justify-content-center align-items-center">
                            <Link className="link" to={`/patrimonio/${id}`}>
                                <Card style={{ width: "18rem", height: "25rem", textAlign: "center" }}>
                                    <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                        <FontAwesomeIcon id='icon' icon={faBalanceScale} size="5x" />
                                        <Card.Title className='title' style={{ fontSize: '32px', marginTop: "15px" }}>Patrimônio</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={3} className="d-flex justify-content-center align-items-center">
                            <Link className="link" to={`/turma/${id}`}>
                                <Card style={{ width: "18rem", height: "25rem", textAlign: "center" }}>
                                    <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                        <FontAwesomeIcon id='icon' icon={faPeopleGroup} size="5x" />
                                        <Card.Title className='title' style={{ fontSize: '32px', marginTop: "15px" }}>Turmas</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={3} className="d-flex justify-content-center align-items-center">
                            <Link className="link" to={`/informacao/${id}`}>
                                <Card style={{ width: "18rem", height: "25rem", textAlign: "center" }}>
                                    <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                        <FontAwesomeIcon id='icon' icon={faInfo} size="5x" />
                                        <Card.Title className='title' style={{ fontSize: '32px', marginTop: "15px" }}>Informações</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                        <Col md={3} className="d-flex justify-content-center align-items-center">
                            <Link className='link' to={`/manutencao/${id}`}>
                                <Card style={{ width: "18rem", height: "25rem", textAlign: "center" }}>
                                    <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                        <FontAwesomeIcon id='icon' icon={faWrench} size="5x" />
                                        <Card.Title className='title' style={{ fontSize: '32px', marginTop: "15px" }}>Manutenções</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

export default Sala;
