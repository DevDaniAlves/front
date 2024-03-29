import React, { useEffect, useState } from 'react';
import './patrimonio.css';
import MyNavbar from '../navBar/navBar';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Col, Row, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function PatrimonioSalaPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const { id } = useParams();

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <div className="custom-toolbar">
          <GridToolbarColumnsButton className="columsButton" />
          <GridToolbarFilterButton className="filterButton" />
          <GridToolbarDensitySelector className="densityButton" />
        </div>
        <Link className="link" to={`/novoPatrimonio/${id}`}>
          <Button className="addButton">
            <FontAwesomeIcon className="addIcon" icon={faPlusCircle} />
            Adicionar Novo Item
          </Button>
        </Link>
      </GridToolbarContainer>
    );
  }

  const reloadData = () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.get(`https://api-emb3.onrender.com/patrimonio_sala/${id}`, config)
      .then(response => {
        const formattedItems = response.data.map(item => ({
          id: item.patrimonioSala.id,
          id_sala: item.sala.id,
          nome_item: item.item.nome_item,
          quantidade: item.patrimonioSala.quantidade,
        }));
        setItems(formattedItems);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar os itens:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    reloadData();
  }, [id]);

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

  const handleEdit = (id) => {
    navigate(`/editarPatrimonioSala/${id}`);
  };

  const handleShowDeleteModal = (id) => {
    setDeleteItemId(id);
  };

  const handleCloseDeleteModal = () => {
    setDeleteItemId(null);
  };

  const handleConfirmDelete = () => {
    const idToDelete = deleteItemId;
    handleCloseDeleteModal();

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.delete(`https://api-emb3.onrender.com/patrimonio_sala/delete/${idToDelete}`, config)
      .then(response => {
        console.log('Item excluído com sucesso:', response);
        // Atualize a lista de itens após a exclusão bem-sucedida, se necessário.
        reloadData(); // Recarrega os dados após a exclusão
      })
      .catch(error => {
        console.error('Erro ao excluir o item:', error);
      });
  };

  return (
    <div>
      <MyNavbar />
      <h1 className='title'>Patrimônio Sala {id}</h1>
      <div className="container-xl">
        <div className="table-responsive">
          {loading ? (
            <CircularProgress size={80} style={{margin: 'auto', display: 'block'}}/>
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

      <Modal show={!!deleteItemId} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir este item?</Modal.Body>
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

export default PatrimonioSalaPage;
