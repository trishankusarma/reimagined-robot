import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TextField,FormControl,InputLabel,Select,MenuItem, Button, Paper } from '@material-ui/core';
import DatePic from '../Datepicker'
import { AddNewStaff, getOneStuff , editStuff } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { Toastify } from '../../App';
import { useParams, useHistory } from 'react-router-dom';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom/cjs/react-dom.development';
import axios from "../../helpers/axios";
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root:
  {
    width: '90%',
    margin: '1rem auto'
  },
  Grid_container:
  {
    margin:'3rem 0'
  },
  btnC: {
    width: '60%',
    margin: '2rem auto'
  },
  image:{
      width:400,
      height:300,
      margin:'1rem 0'
  }
}));

function StaffReg() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const history = useHistory()

  const stuff = useSelector(state => state.stuff)
  const auth = useSelector(state => state.auth)
  
  const { _id } = useParams()

  useEffect(async()=>{

    if(_id!==undefined) 
      await dispatch( getOneStuff(_id) )
    else{
        
      try {
        
          const res = await axios().get('/stuff/getLastId/'+auth?.user?.adminType?._id);

          console.log(res.data)

          if(res.status===200){

            setFormData({ ...formData, ['IDNo']: parseInt(res.data) + 1 })
          }else{

            Toastify('error', 'Cannot get last Id!!')
          }

      } catch (error) {
          
          Toastify('error', 'Something went wrong!!')
      }
    }
  },[])

  let initialState=stuff.oneStuff?{
        upload_photo : stuff.oneStuff.snap_shot,
        IDNo : stuff.oneStuff.idNo,
        biometric : stuff.oneStuff.biometric_code,
        DOB : stuff.oneStuff.DOB.split('T')[0],
        teacherName : stuff.oneStuff.name ,
        sex : stuff.oneStuff.gender ,
        address : stuff.oneStuff.address,
        mobileNo : stuff.oneStuff.mobileNo,
        email : stuff.oneStuff.email,
        joiningDate : stuff.oneStuff.joining_Date.split('T')[0],
        desination :  auth?.user?.adminType?._id,
        married : stuff.oneStuff.maritial_Status ,
        bloodGroup : stuff.oneStuff.blood_grp 
   }:
   {
    upload_photo:"",
    IDNo: "",
    biometric: "",
    teacherName: "",
    DOB: "",
    sex: "",
    address: "",
    mobileNo: "",
    email: "",
    desination: "",
    joiningDate: moment().format('YYYY-MM-DD'),
    married: "",
    bloodGroup: "",
}

  const [formData, setFormData] = useState({
    ...initialState
  })

