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
import { Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate

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
          <Button onClick={() => handleDelete(params.row.id_item)} className="iconButton">
            <FontAwesomeIcon className="deleteButton" icon={faTrash} />
          </Button>
        </Row>
      );
    },
  },
];
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate dentro do componente

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fazendo a solicitação GET para obter a lista de itens disponíveis
    axios
      .get('http://localhost:3000/item/getAll', config)
      .then((response) => {
        const availableItems = response.data;

        // Fazendo a solicitação GET para obter a lista de itens no patrimônio
        axios
          .get('http://localhost:3000/patrimonio_total', config)
          .then((patrimonioResponse) => {
            const patrimonioItems = patrimonioResponse.data;

            // Combinando os dados dos itens disponíveis com os do patrimônio
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
    // Aqui você pode retornar um campo único dos seus dados, como o ID do item
    return item.id_item; // Substitua 'id_item' pelo campo que contém um ID único.
  };

  const handleEdit = (id) => {
    // Lógica de edição aqui
    navigate(`/editarItem/${id}`);
  };

  const handleDelete = (id) => {
    // Exibir um diálogo de confirmação
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir este item?');
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Lógica de exclusão aqui
      axios
        .delete(`http://localhost:3000/item/delete/${id}`, config)
        .then((response) => {
          // Lógica após a exclusão bem-sucedida
          console.log('Item excluído com sucesso!', response);
          // Recarregar a lista de itens após a exclusão
          window.location.reload();
        })
        .catch((error) => {
          // Lógica para lidar com erros
          console.error('Erro ao excluir o item:', error);
        });
    }
  };

  console.log(items);

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
    </div>
  );
}

export default PatrimonioPage;
