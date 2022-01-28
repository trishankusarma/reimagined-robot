import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import { Button } from '@material-ui/core';

const columns = [
  { id: 'idNo', label: 'Id No.', minWidth: 80 },
  { id: 'biometric_code', label: 'BioMetric-Code', minWidth: 140 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 140,
    align: 'left',
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 140,
    align: 'left',
  },
  {
    id: 'mobileNo',
    label: 'Mobile No.',
    minWidth: 120,
    align: 'left',
  },
  {
    id: 'joining_Date',
    label: 'Joining Date',
    minWidth: 130,
    align: 'left',
  },
  {
    id: 'DOB',
    label: 'DOB',
    minWidth: 130,
    align: 'left',
  },
  {
    id:'email',
    label:'email',
    minWidth:70,
    align:'left'
  },
  {
    id: 'gender',
    label: 'Sex',
    minWidth: 100,
    align: 'left',
  },
  {
    id: 'maritial_Status',
    label: 'Marital_status',
    minWidth: 80,
    align: 'left',
  },
  {
    id: 'blood_grp',
    label: 'Blood_group',
    minWidth: 40,
    align: 'left',
  },
  {
    id: 'Salary',
    label: 'Salary',
    minWidth: 40,
    align: 'left',
  },
  {
    id: 'Absent_penalty',
    label: 'Absent_penalty',
    minWidth: 80,
    align: 'left',
  },
  {
    id: 'Total_duty_days',
    label: 'Duty Days',
    minWidth: 140,
    align: 'left',
  },
  {
    id: 'Subject',
    label: 'Subject',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'snap_shot',
    label: 'Photo',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'Delete',
    label: 'Delete',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'Edit',
    label: 'Edit',
    minWidth: 50,
    align: 'left',
  },
  {
    id: 'Id_card',
    label: 'Id-card',
    minWidth: 80,
    align: 'left',
  },
];

const useStyles = makeStyles({
  root: {
    width: '96%',
    margin:'auto'
  },
});

export default function StickyHeadTable({ stuffs, EditStuff , DeleteStuff }) {
  console.log(stuffs,"stuffs")
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const settings = (_id, operation)=>{

      if(operation==='Edit')
          EditStuff(_id)
      else if(operation==='Delete')
          DeleteStuff(_id)
  }

  const formatGender = (value)=>{

     if( parseInt( value )===1)
         return 'Male'
     else if( parseInt(value)===2 )
          return 'Female'
     else if( parseInt(value)===3 )
          return 'Others'
  }

  const formatMarriedStatus = (value)=>{

    if( parseInt( value )===1)
        return 'Married'
    else if( parseInt(value)===2 )
        return 'Not Married'
 }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor:'black',color:'white',fontWeight:'600'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {
          stuffs && stuffs.length!==0 && stuffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              
               return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                          {
                            column.id === 'gender' ?   formatGender(value)   :
                            column.id === 'designation' ?  value.departmentName  :
                            column.id === 'maritial_Status' ?   formatMarriedStatus(value)   :

                            column.id === 'Delete' || column.id === 'Edit' ?
                              <Button
                                  
                                  color={ column.id === 'Edit' ? 'primary' : 'secondary' }
                                  onClick = { ()=>settings( row._id , column.id ) }
                              >
                                  { column.id }
                              </Button>
                              :
                              column.id === 'snap_shot' ? 
                                  <a href={value} target='_blank'>Click</a>
                              :
                                  column.format &&
                                  typeof value === 'number' ? column.format(value) : 
                                  column.id === 'DOB' || column.id === 'joining_Date' ? value?.split('T')[0] : value
                          }
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={stuffs?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
