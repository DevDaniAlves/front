import React, { Component } from 'react';
import './patrimonio.css'
import MyNavbar from '../navBar/navBar';


import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton } from '@mui/x-data-grid';
import { Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

function CustomToolbar() {
  return (
    <GridToolbarContainer >
      <div className="custom-toolbar">
      <GridToolbarColumnsButton className="columsButton" />
      <GridToolbarFilterButton className="filterButton" />
      <GridToolbarDensitySelector className="densityButton" />
      </div>
      <Button className="addButton">
        <FontAwesomeIcon className="addIcon" icon={faPlusCircle} />
        Adicionar Novo Item
      </Button>
    </GridToolbarContainer>

  );
}
const handleEdit = (id) => {
  // Lógica de edição aqui
  console.log(`Editar item com ID ${id}`);
};
const handleDelete = (id) => {
  // Lógica de edição aqui
  console.log(`Deletar item com ID ${id}`);
};
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'acoes',
    headerName: "Ações",
    sortable: false,
    filterable: false,
    width: 200,
    renderCell: (params) => {
      return (
        <Col>
          <Button onClick={() => handleEdit(params.row.id)} className='iconButton'>
            <FontAwesomeIcon className='editButton' icon={faPencil} />
          </Button>
          <Button onClick={() => handleDelete(params.row.id)} className='iconButton'>
            <FontAwesomeIcon className='deleteButton' icon={faTrash} />
          </Button>
        </Col>
      )
    }
  }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];
function PatrimonioSalaPage() {
    const { id } = useParams();

    return (
      <div>

        <MyNavbar />
        <h1 className='title'>Patrimonio Sala {id}</h1>
        <div className="container-xl">
          <div className="table-responsive">
            <DataGrid
              checkboxSelection={false}
              rows={rows}
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
          </div>
        </div>
      </div>

    );
  }

export default PatrimonioSalaPage;
