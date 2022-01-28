import React,{useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper'
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import PhotoSection from '../../components/StudentRegistration/PhotoSection';
import FormSection from '../../components/StudentRegistration/FormSection';
import {useParams} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import {getOneStudent} from "../../redux/actions";
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

export default function Attendence() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {_id}=useParams();
  const dispatch = useDispatch()
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if(_id==undefined) return;
    dispatch(getOneStudent(_id));
  })
  
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
        {/* <PhotoSection /> */}
        <FormSection />
        <Footer />
      </main>
    </div>
  );
}
