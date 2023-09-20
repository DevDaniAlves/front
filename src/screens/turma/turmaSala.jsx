import React, { useEffect, useState } from 'react';
import './turma.css'
import MyNavbar from '../navBar/navBar';

import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

function TurmaSalaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja excluir esta sala?');

    if (confirmDelete) {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios.get(`http://localhost:3000/sala_recebe_turma/getbyId/${id}`, config)
      .then((response) => {
        console.log(response.data)
        const salaId = response.data.id_sala; // Supondo que o ID da sala esteja em response.data.sala.id
        const turno = response.data.turno;
        console.log(salaId)
        // Defina a variável para o turno com base no valor do turno encontrado
        let turnoToUpdate = {};

        if (turno === 1) {
          turnoToUpdate = { mat_disp: true };
        } else if (turno === 2) {
          turnoToUpdate = { vesp_disp: true };
        } else if (turno === 3) {
          turnoToUpdate = { not_disp: true };
        }

        // Agora, faça a atualização da sala apenas para o campo correspondente ao turno encontrado
        axios.put(`http://localhost:3000/sala/update/${salaId}`, turnoToUpdate, config)
          .then((response) => {
            console.log('Turno da sala atualizado com sucesso!', response);
          })
          .catch((error) => {
            console.error('Erro ao atualizar o turno da sala:', error);
          });
      })
      .catch((error) => {
        console.error('Erro ao buscar o ID da sala:', error);
      });
      // Lógica de exclusão aqui
      axios.delete(`http://localhost:3000/sala_recebe_turma/delete/${id}`, config)
        .then((response) => {
          console.log('Sala excluída com sucesso!', response);
          // Atualize a lista de salas após a exclusão
          const updatedRooms = items.filter(room => room.id !== id);
          setItems(updatedRooms);

          // Agora, vamos buscar o ID da sala na API sala_recebe_turma
          
        })
        .catch((error) => {
          console.error('Erro ao excluir a sala:', error);
        });
    }
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

  function CustomToolbar() {
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.get(`http://localhost:3000/sala_recebe_turma/${id}`, config)
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
        console.error('Erro ao buscar os itens:', error);
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
                Toolbar: CustomToolbar,
              }}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default TurmaSalaPage;
