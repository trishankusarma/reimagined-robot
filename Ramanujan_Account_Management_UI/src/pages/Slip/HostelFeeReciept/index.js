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
    let res = await axios().get(`/student/hostelStudentFee/${id}`);
    setDetails(res?.data?.payment?.student);
    console.log(res.data,"res.data.data")
   
    setFee(res.data);
    if (querys?.prev=='true') {
      setTotalis(res?.data?.payment?.previousPayment[querys?.index]?.amount);
    } else if (querys?.other) {
      setTotalis(res?.data?.payment?.otherPayment[querys?.index]?.amount);
    } else {
      // for (let i = 0; i < fee?.data?.data?.payment?.previousPayment?.length; i++) {
        
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
              SL NO: {details?.rollNo}
              <br />
              NAME: {details?.name}
              <br />
              CLASS: {details?.standard} (
              {auth?.user?.adminType?.departmentName})<br />
            </p>
          </div>
          <div className={classes.text2}>
            <p>Cash Receipt</p>
            <br />
            <p>SECTION: {details?.section}</p>
            <br />
          </div>
          <div className={classes.text3}>
            DATE: {today.toLocaleDateString("en-US")}<p id={classes.date} />
            <br />
            admissionFee NO:{details?.admissionNo}
            <br />
            ROLL NO: {details?.rollNo}
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
              {console.log(fees,"fees")}
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
                    <td id={classes.special}>{fees?.data?.admissionFee}</td>
                  </tr>
                  <tr>
                    <td id={classes.special}>{2}</td>
                    <td id={classes.special}>programFee </td>
                    <td id={classes.special}>{fees?.data?.programFees}</td>
                  </tr>
                  <tr>
                    <td id={classes.special}>{3}</td>
                    <td id={classes.special}>otherFee </td>
                    <td id={classes.special}>{fees?.data?.otherFee}</td>
                  </tr>
                  <tr>
                    <td id={classes.special}>{4}</td>
                    <td id={classes.special}>examFee </td>
                    <td id={classes.special}>{fees?.data?.examFee}</td>
                  </tr>
                  <tr>
                    <td id={classes.special}>{5}</td>
                    <td id={classes.special}>concession </td>
                    <td id={classes.special}>{fees?.data?.concession}</td>
                  </tr>
                </>
            )}
            {querys?.prev||querys?.other?null:<tr>
              <td></td>
              <td id={classes.special}>Total :</td>
              <td id={classes.special}>{fees?.data?.totalFee}</td>
            </tr>}
            <tr>
              <td />
              <td>
                <b>
                  {querys?.prev || querys?.other
                    ? "TOTAL PAID :"
                    : "ADMISSION TOTAL PAID :"}
                </b>
              </td>
              <td>
                {querys?.prev
                  ? fees?.payment?.previousPayment[querys?.index]?.amount
                  : querys?.other
                  ? fees?.payment?.otherPayment[querys?.index]?.amount
                  : fees?.data?.admissionPaidPermatent}
              </td>
            </tr>
            {querys?.prev || querys?.other ? null : (
              <tr>
                <td />
                <td>
                  <b>ADMISSION BALANCE AMOUNT : </b>
                </td>
                <td>{fees?.data?.admissionFee - fees?.data?.admissionPaidPermatent}</td>
              </tr>
            )}
          </table>
        </div>

        {/* <h5 className={classes.amountW}>
          {`${converter.toWords(details?.admissionPaid).toUpperCase()} RUPEES ONLY`}
        </h5> */}
        <h6 className={classes.signature}>SIGNATURE OF THE ACCOUNTANT</h6>
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
