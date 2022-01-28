import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DatePic from '../Datepicker';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
    margin: '.5rem auto'
  },
}));

const SectionOne = ({ From_Date, setFrom_Date, To_date, setTo_Date, department }) => {
    const classes = useStyles();

    return (
      <div style={{ width: '96%', margin: '0 auto' }}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} md={6} lg={3}>
            <DatePic label='From Date' name='From_Date' value={From_Date} onChange={(e)=>setFrom_Date(e.target.value)}/>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DatePic label='To date' name='To_date' value={To_date} onChange={(e)=>setTo_Date(e.target.value)}/>
          </Grid>
        </Grid>
  
        <Link 
             to = { `/CashbookTable?From_Date=${From_Date}&To_date=${To_date}&Department=${department}` }
             target="_blank" rel="noopener noreferrer"
          >
              <Button
                  style={{ marginLeft: '1rem' }}
                  variant='contained'
                  color='primary'
                  size='small'
             >
                Print This
             </Button>
          </Link>
      
        <Link to="/cashbook/daily" style={{textDecoration:'none'}}>
        <Button
          style={{ marginLeft: '1rem' }}
          variant='contained'
          color='default'
          size='small'
        >
         Get Daily Report
        </Button>
        </Link>

      </div>
    );
}

export default SectionOne
