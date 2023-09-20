import React, { useEffect, useState } from 'react';
import './turma.css'
import MyNavbar from '../navBar/navBar';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Row, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function CustomToolbar() {
  return (
    <GridToolbarContainer >
      <div className="custom-toolbar">
        <GridToolbarColumnsButton className="columsButton" />
        <GridToolbarFilterButton className="filterButton" />
        <GridToolbarDensitySelector className="densityButton" />
      </div>
      <Link className="link" to="/novaTurma">
        <Button  className="addButton">
          <FontAwesomeIcon className="addIcon" icon={faPlusCircle} />
          Adicionar Nova Turma
        </Button>
      </Link>
    </GridToolbarContainer>
  );
}

function TurmasPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.get('http://localhost:3000/turma/getAll', config)
      .then(response => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar as turmas:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    navigate(`/editarTurma/${id}`);
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteItemId(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  const handleConfirmDelete = () => {
    handleCloseDeleteModal();
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`http://localhost:3000/turma/delete/${deleteItemId}`, config)
      .then((response) => {
        console.log('Turma excluída com sucesso!', response);
        const updatedRooms = rooms.filter((room) => room.id !== deleteItemId);
        setRooms(updatedRooms);
      })
      .catch((error) => {
        console.error('Erro ao excluir a turma:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'professor', headerName: 'Professor', width: 130 },
    { field: 'nome_turma', headerName: 'Nome Turma', width: 130 },
    {
      field: 'turno',
      headerName: 'Turno',
      width: 150,
    },
    {
      field: 'acoes',
      headerName: 'Ações',
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Row>
            <Button onClick={() => handleEdit(params.row.id)} className='iconButton'>
              <FontAwesomeIcon className='editButton' icon={faPencil} />
            </Button>
            <Button onClick={() => handleShowDeleteModal(params.row.id)} className='iconButton'>
              <FontAwesomeIcon className='deleteButton' icon={faTrash} />
            </Button>
          </Row>
        );
      },
    },
  ];
  
  return (
    <div>
      <MyNavbar />
      <h1 className='title'>Lista de Turmas</h1>
      <div className="container-xl">
        <div className="table-responsive">
          {loading ? (
            <CircularProgress size={80} style={{ margin: 'auto', display: 'block' }} />
          ) : (
            <DataGrid
              checkboxSelection={false}
              rows={rooms}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              components={{
                Toolbar: CustomToolbar,
              }}
              pageSizeOptions={[5, 10]}
            />
          )}
        </div>
      </div>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir esta turma? (TODOS OS RELACIONAMENTOS DELE SERÃO APAGADOS) </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TurmasPage;
