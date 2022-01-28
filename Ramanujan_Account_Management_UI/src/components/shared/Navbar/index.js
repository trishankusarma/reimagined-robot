import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useDispatch ,useSelector} from "react-redux";
import { signout } from "../../../redux/actions"
import { Link } from 'react-router-dom';
import {useHistory} from "react-router-dom";
import axios from "../../../helpers/axios"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  hide: {
    display: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  mr1: {
    marginRight: '1rem'
  },
  arrowTitleC: {
    display: 'flex',
    flexDirection:'row',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  arrow: {
    background: '#000',
    boxShadow: '0 3px 3px rgba(255, 255, 255, .6)',
    padding: '5px 5px',
    fontSize: '30px',
    color: 'rgba(255, 255, 255, .6)',
    fontWeight: '700',
    borderRadius: '50rem',
    marginRight: '1rem',
    cursor: 'pointer'
  },
  btnC: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: '1rem'
  },

}));

const Navbar = ({ handleDrawerOpen, open }) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [Dept, setDept] = React.useState(
    localStorage.getItem("defaultDepartment") ? localStorage.getItem("defaultDepartment") : ''
  );
  
  const handleChange = (event) => {
    setDept(event.target.value);
    if(!localStorage.getItem("user")) {
      return;
  }else{
    let user =JSON.parse(localStorage.getItem("user"));
    if(!user) return;
    user.adminType={
      ...departments[event.target.value]
    }
    localStorage.setItem("user",JSON.stringify(user));
    localStorage.setItem("defaultDepartment",event.target.value);
    window.location.reload();
    // dispatch({type:"setDepartment",payload:user});
  }
  };
  const auth = useSelector(state => state.auth)
  const [role, setRole] = useState(auth?.user?.adminType?.departmentName);
  const [departments,setDepartments]=useState([]);
  const history=useHistory();
  
  React.useEffect(async()=>{
    let data =await axios().get("/admin/getAllDepartments");
    setDepartments(data.data.data)
  },[])
  React.useEffect(async()=>{
    console.log(JSON.parse(localStorage.getItem("defaultDepartment")))
    if(JSON.parse(localStorage.getItem("defaultDepartment"))!=undefined){
      setDept(JSON.parse(localStorage.getItem("defaultDepartment")))
    }else{
      setDept(0)
    }
  },[])

  return (
    <div>
      <AppBar
        style={{ backgroundColor: '#333' }}
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.arrowTitleC}>
            <div onClick={()=>{
                history.goBack();
              }}>
              <ArrowBackIcon  className={classes.arrow} />
            </div>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <Typography variant='h6' noWrap style={{ flex: 1 }}>
                RAMANUJAN ACADEMY
              </Typography>
            </Link>
            
            <h7 noWrap style={{ flex: 1, fontSize: "1rem", fontWeight: "bold" }}>
              ({auth.user.isSuperAdmin ? "Admin" : role})
            </h7>
        
          </div>
    
          <div className={classes.btnC}>
            {auth?.user?.isSuperAdmin?<div style={{ width: '300px', background:'white', marginRight:'1rem', borderRadius:'5px'}}>
              <FormControl  fullWidth size="small" variant="outlined">
                <InputLabel id="Select_department">Select department</InputLabel>
                <Select
                  id="Select department"
                  label="Select department"
                  value={Dept}
                  onChange={handleChange}
                  name="Dept"
                >
      {console.log(departments[Dept]?.departmentName)}
                {departments.map((d,index)=>{
                  return (<MenuItem value={index}>{d.departmentName}</MenuItem>)
                })}
                </Select>

              </FormControl>
            </div>:null}
            {/* <Button
              size='small'
              className={classes.mr1}
              variant='contained'
              color='primary'
            >
              Change Password
            </Button> */}
            <Button
              size='small'
              className={classes.mr1}
              variant='contained'
              color='secondary'
              onClick={() => { dispatch(signout(auth?.token,history)) }}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar
