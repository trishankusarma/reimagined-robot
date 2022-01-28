import React,{useRef, useEffect } from "react";
import DatePicker from "../../Datepicker";
import { makeStyles } from "@material-ui/core/styles";
import ReactToPrint from "react-to-print";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import Sort from "../../../components/shared/Sort";
import AttendenceTAble from "../SudentFeeTable";
import axios from "../../../helpers/axios";
import { useSelector, useDispatch } from "react-redux";
import {getStudentsFeeReport} from "../../../redux/actions";
import moment from "moment";
import { Toastify } from "../../../App";


const useStyles = makeStyles((theme) => ({
  root: {
    width: "96%",
    margin: "2rem auto",
    overflowX: "hidden",
  },
  Grid: {
    margin: "2rem auto",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "20px auto",
    marginTop: "50px",
  },
}));

function StudentFees() {
  const classes = useStyles();
  const componentRef=useRef();
  const [studentList, setStudentList] = React.useState([]);
  const [filterList, setFilterList] = React.useState(null);

  const auth = useSelector((state) => state.auth);
  const student = useSelector((state) => state.student);
  const dispatch = useDispatch()
  
  const [Student, setStudent] = React.useState({
    class:null,
    section: null,
    session:null,
    name: null,
    from:moment().format('YYYY-MM-DD'),
    to:moment().format('YYYY-MM-DD'),
  });

  const handleChange = (event) => {
    setStudent({
      ...Student,
      [event.target.name]: event.target.value,
    });
  };

React.useEffect(async()=>{

   console.log('students', studentList)

   if( !studentList )return

   setFilterList(
       
      studentList.filter((item)=>{
          return ( 
               Student.class=='all' || item.standard==auth?.user?.adminType?.classes[Student.class]?.class ) && 
               ( Student.section=='all' || item.section==Student.section ) && 
               ( Student.session=='all' || item.session==Student.session )
      })
   )
    
},[Student.class,Student.section, Student.session])

React.useEffect(async () => {
    let res = await axios().get(
      `/student/allStudentsCollege/${auth?.user?.adminType?._id}`
    );
console.log(res.data.data,"data ")
    setStudentList(res.data.data);
  }, []);

const getStudentList=()=>{
  if(Student.class==null||Student.section==null||Student.session==null||Student.name==null||Student.from==""||Student.to==""){
    return Toastify("error","Please Select add all the fields");
  }
  dispatch(getStudentsFeeReport({...Student,class : Student.class=='all' ? 'all' : auth?.user?.adminType?.classes[Student.class]?.class,stream:auth?.user?.adminType?._id}));
}
  return (
    <div className={classes.root}>
      <Grid container className={classes.Grid} spacing={2}>
      <Grid sm={6} lg={3} item>
          <Sort
            Session="true"
            size="small"
            // all={"all"}
            name={"session"}
            value={Student.session}
            onChange={handleChange}
          />
        </Grid>
  
        <Grid sm={6} lg={3} item>
          <Sort
            // all={"all"}
            name={"class"}
            value={Student.class}
            onChange={handleChange}
            Class="true"
            size="small"
          />
        </Grid>
        <Grid sm={6} lg={3} item>
          <Sort
            // all={"all"}
            name={"section"}
            value={Student.section}
            onChange={handleChange}
            classIndex={Student.class}
            Section="true"
            size="small"
          />
        </Grid>
        <Grid sm={6} sm={5} lg={3} item>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel id="Student">Student Name</InputLabel>
            <Select
              id="Student"
              value={Student.name}
              name={"name"}
              onChange={handleChange}
              label="Student Name"
            >
            
              { filterList ? filterList.map((item)=>{
                  
                  return <MenuItem value={item.name}>{item.name}</MenuItem>

              }) :null}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container className={classes.Grid} spacing={2} alignItems="center">
        <Grid lg={3} item>
          <DatePicker onChange={handleChange} name={"from"} label="From Date" />
        </Grid>
        <Grid lg={3} item>
          <DatePicker  onChange={handleChange} name={"to"} label="To Date" />
        </Grid>
        <Grid  lg={3} md={3} justifyContent="flex-start">
          <Button onClick={()=>{
              getStudentList()
          }} variant="contained" color="primary">
            Get
          </Button>
        </Grid>

      
      </Grid>
      <Grid container className={classes.Grid} alignItems="center">
        <Grid xs={4} lg={3} md={3} justifyContent="flex-start">
          <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="secondary">
              print This
            </Button>
          )}
          content={() => componentRef.current}
        />
        </Grid>
      </Grid>
     
      <div className={classes.filters}>
        <Typography>Total no. of entries: {student?.reportListStudent?.length}</Typography>
      </div>
      <div ref={componentRef}>
      <AttendenceTAble data={student?.reportListStudent} style={{ marginTop: "10px" }} />
      </div>
    </div>
  );
}

export default StudentFees;
