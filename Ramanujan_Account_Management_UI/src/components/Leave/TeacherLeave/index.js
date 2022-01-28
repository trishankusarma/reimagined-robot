import React from 'react'
import Table from "../TableStuff";
import Search from "../../shared/search"
import { Button, makeStyles, Typography ,FormControl,InputLabel,Select,MenuItem} from "@material-ui/core";
import { Toastify } from '../../../App';
import {useHistory} from "react-router-dom"
import axios from "../../../helpers/axios"
import {useSelector,useDispatch} from "react-redux";

const useStyle = makeStyles(() => ({   
    button:
    {
       width:'96%',
       margin:'20px auto', 
    },
    select:{
        width:'96%',
        margin:'20px auto'
    },
    formControl: 
    {
        minWidth: 330,
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width:'96%',
        margin:'20px auto',
        marginTop:'50px'
      },
  }));

function StudentLeave() {
    const classes = useStyle();
    const history=useHistory();
    const auth = useSelector(state => state.auth)
    const [teacherList,setTeacherList]=React.useState([]);
    const [Teacher, setTeacher] = React.useState({
      name:"",
      id:"",
    });

    const handleChange = (event) => {
        setTeacher({
          name:teacherList[event.target.value]?.name,
          id:teacherList[event.target.value]?._id
        });
        console.log(Teacher,"Teacher");
      };
    React.useEffect(async()=>{
      let data = await axios().get("/stuff/allDepartmentStuff/"+auth?.user?.adminType?._id);
  
      setTeacherList(data.data);
    },[])

    return (
        <div>
          <div className={classes.select}>
          <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="Teacher">Teacher Name</InputLabel>
        <Select
          id="name"
          value={Teacher.name}
          onChange={(e)=>{
            handleChange(e)
          }}
          label="Teacher Name"
        >
        {teacherList.map((teacher,index)=>{
          return <MenuItem value={index}>{teacher?.name}</MenuItem>
        })}
          
         
        </Select>
      </FormControl>
          </div>
          <div className={classes.button}>
              <Button onClick={()=>{
                  if(Teacher.id==""||Teacher.id==null||Teacher.id==undefined)
                     return Toastify("error","Select a student")
                  history.push(`/addnewLeave?id=${Teacher.id}&modelOf=Stuff`)}} color="primary" variant="contained">Add New Leave</Button>
          </div>
          <div className={classes.filters}>
            <Typography>Total no. of Teacher leave : 1000</Typography>
            <Search placeholder={"Search here"}/>
          </div>
          <div className={classes.table}>
              <Table />
          </div> 
           
        </div>
    )

    // StudentCollege
}

export default StudentLeave
