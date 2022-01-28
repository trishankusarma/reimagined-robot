import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TextField, Button } from "@material-ui/core";
import DatePic from "../Datepicker";
import { useDispatch, useSelector } from "react-redux";
import { initFeeInfo, paymentFee } from "../../redux/actions";
import {Toastify } from "../../App";
import { useHistory } from "react-router";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    margin: "1rem auto",
  },
  gridC: {
    margin: theme.spacing(0.5, 0),
  },
  inputDisAbled:{
    "& input.Mui-disabled": {
      color: "black",
      fontWeight:"bold"
    }
  }
}));

const PostSection = () => {
  var valueDate = new Date().getFullYear();
  const classes = useStyles();
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash);
  const auth = useSelector((state) => state.auth);
  const history=useHistory()
  const [formData, setFormData] = useState({
    name:auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.name:cash?.studentFeeInfo?.name,
    fatherName:auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.gaurdian:cash?.studentFeeInfo?.gaurdian,
    session: auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.session:cash?.studentFeeInfo?.session,
    admissionFee: cash?.studentFeeInfo?.admissionFee,
    programFee:auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.programFees:cash?.studentFeeInfo?.programFee,
    examFee: cash?.studentFeeInfo?.examFee,
    otherFee: cash?.studentFeeInfo?.otherFee,
    // monthlyFees: parseInt(cash?.studentFeeInfo?.programFee)/12,
    concession: cash?.studentFeeInfo?.concession,
    extraFees: cash?.studentFeeInfo?.extraPay,
    totalFee: cash?.studentFeeInfo?.totalFee,
    paidAmount: cash?.studentFeeInfo?.paidAmount,
    balanceAmount:
      cash?.studentFeeInfo?.totalFee - cash?.studentFeeInfo?.paidAmount,
    admissionBalanceAmount:cash?.studentFeeInfo?.admissionFee-cash?.studentFeeInfo?.admissionPaid,
    payNow: "",
    receiptNo: auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.["receiptNo "]:cash?.studentFeeInfo?.receiptNo,
    paymentDate: "",
    month: [],
    year: {valueDate},
    // nextDate:"",
    paymentType: "monthly",
    // paymentMode: cash?.studentFeeInfo?.paymentMethod,
    paymentMode:"cash",
    admissionPaid:cash?.studentFeeInfo?.admissionPaid
  });

  const {
    name,
    fatherName,
    session,
    admissionFee,
    programFee,
    examFee,
    otherFee,
    // monthlyFees,
    concession,
    extraFees,
    totalFee,
    paidAmount,
    balanceAmount,
    admissionBalanceAmount,
    payNow,
    receiptNo,
    paymentDate,
    month,
    year,
    paymentType,
    paymentMode,
    admissionPaid
    // nextDate
  } = formData;

  const changeHandler = (event) => {  
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  React.useEffect(()=>{
    setFormData({
      name:auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.name:cash?.studentFeeInfo?.name,
      fatherName:auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.gaurdian:cash?.studentFeeInfo?.gaurdian,
      session: auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.session:cash?.studentFeeInfo?.session,
      admissionFee: cash?.studentFeeInfo?.admissionFee,
      programFee:auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.programFees:cash?.studentFeeInfo?.programFee,
      examFee: cash?.studentFeeInfo?.examFee,
      otherFee: cash?.studentFeeInfo?.otherFee,
      // monthlyFees: parseInt(cash?.studentFeeInfo?.programFee)/12,
      concession: cash?.studentFeeInfo?.concession,
      extraFees: cash?.studentFeeInfo?.extraPay,
      totalFee: cash?.studentFeeInfo?.totalFee,
      paidAmount: cash?.studentFeeInfo?.paidAmount,
      balanceAmount:
        cash?.studentFeeInfo?.totalFee - cash?.studentFeeInfo?.paidAmount,
      admissionBalanceAmount:cash?.studentFeeInfo?.admissionFee-cash?.studentFeeInfo?.admissionPaid,
      payNow: "",
      receiptNo: cash?.studentFeeInfo?.receiptNo,
      paymentDate: moment().format('YYYY-MM-DD'),
      month: [],
      year: valueDate,
      // nextDate:"",
      paymentType: "Monthly",
      // paymentMode: cash?.studentFeeInfo?.paymentMethod,
      paymentMode:"cash",
      admissionPaid:cash?.studentFeeInfo?.admissionPaid
    })
  },[cash?.studentFeeInfo])
  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={3} className={classes.gridC}>
          <Grid item xs={12} lg={3}>
            <TextField
              variant="outlined"
              size="small"
              name="name"
              value={name}
              className={classes.inputDisAbled}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Student Name: "
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              variant="outlined"
              size="small"
              name="fatherName"
              value={fatherName}
              fullWidth
              disabled
              className={classes.inputDisAbled}
              onChange={changeHandler}
              label="Father's Name: "
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              variant="outlined"
              size="small"
              name="session"
              value={session}
              fullWidth
              className={classes.inputDisAbled}
              disabled
              onChange={changeHandler}
              label="Session / Course: "
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <TextField
              variant="outlined"
              size="small"
              name="admissionFee"
              value={admissionFee}
              fullWidth
              className={classes.inputDisAbled}
              disabled
              onChange={changeHandler}
              label="Admission Fee: "
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} className={classes.gridC}>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="programFee"
              value={programFee}
              fullWidth
              className={classes.inputDisAbled}
              disabled
              onChange={changeHandler}
              label="Program Fees: "
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="examFee"
              value={examFee}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Exam Fees: "
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="otherFee"
              value={otherFee}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Other Fees: "
            />
          </Grid>
          {/* <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="monthlyFees"
              value={monthlyFees}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Monthly Fees: "
            />
          </Grid> */}
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="concession"
              className={classes.inputDisAbled}
              value={concession}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Consession: "
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="extraFees"
              value={extraFees}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Extra Fees: "
            />
          </Grid>
        </Grid>
        {/* line 3 */}
        <Grid container spacing={3} className={classes.gridC}>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="totalFee"
              className={classes.inputDisAbled}
              value={totalFee}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Total Fees: "
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              className={classes.inputDisAbled}
              name="paidAmount"
              value={paidAmount}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Paid Amount: "
            />
          </Grid>
          {/* <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="admissionPaid"
              value={admissionPaid}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Admission Paid Amount: "
            />
          </Grid> */}
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              className={classes.inputDisAbled}
              name="balanceAmount"
              value={balanceAmount}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Balance Amount: "
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="admissionBalanceAmount"
              value={admissionBalanceAmount}
              fullWidth
              className={classes.inputDisAbled}
              disabled
              onChange={changeHandler}
              label="Admission Balance Amount: "
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="payNow"
              value={payNow}
              fullWidth
              onChange={changeHandler}
              label="Pay Now: "
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="receiptNo"
              value={receiptNo}
              fullWidth
              disabled
              onChange={changeHandler}
              label="Receipt No: "
            />
          </Grid>
        </Grid>
        {/* line 4 */}
        <Grid container spacing={3} className={classes.gridC}>
          <Grid item xs={12} md={4} lg={2}>
            <DatePic
              label="Payment date: "
              name="paymentDate"
              value={paymentDate}
              onChange={changeHandler}
            />
          </Grid>
          {/* <Grid item xs={12} md={4} lg={2}>
            <DatePic
              label="Next payment date: "
              name="nextDate"
              value={nextDate}
              onChange={changeHandler}
            />
          </Grid> */}
          <Grid item xs={12} md={4} lg={2}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel for="Month" id="month">
                Select Month:{" "}
              </InputLabel>
              <Select
                id="Month"
                label="Select Month: "
                name="month"
                value={month}
                onChange={changeHandler}
                multiple="true"
              >
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
                <MenuItem value="March">March</MenuItem>
                <MenuItem value="April">April</MenuItem>
                <MenuItem value="May">May</MenuItem>
                <MenuItem value="June">June</MenuItem>
                <MenuItem value="July">July</MenuItem>
                <MenuItem value="August">August</MenuItem>
                <MenuItem value="September">September</MenuItem>
                <MenuItem value="October">October</MenuItem>
                <MenuItem value="November">November</MenuItem>
                <MenuItem value="December">December</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              size="small"
              name="year"
              value={year}
              fullWidth
              onChange={changeHandler}
              label="Year: "
             
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="paymentType">Payment Type: </InputLabel>
              <Select
                id="PaymentType"
                value={paymentType}
                onChange={changeHandler}
                name="paymentType"
                label="Payment Type: "
              >
                <MenuItem value="Installment">Installment</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
                <MenuItem value="Admission">Admission</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="PaymentMode">Payment Mode:</InputLabel>
              <Select
                id="PaymentMode"
                value={paymentMode}
                name={"paymentMode"}
                onChange={changeHandler}
                label="Payment Mode:"
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="bank">Bank</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          style={{ marginLeft: "1vw", marginTop: "1rem" }}
          variant="contained"
          color="primary"
          onClick={()=>{
            if(cash.wait){
               Toastify("error","wait !")
               return
             }

             if(!formData.payNow||!formData.month||!formData.paymentDate||!formData.paymentMode||!formData.paymentType||!formData.year){
               Toastify("error","Please add all the required fields")
               return
             }
            dispatch(paymentFee({...formData,payNow:parseInt(formData.payNow)},auth.user.adminType._id,auth.user.adminType?.departmentName!="Hostel"?cash?.studentFeeInfo?._id:cash?.studentFeeInfo?.student?._id,history,auth?.user?.adminType?.departmentName))
          }}
        >
          {cash.wait?"Wait .....":"Submit"}
        </Button>
        <Button
          style={{ marginLeft: "2.2vw", marginTop: "1rem" }}
          variant="contained"
          color="secondary"
          onClick={() => {
            dispatch(initFeeInfo());
          }}
        >
          New Payment
        </Button>
      </form>
    </div>
  );
};

export default PostSection;
