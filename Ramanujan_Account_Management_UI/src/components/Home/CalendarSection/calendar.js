import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './calendar.css'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    color: 'rgba(255, 255, 255, .9)',
    background: '#ff9f10',
    padding: '1rem 0',
    textAlign: 'center',
    borderTopLeftRadius: '7px',
    borderTopRightRadius: '7px',
    letterSpacing: '1px',
    marginBottom: '1rem'
  }
}));

export default function CalendarComponent () {
    const classes = useStyles();
  const [value, onChange] = useState(new Date(Date.now()));

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.title}>Holiday Calendar</Typography>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
