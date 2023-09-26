import React, { useEffect, useState } from 'react';
import './manutencoes.css';
import MyNavbar from '../navBar/navBar';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Col, Row, Modal } from 'react-bootstrap'; // Importe Modal do react-bootstrap
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function ManutencoesPendentesPages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    // Lógica de edição aqui
    navigate(`/editarManutencaoSala/${id}`);
  };

  const handleShowDeleteModal = (id) => {
    setShowDeleteModal(true);
    setDeleteId(id);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    const idToDelete = deleteId;
    handleCloseDeleteModal();

    // Lógica de exclusão aqui
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`http://localhost:3000/manutencao/delete/${idToDelete}`, config)
      .then((response) => {
        // Se a exclusão for bem-sucedida, atualize o estado local para refletir a exclusão.
        setItems((prevItems) => prevItems.filter((item) => item.id !== idToDelete));
        console.log('Manutenção excluída com sucesso!', response);
      })
      .catch((error) => {
        console.error('Erro ao excluir a manutenção:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'id_sala', headerName: 'ID Sala', width: 130 },
    { field: 'nome_item', headerName: 'Item', width: 130 },
    {
      field: 'quantidade',
      headerName: 'Quantidade',
      type: 'number',
      width: 90,
    },
    {
      field: 'situacao',
      headerName: 'Situação',
      width: 100,
      valueGetter: (params) => (params.row.situacao ? 'Resolvido' : 'A Resolver'),
    },
    {
      field: 'acoes',
      headerName: "Ações",
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
        )
      }
    }
  ];

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios.get(`http://localhost:3000/manutencao/getAll`, config)
      .then(response => {
        const formattedItems = response.data.map(item => ({
          id: item.Manutencao.id,
          id_sala: item.sala.id,
          nome_item: item.turma.nome_item,
          quantidade: item.Manutencao.quantidade,
          situacao: item.Manutencao.resolvido
        }));
        // Filtrar apenas manutenções com resolvido === false
        const unresolvedItems = formattedItems.filter(item => item.situacao === false);
        setItems(unresolvedItems);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os itens:', error);
        setLoading(false);
      });
  }, [id]);
  

  return (
    <div>
      <MyNavbar />
      <h1 className="title">Manutenções Pendentes </h1>
      <div className="container-xl">
        <div className="table-responsive">
          {loading ? (
            <CircularProgress size={80} style={{ margin: 'auto', display: 'block' }} />
          ) : (
            <DataGrid
              getRowId={(row) => row.id}
              rows={items}
              columns={columns}
              pageSizeOptions={[5, 10]}
              components={{
                Toolbar: CustomToolbar,
              }}
            />
          )}
        </div>
      </div>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir esta manutenção?</Modal.Body>
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

export default ManutencoesPendentesPages;
