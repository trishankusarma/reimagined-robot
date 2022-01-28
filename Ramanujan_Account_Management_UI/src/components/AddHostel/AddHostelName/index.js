import React, { useState, useEffect } from "react";
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
import Table from "../tableHostel";

import { useDispatch, useSelector } from "react-redux";
import { addHostel, getAllHostels, getAllRooms, editHostel, deleteHostel } from '../../../redux/actions'

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "96%",
    margin: "1rem auto",
  },
}));

function AddHostel() {
  const classes = useStyles()
  const [ editId , setEditId ] = useState(null)
  const [ deleteId, setDeleteId ] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  const hostel = useSelector(state=>state.hostel)

  const [formData, setFormData] = useState({
    Name: "",
    Address: "",
    Capacity: "",
    noOfRooms: "",
    Occupancy_Allowed: "",
  });

  const { Name, Address, Capacity, noOfRooms, Occupancy_Allowed } = formData;

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e)=>{

     if(!formData) return
     
     e.preventDefault()

     if(editId){
         
         dispatch( editHostel(formData , editId) )
         return;
     }
    
     dispatch( addHostel(formData) )
  }

  useEffect(()=>{

       dispatch( getAllHostels() )
  },[])

  useEffect( async()=>{
       if(!deleteId) return
       
       await dispatch( deleteHostel(deleteId) )

       if(editId===deleteId){

          setEditId(null)
          setFormData({
           ...formData,
            Name: '',
            Address: '',
            Capacity: '',
            noOfRooms: '',
            Occupancy_Allowed: null
          })
       }
       setDeleteId(null)

  },[deleteId])

  const handleOperation = ( row, type )=>{

    if(type==='Select'){
        
        history.push(`/addRoom/${row._id}`)
    }else if(type==='Edit'){
        
        setEditId(row._id)
        setFormData(row)
    }else if(type==='Delete'){
        
        setDeleteId(row._id)
    }
 }

  return (
    <div className={classes.root}>
      <Grid container spacing={7}>
        <Grid lg={4} md={4} item>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              id='Name'
              fullWidth
              size="small"
              name="Name"
              value={Name}
              onChange={handleChange}
              placeholder="Enter Name."
              label="Hostel Name"
              required
              margin="normal"
            />
            <TextField
              id="outlined-multiline-static"
              label="Address"
              multiline
              rows={4}
              name="Address"
              value={Address}
              onChange={handleChange}
              placeholder="Enter Address"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="Capacity"
              id='Capacity'
              type="number"
              value={Capacity}
              onChange={handleChange}
              placeholder="Enter Capacity"
              label="Capacity"
              required
              margin="normal"
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="noOfRooms"
              type="number"
              id='noOfRooms'
              value={noOfRooms}
              onChange={handleChange}
              placeholder="Enter No of Rooms"
              label="No of rooms"
              required
              margin="normal"
            />
            <FormControl
              variant="outlined"
              fullWidth
              size="small"
              margin="normal"
            >
              <InputLabel id="gender">*Occupancy_Allowed:</InputLabel>
              <Select
                id="gender"
                name="Occupancy_Allowed"
                onChange={handleChange}
                value={Occupancy_Allowed}
                label="*Occupancy_Allowed:"
              >
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
                <MenuItem value={2}>Others</MenuItem>
              </Select>
            </FormControl>

            <Button type='submit' color="primary" variant="contained" margin="auto" disabled={ hostel.loading }>
                { editId ? 'Edit' : 'Create' } 
            </Button>
          </form>
        </Grid>
        <Grid lg={8} md={8} item>
          <Table data={hostel.hostels} editId={editId} setEditId={setEditId} deleteId={deleteId} setDeleteId={setDeleteId} setFormData={setFormData} handleOperation={handleOperation}/>
        </Grid>
      </Grid>
    </div> 
  );
}

export default AddHostel;
