import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MenuItem,FormControl,InputLabel,Select } from '@material-ui/core';
import CheckBox from '../../components/AddAdmin/CheckBox'
import axios from "../../helpers/axios";
import {useDispatch,useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import {AddNewAdmin} from "../../redux/actions/admin.action"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 395,
  },
  department:
  {
    display:'flex',
    flexDirection:'row'
  }
}));

export default function AddAdmins() {
  const classes = useStyles();
  const [Class, setClass] = React.useState({
    email:"",
    name:"",
    adminType:"",
    password:""
  });
  const [department,setDepartment]=React.useState([]);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const admin = useSelector(state => state.admin)
  const handleChange = (event) => {
    setClass({
      ...Class,
      [event.target.name]:event.target.value
    });
  };

  const history=useHistory();

  React.useEffect(async () => {
    const {data} =await axios().get("/admin/getAllDepartments");
    setDepartment(data.data)
  }, [])

  const submit=()=>{
    console.log({...Class,access:admin.save_access},"department")
  
    dispatch(AddNewAdmin({...Class,access:admin.save_access},history,auth.token));
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Admin
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Enter Email"
            onChange={handleChange}
            value={Class.email}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            value={Class.password}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            value={Class.name}
            name="name"
            label="Admin Name"
            type="text"
            id="Name"
          />

        <FormControl variant="outlined" className={classes.formControl} margin="normal">
        <InputLabel id="Login"  required>Add As</InputLabel>
        <Select
          id="Class"
          value={Class.adminType}
          name="adminType"
          onChange={handleChange}
          label="Login"
        >
        {department.map((item)=>{
          return(<MenuItem value={item._id}>{item.departmentName}</MenuItem>)
        })}
          
        </Select>
        <CheckBox />
      </FormControl>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=>{submit()}}
          >
            Add Admin
          </Button>
        </form>

      </div>
      {/* <div  style={{
        color: '#000000',
        backgroundColor: '#000000',
        height:'1px',
        marginBottom:'2rem',
        borderColor : 'red',
        opacity:'0.2'}}/>

        <div classNam={classes.department}>
        <Typography component="h1" variant="h5">
          Add Department
        </Typography>
        <div style={{display:'flex', flexDirection:'row'}}> 
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Department"
            label="Department Name"
            type="text"
            id="Department"
          />
          <Button variant="contained" color="primary" style={{height:'30px' ,margin:'2rem 1rem'}}>add</Button>
        </div>
        </div> */}
    </Container>
  );
}