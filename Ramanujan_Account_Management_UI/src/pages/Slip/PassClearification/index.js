import React,{useRef,useState} from 'react';
import imageR from '../../../components/Assets/img/ramanujan_logo.jpeg'
import { Button } from '@material-ui/core';
import styles from './index.module.css'
import DatePicker from 'react-date-picker';
import axios from "../../../helpers/axios";
import {useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import ReactToPrint from 'react-to-print';

function Form2T() {
    const [details,setDetails]=React.useState();
    const auth = useSelector(state => state.auth)
    const {id}=useParams()
    const componentRef = useRef();
    React.useEffect(async() => {
        let res = await axios().get(`/student/oneStudentsCollege/${id}`);
        console.log(res.data.data,"student ");
        setDetails(res.data.data)
    }, [])
    const [value, onChange] = useState(new Date());
  
    return (
        <div className={styles.form2T}>
        <div ref={componentRef} className={styles.insideBorder}>
 <div className={styles.iconR}><img src={imageR} height="100px"/></div>
     <h1 className={styles.headingR}>RAMANUJAN ACADEMY</h1>
     <div className={styles.details}>
         <p>GORESWAR ROAD, BAIHATTA CHARIALI KAMRUP, ASSAM</p>
         <p>Contact No: 23524646</p>
         <p>Email: ramanujanacademy@gmail.com</p>
         <p>Website : ramanujanacademy.co.in</p>
         <p>Staff Id : 235325</p>
         <p>Joining Date : 24/03/2016</p>
     </div>
     <div className={styles.DandS}>
         <div className={styles.sNo}>
             Sl. No 
             <span><input type="numeric" /></span>
             
         </div>
         <div className={styles.date}>
            
             <DatePicker onChange={onChange} value={value}/>
             
         </div>
     </div>
     <div className={styles.heading}>
        <h5> TRANSFER/LEAVING CERTIFICATE</h5>
     </div>
     <div className={styles.mainDetails}>
            <p>Certified that <input id={styles.name}  value={details?.name} type="numeric"  /> Son/Daughter of <input type="numeric" value={details?.gaurdian} id={styles.name} /> an inhabitant of <input value={details?.address} type="numeric" id={styles.add}/> 
            was admitted in this school on  <input value={details?.sessionStart} type="numeric" id={styles.date} /> . He/She was reading in class  <input type="numeric" value={details?.standard}  id={styles.cls} /> and 
             <select>
    <option value="had">had</option>
    <option value="hadn't">hadn't</option>
  </select> passed the promotion Examination to class <input type="numeric"  id={styles.cls} /> . </p>
  
<p>
    His/Her Date of Birth according to the admission register is  <input  value={details?.DOB} type="text"  id={styles.date} />. All sums due by him/her has been paid upto 
     <input type="text"  id={styles.date} />. His/Her character is  <input type="text" />.
</p>
<div className={styles.last}>
<h6>Reasons for leaving</h6>
<ol>
    <li> <input id={styles.reason} type="text" /></li>
    <li> <input id={styles.reason} type="text" /></li>
    <li> <input id={styles.reason} type="text" /></li>
    <li> <input id={styles.reason} type="text" /></li>
    <li> <input id={styles.reason} type="text" /></li>
</ol>

</div>

<div className={styles.sign}>
    <p>Principal</p>
    <p>Ramanujan Academy</p>
</div>
     </div>
</div>
<div className={styles.outsideBorder}>
        <ReactToPrint
            trigger={() =>    <Button variant="contained" style={{backgroundColor:"#f5a142"}}>Print</Button>}
            content={() => componentRef.current}
        />
    
</div>
 </div>
    );
  }

export default Form2T;