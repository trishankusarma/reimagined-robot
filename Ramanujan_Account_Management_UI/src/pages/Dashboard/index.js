import { Button } from '@material-ui/core'
import React from 'react'
import DashBoard from '../../components/DashBoard'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    Button:{
        width:'60%',
        margin:'1rem auto'
    }
    
}));

function DashboardCrystal() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.Button}>
                <Button variant="contained" style={{backgroundColor:'#31B0D5',color:'white'}}>DownLoad Admission balance List</Button>
            </div>
            <div>
            <DashBoard name1="students" value1="1000" name2="Add New" value2="1200" icon1="people" icon2="business"/>
            <DashBoard name1="Collection" value1="0" name2="payment" value2="30000000" icon1="money" icon2="payment"/>
            <DashBoard name1="Attendence" value1="%NA" name2="Add Attendence" value2="0" icon1="airplay" icon2="airplay"/>
            <DashBoard name1="Expenses" value1="10000" name2="New Earning" value2="1200" icon1="money" icon2="money"/>
            </div>     
        </div>
    )
}

export default DashboardCrystal
