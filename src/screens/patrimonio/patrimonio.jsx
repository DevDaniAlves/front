import React, { useEffect, useState } from 'react';
import './patrimonio.css';
import MyNavbar from '../navBar/navBar';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { Button, Row, Modal } from 'react-bootstrap';
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
      <Link className="link" to="/novoItem">
        <Button className="addButton">
          <FontAwesomeIcon className="addIcon" icon={faPlusCircle} />
          Adicionar Novo Item
        </Button>
      </Link>
    </GridToolbarContainer>
  );
}

function PatrimonioPage() {
  const columns = [
    { field: 'id_item', headerName: 'ID', width: 150 },
    { field: 'nome_item', headerName: 'Nome do Item', width: 250 },
    { field: 'total_quantidade', headerName: 'Quantidade', width: 200 },
    {
      field: 'acoes',
      headerName: 'Ações',
      sortable: false,
      filterable: false,
      width: 200,
      renderCell: (params) => {
        return (
          <Row>
            <Button onClick={() => handleEdit(params.row.id_item)} className="iconButton">
              <FontAwesomeIcon className="editButton" icon={faPencil} />
            </Button>
            <Button onClick={() => handleShowDeleteModal(params.row.id_item)} className="iconButton">
              <FontAwesomeIcon className="deleteButton" icon={faTrash} />
            </Button>
          </Row>
        );
      },
    },
  ];

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('http://18.228.219.100:3000/item/getAll', config)
      .then((response) => {
        const availableItems = response.data;

        axios
          .get('http://18.228.219.100:3000/patrimonio_total', config)
          .then((patrimonioResponse) => {
            const patrimonioItems = patrimonioResponse.data;

            const combinedItems = availableItems.map((item) => {
              const patrimonioItem = patrimonioItems.find((patrimonioItem) => patrimonioItem.id_item === item.id);
              return {
                id_item: item.id,
                nome_item: item.nome_item,
                total_quantidade: patrimonioItem ? patrimonioItem.total_quantidade : 0,
              };
            });

            setItems(combinedItems);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Erro ao buscar itens no patrimônio:', error);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error('Erro ao buscar itens:', error);
        setLoading(false);
      });
  }, []);

  const getRowId = (item) => {
    return item.id_item;
  };

  const handleEdit = (id) => {
    navigate(`/editarItem/${id}`);
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

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`http://18.228.219.100:3000/item/delete/${idToDelete}`, config)
      .then((response) => {
        console.log('Item excluído com sucesso!', response);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Erro ao excluir o item:', error);
      });
  };

  return (
    <div>
      <MyNavbar />
      <h1 className="title">Lista de Itens</h1>
      <div className="container-xl">
        <div className="table-responsive">
          {loading ? (
            <CircularProgress size={80} style={{ margin: 'auto', display: 'block' }} />
          ) : (
            <DataGrid
              getRowId={getRowId}
              checkboxSelection={false}
              rows={items}
              columns={columns}
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
        <Modal.Body>Tem certeza de que deseja excluir este item? (TODOS OS RELACIONAMENTOS DELE SERÃO APAGADOS)</Modal.Body>
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

export default PatrimonioPage;
