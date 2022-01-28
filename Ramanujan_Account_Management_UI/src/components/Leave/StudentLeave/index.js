import React from 'react'
import Table from "../Table";
import Sort from "../../shared/Sort"
import Search from "../../shared/search"
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import {useDispatch,useSelector} from "react-redux"
import {handleChangeInfo} from "../../../redux/actions/leaveApp.action"
import {useHistory} from "react-router-dom"
import { Toastify } from '../../../App';
//addnewLeave
const useStyle = makeStyles(() => ({
   
    button:
    {
       width:'96%',
       margin:'20px auto', 
    },
    select:{
        width:'97%',
        margin:'2rem auto',
    }
  }));

function StudentLeave() {
    const dispatch = useDispatch()
    const history=useHistory();
    const leaveApp = useSelector(state => state.leaveApp)
    const auth = useSelector(state => state.auth)

    const [states,setStates]=React.useState({
        standard:"all",
        section:"all",
        student:"all",
        session:"all"
    });

    const {
        standard,
        section,
        student,
        session
    } = states

    const [
        filterStudents, setFilterStudents
    ] = React.useState(null)

    const handleChange=(e)=>{
        setStates({
            ...states,
            [e.target.name]:e.target.value
        })   
    }

    React.useEffect(() => {            
        dispatch(handleChangeInfo(auth?.user?.adminType?._id,states))
    }, [states.standard,states.section])

    React.useEffect(() => {    

          if( !leaveApp.leaveAppStudentsList || leaveApp.leaveAppStudentsList.length===0 )return
         
          setFilterStudents(
               
            leaveApp.leaveAppStudentsList?.filter((item)=>( 
                  ( standard=='all' || item.standard==auth?.user?.adminType?.classes[ standard ]?.class ) &&
                  ( section=='all' || item.section==section ) && 
                  ( session=='all'  || item.session==session )
          ))
        )
    }, [leaveApp.leaveAppStudentsList,   standard, section, session])
    
    const classes = useStyle();
    return (
        <div>
        <Grid container className={classes.select} spacing={3}>

            <Grid md={3} lg={3} item>
               <Sort value={states.session} name={"session"} onChange={handleChange} Session="true" all={true}/>
            </Grid>

            <Grid  md={3} lg={3}  item>
            <Sort value={states.standard} name={"standard"} onChange={handleChange} Class="true" all={true}/>
            </Grid>
            <Grid  md={3} lg={3}  item>
            <Sort classIndex={states.standard} value={states.section} name={"section"} onChange={handleChange} Section="true" all={true}/>
            </Grid>
            <Grid  md={3} lg={3}  item>
            <Sort value={states.student} name={"student"} onChange={handleChange}  StudentsList={ filterStudents ? filterStudents : leaveApp.leaveAppStudentsList} Student="true" Student/>   
            </Grid>

        </Grid>
          <div className={classes.button}>
              <Button onClick={()=>{
                  if(states.student==""||states.student==null||states.student==undefined)
                     return Toastify("error","Select a student")
                  history.push(`/addnewLeave?id=${states.student}&modelOf=StudentCollege`)}} color="primary" variant="contained">Add New Leave</Button>
          </div>

          <div className={classes.table}>
              <Table />
          </div> 
           
        </div>
    )
}

export default StudentLeave
