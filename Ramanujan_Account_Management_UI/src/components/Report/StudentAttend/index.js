import React,{ useState, useEffect } from 'react'
import {useRef} from 'react'
import DatePicker from '../../Datepicker'
import { makeStyles } from '@material-ui/core/styles';
import { Grid,FormControl,InputLabel,Select,MenuItem, Button, Typography } from '@material-ui/core';
import Sort from '../../../components/shared/Sort'
import AttendenceTAble from '../Table';
import Search from '../../shared/search';
import axios from "../../../helpers/axios";
import moment from 'moment';
import ReactToPrint from "react-to-print";
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


function StudentAttend({ students , auth, basicDetails , handleChange }) {
    const classes = useStyles();
    const componentRef=useRef();
    const [ result, setResults ] = useState(null)

    const {
        From_Date, To_Date , Session, Class, Section, Student
    } = basicDetails

    useEffect(async () => {

        console.log( From_Date, To_Date , Session, Class, Section, Student )
        
        if( From_Date===null || To_Date===null || Session===null || Class===null || Section===null || Student===null ) return;

        try {
            
            const res = await axios().get('/student/getStudentAttendence?reqDetails='+JSON.stringify( {
                ...basicDetails,
                department : auth.user?.adminType?._id,
                Class : auth?.user?.adminType?.classes[ Class ].class,
                Student : Student?.split(':')[0]
            }));

            console.log(res.data.data)

            let present = 0, absent =0;

            await res.data.data.map((student)=>student.present ? ++present : ++absent)
            
            setResults({
                ...res.data,
                present, 
                absent 
            })

        } catch (error) {
            
            console.log(error)
        }

    }, [From_Date, To_Date , Session, Class, Section, Student])

    return (
        <div className={classes.root}>
            <Grid container className={classes.Grid} spacing={3}>
                <Grid item lg={4} >
                    <DatePicker label="From Date" name='From_Date' value={From_Date} onChange={handleChange}/>
                </Grid>
                <Grid item lg={4}>
                    <DatePicker label="To Date"  name='To_Date' value={To_Date} onChange={handleChange}/>
                </Grid>
                <Grid item lg={4}>
                    <Sort Session="true" size="small"  name='Session' value={Session} onChange={handleChange}/>
                </Grid>
            </Grid>
            <Grid container className={classes.Grid} spacing={3}>
                <Grid item lg={4}>
                    <Sort Class="true" size="small"  name='Class' value={Class} onChange={handleChange}/>
                </Grid>
                <Grid item lg={4}>
                    <Sort Section="true" size="small"  name='Section' value={Section} classIndex = {Class} onChange={handleChange}/>
                </Grid>
                <Grid item lg={4}>
                    <FormControl variant="outlined" size="small" className={classes.formControl} fullWidth>
                        <InputLabel id="Student">Student Name</InputLabel>
                            <Select
                                id="Student"
                                name = 'Student'
                                value={Student}
                                onChange={handleChange}
                                label="Student Name"
                            >

                                    {
                                        !students || students.length===0 ?
                                          <MenuItem value={''}>
                                              No Students to Select
                                           </MenuItem>  :
                                        null
                                    }
                                    {
                                        students && students.map((student)=>{
                                            return <MenuItem value={`${student._id}:${student.name}`}>
                                                        { student.name }
                                                    </MenuItem>
                                        })
                                    }
                            </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container className={classes.Grid}  alignItems="center">
              <Grid xs={4} lg={3} md={3}>Total Days : { result ? result.present + result.absent : 0 }</Grid>
              <Grid xs={4} lg={3} md={3}>Present Days : { result ? result.present : 0 }</Grid>
              <Grid xs={4} lg={3} md={3}>Absent Days : { result ? result.absent : 0 }</Grid>
              <Grid xs={4} lg={3} md={3}   justifyContent="flex-end">
                  <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="secondary">
              print This
            </Button>
          )}
          content={() => componentRef.current}
        /></Grid>
            </Grid>
            <div className={classes.filters}>

          </div>
          <div ref={componentRef}>
          <AttendenceTAble style={{marginTop:'10px'}} indivisual={Student?.split(':')[1]} data={ result?.data }/>
          </div>
        </div>
    )
}

export default StudentAttend
