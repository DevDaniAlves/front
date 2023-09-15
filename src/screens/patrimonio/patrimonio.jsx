import React, { Component } from 'react';
import './patrimonio.css'
import MyNavbar from '../navBar/navBar';


import { DataGrid } from '@mui/x-data-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Button, Col, Row } from 'react-bootstrap';

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
      field: 'acao',
      headerName: 'Ações',
      
      width: 500,
      renderCell: ({ row }) => (
        <Col>
          <Button className='editButton'>
          <FontAwesomeIcon className="editIcon" icon={faPencil} /> 
        </Button>
        <Button  className='deleteButton'>
          <FontAwesomeIcon className="deleteIcon" icon={faTrash} />
        </Button>
        </Col>
        
      ),
    },
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
class PatrimonioPage extends Component {


    render() {
        return (
            <div>
                <MyNavbar />
                <div className="container-xl">
                    <div className="table-responsive">
                      <div className='tableTitle'>
                        <h1>Lista de Itens</h1>
                      </div>
                    <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      </div>
                </div>
            </div>

        );
    }
}

export default PatrimonioPage;
