import React, { useRef } from "react";
import Image1 from "../../../components/Assets/img/ramanujan_logo.jpeg";
import classes from "./index.module.css";
import { Button } from "@material-ui/core";
import axios from "../../../helpers/axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import queryString from "query-string";
import { useHistory } from "react-router-dom";

function Form3T() {
  const [details, setDetails] = React.useState();
  const [fees, setFee] = React.useState();
  const [totalis, setTotalis] = React.useState(0);
  const [amount, setAmount] = React.useState(0);
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [querys, setQuery] = React.useState();
  var converter = require("number-to-words");
  const { id } = useParams();
  const componentRef = useRef();
  const today=new Date()
  React.useEffect(() => {
    setQuery(queryString.parse(history.location.search));
  }, []);

  React.useEffect(async () => {
    
    let res = await axios().get(`/student/oneStudentsCollege/${id}`);
    setDetails(res.data.data);
    console.log(res.data,"1")
    let fee = await axios().get(
      `/student/oneStudentsCollegeForFee/${res.data.data.stream}/${res.data.data.admissionNo}`
    );
    console.log(fee?.data?.data?.payment?.previousPayment,"2")
    setFee(fee.data.data);
    if (querys?.prev) {
      setTotalis(fee?.data?.data?.payment?.previousPayment[querys?.index]?.amount);
    } else if (querys?.other) {
      setTotalis(fee?.data?.data?.payment?.otherPayment[querys?.index]?.amount);
    } else {
      // for (let i = 0; i < fee?.data?.data?.payment?.previousPayment?.length; i++) {
        setTotalis(100);
      // }
    }
  }, []);

  return (
    <div className={classes.root}>
      <div ref={componentRef}>
        <div className={classes.firstSection}>
          <img src={Image1} width="80" height="80" />
          <div className={classes.second}>
            <h2>RAMANUJAN ACADEMY</h2>

            <h5>
              BAIHATA CHARIALI, KAMRUP,
              <br />
              ASSAM-781381
            </h5>
          </div>
          <img
            className={classes.secImage}
            src={Image1}
            width="80"
            height="80"
          />
        </div>
        <div className={classes.content}>
          <div className={classes.text1}>
            <p>
              SI no: {details?.rollNo}
              <br />
              Name: {details?.name}
              <br />
              Class: {details?.standard} (
              {auth?.user?.adminType?.departmentName})<br />
            </p>
          </div>
          <div className={classes.text2}>
            <p>Cash Receipt</p>
            <br />
            <p>Section: {details?.section}</p>
            <br />
          </div>
          <div className={classes.text3} style={{textAlign:'end'}}>
            Date: {today.toLocaleDateString("en-GB")}<p id={classes.date} />
            Admission No:{details?.admissionNo}
            <br />
            Roll No: {details?.rollNo}
            <br />
          </div>
        </div>
        <div>
          <table>
            <tr>
              <th id={classes.special}>Serial No</th>
              <th id={classes.special}>Particulars</th>
              <th id={classes.special}>Amount</th>
            </tr>
            {querys?.prev ? (
              <tr>
                <td id={classes.special}>{1}</td>
                <td id={classes.special}>
                  {fees?.payment?.previousPayment[querys?.index]?.particular}{" "}
                </td>
                <td id={classes.special}>
                  {fees?.payment?.previousPayment[querys?.index]?.amount}
                </td>
              </tr>
            ) : querys?.other ? (
              <tr>
                <td id={classes.special}>{1}</td>
                <td id={classes.special}>
                  {fees?.payment?.otherPayment[querys?.index]?.particular}{" "}
                </td>
                <td id={classes.special}>
                  {fees?.payment?.otherPayment[querys?.index]?.amount}
                </td>
              </tr>
            ) : (
              <>
                  <tr>
                    <td id={classes.special}>{1}</td>
                    <td id={classes.special}>admissionFee </td>
                    <td id={classes.special}>{details?.admissionFee}</td>
                  </tr>
                  <tr>
                    <td id={classes.special}>{2}</td>
                    <td id={classes.special}>programFee </td>
                    <td id={classes.special}>{details?.programFee}</td>
                  </tr>
                  <tr>
                    <td id={classes.special}>{3}</td>
                    <td id={classes.special}>otherFee </td>
                    <td id={classes.special}>{details?.otherFee}</td>
                  </tr>
                  <tr>
                    <td id={classes.special}>{4}</td>
                    <td id={classes.special}>examFee </td>
                    <td id={classes.special}>{details?.examFee}</td>
                  </tr>
                  <tr>
                    <td id={classes.special}>{5}</td>
                    <td id={classes.special}>concession </td>
                    <td id={classes.special}>{details?.concession}</td>
                  </tr>
                </>
            )}
            {querys?.prev||querys?.other?null:<tr>
              <td></td>
              <td id={classes.special}>Total :</td>
              <td id={classes.special}>{details?.totalFee}</td>
            </tr>}
            
            {fees?.payment?.previousPayment[querys?.index]?.instance?.instance?.Payment_Type=="Admission"||
            fees?.payment?.previousPayment[querys?.index]?.instance?.instance?.Payment_Type=="Installment"
            ?
            <>
            <tr>
              <td />
              <td>
                <b>
                  {querys?.prev || querys?.other
                    ? "Admission Balance :"
                    : "Admission Total Paid :"}
                </b>
              </td>
              
              <td>
                {querys?.prev
                  ? fees?.payment?.previousPayment[querys?.index]?.instance?.instance?.BalanceAdmissionAmount
                  : querys?.other
                  ?
                  fees?.payment?.otherPayment[querys?.index]?.instance?.instance?.BalanceAdmissionAmount
                  : details?.admissionPaid}
              </td>
            </tr>
            <tr>
              <td />
              <td>
                <b>
                  {querys?.prev || querys?.other
                    ? "Total Admission Paid Till Now :"
                    : "Admission Total Paid :"}
                </b>
              </td>
              
              <td>
                {querys?.prev
                  ? fees?.payment?.previousPayment[querys?.index]?.instance?.instance?.admissionFee-fees?.payment?.previousPayment[querys?.index]?.instance?.instance?.BalanceAdmissionAmount
                  : querys?.other
                  ?
                  fees?.payment?.otherPayment[querys?.index]?.instance?.instance?.admissionFee-fees?.payment?.otherPayment[querys?.index]?.instance?.instance?.BalanceAdmissionAmount
                   
                  : details?.admissionPaid}
              </td>
            </tr></>:
             <tr>
              <td />
              <td>
                <b>
                  {querys?.prev || querys?.other
                    ? "Total :"
                    : "Admission Total Paid :"}
                </b>
              </td>
              
              <td>
                {querys?.prev
                  ? fees?.payment?.previousPayment[querys?.index]?.amount
                  : querys?.other
                  ? fees?.payment?.otherPayment[querys?.index]?.amount
                  : details?.paidAmountPermatent?details?.paidAmountPermatent:details?.admissionPaidPermatent}
              </td>
            </tr> 
            }
            {querys?.prev || querys?.other ? null : (
              <tr>
                <td />
                <td>
                  <b>Admission Balance Amount : </b>
                </td>
                <td>{details?.admissionFee - details?.paidAmountPermatent}</td>
              </tr>
            )}
          </table>
        </div>

        {/* <h5 className={classes.amountW}>
          {`${converter.toWords(details?.admissionPaid).toUpperCase()} RUPEES ONLY`}
        </h5> */}
        <h6 className={classes.signature}>Signature of the accountant</h6>
      </div>
      <div className={classes.outsideBorder}>
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
}

export default Form3T;
