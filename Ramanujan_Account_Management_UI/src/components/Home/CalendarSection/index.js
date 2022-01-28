import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';

import CalendarComponent from './calendar';
import Poster from './poster'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    width: '94%',
    margin: '1rem auto',
    padding: '1rem 0',
    alignItems: 'strech',
  },
}));

const CalendarSection = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid} spacing={3}>
        <Grid item xs={12} md={5}>
          {/* <Paper className={classes.paper}>xs=12</Paper> */}
          <CalendarComponent />
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper elevation={0} className={classes.paper}>
            <Poster />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default CalendarSection;
