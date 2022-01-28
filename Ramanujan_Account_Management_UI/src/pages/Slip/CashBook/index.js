import React, { useState, useEffect } from "react";
import Styles from './index.module.css'
import { Button } from "@material-ui/core";
import ReactToPrint from "react-to-print";

import axios from "../../../helpers/axios";
import queryString from "query-string";
import { Toastify } from '../../../App';
import { setIn } from "formik";

function Student({location}) {

  const [info,setInfo]=useState([]);
  const componentRef=React.useRef();

  const { Department , From_Date, To_date  } = queryString.parse(location.search);

  useEffect( async() => {

    if( !From_Date || !To_date  ) return

    try {
      
    const res = await axios().post('/cashBook/getAllcashBook',{
      From_Date ,
      To_date,
      department :Department
    })

    if(res.status===200){

        console.log( res.data , "data" );

        setInfo( res.data );
        return
    }
    Toastify('error','Something went wrong!') 
  } catch (error) {
    
    Toastify('error','Something went wrong!') 
  }
  }, [From_Date, To_date])


  return (
    <div>
  <div className={Styles.root}  ref={componentRef}>
      <center style={{margin:'1rem auto', fontSize:'large', fontweight:'bold'}}>
        <h2 style={{marginTop:'1rem'}}>Ramanujan Academy</h2>
           <p style={{marginTop:'1rem'}}>Daily Cashbook  Report</p> 
      </center>
      <div className={Styles.head}>
         <b>From Date:{From_Date} </b>
         <b>To Date: {To_date}</b>
      </div>
    <table>
      <tr>
        <th>Date</th>
        <th>Cash In Hand(open)</th>
        <th>Cash In Bank(open)</th>
        <th>Received</th>
        <th>Payments</th>
        <th>Bank Transfer</th>
        <th>Cash In Hand(close)</th>
        <th>Cash In Bank(close)</th>
      </tr>

       {
         info?.map((item)=>(

              <tr>
                <td>{item?.date?.split('T')[0]}</td>
                <td>{item?.opening_cash_in_hand}</td>
                <td>{item?.opening_cash_in_bank}</td>
                <td>{item?.receipts}</td>
                <td>{item?.payments}</td>
                <td>{item?.bankTransfer}</td>
                <td>{item?.closing_cash_in_hand}</td>
                <td>{item?.closing_cash_in_bank}</td>
              </tr>
         ))
       }
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
