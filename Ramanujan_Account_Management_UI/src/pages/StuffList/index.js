import React,{ useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import StaffTable from "../../components/StuffList";
import Search from "../../components/shared/search";
import Sort from "../../components/shared/Sort"
import { Button, Typography} from "@material-ui/core";
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import ReactToPrint from "react-to-print";

import { getAllStaff , deleteStuff, filterStuff, clearStuff } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    overflowX:'hidden'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    maxWidth: '100vw',
    idth: '100vw',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  btnC: {
    width: '60%',
    margin: '2rem auto'
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width:'96%',
    margin:'20px auto',
    marginTop:'50px'
  },
  button:
  {
    width:'95%',
    margin:'20px auto',
    display:'flex',
    justifyContent:'space-between',
  },
  List:
  {
    display:'flex',
    flexDirection:'row',
  }
}));

export default function Expenditure() {
  const classes = useStyles();
  const componentRef=useRef();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch()
  const history = useHistory()

  const searchRef = useRef()
  const stuff = useSelector(state=>state.stuff)
  const auth = useSelector(state=>state.auth)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const EditStuff = (_id)=>{
      
     history.push(`/StaffEdit/${_id}`)
  }

  const DeleteStuff = (_id) =>{
     
     dispatch(deleteStuff(_id))
  }

  useEffect(()=>{
       
      dispatch( getAllStaff(auth?.user?.adminType?._id))
  },[])

  const newStuffRegistration  = ()=>{
      
      history.push('/StaffRegistration')
  }

  const handleChange = (e) => {

    if (searchRef.current.value !== "") {
        dispatch(filterStuff(e.target.value));
    } else {
        dispatch(clearStuff());
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerMenu handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
        <div>
      <div className={classes.button}>
          <div className={classes.List}>
          <ReactToPrint
          trigger={() => (
            <Button variant="contained" size="small"  color="secondary" style={{marginLeft:'10px', width:'100%'}}>
              print This
            </Button>
          )}
          content={() => componentRef.current}
        />
          </div>
          <Button color="primary" variant="contained" onClick={newStuffRegistration} size="small">
               Add new Teacher
          </Button>
      </div>
          <div className={classes.filters}>
            <Typography>Total no. of Teacher : {stuff.stuffs?.length}</Typography>
            <Search placeholder={"Search here"} searchRef={searchRef} handleChange={handleChange}/>
          </div>
          <div ref={componentRef}>
        {
          stuff.searchStuff ? 
              <StaffTable stuffs={stuff.searchStuff} EditStuff={EditStuff} DeleteStuff={DeleteStuff} /> :
              <StaffTable stuffs={stuff.stuffs} EditStuff={EditStuff} DeleteStuff={DeleteStuff}/>
        }
         </div>
      </div>
        <Footer />
      </main>
    </div>
  );
}
