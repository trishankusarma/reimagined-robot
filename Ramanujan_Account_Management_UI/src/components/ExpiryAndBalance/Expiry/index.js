import React from 'react'
import Table from '../Table'
import {
    Typography,
    makeStyles,
    Button,

} from "@material-ui/core";

import Search from '../../shared/search'
import {useSelector} from "react-redux"
import axios from "../../../helpers/axios";
import { Toastify } from '../../../App';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "96%",
        margin: "1rem auto",
        display:'flex',
        flexDirection:'column'
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: '20px auto',
        marginTop: '50px'
    },

}));

function Expiry(props) {
    const classes = useStyles()
    const student = useSelector(state => state.student)
    const sendMsm=async(phoneNo)=>{
        console.log(phoneNo,"phoneNos")
        let res = await axios().post("/student/expireSendMessage",{phoneNo});
        if(res.status==200){
            Toastify("success","Message send successfully");
        }else{
            Toastify("error","Something went wrong");
        }
    }
    
    return (
        <div className={classes.root}>
        <center>
             <Typography variant="h4" color="secondary" style={{textDecoration:'underline'}}>Balanced To Be Cleared</Typography>
        </center>
            <div className={classes.filters}>
                <Typography>Total no. of Entries : {props?.data?.length}</Typography>
            </div>
            <div>
                <Table data={props}/>
            </div>
            <div style={{display:'flex', justifyContent:'flex-end', margin:'4rem auto'}}>
                  <Button onClick={()=>{
                      console.log(student?.phoneNo,"student?.phoneNo")
                    //   sendMsm(student?.phoneNo)
                  }} variant="contained" color="primary">send Bulk sms about Balance</Button>
            </div>
        </div>
    )
}

export default Expiry
