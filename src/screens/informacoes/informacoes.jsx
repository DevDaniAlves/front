import React, { useEffect, useState } from 'react';
import './informacoes.css'
import MyNavbar from '../navBar/navBar';


import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

function CustomToolbar() {
  return (
    <GridToolbarContainer >
      <div className="custom-toolbar">
        <GridToolbarColumnsButton className="columsButton" />
        <GridToolbarFilterButton className="filterButton" />
        <GridToolbarDensitySelector className="densityButton" />
      </div>
    </GridToolbarContainer>

  );
}

function InformacoesPage() {


  const { id } = useParams();
  const navigate = useNavigate();
  const handleEdit = (id) => {
    // Lógica de edição aqui
    navigate(`/editarSala/${id}`)
  };
  const handleDelete = (id) => {
    // Lógica de edição aqui
    console.log(`Deletar item com ID ${id}`);
  };
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
      field: "tamanho",
      headerName: "Tamanho",
      type: 'number'
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
          </Row>
        )
      }
    }
  ];

  const handleRowClick = (params) => {
    const id = params.row.id; // Assumindo que o ID da sala está na coluna 'id'
    navigate(`/sala/${id}`);
  };
  const [rooms, setRoom] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    // Fazendo a solicitação GET para obter os detalhes da sala
    axios.get(`http://54.233.233.32:3000/sala/getById/${id}`, config)
      .then(response => {
        setRoom(response.data); // Set the state with the data from the response
        setLoading(false); // Set loading as false to indicate that the data has been loaded
      })
      .catch(error => {
        console.error('Erro ao buscar a sala:', error);
        setLoading(false); // Set loading as false even in case of an error
      });
  }, [id]);




  return (

    <div>

      <MyNavbar />
      <h1 className='title'>Informações Sala {id}</h1>
      <div className="container-xl">
        <div className="table-responsive">
          {loading ? ( // Verifica se está carregando
            <CircularProgress size={80} style={{ margin: 'auto', display: 'block' }} />
          ) : (
            <DataGrid
              checkboxSelection={false}
              rows={rooms ? [rooms] : []}
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


export default InformacoesPage;
