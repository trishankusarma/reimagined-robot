import { Grid, Paper, Typography } from '@material-ui/core'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Icon} from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root:{
        width:'60%',
        margin:'1.4rem auto'
    },
    paper:
    {
        width:'400px',
        height:'120px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        backgroundColor:'#0089FF',
        color:'#fff',
    },
    icon:
    {
       fontSize:'4rem'
    }
}));

function DashBoard(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
           <Grid container>
              <Grid md={6}>
                 <Paper className={classes.paper}>
                    <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                    <Icon className={classes.icon}>{props.icon1}</Icon>
                    <Typography style={{fontSize:'1.2rem',fontWeight:'600'}}>{props.name1}</Typography>
                    </div>
                    <div style={{height:'80%',width:'1px',backgroundColor:'#fff'}}></div>
                    <Typography style={{fontSize:'1.2rem',fontWeight:'600'}}>{props.value1}</Typography>
                 </Paper>
              </Grid>
              <Grid md={6}>
                 <Paper className={classes.paper}>
                    <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                    <Icon className={classes.icon}>{props.icon2}</Icon>
                    <Typography style={{fontSize:'1.2rem',fontWeight:'600'}}>{props.name2}</Typography>
                    </div>
                    <div style={{height:'80%',width:'1px',backgroundColor:'#fff'}}></div>
                    <Typography style={{fontSize:'1.2rem',fontWeight:'600'}}>{props.value2}</Typography>
                 </Paper>
              </Grid>
           </Grid> 
        </div>
    )
}

export default DashBoard
