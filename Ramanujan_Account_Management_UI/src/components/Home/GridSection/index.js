import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Modal, Button, Paper, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { useSelector,useDispatch } from 'react-redux';
import Grid1 from './Grid1';
import BigButton from '../../shared/Buttons/BigButton';
import Table from '../../shared/Table';
import axios from "../../../helpers/axios";
import {deleteLeaveApplication} from "../../../redux/actions"
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    background: 'blue'
  },
  grid: {
    width: '94%',
    margin: '1rem auto',
    padding: '1rem 0'
  },
  modalC: {
    width: '700px',
    margin: '0 auto',
    background: '#fff',
    overflowX: 'hidden',
    height: 'auto',
    marginTop: '1.5rem'
  },
  headingC: {
    background: '#68dff0',
    padding: theme.spacing(3),
    color: '#fff',
    letterSpacing: '1px',
    marginBottom: '0'
  },
  tableC: {
    margin: '0 auto',
    width: '95%',
    marginBottom: '1rem',
    marginTop: '0'
  },
  btnC: {
    padding: '1rem 0',
    display: 'flex',
    justifyContent: 'space-around'
  },
  paper2: {
    padding: theme.spacing(2),
    color: 'white',
    background: 'transparent',
    textAlign: 'center',
    height: '6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: '600',
    letterSpacing: '1px'
  },
  btn: {
    background: 'none',
    border: 'none',
  },
  btn1: {
    backgroundColor: '#d9534f',
    border: '1px solid #d43f3a',

    '&:hover': {
      backgroundColor: '#c9302c',
      border: '1px solid #ac2925'
    }
  }
}));

const modalCols = [
  {
    id: 'month',
    label: 'Month',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'year',
    label: 'Year',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'due_date',
    label: 'Due date',
    minWidth: 200,
    align: 'left'
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 200,
    align: 'left'
  }
];



