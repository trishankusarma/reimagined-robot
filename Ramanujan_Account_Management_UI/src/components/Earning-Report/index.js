import React,{useRef} from 'react'
import { Grid, makeStyles,Button,Typography} from '@material-ui/core';
import DatePicker from '../Datepicker';
import { Link } from 'react-router-dom';
import ReactToPrint from "react-to-print";

import Tables from '../../pages/Slip/Earning-Report';

const useStyles = makeStyles({
    root: {
        width: '96%',
        margin: '1rem auto',
    },
    intro:{
        width:'50%',
        margin:'1rem auto',
        fontSize:'1.6rem',
        fontWeight:'600',
        textAlign:'center',
        color:'black'
    }
});
function EarningRep({ basicDetails , handleChange, income, extraIncome , expenses, salaryExpenses, eventExpenses, totalEventExpenses, totalExpenditureExpenses ,totalSalaryExpenses, totalIncomes , totalExtraIncome }) {
    const classes = useStyles();
    const componentRef=useRef();
    console.log(basicDetails)

    const {
        FromDate, ToDate
    } = basicDetails

    return (
        <div className={classes.root}>
        
         <div>
         <Grid container spacing={4}>
         <Grid item xs={4} md={4} lg={4}>
         <DatePicker label="from date" name='FromDate' value={FromDate} onChange={handleChange}/>
         </Grid>
         <Grid item xs={4} md={4} lg={4}>
         <DatePicker label="To date" name='ToDate' value={ToDate} onChange={handleChange}/>
         </Grid>
         </Grid>
         </div>
         <div stylr="margin:'1rem auto">
         <Grid container spacing={3}>
         <Grid item>
         <div className={classes.outsideBorder}>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" >
              print This
            </Button>
          )}
          content={() => componentRef.current}
        />
      </div>

         </Grid>
         <Grid item>
         <Link to="/cashbook">
         <Button variant="contained" color="primary">CashBook</Button>
         </Link>
         </Grid>
         </Grid>
         </div>
         <hr style={{margin:'1rem auto'}} ></hr>
        <div>
        <div ref={componentRef}>
        <div className={classes.intro}>
          <p>Ramanujan Academy</p>
          <p>Baihata Chariali</p>
          <p>Kamrup, Assam-781381</p>
          <p>Date: {FromDate} to {ToDate} </p>
        </div>
        <hr style={{margin:'1rem auto'}} ></hr>
        <Grid  container spacing={4}>

                <Tables income={income} extraIncome={extraIncome} expenses={expenses} salaryExpenses={salaryExpenses} eventExpenses={eventExpenses} />
        
            </Grid>
            <hr style={{margin:'1rem auto'}} ></hr>

        <Typography variant="h5">Total Incomes  : { totalIncomes + totalExtraIncome }</Typography>
        <Typography variant="h5">Total Expense: { totalEventExpenses + totalExpenditureExpenses + totalSalaryExpenses }</Typography>
        <Typography variant="h5">Total Profit : { totalIncomes + totalExtraIncome  - ( totalEventExpenses + totalExpenditureExpenses + totalSalaryExpenses )} </Typography>

            </div>
        </div>
        
        </div>
    )
}

export default EarningRep
