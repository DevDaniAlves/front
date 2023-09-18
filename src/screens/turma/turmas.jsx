import React, { useEffect, useState } from 'react';
import './turma.css'
import MyNavbar from '../navBar/navBar';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Row } from 'react-bootstrap';
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
          Adicionar Nova Sala
        </Button>
      </Link>
    </GridToolbarContainer>
  );
}



function TurmasPage() {

  
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fazendo a solicitação GET para obter a lista de salas
    axios.get('http://localhost:3000/turma/getAll', config)
      .then(response => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar as salas:', error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    // Navegue para a página de edição
    navigate(`/editarTurma/${id}`);
    console.log("oi")
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta sala?');

    if (confirmDelete) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Lógica de exclusão aqui
      axios.delete(`http://localhost:3000/turma/delete/${id}`, config)
        .then((response) => {
          console.log('Sala excluída com sucesso!', response);
          // Atualize a lista de salas após a exclusão
          const updatedRooms = rooms.filter(room => room.id !== id);
          setRooms(updatedRooms);
        })
        .catch((error) => {
          console.error('Erro ao excluir a sala:', error);
        });
    }
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
            <Button onClick={() => handleDelete(params.row.id)} className='iconButton'>
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
    </div>
  );
}

export default TurmasPage;