export default function GridSection() {
  
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const [access, setAccess] = React.useState([]);
  const [leaveReq, setLeaveReq] = React.useState([]);
  const dispatch = useDispatch()
  function createModalData(name,Reason, Fromdate, Todate, operation) {
    return {
      name,Reason, Fromdate, Todate, operation
    };
  }

  React.useEffect(()=>{
    setAccess(auth?.user.access)
  },[auth])

  const deleteApplication=async(id,modelOf,department)=>{

  let data =await dispatch(deleteLeaveApplication(id,modelOf,department));
  let info =[];
    for(let i =0;i<data.length;i++){
      info.push(createModalData(
        data[i]?.id?.name,
        data[i]?.reason,
        data[i]?.From_Date?.split("T")[0],
        data[i]?.To_date?.split("T")[0],
        <Button onClick={()=>{deleteApplication(data[i]?._id,data[i]?.modelOf,auth?.user?.adminType?._id)}}>Delete</Button>
        ))
    }
    setLeaveReq(info)
  }

  React.useEffect(async()=>{
    let data =await axios().get("/leaveApp/getAllApplication/"+auth?.user?.adminType?._id);
    let info =[];
    
    for(let i =0;i<data.data?.data.length;i++){
      info.push(createModalData(
        data?.data?.data[i]?.id?.name,
        data.data?.data[i]?.reason,
        data.data?.data[i]?.From_Date?.split("T")[0],
        data.data?.data[i]?.To_date?.split("T")[0],
        <Button onClick={()=>{deleteApplication(data.data?.data[i]?._id,data.data?.data[i]?.modelOf,auth?.user?.adminType?._id)}}>Delete</Button>
        ))
    }

    setLeaveReq(info)
  },[])

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const modalColsLeave = [
    {
      id: 'name',
      label: 'Name',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'Reason',
      label: 'Reason',
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
  
  // const modalRowsLeave = [
  //   createModalData('1', '1', '1-08-2023', '10000.00','10000.00','10000.00','10000.00'),
  // ];
  const modalRows = [
    createModalData('1', '1', '1-08-2023', '10000.00','10000.00','10000.00','10000.00'),
  ];
  const bigGridData = [
    {
      title: 'Add Admin',
      to: 'adminDesh'
    },
    {
      title: 'New Admission',
      to: 'admission'
    },
    {
      title: 'Attendence',
      to: 'uploadAttendance'
    },
    {
      title: 'Fee Payment',
      to: 'fee-payment'
    },
    {
      title: 'Send Notification',
      to: 'send-notification'
    },
    {
      title: 'New Staff',
      to: 'StaffRegistration'
    },
    {
      title: 'Leave Application',
      to: 'leavedash'
    },
    {
      title: 'Report',
      to: 'ReportDesh'
    },
    {
      title: 'Expiry And Balance',
      to: 'expiry-balance'
    },
    {
      title: 'Expenditure',
      to: 'expenditure'
    },
    {
      title: 'Generate pay slip',
      to: 'salary-slip'
    },
    {
      title: 'EVENT MANAGEMENT',
      to: 'event-management'
    },
    {
      title: 'STUDENT MARKS',
      to: 'student-marks'
    },
    {
      title: 'PROMOTION',
      to: 'promotion'
    },
    {
      title: 'NOTICES & UPLOADS',
      to: 'notices'
    },
    {
      title: 'Leave Requests',
      to: '',
      handleOpen: {handleOpen},
    },
    {
      title: "Student's Marks Entry",
      to: 'MarksEntry'
    },
    {
      title: 'Cashbook',
      to: 'cashbook'
    },
    {
      title: 'Add Hostel',
      to: 'addhostel'
    },
 
    {
      title: 'Add Hostel Student',
      to: 'HostelStudent'
    }
  ];

  return (
    <div className={classes.root}>
      <Grid1 />
      <Divider />
      <div className={classes.grid}>
        <Grid container spacing={6}>
        {auth?.user?.isSuperAdmin?bigGridData.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} lg={3}>
                {item.title === 'Leave Requests' ? (
                  <Button
                    fullWidth
                    className={`${classes.btn} ${classes.btn1}`}
                    onClick={handleOpen}
                  >
                    <Paper elevation={0} className={classes.paper2}>
                      <Typography className={classes.title}>
                        {item.title}
                      </Typography>
                    </Paper>
                  </Button>
                ) : (
                  <BigButton item={item} index={index} />
                )}
              </Grid>
            );
          }):access?.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} lg={3}>
                <BigButton item={item} index={index} />
              </Grid>
            );
          })}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            <div className={classes.modalC}>
              <div className={classes.headingC}>
                <h3>Installments</h3>
              </div>
              <div className={classes.TableC}>
                <Table
                  rows={modalRows}
                  columns={modalCols}
                  pagination='false'
                />
              </div>
              <div className={classes.btnC}>
                <Button type='button' variant='contained' color='primary'>
                  Add New
                </Button>
                <Button type='button' variant='contained' color='secondary'>
                  Remove From Bottom
                </Button>
                <Button type='button' variant='contained' color='default'>
                  Close
                </Button>
              </div>
            </div>
          </Modal>
        </Grid>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div className={classes.modalC}>
          <div className={classes.headingC}>
            <h3>Leave Requests</h3>
          </div>
          <div className={classes.TableC}>
            <Table data={leaveReq} columns={modalColsLeave} pagination='false' />
          </div>
          <div className={classes.btnC}>            
            <Button type='button' variant='contained' color='default'>
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <div className={classes.modalC}>
          <div className={classes.headingC}>
            <h3>Leave Requests</h3>
          </div>
          <div className={classes.TableC}>
            <Table rows={modalRows} columns={modalCols} pagination='false' />
          </div>
          <div className={classes.btnC}>
            <Button type='button' variant='contained' color='primary'>
              Add New
            </Button>
            <Button type='button' variant='contained' color='secondary'>
              Remove From Bottom
            </Button>
            <Button type='button' variant='contained' color='default'>
              Close
            </Button>
          </div>
        </div>
      </Modal> */}
    </div>
  );
}
