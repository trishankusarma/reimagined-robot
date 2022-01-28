import { Button, Grid, TextField } from '@material-ui/core'
import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Sessiontable from './AddSessiontable';

import axios from '../../helpers/axios'
import { Toastify } from "../../App";
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '96%',
        margin: '1.4rem auto',
        height: '75vh'
    },

}));


function Session() {
    const classes = useStyles();
    const auth = useSelector(state => state.auth)
    
    const initialState = {
        session : "",
        admissionFees : "",
        programFees : "",
        monthDuration : "",
        department : auth?.user?.adminType?._id
    }

    const [formData, setFormData] = useState(initialState);
      
    const { session , admissionFees , programFees , monthDuration } = formData;

    const [ sessionData , setSessionData ] = useState([])

    const [ editStatus , setEditStatus ] = useState( false )

    const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
    };

    const handleClick = async ()=>{
         
         try {

            let res;

            if( !editStatus ){

                    res = await axios().post('/session/create_new_Session', formData)

                    if(res.status==200){

                        setSessionData(
                            sessionData ? [ ...sessionData , res.data ] : [ res.data ]
                        )

                        Toastify('success', 'Session created!!')
                    }else{

                        Toastify('error', 'Session cannot be created!!')
                    }
            } else {

                    res = await axios().patch(`/session/edit/${formData._id}`, formData)

                    if(res.status==200){

                        console.log('sessionData', sessionData, res.data, sessionData[0]._id===formData._id)

                        setSessionData(
                            sessionData.map((data)=>data._id===formData._id ? res.data : data)
                        )

                        Toastify('success', 'Session editted!!')
                    }else{

                        Toastify('error', 'Session cannot be edditted!!')
                    }                
            }
         } catch (error) {
             
                Toastify('error', 'Something went wrong!!')
         }
    }

    useEffect(async () => {
        
         try {
             
            const res = await axios().get('/session/getAllSessions/'+auth?.user?.adminType?._id)

            if(res.status==200){

                setSessionData(
                    res.data
                )
            }else{

                Toastify('error', 'Cannot import data!!')
            }
         } catch (error) {
             
                Toastify('error', 'Something went wrong!!')
         }
    }, [])

    const clearData = ()=>{
        
        setFormData(initialState)
        setEditStatus( false )
    }

    const handleOperation  = async (row , op)=>{

        if(op==='Delete'){

             try {
             
                const res = await axios().delete(`/session/delete/${row._id}`)

                if(res.status==200){

                    setSessionData(
                        sessionData.filter((data)=> data._id !== res.data._id )
                    )

                    Toastify('success', 'Successfully Deleted!!')
                }else{

                    Toastify('error', 'Cannot delete session!!')
                }
            } catch (error) {
                
                    Toastify('error', 'Something went wrong!!')
            }

        }else if(op==='Edit'){

             try {
             
                const res = await axios().get(`/session/get/${row._id}`)

                if(res.status==200){

                    setFormData(
                        res.data
                    )

                    setEditStatus( true )

                }else{

                    Toastify('error', 'Cannot get session!!')
                }
            } catch (error) {
                
                    Toastify('error', 'Something went wrong!!')
            }
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid lg={3} md={3} sm={6} item>
                    <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="session"
                        id='session'
                        value={session}
                        onChange={handleChange}
                        placeholder="Enter academic session"
                        label="enter academic session"
                        required
                        margin="normal"
                    />
                </Grid>
                <Grid lg={3} md={3} sm={6} item>
                    <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="admissionFees"
                        id='admissionFees'
                        type="number"
                        value={admissionFees}
                        onChange={handleChange}
                        placeholder="enter admission fees"
                        label="admission fees"
                        required
                        margin="normal"
                    />
                </Grid>
                <Grid lg={3} md={3} sm={6} item>
                    <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="programFees"
                        id='programFees'
                        type="number"
                        value={programFees}
                        onChange={handleChange}
                        placeholder="enter program fees"
                        label="program fees"
                        required
                        margin="normal"
                    />
                </Grid>
                <Grid lg={3} md={3} sm={6} item>
                    <TextField
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="monthDuration"
                        id='monthDuration'
                        type="number"
                        value={monthDuration }
                        onChange={handleChange}
                        placeholder="Enter duration monthDuration "
                        label="Duration in months"
                        required
                        margin="normal"
                    />
                </Grid>
            </Grid>
            <Button 
                 color="primary" 
                 variant="contained"
                 onClick={handleClick}
            > { editStatus ? 'Edit' : 'Submit' }</Button>

            <Button 
                 color="primary" 
                 onClick={clearData}
            >Clear</Button>
            <div>
               <Sessiontable data = {sessionData} handleOperation={handleOperation}/>
            </div>
        </div>
    )
}

export default Session
