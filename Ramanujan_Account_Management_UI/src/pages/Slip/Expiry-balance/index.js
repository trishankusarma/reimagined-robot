import React, { useState } from "react";
import Styles from './index.module.css'
import { Button } from "@material-ui/core";
import ReactToPrint from "react-to-print";

function Student() {

  const [info,setInfo]=useState([]);
  const [classData,setClassData]=useState(null);
  const componentRef=React.useRef();

  React.useEffect(()=>{

    const data =JSON.parse(localStorage.getItem("studentExpireData"))
    const classData =JSON.parse(localStorage.getItem("ExpireDataClass"))
    setClassData(classData);
    setInfo(data);

  },[])


  return (
    <div>
    <div className={Styles.root} ref={componentRef}>
        <center style={{margin:'1rem auto', fontSize:'large', fontweight:'bold'}}>
             Expiry And Balance    
        </center>
        <div className={Styles.head}>
        <b>class: {JSON.parse(localStorage.getItem("user"))?.adminType?.classes[classData?.class]?.class}</b>
            <b>section: {classData?.section}</b>
            <b>session: {classData?.session}</b>
        </div>
      <table>
        <tr>
          <th>Name</th>
          <th>Enrollment</th>
          <th>Mobile No:</th>
          <th>Total paid amount:</th>
          <th>Balance amount:</th>
          <th>Admission Balance amount:</th>
        </tr>
        {info.map(i=>{
          return(
          <tr>
          <td>{i?.Name}</td>
          <td>{i?.admissionNO}</td>
          <td>{i?.mobileNO}</td>
          <td>{i?.Paid}</td>
          <td>{i?.Balance_amount}</td>
          <td>{i?.Balance_Admission_amount}</td>
        </tr>)
        })}
      </table>
    </div>
    <center>
      <ReactToPrint
          trigger={() => (
            <center>
          <Button className={Styles.Button} color="primary" variant="contained">Print</Button>
          </center>
          )}
          content={() => componentRef.current}
        />
          </center>
    </div>
  );
}

export default Student;
