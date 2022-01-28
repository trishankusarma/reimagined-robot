import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import styles from "./inde.module.css";
import imageR from "../../../components/Assets/img/ramanujan_logo.jpeg";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Toastify } from "../../../App";

const Form1T = () => {
  const { id } = useParams();
  const componentRef = useRef();
  const [info, setInfo] = React.useState({
    basicPay: 0,
    DA: 0,
    HRA: 0,
    conveyance: 0,
    otherAllowance: 0,
    grossSalary: 0,
    PF: 0,
    ESI: 0,
    loanDeduction: 0,
    professionalTax: 0,
    absentPenalty: 0,
    advancedSalary: 0,
    TDSIT: 0,
    netSalary: 0,
    paymentMethod: 0,
  });
  const [person, setPerson] = React.useState({
    idNo: 0,
    name: "",
    designation: "",
    address: "",
    mobileNo: 0,
    joining_Date: 0,
  });
  const stuff = useSelector((state) => state.stuff);
  React.useEffect(() => {
    const data = JSON.parse(localStorage.getItem("dataslip"));
    
    setInfo({
      ...data,
    });
  }, []);
  const history = useHistory();
  React.useEffect(() => {
    if (!stuff.basicSalaryInfo.employee) {
      Toastify("error", "Select a stuff first");
      return history.goBack();
    }
  }, []);
  console.log(info.DA)
  return (
    <div className={styles.form1T}>
      <div ref={componentRef} className={styles.insideBorder}>
        <div className={styles.iconR}>
          <img src={imageR} height="100px" />
        </div>
        <h1 className={styles.headingR}>RAMANUJAN ACADEMY</h1>
        <div className={styles.details}>
          <p>GORESWAR ROAD, BAIHATTA CHARIALI KAMRUP, ASSAM</p>
          <p>Contact No: 23524646</p>
          <p>
            Email: ramanujanacademy<span>@gmail.com</span>
          </p>
          <p>Webiste : ramanujanacademy.co.in</p>
          <p>Staff Id : 235325</p>
          <p>Joining Date : 24/03/2016</p>
        </div>
        <div className={styles.separator}></div>
        <center>salary Slip</center>
        <div className={styles.table1}>
          <table>
            <tr>
              <th>
                STAFF CODE: 001 <br />
                STAFF DETAIL: <br />
                {stuff?.basicSalaryInfo?.employee?.name}
                <br />
                {stuff?.basicSalaryInfo?.employee?.designation?.departmentName} <br />
                {stuff?.basicSalaryInfo?.employee?.address}
                <br />
                {stuff?.basicSalaryInfo?.employee?.mobileNo}
                <br />
              </th>
              <th> amount</th>
              <th>
                DATE OF PRINT: {new Date().toISOString().split("T")[0]}
                <br />
                {/* SALARY OF :{stuff?.basicSalaryInfo?.month},{" "} */}
                {/* {stuff?.basicSalaryInfo?.year} */}
                <br />
              </th>
              <th>amount</th>
            </tr>
            <tr>
              <td>BASIC PAY</td>
              <td>{info?.basicPay}</td>
              <td>PROVIDENT FUND</td>
              <td></td>
            </tr>
            <tr>
              <td>DA</td>
              <td>{info?.DA}</td>
              <td>Loan</td>
              <td>{info?.loanDeduction}</td>
            </tr>
            <tr>
              <td>HRA</td>
              <td>{info?.HRA}</td>
              <td>Professional Tax</td>
              <td>{info?.professionalTax}</td>
            </tr>
            <tr>
              <td>Conveyence</td>
              <td>{info?.conveyance}</td>
              <td>TDS/IT</td>
              <td>{info?.TDSIT}</td>
            </tr>
            <tr>
              <td>Other Allowence</td>
              <td>{info?.otherAllowance}</td>
              <td>Esic</td>
              <td>{info?.ESI}</td>
            </tr>
            <tr></tr>
            <tr>
              <td></td>
              <td></td>
              <td>ABSENT PENALTY</td>
              <td>{info?.absentPenalty}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>ADVANCE SALARY</td>
              <td>{info?.advancedSalary}</td>
            </tr>
            <tr>
              <td>GROSS PAY</td>
              <td>{info?.grossSalary}</td>
              <td>ToTal PAY</td>
              <td>{info?.netSalary}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className={styles.outsideBorder}>
        <ReactToPrint
          trigger={() => (
            <Button variant="contained" style={{ backgroundColor: "#f5a142" }}>
              Print
            </Button>
          )}
          content={() => componentRef.current}
        />
      </div>
    </div>
  );
};

export default Form1T;
