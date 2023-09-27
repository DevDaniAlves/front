import React, { useEffect, useState } from 'react';
import './turma.css'
import MyNavbar from '../navBar/navBar';

import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Row, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function CustomToolbar({ id }) {
  return (
    <GridToolbarContainer >
      <div className="custom-toolbar">
        <GridToolbarColumnsButton className="columsButton" />
        <GridToolbarFilterButton className="filterButton" />
        <GridToolbarDensitySelector className="densityButton" />
      </div>
      <Link className="link" to={`/novaSalaTurma/${id}`}>
        <Button className="addButton">
          <FontAwesomeIcon className="addIcon" icon={faPlusCircle} />
          Adicionar Nova Turma na Sala
        </Button>
      </Link>
    </GridToolbarContainer>
  );
}

function TurmaSalaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleDelete = (id) => {
    setShowDeleteModal(true);
    setDeleteItemId(id);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.delete(`https://api-emb3.onrender.com/sala_recebe_turma/delete/${deleteItemId}`, config)
      .then((response) => {
        console.log('Turma da sala excluída com sucesso!', response);
        // Atualize a lista de turmas da sala após a exclusão
        const updatedItems = items.filter(item => item.id !== deleteItemId);
        setItems(updatedItems);
      })
      .catch((error) => {
        console.error('Erro ao excluir a turma da sala:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'id_sala', headerName: 'ID Sala', width: 130 },
    { field: 'nome_turma', headerName: 'Turma', width: 130 },
    {
      field: 'turno',
      headerName: 'Turno',
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
            <Button onClick={() => handleDelete(params.row.id)} className='iconButton'>
              <FontAwesomeIcon className='deleteButton' icon={faTrash} />
            </Button>
          </Row>
        )
      }
    }
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.get(`https://api-emb3.onrender.com/sala_recebe_turma/${id}`, config)
      .then(response => {

        const formattedItems = response.data.map(item => ({
          id: item.salaRecebeTurma.id,
          id_sala: item.sala.id,
          turno: item.salaRecebeTurma.turno,
          nome_turma: item.turma.nome_turma, // Altere para o campo desejado da turma
          // Adicione outras colunas aqui conforme necessário
        }));
        setItems(formattedItems);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar as turmas da sala:', error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div>
      <MyNavbar />
      <h1 className='title'>Turmas da Sala {id}</h1>
      <div className="container-xl">
        <div className="table-responsive">
          {loading ? (
            <CircularProgress size={80} style={{ margin: 'auto', display: 'block' }} />
          ) : (
            <DataGrid
              getRowId={(row) => row.id} // Defina esta função para retornar o ID adequado
              rows={items}
              columns={columns}
              pageSizeOptions={[5, 10]}
              components={{
                Toolbar: () => <CustomToolbar id={id} />,
              }}
            />
          )}

        </div>
      </div>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza de que deseja excluir esta turma da sala?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
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

export default TurmaSalaPage;
