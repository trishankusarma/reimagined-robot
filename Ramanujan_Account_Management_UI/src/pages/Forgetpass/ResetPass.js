import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useParams,useHistory} from "react-router-dom";
import axios from "../../helpers/axios";
import {Toastify} from "../../App";
 function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        UnnamedCreators
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
   
    minWidth: 395,

  },
}));

export default function ResetPass() {
  const classes = useStyles();
  const history=useHistory();
  const [content,setContent]=React.useState("Submit")
  const [Class, setClass] = React.useState({
    PassWord:"",
    New_password:""
  });
  const{userId,token} =useParams();
  const handleChange = (event) => {
    setClass({
      ...Class,
      [event.target.name]:event.target.value
    });
  };
  const Submit=async()=>{
    
    if(Class.PassWord!=Class.New_password){
      Toastify("error","Password must match with re enter password");
      return
    }
    setContent("Wait ...");
    let res =await axios().post(`/admin/resetpassword/${userId}/${token}`,{password:Class.PassWord})
    if(res.status==200){
      history.push("/signin");
      Toastify("success","Updated password successfully");
    }else{
      Toastify("error","Something went wrong");
    }
    setContent("Submit");
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Reset Password
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            id="password"
            label="password"
            name="PassWord"
            autoComplete="password"
            autoFocus
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            id="New_password"
            label="Re-enter password"
            name="New_password"
            autoComplete="password"
            autoFocus
        />
      
          <Button
          onClick={()=>{Submit()}}
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           {content}
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}