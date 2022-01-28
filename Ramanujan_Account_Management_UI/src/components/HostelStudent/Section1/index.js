import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@material-ui/core";
import DatePickers from "../../Datepicker";
import { useSelector } from "react-redux";
import axios from "../../../helpers/axios"
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "97%",
    margin: "1rem auto",
  },
  second: {
    width: "96%",
    margin: "1rem auto",
  },
}));
function Section1({ hostels , formData, setFormData, handleSubmit, editId , clearAll}) {
  const classes = useStyles();
  const [findStudent,setFirstStudent]=React.useState("");
  const auth = useSelector(state => state.auth)

  const {
    hostel,
    room,
    enrollment_no,
    Admission_Date,
    Admission_Fee,
    Monthly_Fees,
    electricity_Fees,
    food_Fees,
    sport_Fees,
    Extra_Curricular_Activity_Fees,
    Security_Deposit,
    Concession_Discount,
    Total,
    Total_paid,
    Year,
    month,
    admission_paid,
    payment_mode,
  } = formData;

  useEffect(() => {
      
      setFormData({
         ...formData,
         Total : parseInt(Admission_Fee ? Admission_Fee : 0) + parseInt(Monthly_Fees ? Monthly_Fees : 0) + parseInt(electricity_Fees ? electricity_Fees : 0) + parseInt(food_Fees ? food_Fees : 0) + parseInt(sport_Fees ? sport_Fees : 0) + parseInt(Extra_Curricular_Activity_Fees ? Extra_Curricular_Activity_Fees : 0) + parseInt(Security_Deposit ? Security_Deposit : 0) - parseInt(Concession_Discount ? Concession_Discount : 0)
      })
  },[Admission_Fee, Monthly_Fees, electricity_Fees ,food_Fees, sport_Fees, Extra_Curricular_Activity_Fees, Security_Deposit, Concession_Discount])

  const changeHandler =async (e) => {

    const { name , value } = e.target;


    if( name === 'enrollment_no' && editId ) {
       return
      }else if(name === 'enrollment_no'){
        setFormData({
          ...formData,
          [name]: value,
        });
          let data =await axios().get(`/student/hostelFind/${value}`);
          console.log(data,"erollment no")
          if(data.status==200){
            if(data.data!=null){
              setFirstStudent(data.data.data);
            }else{
              setFirstStudent(null);
            }
            
          }else{
            setFirstStudent(null);
          }
          console.log(findStudent,"name")
      }else{
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    
  };

  return (
    <div className={classes.root}>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
        fullWidth
        margin="normal"
      >
        <InputLabel id="Hostel" required>
          Hostel Name
        </InputLabel>
        <Select
          id="Hostel"
          name="hostel"
          value={hostel}
          onChange={changeHandler}
          label="Hostel Name"
        >
          {hostels &&
            hostels.length > 0 &&
            hostels.map((row, index) => (
              <MenuItem value={ index }>{row?.hostel?.Name}</MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl
        variant="outlined"
        className={classes.formControl}
        size="small"
        fullWidth
        margin="normal"
      >
        <InputLabel id="Room" required>
           Select room
        </InputLabel>
        <Select
          id="Room"
          name="room"
          value={room}
          onChange={changeHandler}
          label="Room Name"
        >

            
        { hostel===null ?   <MenuItem value={"-1"}>No hostel selected</MenuItem>  : null }

          {hostels &&
            hostels.length > 0 &&

            hostels[ hostel ]?.rooms?.map((row, index) => (
              <MenuItem value={ row?.roomNo }>{row?.roomNo}</MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        label="EnrollMent Id"
        variant="outlined"
        name="enrollment_no"
        value={enrollment_no}
        onChange={changeHandler}
        fullWidth
        margin="normal"
        size="small"
      />
      {findStudent==""?null:findStudent==null?<p style={{color:"red"}}>Not found</p>:<p style={{color:"green"}}>**{findStudent?.name}**</p>}
      <div className={classes.second}>
        <Grid container spacing={3}>
          <Grid md={6} lg={6} item style={{ marginTop: "1.1rem" }}>
            <DatePickers
              label="admission date"
              size="small"
              name="Admission_Date"
              value={Admission_Date}
              onChange={changeHandler}
            />
          </Grid>
          <Grid md={6} lg={6} item>
            <TextField
              label="Admission Fees"
              variant="outlined"
              name="Admission_Fee"
              value={Admission_Fee}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid md={6} lg={6} item>
            <TextField
              label="Monthly fees"
              variant="outlined"
              name='Monthly_Fees'
              value={Monthly_Fees}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
          <Grid md={6} lg={6} item>
            <TextField
              label="Electricity Fees"
              variant="outlined"
              name='electricity_Fees'
              value={electricity_Fees}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid md={6} lg={6} item>
            <TextField
              label="Food Fees"
              variant="outlined"
              name='food_Fees'
              value={food_Fees}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
          <Grid md={6} lg={6} item>
            <TextField
              label="Sports Fees"
              variant="outlined"
              name='sport_Fees'
              value={sport_Fees}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
        </Grid>
        <TextField
          label="Extra Curricular activity Fees"
          variant="outlined"
          name='Extra_Curricular_Activity_Fees'
          value={Extra_Curricular_Activity_Fees}
          onChange={changeHandler}
          fullWidth
          margin="normal"
          size="small"
        />
        <Grid container spacing={3}>
          <Grid md={6} lg={6} item>
            <TextField
              label="Security Deposit"
              variant="outlined"
              name='Security_Deposit'
              value={Security_Deposit}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
          <Grid md={6} lg={6} item>
            <TextField
              label="Concession/discount"
              variant="outlined"
              name='Concession_Discount'
              value={Concession_Discount}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
              disabled={!auth?.user?.isSuperAdmin}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid md={6} lg={6} item>
            <TextField
              label="Total"
              variant="outlined"
              name='Total'
              value={Total ? Total : 0}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
          <Grid md={6} lg={6} item>
            <TextField
              label="Admission paid"
              variant="outlined"
              name='admission_paid'
              value={admission_paid}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
          {/* <Grid md={6} lg={6} item>
            <TextField
              label="Total Paid"
              variant="outlined"
              name='Total_paid'
              value={Total_paid}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid> */}
        </Grid>
        <Grid container spacing={3}>
          <Grid md={6} lg={6} item>
            <TextField
              label="Year"
              variant="outlined"
              name='Year'
              value={Year}
              onChange={changeHandler}
              fullWidth
              margin="normal"
              size="small"
            />
          </Grid>
          <Grid md={6} lg={6} item>
            <FormControl
              variant="outlined"
              className={classes.formControl}
              size="small"
              fullWidth
              margin="normal"
            >
              <InputLabel id="Month" required>
                Month
              </InputLabel>
              <Select
                id="Month"
                name="month"
                value={month}
                onChange={changeHandler}
                label="Month"
              >
                <MenuItem value={1}>January</MenuItem>
                <MenuItem value={2}>February</MenuItem>
                <MenuItem value={3}>March</MenuItem>
                <MenuItem value={4}>April</MenuItem>
                <MenuItem value={5}>May</MenuItem>
                <MenuItem value={6}>June</MenuItem>
                <MenuItem value={7}>July</MenuItem>
                <MenuItem value={8}>August</MenuItem>
                <MenuItem value={9}>September</MenuItem>
                <MenuItem value={10}>October</MenuItem>
                <MenuItem value={11}>November</MenuItem>
                <MenuItem value={12}>December</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <FormControl
          variant="outlined"
          className={classes.formControl}
          size="small"
          fullWidth
          margin="normal"
        >
          <InputLabel id="Mode" required>
            payment Mode
          </InputLabel>
          <Select
            id="Mode"
            name="payment_mode"
            value={payment_mode}
            onChange={changeHandler}
            label="Payment Mode"
          >
            <MenuItem value={1}>Cash</MenuItem>
            <MenuItem value={2}>Bank/Cheque/Card</MenuItem>
          </Select>
        </FormControl>

        <center>
            <Button onClick={handleSubmit} variant='contained' color='primary' size="small" style={{margin:'10px 10px'}}> 
                { editId ? 'Edit Admission' : 'Grant Admission' }
            </Button>
            
            <Button onClick={clearAll} variant='contained' size="small">
                Cancel
            </Button>
        </center>
      </div>
    </div>
  );
}

export default Section1;
