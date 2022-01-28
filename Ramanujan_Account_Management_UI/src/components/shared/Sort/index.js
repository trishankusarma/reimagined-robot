import React, {useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {useSelector} from "react-redux"

import axios from '../../../helpers/axios'
import { Toastify } from "../../../App";

const useStyles = makeStyles((theme) => ({

  formControl: {
    minWidth: 360,
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const auth = useSelector(state => state.auth);
  
  React.useEffect(()=>{
    // console.log(props.classIndex,"props.classIndex")
  },[props])

  const [ sessionData , setSessionData ] = useState([])

  React.useEffect( async ()=>{

    if( !props.Session ) return
     
    try {
             
          const res = await axios().get('/session/getAllSessions/'+auth?.user?.adminType?._id)

          if(res.status==200){

              setSessionData(
                    res.data
              )
          }else{

              Toastify('error', 'Cannot import data!!')
          }
    } catch (error) {
             
               Toastify('error', 'Something went wrong!!')
    }
  },[props.Session])
 /**
  * all={"all"}
              name="class"
              value={filter.class}
              onChange={handleChange}
              Class={true}
              size="small"
  */
  return (
    <div className={classes.root}>
      {props.Class?<FormControl variant="outlined" size={props.size} className={classes.formControl} fullWidth>
        <InputLabel id="Class">Class: </InputLabel>
        <Select
          id="Class"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          label="Class: "
        >
      {  props.all && <MenuItem value={"all"}>
            All
          </MenuItem>}
         {auth?.user?.adminType?.classes?.map((item,index) => {
                  return <MenuItem value={index}>{item.class}</MenuItem>;
                })}
          
        </Select>
      </FormControl>:" "}
      {props.Student?<FormControl variant="outlined" size={props.size} className={classes.formControl} fullWidth>
        <InputLabel id="Students">Students: </InputLabel>
        <Select
          id="Students"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          label="Students: "
        >
         {props.StudentsList.map((item) => {
                  return <MenuItem value={item._id}>{item.name}</MenuItem>;
                })}
          
        </Select>
      </FormControl>:" "}

      {props.Section?<FormControl variant="outlined" size={props.size} className={classes.formControl} fullWidth>
        <InputLabel id="Section">Section: </InputLabel>
        <Select
          id="Section"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          label="Section: "
        >
         {  
         props.all && <MenuItem value={"all"}>
            All
          </MenuItem>
        }
          {
             props.classIndex!=null  && props.classIndex!=='all' ?
             auth?.user?.adminType?.classes[props.classIndex]?.sections?.map((item) => {
               console.log(item,"asd")
                  return <MenuItem value={item}>{item}</MenuItem>;
            })
            : 
            <MenuItem value={null}>
               No Class Selected
            </MenuItem>
          }
        </Select>
      </FormControl>:" "}
      
      {props.Subject?<FormControl variant="outlined" size={props.size} className={classes.formControl} fullWidth>
        <InputLabel id="Subject">Subject: </InputLabel>
        <Select
          id="Subject"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          label="Subject: "
        >
        { 
          props.all && <MenuItem value={"all"}>
            All
          </MenuItem>
        }
           {
            props.classIndex!==null && props.classIndex!=='all' ?
             auth?.user?.adminType?.classes[props.classIndex]?.subjects?.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
            })
            : 
            <MenuItem value={null}>
               No Class Selected
            </MenuItem>
          }
        </Select>
      </FormControl>:""}
     
      {props.Gender?<FormControl variant="outlined" size={props.size} className={classes.formControl} fullWidth>
        <InputLabel id="Gender">Gender: </InputLabel>
        <Select
          id="Gender"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          label="Gender: "
        >
      {  props.all && <MenuItem value={"all"}>
            All
          </MenuItem>}
          <MenuItem value={0}>Male</MenuItem>
          <MenuItem value={1}>Female</MenuItem>
          <MenuItem value={2}>others</MenuItem>
        </Select>
      </FormControl>:""}
     
      {props.Session?<FormControl variant="outlined" size={props.size} className={classes.formControl} fullWidth>
        <InputLabel id="Session">Session: </InputLabel>
        <Select
          id="Session"
          name={props.name}
          value={ props.reg ? props.value.session : props.value }
          onChange={props.onChange}
          label="Session: "
        >
      {  props.all && <MenuItem value={"all"}>
            All
          </MenuItem>}
              {
                  sessionData.map((item)=>(
                      <MenuItem value={ props.reg ? item : item.session }>{item.session}</MenuItem>
                  ))
              }
        </Select>
      </FormControl>:" "}
      
    </div>
  );
}
