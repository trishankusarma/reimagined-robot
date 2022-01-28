import React, { useState, useEffect } from 'react'
import DatePicker from '../../Datepicker'
import { makeStyles } from '@material-ui/core/styles';
import { Grid,FormControl,InputLabel,Select,MenuItem, Button, Typography } from '@material-ui/core';
import AttendenceTAble from '../Table';
import Search from '../../shared/search'
import moment from 'moment';
import axios from "../../../helpers/axios";
import { Toastify } from '../../../App';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) =>
({
    root:
    {
        width: '95%',
        margin: '2rem auto'
    },
    Grid:
    {
        margin:'2rem auto'
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin:'20px auto',
        marginTop:'50px'
      },

}));


function StudentAttend({stuffs, auth}) {
    const classes = useStyles();

    const [ result, setResults ] = useState(null)

    const [ basicDetails, setBasicDetails ] = useState({
          From_Date : moment().format('YYYY-MM-DD'),
          To_Date : moment().format('YYYY-MM-DD'),
          Stuff : null
    })
  
    const {
        From_Date, To_Date , Stuff
    } = basicDetails
  
    const handleChange = (e) => {
  
          const { name, value } = e.target
  
          setBasicDetails({
              ...basicDetails,
              [ name ] : value
          });
    };
  
      useEffect(async () => {
            
          if( From_Date===null || To_Date===null ||  Stuff===null ) return;
  
          try {
              
              const res = await axios().get('/stuff/getOneStuffAttendance?reqDetails='+JSON.stringify( {
                  ...basicDetails,
                  department : auth.user?.adminType?._id,
                  Stuff : Stuff?.split(':')[0]
              }));
  
              console.log(res.data.data)
  
              let present = 0, absent =0;
  
              await res.data.data.map((stuff)=>stuff.present ? ++present : ++absent)
              
              setResults({
                  ...res.data,
                  present, 
                  absent 
              })
  
          } catch (error) {
              
              console.log(error)
          }
  
      }, [From_Date, To_Date , Stuff ])

      console.log('stuffs', stuffs)

    return (
        <div className={classes.root}>
            <Grid container className={classes.Grid} spacing={3}>
            <Grid item lg={4} >
                    <DatePicker label="From Date" name='From_Date' value={From_Date} onChange={handleChange}/>
                </Grid>
                <Grid item lg={4}>
                    <DatePicker label="To Date"  name='To_Date' value={To_Date} onChange={handleChange}/>
                </Grid>
                <Grid lg={4} item>
                <FormControl variant="outlined" size="small" className={classes.formControl} style={{width:'360px'}}>
                        <InputLabel id="Stuff">Staff Name</InputLabel>
                        <Select
                            id="Stuff"
                            name='Stuff'
                            value={Stuff}
                            onChange={handleChange}
                            label="Stuff Name"
                        >
                            {
                                stuffs?.map((stuff)=>(

                                    <MenuItem value={`${stuff._id}:${stuff.name}`}>
                                         { stuff.name }
                                    </MenuItem> 
                                ))
                            }

                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container className={classes.Grid}  alignItems="center">
              <Grid xs={4} lg={3} md={3}   justifyContent="flex-end"><Button variant="contained" color="secondary">Print</Button></Grid>
            </Grid>
            <div className={classes.filters}>
            <Typography>Total no. of Stuffs : {stuffs?.length}</Typography>
          </div>
          <AttendenceTAble style={{marginTop:'10px'}} indivisual={Stuff?.split(':')[1]} data={ result?.data }/>
        </div>
    )
}

export default StudentAttend
