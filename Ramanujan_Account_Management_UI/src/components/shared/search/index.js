import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 325,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  icon:{
      color:"#98978b"
  }
}));

export default function CustomizedInputBase({icon,placeholder,searchRef, handleChange , typo }) {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      
      <InputBase
        inputRef={searchRef}
        className={classes.input}
        placeholder={placeholder}
        onChange={ typo !== 2 ? handleChange : null }
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon onClick={typo === 2 ? handleChange : null }/>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
      </IconButton>
    </Paper>
  );
}
