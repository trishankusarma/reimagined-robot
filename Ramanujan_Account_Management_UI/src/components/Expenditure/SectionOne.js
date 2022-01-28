import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatePickers from '../Datepicker';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from '@material-ui/core';
import {expenditureCreate, expenditureEdit} from "../../redux/actions";
import {useDispatch,useSelector} from "react-redux";
import {Toastify} from "../../App";
import moment from 'moment';
const useStyles = makeStyles(() => ({
  gridContainer: {
    width: '98vw',
    margin: '1rem auto'
  }
}));

const SectionOne = () => {

  const classes = useStyles();
  const auth = useSelector(state => state.auth)
  const admin = useSelector(state => state.admin)
  const [formData, setFormData] = useState({
    particulars: admin.expenditureInitValue.particulars,
    amount: admin.expenditureInitValue.amount,
    date: admin.expenditureInitValue.date,
    paymentMode: admin.expenditureInitValue.paymentMode,
    cashMode: admin.expenditureInitValue.cashMode,
    remarks: admin.expenditureInitValue.remarks,
    department:admin.expenditureInitValue.department
  });
React.useEffect(()=>{

  if( admin.expenditureInitValue.amount  ){
     
    localStorage.setItem('previousExpenditure', admin.expenditureInitValue.amount);
  }

  setFormData({
    particulars: admin.expenditureInitValue.particulars,
    amount: admin.expenditureInitValue.amount,
    date: admin.expenditureInitValue.date,
    cashMode: admin.expenditureInitValue.cashMode,
    paymentMode: admin.expenditureInitValue.paymentMode,
    remarks: admin.expenditureInitValue.remarks,
  })
},[admin.expenditureInitValue.particulars,admin.expenditures])
  const { particulars, amount, date, paymentMode, remarks , cashMode } = formData;

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch()

const Submit=()=>{
  if(!formData.particulars||!formData.amount||!formData.date){
    return Toastify("error","All fields required !");
  }
  let amount=formData.amount
  console.log(formData.cashMode,"formData.cashMode")
  if(formData.cashMode=='expenditure'){
    amount=amount;
    
  }else if(formData.cashMode=='income'){
    amount=-amount
  }
  if(admin.expenditureInitValue.particulars!=""){
  
    return dispatch(expenditureEdit({...formData,amount:amount,department:auth.user.adminType._id},admin.expenditureInitValue._id , localStorage.getItem('previousExpenditure')))
  }
  dispatch(expenditureCreate({...formData,amount:amount,department:auth?.user?.adminType?._id}));
  setFormData({
    particulars: '',
    amount: '',
    cashMode: '',
    paymentMode: 'cash',
    date:moment().format('YYYY-MM-DD'),
    remarks: ''
  })
}
  return (
    <form>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item sm={12} md={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='particulars'
            value={particulars}
            onChange={(e) => changeHandler(e)}
            placeholder='Particulars:'
            label='Particulars:'
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='amount'
            value={amount}
            onChange={(e) => changeHandler(e)}
            placeholder='*Amount:'
            label='*Amount:'
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <DatePickers
            name='date'
            value={date}
            onChange={(e) => changeHandler(e)}
            label='Date'
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <FormControl variant='outlined' fullWidth size='small'>
            <InputLabel id='PaymentMode'>Payment Mode:</InputLabel>
            <Select
              id='PaymentMode'
              name='paymentMode'
              value={paymentMode}
              onChange={(e) => changeHandler(e)}
              label='PaymentMode'
            >
              <MenuItem value='cash'>Cash</MenuItem>
              <MenuItem value='bank'>Bank</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={3}>
          <FormControl variant='outlined' fullWidth size='small'>
            <InputLabel id='cashMode'>Mode of cash:</InputLabel>
            <Select
              id='cashMode'
              name='cashMode'
              value={cashMode}
              onChange={(e) => changeHandler(e)}
              label='cashMode'
            >
              <MenuItem value='expenditure'>Expenditure</MenuItem>
              <MenuItem value='income'>Income</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={3}>
          <TextField
            id='outlined-multiline-static'
            label='Remarks:'
            multiline
            rows={4}
            name='remarks'
            value={remarks}
            onChange={(e) => changeHandler(e)}
            placeholder='Remarks:'
            variant='outlined'
            fullWidth
          />
        </Grid>
      </Grid>
      <Button
        style={{ marginLeft: '1.8vw' }}
        variant='contained'
        color='primary'
        onClick={()=>{
          Submit()
        }}
      >
        Submit
      </Button>
    </form>
  );
};

export default SectionOne;
