import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';


const columns = [
  { field: 'admissionNo', headerName: 'Enrollment Id', width: 190,sortable: false},
  {
    field: 'name',
    headerName: 'Name',
    width: 250,
    sortable: false,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 210,
    sortable: false,
  },
  {
    field: 'mobileNo',
    headerName: 'Mobile NO',
    width: 200,
    sortable: false,
  },
  {
    field: 'email',
    headerName: 'Email ',
    sortable: false,
    width: 200,
  },
  {
    field: 'session',
    headerName: 'Session',
    sortable: false,
    width: 160,
    valueFormatter: ({value}) =>
        value==1 ?  'NEET XI' :
        value==2 ?  'JEE XI' :
        value==3 ?  'XI Arts(2020-2021)' :
        value==4 ?  'XI science(2021-2021)' :
        value==5 ?  'XII arts(2020-2021)' :
        'XII Science(2020-2021)'
  },
  {
    field: 'standard',
    headerName: 'Class',
    sortable: false,
    width: 160,
  },
];

export default function DataTable({rows, setSelectionModel, selectionModel}) {

  return (
    <div style={{ height: 400, width: '100%'}}>
       {
          rows && 
          <DataGrid
                rows={rows}
                columns={columns}
                pageSize={25}
                checkboxSelection

                onSelectionModelChange={(newSelection) => {

                  console.log(newSelection)
                  setSelectionModel(newSelection);
                }}
                selectionModel={selectionModel}
          />
       }
    </div>
  );
}