React.useEffect(()=>{
  if(!stuff.oneStuff) return;
  setFormData({
    ...initialState
  });

},[stuff.oneStuff])


  const {
    upload_photo,
    IDNo,
    biometric,
    teacherName,
    DOB,
    sex,
    address,
    mobileNo,
    email,
    desination,
    joiningDate,
    married,
    bloodGroup
  } = formData;

  const changeHandler = (e) =>{

    const { name, value, type } = e.target
    
    if(type==='file')
        setFormData({ ...formData, [name]: e.target.files[0] })
    else
        setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = ()=>{      

      if(!IDNo || !teacherName || !DOB || !sex || !address || !mobileNo || !email || !desination || !joiningDate || !married ){
         return Toastify("error"," All required fields not filled! ")
      }  

      if(_id!==undefined) 
         return dispatch( editStuff(formData, _id, history) )
      
      dispatch( AddNewStaff(formData, history) )
  }

  return (
    <div className={classes.root}>
      {/* frist line */}
      <center className="profile">
          Here profile photo/ id Card
          <Paper className={classes.image}>
               {
                 upload_photo ? 

                    <img 
                        src={ typeof upload_photo==='string' ? upload_photo : URL.createObjectURL(upload_photo) }
                        style={{ width:'100%', height:'100%' }}
                    /> :
                  null
               }
          </Paper>
          
          <input
               accept="image/*"
               className={classes.input}
               id="contained-button-file"
               type="file"
               style={{display:'none'}}
               name='upload_photo'
               onChange={changeHandler}
               required
          />
                
          <label htmlFor="contained-button-file">
                    
              <Button variant="contained" style={{marginRight:'10px',backgroundColor:'royalblue',color:'white'}}>
                    Take ScreenShot
              </Button>
                    
              <Button variant="contained" color="primary" component="span">
                    Click here to upload
              </Button>
          </label>
      </center>

      <Grid container className={classes.Grid_container} spacing={3}>
        <Grid sm={12} md={4} lg={4} item>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='IDNo'
            type="number"
            value={IDNo}
            onChange={changeHandler}
            placeholder='Enter ID No.'
            label='Id No'
            // required
          />
        </Grid>
        <Grid sm={12} md={4} lg={4} item>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            name='biometric'
            value={biometric}
            type="number"
            onChange={changeHandler}
            placeholder='Enter Biometric NO.'
            label='Biometric No'
          />
        </Grid>
        <Grid sm={12} md={4} lg={4} item>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='teacherName'
            value={teacherName}
            onChange={changeHandler}
            placeholder="Enter teacher's Name"
            label='Name'
            required
          />
        </Grid>
      </Grid>

      {/* second line */}

      <Grid container className={classes.Grid_container} spacing={3}>
        <Grid sm={12} md={4} lg={4} item>
          <DatePic
            name='DOB'
            value={DOB}
            onChange={changeHandler}
            label='Date Of Birth'
          />
        </Grid>
        <Grid sm={12} md={4} lg={4} item>
          <FormControl
            variant='outlined'
            className={classes.formControl}
            size='small'
            fullWidth
          >
            <InputLabel id='Sex' required>Sex</InputLabel>
            <Select
              id='sex'
              name='sex'
              value={sex}
              onChange={changeHandler}
              label='Sex'
            >
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
              <MenuItem value={3}>others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid sm={12} md={4} lg={4} item>
          <TextField
            id='address'
            label='Address'
            multiline
            rows={4}
            name='address'
            value={address}
            onChange={changeHandler}
            placeholder='enter address'
            variant='outlined'
            fullWidth
            required
          />
        </Grid>
      </Grid>

      {/* third grid */}

      <Grid container className={classes.Grid_container} spacing={3}>
        <Grid sm={12} md={4} lg={4} item>
          <TextField
            variant='outlined'
            fullWidth
            id="mobileNo"
            size='small'
            name='mobileNo'
            value={mobileNo}
            onChange={changeHandler}
            placeholder='Enter Mobile No.'
            label='Mobile No.'
            required
          />
        </Grid>
        <Grid sm={12} md={4} lg={4} item>
          <TextField
            variant='outlined'
            fullWidth
            id="email"
            size='small'
            name='email'
            value={email}
            onChange={changeHandler}
            placeholder='Enter Email Id'
            label='Email ID'
            required
          />
        </Grid>
        <Grid sm={12} md={4} lg={4} item>
          <FormControl
            variant='outlined'
            className={classes.formControl}
            size='small'
            fullWidth
          >
            <InputLabel id='Desination' required>Desination</InputLabel>
            <Select
              id='Section'
              name='desination'
              value={desination}
              onChange={changeHandler}
              label='Section'
            >
                 <MenuItem value={auth?.user?.adminType?._id}>{auth?.user?.adminType?.departmentName}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* fourth grid */}

      <Grid container className={classes.Grid_container} spacing={3}>
        <Grid sm={12} md={4} lg={4} item>
          <DatePic 
            name = 'joiningDate'
            value = {joiningDate}
            onChange={changeHandler}
            label = 'Joining Date'
          />
        </Grid>
        <Grid sm={12} md={4} lg={4} item>
          <FormControl
            variant='outlined'
            className={classes.formControl}
            size='small'
            fullWidth
          >
            <InputLabel id='Status' required>Marital Status</InputLabel>
            <Select
              id='married'
              name='married'
              value={married}
              onChange={changeHandler}
              label='Marital Status'
            >
              <MenuItem value={1}>Married</MenuItem>
              <MenuItem value={2}>UnMarried</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid sm={12} md={4} lg={4} item>
          <TextField
            variant='outlined'
            fullWidth
            size='small'
            name='bloodGroup'
            value={bloodGroup}
            onChange={changeHandler}
            placeholder="Enter teacher's Blood Group"
            label='Blood Group'
          />
        </Grid>
      </Grid>
      <Button variant='contained' color='primary' onClick={handleSubmit} disabled={ stuff.loading }>
        submit
      </Button>
    </div>
  );
}

export default StaffReg
