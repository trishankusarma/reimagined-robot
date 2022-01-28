import React,{useRef} from 'react';
import styles from './index.module.css'
import imageR from '../../../components/Assets/img/ramanujan_logo.jpeg'
import { Button } from '@material-ui/core';
import axios from "../../../helpers/axios";
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import ReactToPrint from 'react-to-print';

const Form1T = () => {
    const [details,setDetails]=React.useState();
    const auth = useSelector(state => state.auth)
    const {id}=useParams()
    const componentRef = useRef();
    React.useEffect(async() => {
    
    let res = await axios().get(`/student/oneStudentsCollege/${id}`);
    console.log(res.data.data,"student ");
    setDetails(res.data.data)
}, [])
    return (
        <div className={styles.form1T}>
        <div ref={componentRef} className={styles.insideBorder}>
        <div className={styles.iconR}><img src={imageR} height="100px"/></div>
            <h1 className={styles.headingR}>RAMANUJAN ACADEMY</h1>
            <div className={styles.details}>
                <p>GORESWAR ROAD, BAIHATTA CHARIALI KAMRUP, ASSAM</p>
                <p>Contact No: 9864044668, 7086630817</p>
                <p>Email: ramanujanacademy<span >@gmail.com</span></p>
                <p>Webiste : ramanujanacademy.co.in</p>
                <p>Student Id : {details?.rollNo}</p>
                <p>Valid upto : 24/03/2016</p>
                <p>Session : {details?.standard} {auth?.user?.adminType?.departmentName} (2021-22)</p>

            </div>
            <div className={styles.separator}></div>
            <div className={styles.mainDetails}>
                <h5>NAME : <span id={styles.unique}>{details?.name}</span>  </h5>
                <h5>SEX : {details?.gender==0?"Male":details?.gender==1?"Female":"Other"}</h5>
                <h5>Date of Birth : {details?.DOB}</h5>
                <h5>Class : {details?.standard} ({auth?.user?.adminType?.departmentName})</h5>
                <h5>Section : {details?.section}</h5>
                <h5>Father :{details?.gaurdian}</h5>
                <h5>Address : {details?.address}</h5>
                <h5>Contact No : {details?.mobileNo}</h5>
            </div>
       </div>
       <div className={styles.outsideBorder}>
        <ReactToPrint
            trigger={() =><Button variant="contained" style={{backgroundColor:"#f5a142"}}>Print</Button>}
            content={() => componentRef.current}
        />     
       </div>
        </div>
    );
};

export default Form1T;