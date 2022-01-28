import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Button, Modal} from '@material-ui/core';
import Table from '../../pages/LeaveRequests'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '90vw',
      margin: '3rem auto'
    },
    gridContainer: {
      margin: '.5rem auto'
    },
    twoInputs: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    },
    sixColGrid: {
      margin: theme.spacing(4, 0)
    },
    modalC: {
      width: '700px',
      margin: '0 auto',
      background: '#fff',
      overflowX: 'hidden',
      height: 'auto',
      marginTop: '1.5rem',
    },
    headingC: {
      background: '#68dff0',
      padding: theme.spacing(3),
      color: '#fff',
      letterSpacing: '1px',
      marginBottom: '0',
    },
    tableC: {
      margin: '0 auto',
      width: "95%",
      marginBottom: '1rem',
      marginTop: '0',
    },
    btnC: {
      padding: '1rem 0',
      display: 'flex',
      justifyContent: 'space-around',
    },
  }));
  
  const modalCols = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'Rollno',
      label: 'Roll no',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'class',
      label: 'Class',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'Reason',
      label: 'Year',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'Fromdate',
      label: 'Fromdate',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'Todate',
      label: 'To date',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'operation',
      label: 'Operation',
      minWidth: 100,
      align: 'left'
    },
  ];
  
  function createModalData(
    month,
    year,
    due_date,
    amount,
  ) {
    return {
      month,
      year,
      due_date,
      amount
    };
  }
  const modalRows = [
    createModalData(
      '09', '2021', '09-08-2023', '10000.00'
    ),
  ]

function LeaveReq() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
            >
                <div className={classes.modalC}>
                    <div className={classes.headingC}>
                        <h3></h3>
                    </div>
                    <div className={classes.TableC}>
                        <Table rows={modalRows} columns={modalCols} pagination='false' />
                    </div>
                    <div className={classes.btnC}>
                        <Button type='button' variant='contained' color='default'>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default LeaveReq
