import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import DrawerMenu from '../../components/shared/DrawerMenu';
import BigButton from '../../components/shared/Buttons/BigButton';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
}));

const data = [
  {
    title: 'Student Attendence',
    to: 'uploadAttendance/enterAttend?type=0'
  },
  {
    title: 'Staff Attendence',
    to: 'uploadAttendance/enterAttend?type=1'
  }
];

export default function Attendence() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        <div className={classes.drawerHeader}/>
        <Grid container spacing={4} className={classes.btnC} style={{height:'72vh'}}>
          {data.map((datam, index) => {
            return (
              <Grid item xs={12} md={6}>
                <BigButton item={datam} index={index + 1} />
              </Grid>
            );
          })}
        </Grid>
        <Footer />
      </main>
    </div>
  );
}
