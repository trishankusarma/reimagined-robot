import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: 'white',
    background: 'blue',
    textAlign: 'center',
    height: '6rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
  },
  link: {
    textDecoration: 'none'
  },
  title: {
    fontSize: '1.2rem',
    fontWeight:"600",
    letterSpacing: '1px'
  },
  btn1: {
    backgroundColor: '#C51162',
    border: '1px solid #d43f3a',

    '&:hover': {
      backgroundColor: '#c9302c',
      border: '1px solid #ac2925'
    }
  },
  btn2: {
    backgroundColor: '#23c667',
    border: '1px solid #4cae4c',

    '&:hover': {
      backgroundColor: '#449d44',
      border: '1px solid #398439'
    }
  },
  btn3: {
    backgroundColor: '#428bca',
    border: '1px solid #357ebd',

    '&:hover': {
      backgroundColor: '#3071a9',
      border: '1px solid #285e8e'
    }
  },
  btn4: {
    backgroundColor: '#5bc0de',
    border: '1px solid #46b8da',

    '&:hover': {
      backgroundColor: '#31b0d5',
      border: '1px solid #269abc'
    }
  }
}));

const BigButton = ({item, index,handleOpen}) => {
    const classes = useStyles();
    const btnNo = (index % 8 < 4) ? 'btn' + (index % 8 + 1) : 'btn' + (8 - index % 8)

    return (    
          <Link className={classes.link} to={`/${item.to}`}>
            <Paper className={`${classes.paper} ${classes[btnNo]}`} onClick={item.handleOpen}>
                <Typography className={classes.title}>{item.title}</Typography>
                </Paper>
          </Link>
  
    );
}

export default BigButton
