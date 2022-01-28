import { Button, Grid, TextField } from '@material-ui/core'
import React from 'react'
import DatePicker from '../Datepicker'
import {useDispatch,useSelector} from "react-redux"
import {leaveApplication} from "../../redux/actions"
import queryString from "query-string"
import {useHistory} from "react-router-dom"
function AddNewLeave(props) {
    const history=useHistory()
    const  {id,modelOf}=queryString.parse(history.location.search)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [allValues,setAllValues]=React.useState({
        From_Date:"",
        To_date:"",
        reason:"",
        id:id,
        modelOf:modelOf

    })

    const handleChange=(e)=>{
        setAllValues({
            ...allValues,
            [e.target.name]:e.target.value
        })
    }

    const submit=()=>{
            dispatch(leaveApplication({...allValues,department:auth?.user?.adminType?._id},history))
    }
    return (
        <div style={{width:'90%', margin:'1rem auto'}}>
        <div style={{border:'1px solid black', padding:'1rem', margin:'1rem 0'}}>
        <Grid container spacing={5}>
                <Grid lg={3} md={3} item>Name : {props?.name}</Grid>
                <Grid lg={3} md={3} item>code: {props?.rollNo}</Grid>
                <Grid lg={3} md={3} item>Mobile No: {props?.mobileNo}</Grid>
                <Grid lg={3} md={3} item>Date: {props?.DOB}</Grid>
        </Grid>
        </div>
        <div style={{margin:'2rem 0'}}>
        <Grid container spacing={5}>
                <Grid lg={4} md={4} item>
                    <DatePicker
                    onChange={handleChange}
                     label="from date" name="From_Date"/>
                </Grid>
                <Grid lg={4} md={4} item>
                    <DatePicker
                    onChange={handleChange}
                     label="to date" name="To_date"/>
                </Grid>
        </Grid>
        </div>
        
            <div>
                <TextField    onChange={handleChange} name="reason" label="Reason" variant="outlined" rows={7} multiline fullWidth/>
                <Button onClick={()=>{submit()}} color="primary" variant="contained"  style={{margin:'2rem 0'}}>Submit</Button>
            </div>

        </div>
    )
}

export default AddNewLeave
