import {Grid} from '@material-ui/core'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridShared from '../../shared/Buttons/BigButton';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root:{
        width:'60%',
        margin:'1.4rem auto',
        height:'75vh'
    },
    paper:
    {
       margin:'10px 10px'
    },
    icon:
    {
       fontSize:'4rem'
    }
}));


function DashBoard() {
    const classes = useStyles();


const item1 = {
    title:"Add Admin",
    to:'adminDesh/addAdmin'
}
const item2 = {
    title:"Add department",
    to:'adminDesh/addDepartment'
}
const item3 = {
    title:"Admin List",
    to:'AdminList'
}
const item4 = {
    title:"Department List",
    to:''
}
    return (
        <div className={classes.root}>
           <Grid container>
              <Grid sm={12} md={5} lg={5} className={classes.paper}>
              <GridShared item = {item1} index="1"/>
              </Grid>
              <Grid sm={12} md={5} lg={5} className={classes.paper}>
              <GridShared item = {item2} index="2" />
              </Grid>
              <Grid sm={12} md={5} lg={5} className={classes.paper}>
              <GridShared item = {item3} index="3" />
              </Grid>
              <Grid sm={12} md={5} lg={5} className={classes.paper}>
              <GridShared item = {item4} index="4" />
              </Grid>
           </Grid> 
        </div>
    )
}

export default DashBoard
