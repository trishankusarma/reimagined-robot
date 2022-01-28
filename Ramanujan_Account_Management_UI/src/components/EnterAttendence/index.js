import React from 'react'
import Table from '../shared/Table'
import { Button, makeStyles} from '@material-ui/core';
import DatePicker from '../Datepicker';
import Search from '../shared/search'
import Sort from '../../components/shared/Sort';
import moment from 'moment';


const useStyles = makeStyles({
    root: {
      width: '96%',
      margin:'1rem auto',
    },
    filter:
    {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        margin:'1.5rem auto'
    }
  });

function AttendenceE({ getAttendence, preDetails, handleChange , data, handleChangeMark, handleSubmit, type, searchRef, handleSearch}) {

    const classes = useStyles();

    const columns = [
      { id: 'Mark', label: 'Mark', minWidth: 100 },
      { 
        id: parseInt(type)===0 ? 'admissionNo' : 'idNo', 
        label: parseInt(type)===0 ?  'EnrollMent number' : 'Stuff id', 
        minWidth: 200 
      },
      {
        id:  parseInt(type)===0 ? 'bioCode' : 'biometric_code',
        label: 'Biometric Code',
        minWidth: 150,
        align: 'left'
      },
      {
        id: 'name',
        label: 'Name',
        minWidth: 70,
        align: 'left'
      },
      {
        id: parseInt(type)===0 ? 'standard' : 'mobileNo',
        label: parseInt(type)===0 ? 'Class' : 'Mobile No',
        minWidth: 50,
        align: 'left'
      },
      {
        id: parseInt(type)===0 ? 'section' : 'DOB',
        label: parseInt(type)===0 ? 'Section' : 'DOB',
        minWidth: 50,
        align: 'left',
      },
    ]; 

    const {
        Class, Section, Date, Session
    } = preDetails

    return (
        <div className={classes.root}>
        <div className={classes.filter}>   
            {
              parseInt(type)===0 && 
              <>
                 <Sort Session="true"  name='Session' size="small" value={Session} onChange={handleChange} all={true}/>
                <Sort Class='true' name='Class' size="small" value={Class} onChange={handleChange} all={true}/>
                 <Sort Section='true' name='Section' size="small" value={Section} classIndex = {Class} onChange={handleChange} all={true}/>
              </>
            }
            </div>
          
            <div style={{display:'flex',flexDirection:'row', alignItems:'center',width:'100%' ,justifyContent:'space-between', margin:'1rem auto'}}>
            <DatePicker label="date of attendence" name='Date' value={Date} onChange={handleChange}/>
                <Button
                    variant='outlined'
                    color='primary'
                    onClick={getAttendence}
                >
                    Get Data
                </Button>

                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        <div>
             {
                  parseInt(type)===0 && <Search searchRef={searchRef} handleChange={handleSearch} placeholder={'Search by name or enrollment no...'}/>
             }
        </div>
            <Table data={data} columns={columns} pagination={true} handleChangeMark={handleChangeMark}/>
        </div>
    )
}

export default AttendenceE
