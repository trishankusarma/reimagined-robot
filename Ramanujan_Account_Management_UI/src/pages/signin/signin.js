import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MenuItem,FormControl,InputLabel,Select } from '@material-ui/core';
import {useDispatch,useSelector} from "react-redux"
import {login} from "../../redux/actions"
import { Redirect, useHistory ,Link} from "react-router-dom";
import axios from '../../helpers/axios';

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
  const auth = useSelector(state => state.auth)
  const dispatch=useDispatch();
  const history=useHistory();
  const [department,setDepartment]=React.useState([]);
  const [Class, setClass] = React.useState({
    adminType:"",
    email:"",
    password:"",
  });
  React.useEffect(async () => {
    const {data} =await axios().get("/admin/getAllDepartments");
    console.log(data.data,"data.data")
    setDepartment(data.data)
  }, [])
  const handleChange = (event) => {
    setClass({
      ...Class,
      [event.target.name]:event.target.value
    });
  };

const Submit=()=>{
  dispatch(login(Class,history));
}
if (auth.authenticated) {

  return <Redirect to="/" />;
}
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-label"  required>Login As</InputLabel>
        <Select
          value={Class.adminType}
          onChange={handleChange}
          name="adminType"
          label="LoginAs"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        >
          {department?.map((item)=>{
            return(<MenuItem value={item._id}>{item.departmentName}</MenuItem>)
          })
            }
        </Select>
      </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            id="email"
            label="Email"
            name="email"
            autoComplete="Email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
          onClick={()=>{Submit()}}
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/EmailEntry" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}