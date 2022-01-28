import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
// import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
// import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core';
// import Sort from '../shared/Sort'
import {useDispatch,useSelector} from "react-redux"
import { searchFeePayment } from '../../redux/actions';
const useStyles = makeStyles((theme) => ({
    root:
    {
        width:'95%',
        margin:'0 auto',
    },
    gridC: {
      margin: theme.spacing(.5, 0),
    }
}));

export default function PreSection() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [formData, setFormData] = useState({
    enrollmentNo: '',
    classNo: '',
    section: '',
    student: '',
  });

  const {
    enrollmentNo, classNo, section, student,
  } = formData;

  const changeHandler = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };
const Search=()=>{
  dispatch(searchFeePayment(auth?.user?.adminType?._id,enrollmentNo,auth?.user?.adminType?.departmentName));
}
  return (
    <div className={classes.root}>
      <Grid container spacing={3} className={classes.gridC} alignItems="center">
        <Grid item xs={12} lg={3} >
          <TextField
            variant='outlined'
            name='enrollmentNo'
            type="string"
            value={enrollmentNo}
            fullWidth
            onChange={(e) => changeHandler(e)}
            label='Enter Your Enrollment Id'
          />
          </Grid>
     <Grid item xs={12} lg={3}>
     <Button
         variant='contained'
         color='primary'
         onClick={()=>{
           Search()
         }}
       >
         Search
       </Button>
     </Grid>


      </Grid>
      
    </div>
  );
}
