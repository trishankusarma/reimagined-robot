import React,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import SectionTwo from '../../components/CashBookDaily/Table';
import SectionOne from '../../components/Cashbook/SectionOne';
import CashbookHeading from '../../components/Cashbook/CashbookHeading';

import moment from 'moment'

import axios from "../../helpers/axios";
import { Toastify } from '../../App';
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

export default function Cashbook () {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const auth = useSelector(state => state.auth)

  const [ From_Date, setFrom_Date ] = useState(moment().format('YYYY-MM-DD'))
  const [ To_date, setTo_Date ] = useState(moment().format('YYYY-MM-DD'))

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [ cashData, setCashData ] = useState(null)

  useEffect( async() => {

    if( !From_Date || !To_date  ) return

    try {
      
    const res = await axios().post('/cashBook/getAllcashBook',{
      From_Date ,
      To_date,
      department : auth?.user?.adminType?._id 
    })

    if(res.status===200){

        console.log( res.data , "data" );
       
        setCashData(res.data);
        return
    }
    Toastify('error','Something went wrong!') 
  } catch (error) {
    
    Toastify('error','Something went wrong!') 
  }
  }, [From_Date, To_date])

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

            <SectionOne From_Date={From_Date} setFrom_Date={setFrom_Date} To_date={To_date} setTo_Date={setTo_Date} department={auth?.user?.adminType?._id}/>
            <CashbookHeading />
            <SectionTwo cashData={cashData}/>
            <Footer />
      </main>
    </div>
  );
}
