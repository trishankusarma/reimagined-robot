import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
   Paper , Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, RadioGroup,FormControlLabel,Radio,
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    margin:'auto',
    marginTop: '1rem',
  },
  container: {
    minHeight: 200,
    height: 'auto',
}
});

const formatGender = (value)=>{
    
  switch (value) {
    case 0:
      return 'Male'
  
    case 1:
      return 'Female'
    
    case 2:
      return 'Others'
      
    default:
      break;
  }
}


export default function StickyHeadTable({columns, rows, pagination, editId, setEditId, deleteId, setDeleteId, setFormData, data , handleOperation, hostelStudent, handleOpen, setSelectedId, handleChangeMark }) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1000);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).reverse().map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    
                    return (
                      <TableCell key={column.id} align={column.align}>
                        { 
                          //  column.id==='Is_Fourth' ? value===true ? 'False' : 'True' :
                           column.id==='DOB' ?   value.split('T')[0]   :
                           column.id === 'Mark' ? 
                              <RadioGroup name="Attendence" value={value} onChange={(e)=>handleChangeMark(e,row._id)}  style={{display:'flex', flexDirection:'row'}}>
                              
                                  <FormControlLabel value="present" name="present" control={<Radio />} label="P" />
                                  <FormControlLabel value="absent" name="absent" control={<Radio />} label="A" />
                              </RadioGroup> :

                           column.id === 'AddMarks' ?
                             <Button color="primary" variant="outlined" size="small" onClick={()=>{
                                 
                                  setSelectedId({ _id:row._id, AddMarks: row.AddMarks })
                                  handleOpen(row._id, row.AddMarks )
                             }}>{value}</Button> :
                           column.id === 'Upload_file' ?
                           <a href={value} target='_blank'> 
                               Photo
                           </a> :
                           column.id === 'Edit' || column.id === 'Delete' || column.id === 'Select' || column.id === 'Print'  ? 
                           <Button
                             
                             color={ column.id === 'Edit' ? 'primary' : column.id === 'Delete' ?  'secondary' : 'default' }
                             onClick = {()=>handleOperation(row, column.id)}
                           >
                               {column.label}
                           </Button> :
                           column.id === 'Occupancy_Allowed' || column.id==='gender' ? formatGender(value) :
                           column.format && typeof value === 'number' ? column.format(value) : value
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
      {pagination &&
      <TablePagination
        rowsPerPageOptions={[10, 50,100,200,300]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
}
    </Paper>
  );
}
