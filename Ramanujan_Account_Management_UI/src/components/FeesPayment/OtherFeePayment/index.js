import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import DatePic from '../../Datepicker';
import Table from '../../shared/Table';
import {useDispatch,useSelector} from "react-redux"
import {DeleteotherFeePayment, otherFeePayment, searchFeePayment} from "../../../redux/actions"
import queryString from "query-string"
import {useHistory} from "react-router-dom"
import { Toastify } from '../../../App';
const SButton = styled.button`
  background: transparent;
  border: none;
  color: #428bca;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    color: #2a6496;
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '96%',
    margin: '2rem auto'
  },
  table1: {
    height: '30vh',
    margin: '2rem 0'
  },
  formC: {
    margin: '2rem 0'
  },
  table2: {
    height: '30vh',
    margin: '2rem 0'
  },
  gridC: {
    margin: theme.spacing(0.5, 0),
  }
}));

const cols1 = [
  { field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'enrollmentNo',
    headerName: 'Enrollment No.',
    width: 180,
    editable: false,
    align: 'left',
  },
  { field: 'name', headerName: 'Name', width: 200, align: 'left', editable: false, },
  {
    field: 'address',
    headerName: 'Address',
    width: 200,
    align: 'left', editable: false,
  },
  {
    field: 'mobile',
    headerName: 'Mobile No.',
    width: 150,
    align: 'left', editable: false,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 190,
    align: 'left', editable: false,
  },
  {
    field: 'session',
    headerName: 'Session',
    width: 200,
    align: 'left', editable: false,
  },
  {
    field: 'standard',
    headerName: 'Class (Section)',
    width: 200,
    align: 'left', editable: false,
  }
];


const cols2 = [
  { id: 'date', label: 'Date', minWidth: 100, align: 'left' },
  { id: 'particular', label: 'Particular', minWidth: 150, align: 'left' },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'printField',
    label: 'Print',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'deleteField',
    label: 'Delete',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'editField',
    label: 'Edit',
    minWidth: 100,
    align: 'left'
  }
];

function createTable2(
  date,
  particular,
  amount,
  printField,
  deleteField,
  editField,
) {
  return {
    date,
    particular,
    amount,
    printField,
    deleteField,
    editField
  };
}

const rows2 = [
  // createTable2(
  //   '07-09-2002',
  //   '3rd semester Fee',
  //   '10000.00',
  //   'Shivam Kumar',
  //   '<SButton>Print</SButton>',
  //   '<SButton>Delete</SButton>',
  //   '<SButton>Edit</SButton>',
  // ),
];

export default function OtherPaymentSection () {
  const cash = useSelector(state => state.cash)
  const auth = useSelector(state => state.auth)
  const [rows,setRows]=React.useState([])
  const dispatch = useDispatch()
  const classes = useStyles();
  const history=useHistory()
  const {rollNo}=queryString.parse(history.location.search);
  const [formData, setFormData] = useState({
    particular: '',
    date: '',
    amount: '',
    paymentMode: 'cash'
  });

  const rows1 = [
    {
        id: 1,
      enrollmentNo:auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.admissionNo:cash?.studentFeeInfo?.admissionNo ,
      name: auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.name:cash?.studentFeeInfo?.name,
      address: auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.address:cash?.studentFeeInfo?.address,
      mobile: auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.mobileNo:cash?.studentFeeInfo?.mobileNo,
      email: auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.email:cash?.studentFeeInfo?.email,
      session: auth?.user?.adminType?.departmentName=="Hostel"?`Class ${auth?.user?.adminType?.departmentName} (${cash?.studentFeeInfo?.student?.session})`:`Class ${auth?.user?.adminType?.departmentName} (${cash?.studentFeeInfo?.session})`,
      standard: auth?.user?.adminType?.departmentName=="Hostel"?`Class ${cash?.studentFeeInfo?.student.standard} (${cash?.studentFeeInfo?.student?.section})`:`Class ${cash?.studentFeeInfo?.standard} (${cash?.studentFeeInfo?.section})`,
    },
  ];
  
  const { particular, date, amount, paymentMode } = formData;

  const changeHandler = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };

  React.useEffect(()=>{
    dispatch(searchFeePayment(auth.user.adminType._id,rollNo));
  },[])
const Delete=(feeId,id)=>{
  dispatch(DeleteotherFeePayment(feeId,id));
}

  React.useEffect(()=>{
    let data =[];
    if(cash?.previousPayment?.otherPayment?.length==rows.length){
      return         
    }else{
      for(let i = 0;i<cash?.previousPayment?.otherPayment?.length;i++){
          data.push(createTable2(
            cash?.previousPayment?.otherPayment[i]?.date,
            cash?.previousPayment?.otherPayment[i]?.particular,
            cash?.previousPayment?.otherPayment[i]?.amount,
            <SButton onClick={()=>{}} >Print</SButton>,
            <SButton onClick={()=>{
                Delete(cash.previousPayment._id,cash?.previousPayment?.otherPayment[i]?._id)
            }}>Delete</SButton>,
            <SButton>Edit</SButton>,
          ))
      }
      setRows(data);
    }
    
  },[cash?.previousPayment?.otherPayment])


const Submit=()=>{
  dispatch(otherFeePayment(formData,auth.user.adminType._id,cash?.studentFeeInfo,history,auth?.user?.adminType?.departmentName))
}
    return (
      <div className={classes.root}>
        <div className={classes.table1}>
          <DataGrid
            rows={rows1}
            columns={cols1}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
        <div className={classes.formC}>
          <form>
            <Grid container spacing={3} className={classes.gridC}>
              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  variant='outlined'
                  size='small'
                  name='particular'
                  value={particular}
                  fullWidth
                  
                  onChange={changeHandler}
                  label='Particular: '
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <DatePic
                  label='Dated: '
                  name='date'
                  type="datetime-local"
                  value={date}
                  onChange={changeHandler}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4}>
                <TextField
                  variant='outlined'
                  size='small'
                  name='amount'
                  value={amount}
                  fullWidth
                  onChange={changeHandler}
                  label='Amount: '
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <FormControl variant='outlined' fullWidth size='small'>
                  <InputLabel id='PaymentMode'>Payment Mode:</InputLabel>
                  <Select
                    id='paymentMode'
                    value={paymentMode}
                    name="paymentMode"
                    onChange={changeHandler}
                    label='Payment Mode:'
                  >
                    <MenuItem value='cash'>Cash</MenuItem>
                    <MenuItem value='bank'>Bank</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button onClick={()=>{
              if(cash?.wait){
                Toastify("warning","wait fee payment is in process")
                return
              }
              Submit()
            }} variant='contained' color='primary' size='small' >{cash?.wait?"Wait.....":"Submit"}</Button>
          </form>
        </div>
        {/* <div className={classes.table2}>
          <Table rows={rows} columns={cols2} pagination={true} />
        </div> */}
      </div>
    );
}

