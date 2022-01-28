import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

import SectionOne from '../../components/SendNotification/SectionOne';
import SectionTwo from '../../components/SendNotification/SectionTwo';
import SectionThree from '../../components/SendNotification/SectionThree';
import SectionFour from '../../components/SendNotification/SectionFour';
import SectionFive from '../../components/SendNotification/SectionFive';


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
  },
  gridC: {
    width: '96vw',
    margin: '0 auto',
  },
  gridItem1: {
    height: '10rem',
  },
  gridItem2: {
    marginTop: '1rem',
    height: '20rem',
  },
  gridItem3: {
    marginTop: '1rem',
    height: '20rem',
  },
  gridItem4: {
    marginTop: '4rem',
    height: '12rem',
  },
  gridItem5: {
    height: '45rem',
  },
  gridItem6: {
    height: '15rem',
  }
}));

export default function SendNotification () {
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
        <div className={classes.drawerHeader} />
        <Grid container spacing={3} className={classes.gridC}>
          <Grid item spacing={6} xs={12} lg={4} className={classes.grid1C}>
            <Grid item xs={12} className={classes.gridItem1}>
              <SectionOne />
            </Grid>
            <Grid item xs={12} className={classes.gridItem2}>
              <SectionTwo />
            </Grid>
            <Grid item xs={12} className={classes.gridItem3}>
              <SectionThree />
            </Grid>
            <Grid item xs={12} className={classes.gridItem4}>
              <SectionFour />
            </Grid>
          </Grid>
          <Grid item spacing={3} xs={12} lg={8} className={classes.grid2C}>
            <Grid item xs={12} className={classes.gridItem5}>
              <SectionFive />
            </Grid>
            <Grid item xs={12} className={classes.gridItem6}></Grid>
          </Grid>
        </Grid>
        <Footer />
      </main>
    </div>
  );
}
