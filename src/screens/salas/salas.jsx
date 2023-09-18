import React, { useEffect, useState } from 'react';
import './salas.css'
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
      <Link className="link" to="/novaSala">
      <Button  className="addButton">
        <FontAwesomeIcon className="addIcon" icon={faPlusCircle} />
        Adicionar Nova Sala
      </Button>
      </Link>
      
    </GridToolbarContainer>

  );
}


function SalasPage() {
  const navigate = useNavigate();
  const handleEdit = (id) => {
    // Lógica de edição aqui
    navigate(`/editarSala/${id}`);
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
  
      // Fazendo a solicitação DELETE para excluir a sala com o ID fornecido
      axios.delete(`http://localhost:3000/sala/delete/${id}`, config)
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
    { field: 'capacidade', headerName: 'Capacidade', width: 130, type: 'number' },
    { field: 'responsavel', headerName: 'Responsável', width: 130 },
    {
      field: 'localizacao',
      headerName: 'Localização',
      width: 150,
    },
    {
      field: 'mat_disp',
      headerName: 'Matutino Livre',
      width: 120,
      valueFormatter: (params) => (params.value ? 'Disponível' : 'Ocupado'),
    },
    {
      field: 'vesp_disp',
      headerName: 'Vespertino Livre',
      width: 120,
      valueFormatter: (params) => (params.value ? 'Disponível' : 'Ocupado'),
    },
    {
      field: 'not_disp',
      headerName: 'Noturno Livre',
      width: 120,
      valueFormatter: (params) => (params.value ? 'Disponível' : 'Ocupado'),
    },
    {
      field: "tamanho",
      headerName: "Tamanho",
      type: 'number'
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
                e.stopPropagation(); // Impede a propagação do evento de clique
                handleEdit(params.row.id);
              }}
              className='iconButton'
            >
              <FontAwesomeIcon className='editButton' icon={faPencil} />
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation(); // Impede a propagação do evento de clique
                handleDelete(params.row.id);
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
  

  const handleRowClick = (params) => {
    const id = params.row.id; // Assumindo que o ID da sala está na coluna 'id'
    navigate(`/sala/${id}`);
  };
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}` // Adicione o cabeçalho de autorização com o token Bearer
      }
    };
    // Fazendo a solicitação GET para obter a lista de salas
    axios.get('http://localhost:3000/sala/getAll', config) // Substitua pela URL da sua API
      .then(response => {
        setRooms(response.data); // Define o estado com os dados da resposta
        console.log(rooms)
        setLoading(false); // Define loading como false para indicar que os dados foram carregados
      })
      .catch(error => {
        console.error('Erro ao buscar as salas:', error);
        setLoading(false); // Mesmo em caso de erro, definimos loading como false para evitar um loop infinito de solicitações
      });
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Initialize form fields here
    // For example:
    nome: '',
    capacidade: 0,
    localizacao: '',
    // Add other fields as needed
  });

  // Step 2: Function to handle modal opening
  

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    // Then close the modal
    setIsModalOpen(false);
  };

  
  
    return (
      
      <div>

        <MyNavbar />
        <h1 className='title'>Lista de Salas</h1>
        <div className="container-xl">
          <div className="table-responsive">
          {loading ? ( // Verifica se está carregando
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
      </div>

    );
  }


export default SalasPage;
