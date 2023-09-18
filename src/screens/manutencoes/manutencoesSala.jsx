import React, { useEffect, useState } from 'react';
import './manutencoes.css'
import MyNavbar from '../navBar/navBar';


import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';



const handleEdit = (id) => {
  // Lógica de edição aqui
  console.log(`Editar item com ID ${id}`);
};

const handleDelete = (id) => {
  // Lógica de exclusão aqui
  console.log(`Excluir item com ID ${id}`);
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
  { field: 'situacao', headerName: 'Situação', width: 100,
  valueFormatter: (params) => (params.value ? 'Resolvido' : 'A Resolver'),},
  
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
          <Button onClick={() => handleDelete(params.row.id)} className='iconButton'>
            <FontAwesomeIcon className='deleteButton' icon={faTrash} />
          </Button>
        </Row  >
      )
    }
  }
];

function ManutencoesSalaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  function CustomToolbar() {
    return (
      <GridToolbarContainer >
        <div className="custom-toolbar">
          <GridToolbarColumnsButton className="columsButton" />
          <GridToolbarFilterButton className="filterButton" />
          <GridToolbarDensitySelector className="densityButton" />
        </div>
        <Link className="link"to={`/novaManutencaoSala/${id}`}>
        <Button className="addButton">
          <FontAwesomeIcon className="addIcon" icon={faPlusCircle} />
          Adicionar Nova Manutenção
        </Button>
        </Link>
  
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
   
    axios.get(`http://localhost:3000/manutencao_sala/${id}`, config)
      .then(response => {
        const formattedItems = response.data.map(item => ({
          id: item.Manutencao.id, // Certifique-se de que esta propriedade seja única
          id_sala: item.sala.id,
          nome_item: item.item.nome_item,
          quantidade: item.Manutencao.quantidade,
          situação: item.Manutencao.situacao
          // Adicione outras colunas aqui conforme necessário
        }));
        console.log(response.data)
        setItems(formattedItems);
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
      <h1 className='title'>Manutenções Sala {id}</h1>
      <div className="container-xl">
        <div className="table-responsive">
        {loading ? (
              <CircularProgress size={80} style={{margin: 'auto', display: 'block'}}/>
            ): ( <DataGrid
              getRowId={(row) => row.id} // Defina esta função para retornar o ID adequado
              rows={items}
              columns={columns}
              pageSizeOptions={[5, 10]}
              components={{
                Toolbar: CustomToolbar,
              }}
            />)}
          
        </div>
      </div>
    </div>
  );
}

export default ManutencoesSalaPage;
