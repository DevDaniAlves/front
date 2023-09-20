import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function DeleteConfirmationModalBasic({ show, handleClose, handleConfirm }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmação de Exclusão</Modal.Title>
      </Modal.Header>
      <Modal.Body>Tem certeza de que deseja excluir esta manutenção?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmationModalBasic;
