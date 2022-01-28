import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import GroupIcon from '@material-ui/icons/Group';
import GavelIcon from '@material-ui/icons/Gavel';
import { Link } from 'react-router-dom';

import { Toastify } from "../../../App";
import axios from "../../../helpers/axios";

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    background: '#303F9F',
    height: '6rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
    // border: '1px solid #68dff0',
  },
  link: {
    textDecoration: 'none'
  },
  typography: {
    letterSpacing: '1px'
  },
  grid: {
    width: '94%',
    margin: '1rem auto',
    // background: 'red',
    padding: '1rem 0'
  }
}));

const Grid1 = () => {
    const classes = useStyles();

    const auth = useSelector(state => state.auth)

    const[ gridData, setGridData ] = useState( [
      {
        title: 'Students',
        icon: <GroupIcon style={{ fontSize: '3rem' }} />,
        total: 0,
        to:'/StudentList'
      },
      {
        title: 'Staff',
        icon: <GroupIcon style={{ fontSize: '3rem' }} />,
        total: 0,
        to:'/StaffList'
      },
      {
        title: 'Earnings',
        icon: <div style={{ fontSize: '3rem', marginBottom: '-10px' }}>&#8377;</div>,
        total: 0,
        to:'/earning-report'
      },
      {
        title: 'Students / Staff',
        icon: <GavelIcon style={{ fontSize: '3rem' }} />,
        total: 0,
        to:'/StudentAttend'
      }
    ]);

    React.useEffect( async ()=>{

        if( !auth?.user?.adminType?._id )
                 return

        try {
          
            const res =  await axios().get('/admin/getIntitialValues/'+auth?.user?.adminType?._id)

            console.log(
                res.data
            )

            if(  res.data.Earnings )
                    res.data.Earnings = parseInt( res.data.Earnings[0].closing_cash_in_hand ) +  parseInt( res.data.Earnings[0].closing_cash_in_bank );

            if( res.status==200 ){
                
                setGridData(

                  gridData.map((item)=>{
                    
                    return{
                         ...item,
                         total : res.data[ item.title ]
                    }
                 })
                )
            }else{

              Toastify('error', 'Something went wrong!!')
            }
        } catch (error) {
            
            Toastify('error', 'Something went wrong!!')
        }
    }, [ auth?.user?.adminType?._id ])

    return (
      <div className={(classes.grid1, classes.grid)}>
        <Grid container spacing={6}>
          {gridData.map((item) => {
            return (
              <Grid item xs={12} sm={6} lg={3}>
                <Link to={item.to} className={classes.link}>
                  <Paper className={classes.paper}>
                    <div>
                      {item.icon}
                      <Typography className={classes.typography}>
                        {item.title}
                      </Typography>
                    </div>
                    <Divider
                      orientation='vertical'
                      flexItem
                      style={{ background: 'white' }}
                    />
                    <Typography className={classes.typography}>
                        { item.total }
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
}

export default Grid1
