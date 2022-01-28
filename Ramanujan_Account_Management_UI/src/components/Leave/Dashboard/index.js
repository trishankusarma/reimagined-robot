import { Button, Grid} from '@material-ui/core'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridShared from '../../shared/Buttons/BigButton'
import axios from "../../../helpers/axios";
import {useSelector} from "react-redux"
const useStyles = makeStyles((theme) => ({
    root:{
        width:'60%',
        margin:'1.4rem auto'
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

const item1 = {
    title:"Stuents Leave",
    to:'leavedash/leaveStudent'
}
const item2 = {
    title:"Teachers Leave",
    to:'leavedash/leaveTeacher'
}

function DashBoard() {
    const classes = useStyles();
    const auth = useSelector(state => state.auth)
    const [Lenght,setLenght]=React.useState({
        student:[],
        stuff:[]
    })
    React.useEffect(async()=>{
        let student =await axios().get(`/leaveApp/getAllLeaveApplication/StudentCollege/${auth?.user?.adminType?._id}`);
        let stuff = await axios().get(`/leaveApp/getAllLeaveApplication/Stuff/${auth?.user?.adminType?._id}`);
        setLenght({
            student:student.data.data,
            stuff:stuff.data.data
        })
        console.log(Lenght.student.length,Lenght.stuff.length,"Lenght.student.length")
    },[Lenght.student.length])
    return (
        <div className={classes.root}>
           <Grid container>
              <Grid sm={12} md={5} className={classes.paper}>
              <GridShared item = {item1} index="1"/>
              <Button className={classes.paper}> Student on leave : {Lenght.student.length}</Button>
              </Grid>
              <Grid sm={12} md={5} className={classes.paper}>
              <GridShared item = {item2} index="2" />
              <Button className={classes.paper}> Teachers on leave : {Lenght.stuff.length}</Button>
              </Grid>
           </Grid> 
        </div>
    )
}

export default DashBoard
