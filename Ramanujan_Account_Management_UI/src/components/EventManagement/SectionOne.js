import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TextField, Button } from '@material-ui/core';
import DatePic from '../Datepicker';
import {useDispatch,useSelector} from "react-redux";
import {eventCreate, eventEdit} from "../../redux/actions"
import {Toastify} from "../../App";
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: '96vw',
    margin: '.5rem auto'
  }
}));

const SectionOne = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const admin = useSelector(state => state.admin)
  const classes = useStyles();
  const [formData, setFormData] = useState({
    event: admin.eventInitValue.event,
    date: admin.eventInitValue.date.split("T")[0],
    budgetAllocated: admin.eventInitValue.budgetAllocated,
    budgetUsed: admin.eventInitValue.budgetUsed,
    organizer: admin.eventInitValue.organizer,
    remarks: admin.eventInitValue.remarks,
  });

  const {
    event,
    date,
    budgetAllocated,
    budgetUsed,
    organizer,
    remarks,
  } = formData;
  React.useEffect(()=>{

    if(admin.eventInitValue.budgetUsed) 
         localStorage.setItem('previousBudget', admin.eventInitValue.budgetUsed);
    
    setFormData({
      event: admin.eventInitValue.event,
      date: admin.eventInitValue.date.split("T")[0],
      budgetAllocated: admin.eventInitValue.budgetAllocated,
      budgetUsed: admin.eventInitValue.budgetUsed,
      organizer: admin.eventInitValue.organizer,
      remarks: admin.eventInitValue.remarks,
    })
  },[admin.eventInitValue.remarks])

  const changeHandler= (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  }
  const Submit =()=>{
  if(!formData.budgetAllocated||!formData.budgetUsed||!formData.date||!formData.event||!formData.organizer||!formData.remarks){
    return Toastify("error","All fields required !");
  }
 if(admin.eventInitValue.remarks!=""){

    return dispatch(eventEdit({...formData,department:auth.user.adminType._id},admin.eventInitValue._id , localStorage.getItem('previousBudget') ))
  }
  dispatch(eventCreate({...formData,department:auth.user.adminType._id}));
  setFormData({
    event:"",
    date:moment().format('YYYY-MM-DD'),
    budgetAllocated:"",
    budgetUsed:"",
    organizer:"",
    remarks:"",
  })
}

  return (
    <div>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item sm={12} md={4} lg={4}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='event'
            value={event}
            onChange={(e) => changeHandler(e)}
            placeholder='Event:'
            label='Event:'
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <DatePic name='date' value={date} onChange={(e) => changeHandler(e)} label='*Date of allocation' />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='budgetAllocated'
            value={budgetAllocated}
            onChange={(e) => changeHandler(e)}
            placeholder='Budget Allocated:'
            label='Budget Allocated:'
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='budgetUsed'
            value={budgetUsed}
            onChange={(e) => changeHandler(e)}
            placeholder='Budget Used:'
            label='Budget Used:'
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='organizer'
            value={organizer}
            onChange={(e) => changeHandler(e)}
            placeholder='Organizer:'
            label='Organizer:'
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <TextField
            id='outlined-multiline-static'
            label='Remarks:'
            multiline
            rows={4}
            name='remarks'
            value={remarks}
            onChange={(e) => changeHandler(e)}
            placeholder='Remarks:'
            variant='outlined'
            fullWidth
          />
        </Grid>
        <Grid item sm={12} md={4} lg={4}>
          <Button onClick={()=>{Submit()}} variant='contained' color='primary' size='medium'>
            Submit
          </Button>
        </Grid>
     
      </Grid>
    </div>
  );
};

export default SectionOne;
