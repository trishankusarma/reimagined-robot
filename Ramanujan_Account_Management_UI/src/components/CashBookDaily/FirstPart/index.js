import {
  Button,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React,{ useState , useEffect } from "react";
import Datepicker from "../../Datepicker";
import CashbookHeading from "../../Cashbook/CashbookHeading";
import Table from "../Table/index";
import moment from "moment";

import axios from "../../../helpers/axios";
import { Toastify } from '../../../App';
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "96%",
    margin: "1rem auto",
  },
}));

function FirstPart() {
  const classes = useStyles()
  const [ type, setType ] = useState(0)

  const auth = useSelector( state => state.auth );

  const [ formData, setFormData ] = useState({
     
    date: moment().format('YYYY-MM-DD'),
    particular: null,
    bankTransfer: null,
    remarks: null
  })

  const {
    date , particular, bankTransfer ,remarks 
  } = formData

  const [ cashData, setCashData ] = useState(null)

  useEffect( async()=>{
         
    try {

      if(!date)return
      
      const res = await axios().post('/cashBook/getOnecashBook',{
        From_Date : date,
        department : auth?.user?.adminType?._id 
      })

      if(res.status===200){

         console.log( "cash data" , res.data );
         
          setCashData(res.data);
          return
      }
      Toastify('error','Something went wrong!') 
    } catch (error) {
      
      Toastify('error','Something went wrong!') 
    }
  },[date])

  const handleSubmit = async ()=>{
      
      const data = {
         ...cashData[0] , ...formData ,
         receipts : 0,
         payments : 0
      }
     
      console.log(  data  );

      let result = await axios().post("/cashBook/add_to_cashBook", data);
      
      console.log( result.data , 'res.data' );

      if( result.status == 200 ){

            window.location.reload();
          
            setCashData([ result.data ] );
           
           Toastify("success", "Bank Transfer Done !");
      }else{
           Toastify("success", "Something went wrong in cashbook !");
      }
  }

  const handleChange = (e) => {
    
      const { name , value } = e.target;

      setFormData({

          ...formData,
          [name] : value
      })
  };

  return (
    <div className={classes.root}>
      <div
        style={{
          margin: "1rem 0",
          width: "30%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button color="primary" variant="contained" size="small">
          Download to PDF
        </Button>
        <Button color="secondary" variant="contained" size="small">
          Download to Excel
        </Button>
      </div>

      <Typography margin="normal" variant="h6">
        Cash To Bank(+ve value for Deposit & -ve for Withdraw)
      </Typography>
      
      <Grid container spacing={3}>
        <Grid xs={6} md={3} lg={3} item>

          <Datepicker label="Select date" name='date' value={date} onChange={handleChange} />{" "}
        </Grid>
        <Grid xs={6} md={3} lg={3} item>

            <TextField

                label="particular"
                variant="outlined"
                size="small"
                fullWidth
                name='particular' 
                value={particular} 
                onChange={handleChange}
            />  
        
        </Grid>
        <Grid xs={6} md={3} lg={3} item>
          <TextField 

                label="bankTransfer"
                variant="outlined" 
                size="small" 
                fullWidth 
                name='bankTransfer' 
                value={bankTransfer} 
                onChange={handleChange}
          />
        </Grid>
        <Grid xs={6} md={3} lg={3} item>
          
          <TextField

              label="remarks"
              variant="outlined"
              size="small"
              fullWidth
              name='remarks' 
              value={remarks} 
              onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button color="primary" variant="contained" style={{ margin: "1rem 0" }} onClick={handleSubmit}>
        Submit
      </Button>

      <CashbookHeading text ={`${date ? date : 'No dates Selected'}`}/>
      <Table cashData={cashData} getDailyData={true}/>
    </div>
  );
}

export default FirstPart;
