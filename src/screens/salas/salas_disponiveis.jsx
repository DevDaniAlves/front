import React, { useEffect, useState } from 'react';
import './salas.css';
import MyNavbar from '../navBar/navBar';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Row, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <div className="custom-toolbar">
        <GridToolbarColumnsButton className="columsButton" />
        <GridToolbarFilterButton className="filterButton" />
        <GridToolbarDensitySelector className="densityButton" />
      </div>
    </GridToolbarContainer>
  );
}

function SalasDisponiveisPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'capacidade', headerName: 'Capacidade', width: 130, type: 'number' },
    { field: 'responsavel', headerName: 'Responsável', width: 130 },
    {
      field: 'localizacao',
      headerName: 'Localização',
      width: 150,
    },
    {
      field: 'mat_disp',
      headerName: 'Matutino',
      width: 120,
      valueFormatter: (params) => (params.value ? 'Disponível' : 'Ocupado'),
    },
    {
      field: 'vesp_disp',
      headerName: 'Vespertino',
      width: 120,
      valueFormatter: (params) => (params.value ? 'Disponível' : 'Ocupado'),
    },
    {
      field: 'not_disp',
      headerName: 'Noturno',
      width: 120,
      valueFormatter: (params) => (params.value ? 'Disponível' : 'Ocupado'),
    },
    {
      field: 'tamanho',
      headerName: 'Tamanho',
      type: 'number',
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
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(params.row.id);
              }}
              className='iconButton'
            >
              <FontAwesomeIcon className='editButton' icon={faPencil} />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleShowDeleteModal(params.row.id);
              }}
              className='iconButton'
            >
              <FontAwesomeIcon className='deleteButton' icon={faTrash} />
            </Button>
          </Row>
        );
      },
    }
  ];

  const handleEdit = (id) => {
    navigate(`/editarSala/${id}`);
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
      .delete(`http://localhost:3000/sala/delete/${deleteItemId}`, config)
      .then((response) => {
        console.log('Sala excluída com sucesso!', response);
        const updatedRooms = rooms.filter((room) => room.id !== deleteItemId);
        setRooms(updatedRooms);
      })
      .catch((error) => {
        console.error('Erro ao excluir a sala:', error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.get('http://localhost:3000/sala/getAll', config)
      .then(response => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar as salas:', error);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`/novaSalaTurma/${id}`);
  };

  return (
    <div>
      <MyNavbar />
      <h1 className='title'>Lista de Salas</h1>
      <div className="container-xl">
        <div className="table-responsive">
          {loading ? (
            <CircularProgress size={80} style={{ margin: 'auto', display: 'block' }} />
          ) : (
            <DataGrid
              checkboxSelection={false}
              rows={rooms}
              columns={columns}
              onRowClick={handleRowClick}
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
        <Modal.Body>Tem certeza de que deseja excluir esta sala? (TODOS OS RELACIONAMENTOS DELE SERÃO APAGADOS)</Modal.Body>
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

export default SalasDisponiveisPage;
