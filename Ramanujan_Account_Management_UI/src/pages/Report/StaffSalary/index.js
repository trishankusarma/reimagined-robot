import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerMenu from '../../../components/shared/DrawerMenu';
import Navbar from '../../../components/shared/Navbar';
import Footer from '../../../components/shared/Footer';
import StaffSalary from '../../../components/Report/StaffSalary';
import axios from "../../../helpers/axios";
import {useSelector} from "react-redux"
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
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({});
  const auth = useSelector(state => state.auth)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
React.useEffect(async()=>{
  setData(await axios().get(`/stuff/salarySlipGetAll/${auth.user.adminType._id}`))

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
        <StaffSalary data={data}/>
        <Footer />
      </main>
    </div>
  );
}
