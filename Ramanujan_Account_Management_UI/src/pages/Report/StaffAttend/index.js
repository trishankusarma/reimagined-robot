import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerMenu from '../../../components/shared/DrawerMenu';
import Navbar from '../../../components/shared/Navbar';
import Footer from '../../../components/shared/Footer';
import StuffAttend from '../../../components/Report/StaffAttend';

import axios from "../../../helpers/axios";
import { Toastify } from '../../../App';

import { useSelector } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
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
  }
}));

export default function Expenditure() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [ stuffs, setStuffs ] = useState(null)

  const auth = useSelector(state => state.auth)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(async ()=>{
           
    try {
        
     const res = await axios().get(`/stuff/allDepartmentStuff/${auth.user?.adminType?._id}`);

     if(res.status===200){
         
         setStuffs(res.data?.map((stuff)=> stuff ? { ...stuff, id: stuff._id } : null ) );
     }else{
         Toastify('error', 'Something went wrong')
     }

    } catch (error) {
      
      Toastify('error', 'Something went wrong')
    }

 },[])

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
            <StuffAttend  stuffs={stuffs} auth={auth}/>
        <Footer />
      </main>
    </div>
  );
}
