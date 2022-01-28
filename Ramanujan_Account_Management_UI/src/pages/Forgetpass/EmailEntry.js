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

import { Toastify } from "../../App";
import axios from "../../helpers/axios";

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

export default function SignIn() {
  const classes = useStyles();
  const [ email, setEmail] = React.useState(null);
  const [content,setContent]=React.useState("Submit")
  const handleChange = (e) => {
      setEmail( e.target.value )
  };
  const onSubmit = async ()=>{

      if(!email){
        Toastify('error', 'Please Enter a valid mail! ')
        return;
      }
      try {
        setContent("Wait ....")        
        const res = await axios().post('/admin/forgotPasswordAdmin',{
          email
        });
  
      

        if( res.status==200 ){
            Toastify("success",'Email Sent')
            setContent("Submit")  
            return 
          }
          setContent("Submit")  
          Toastify('error', ' Something went wrong! ')
                
      } catch (error) {
        Toastify('error', ' Something went wrong! ')
      }
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
            id="email"
            label="Email"
            name="email"
            value={ email }
            autoComplete="Email"
            autoFocus
        />
      
          <Button
            onClick={()=>{onSubmit()}}
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