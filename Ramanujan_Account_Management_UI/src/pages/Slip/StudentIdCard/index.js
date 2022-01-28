import React from 'react';
import styles from './index.module.css'
import imageR from '../../../components/Assets/img/ramanujan_logo.jpeg'
import { Button } from '@material-ui/core';
import axios from "../../../helpers/axios";
import {useParams} from "react-router-dom"
const Form1T = () => {
    const [details,setDetails]=React.useState();
    const {id}=useParams()
    React.useEffect(async() => {
    
    let res = await axios().get(`/student/oneStudentsCollege/${id}`);
    console.log(res.data.data,"student ");
    setDetails(res.data.data)
}, [])
    return (
        <div className={styles.form1T}>
        <div className={styles.insideBorder}>
        <div className={styles.iconR}><img src={imageR} height="100px"/></div>
            <h1 className={styles.headingR}>RAMANUJAN ACADEMY</h1>
            <div className={styles.details}>
                <p>GORESWAR ROAD, BAIHATTA CHARIALI KAMRUP, ASSAM</p>
                <p>Contact No: 23524646</p>
                <p>Email: ramanujanacademy<span >@gmail.com</span></p>
                <p>Webiste : ramanujanacademy.co.in</p>
                <p>Staff Id : 235325</p>
                <p>Joining Date : 24/03/2016</p>
            </div>
            <div className={styles.separator}></div>
            <div className={styles.mainDetails}>
                <h5>NAME : <span id={styles.unique}>{details?.name}</span>  </h5>
                <h5>SEX : {details?.gender}</h5>
                <h5>Date of Birth : {details?.DOB}</h5>
                <h5>Marital Status : </h5>
                <h5>Blood Group : </h5>
                <h5>Designation</h5>
                <h5>Address : </h5>
                <h5>Contact No : </h5>
            </div>
       </div>
       <div className={styles.outsideBorder}>
           <Button variant="contained" style={{backgroundColor:"#f5a142"}}>Print</Button>
       </div>
        </div>
    );
};

export default Form1T;