import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Modal,
  Paper,
} from "@material-ui/core";

import DatePic from "../Datepicker";
import axios from "../../helpers/axios";
import { useSelector, useDispatch } from "react-redux";
import { AddNewStudent , add_to_cashBook, updateStudent } from "../../redux/actions";
import { useHistory, useParams } from "react-router-dom";
import Sort from "../../components/shared/Sort";

import {Toastify} from "../../App"
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90vw",
    margin: "3rem auto",
  },
  gridContainer: {
    margin: ".5rem auto",
  },
  twoInputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  sixColGrid: {
    margin:"10px",
  },
  modalC: {
    width: "700px",
    margin: "0 auto",
    background: "#fff",
    overflowX: "hidden",
    height: "auto",
    marginTop: "1.5rem",
  },
  headingC: {
    background: "#68dff0",
    padding:"10px",
    color: "#fff",
    letterSpacing: "1px",
    marginBottom: "0",
  },
  tableC: {
    margin: "0 auto",
    width: "95%",
    marginBottom: "1rem",
    marginTop: "0",
  },
  btnC: {
    padding: "1rem 0",
    display: "flex",
    justifyContent: "space-around",
  },
  tableTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1%",
    backgroundColor: "#000",
  },
  title: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "1rem",
    margin: "0 auto",
    color: "#fff",
  },
  Inputs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  innerInput: {
  margin:'1rem 0.5rem'
  },
  inputDisAbled:{
    "& input.Mui-disabled": {
      color: "green",
      fontWeight:"bold"
    }
  }
  
}));


const thisStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "95vw",
    margin: "0 auto",
  },
  grid: {
    height: "400px",
  },
  paper: {
    background: "transparent",
    padding: "10px",
    textAlign: "center",
  },
  btnc: {
    background: "transparent",
    padding: "10px",
    textAlign: "left",
  },
  image: {
    width: 400,
    height: 300,
    margin: "1rem 0",
  },
}));

function StudentRegistration(props) {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const history = useHistory();
  const [installmentTable, setInstallmentTable] = React.useState([]);
  const classo = thisStyle();
  const studentDetails = useSelector((state) => state.student);
  const [profile, setProfile] = useState(studentDetails.oneStudent?.snap_shot);
  const [Img, setImg] = useState("");
  const [image, setImage] = useState("");
  const { _id } = useParams();
  const Update = (img) => {
    setImg(img);
    setProfile(URL.createObjectURL(img));
  };
  const addNew = () => {
    setInstallmentTable((oldArray) => [
      ...oldArray,
      {
        month: "",
        year: "",
        due_date: "",
        amount: "",
      },
    ]);
  };

  const removeOld = () => {
    if (installmentTable.length == 0) return;
    installmentTable.length = installmentTable.length - 1;
    setInstallmentTable([...installmentTable]);
  };
  const handleInstallment = (e, index) => {
    console.log([e.target.name]);
    installmentTable[index][e.target.name] = e.target.value;
    setInstallmentTable([...installmentTable]);
  };
  React.useEffect(async () => {
    // console.log( ,"locations")
    if(history.location.pathname.split("/")[1]=='admission'){
      const { data } = await axios().get("/student/allStudentsCollege/"+auth?.user?.adminType?._id);
      var strDate = new Date();
      var shortYear = strDate.getFullYear(); 
      var twoDigitYear = shortYear.toString().substr(-2);
      // console.log(parseInt(data.data[data.data.length-1].admissionNo.split("-")[2])+1,"1:14 am ");
      setStudent({
        ...student,
        rollNo:data.data.length + 1,
        admissionNo:`${auth?.user?.adminType?.departmentName?.slice(0, 3)}-${twoDigitYear}-${data.data[data.data.length-1]?.admissionNo?parseInt(data.data[data.data.length-1]?.admissionNo.split("-")[2])+1:1}`,
        receiptNo: data.data.length + 1,
      });
    }
    
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let initState = history.location.pathname.split("/")[1]=='admission'?
  {
    name: "",
    email: "",
    admissionNo:"",
    rollNo: "",
    gender: "",
    paymentMode: "cash",
    caste: "",
    religion: "",
    stream: "",
    standard: "",
    specialSubject: [],
    paymentMethod: "FULL PAYMENT",
    session: "",
    bioCode: "",
    DOB: moment().format('YYYY-MM-DD'),
    motherName: "",
    address: "",
    mobileNo: "",
    gaurdian: "",
    sessionStart: moment().format('YYYY-MM-DD'),
    sessionEnd: moment().add(2, 'Y').format('YYYY-MM-DD'),
    section: "",
    image: "",
    IDProof: "",
    lastPercentage: "",
    admissionFee: 0,
    programFee: 0,
    examFee: 0,
    otherFee: 0,
    concession: 0,
    totalFee: 0,
    paidAmount: 0,
    receiptNo: "",
    Month: "",
    Year: "",
    DueDate: "",
    Amount: "",
    admissionPaid:0
  }
  :studentDetails.oneStudent&&history.location.pathname.split("/")[1]=='StudentEdit'
    ? {
        name: studentDetails.oneStudent.name,
        email: studentDetails.oneStudent.email,
        admissionNo: `${studentDetails.oneStudent.admissionNo}`,
        rollNo: studentDetails.oneStudent.rollNo,
        gender: studentDetails.oneStudent.gender,
        paymentMode: studentDetails.oneStudent.paymentMode,
        caste: studentDetails.oneStudent.caste,
        religion: studentDetails.oneStudent.religion,
        stream: studentDetails.oneStudent.stream,
        standard: studentDetails.oneStudent.standard,
        specialSubject: studentDetails.oneStudent.specialSubject,
        paymentMethod: studentDetails.oneStudent.paymentMethod,
        session: studentDetails.oneStudent.session,
        bioCode: studentDetails.oneStudent.bioCode,
        DOB: studentDetails.oneStudent.DOB?.split("T")[0],
        motherName: studentDetails.oneStudent.motherName,
        address: studentDetails.oneStudent.address,
        mobileNo: studentDetails.oneStudent.mobileNo,
        gaurdian: studentDetails.oneStudent.gaurdian,
        sessionStart: studentDetails.oneStudent.sessionStart.split("T")[0],
        sessionEnd: studentDetails.oneStudent.sessionEnd.split("T")[0],
        section: studentDetails.oneStudent.section,
        image: studentDetails.oneStudent.image,
        IDProof: studentDetails.oneStudent.IDProof,
        lastPercentage: studentDetails.oneStudent.lastPercentage,
        admissionFee: studentDetails.oneStudent.admissionFee,
        programFee: studentDetails.oneStudent.programFee,
        examFee: studentDetails.oneStudent.examFee,
        otherFee: studentDetails.oneStudent.otherFee,
        concession: studentDetails.oneStudent.concession,
        totalFee: studentDetails.oneStudent.totalFee,
        paidAmount: studentDetails.oneStudent.paidAmount,
        receiptNo: studentDetails.oneStudent.receiptNo,
        Month: studentDetails.oneStudent.Month,
        Year: studentDetails.oneStudent.Year,
        DueDate: studentDetails.oneStudent.DueDate,
        Amount: studentDetails.oneStudent.Amount,
        admissionPaid:studentDetails.oneStudent.admissionPaid
      }
    : {
        name: "",
        email: "",
        admissionNo:"",
        rollNo: "",
        gender: "",
        paymentMode: "cash",
        caste: "",
        religion: "",
        stream: "",
        standard: "",
        specialSubject: [],
        paymentMethod: "FULL PAYMENT",
        session: "",
        bioCode: "",
        DOB: moment().format('YYYY-MM-DD'),
        motherName: "",
        address: "",
        mobileNo: "",
        gaurdian: "",
        sessionStart: moment().format('YYYY-MM-DD'),
        sessionEnd: moment().add(2, 'Y').format('YYYY-MM-DD'),
        section: "",
        image: "",
        IDProof: "",
        lastPercentage: "",
        admissionFee: 0,
        programFee: 0,
        examFee: 0,
        otherFee: 0,
        concession: 0,
        totalFee: 0,
        paidAmount: 0,
        receiptNo: "",
        Month: "",
        Year: "",
        DueDate: "",
        Amount: "",
        admissionPaid:0
      };
  const [student, setStudent] = React.useState({
    ...initState,
  });

  const {
    name,
    email,
    admissionNo,
    rollNo,
    gender,
    paymentMode,
    caste,
    religion,
    stream,
    standard,
    specialSubject,
    paymentMethod,
    session,
    bioCode,
    DOB,
    address,
    mobileNo,
    gaurdian,
    motherName,
    sessionStart,
    sessionEnd,
    section,
    IDProof,
    lastPercentage,
    admissionFee,
    programFee,
    examFee,
    otherFee,
    concession,
    totalFee,
    paidAmount,
    receiptNo,
    Month,
    Year,
    DueDate,
    Amount,
    admissionPaid
  } = student;
  React.useEffect(() => {
    setStudent({
      ...initState,
    });
    setProfile(studentDetails.oneStudent?.snap_shot);
  }, [studentDetails.oneStudent]);
  // console.log( studentDetails.oneStudent.DOB.split("T")[0],"studentDetails")
  React.useEffect(() => {
    setStudent({
      ...student,
      totalFee:
        student.programFee +
        student.otherFee +
        student.admissionFee +        
        student.examFee -
        student.concession,
    });
  }, [
    student.programFee,
    student.otherFee,
    student.admissionFee,
    student.examFee,
    student.concession,
  ]);
  const handleChange = (event) => {

    if( event.target.name ==='session' && typeof event.target.value === 'object'){

       setStudent({
          ...student,
          ['session']: event.target.value.session,
          ['admissionFee'] : event.target.value.admissionFees,
          ['programFee'] : event.target.value.programFees
       });
       
       return;
    }
    
    if (
      event.target.name == "mobileNo" ||
      event.target.name == "receiptNo" ||
      event.target.name == "paidAmount" ||
      event.target.name == "programFee" ||
      event.target.name == "otherFee" ||
      event.target.name == "Month" ||
      event.target.name == "Year" ||
      event.target.name == "Amount" ||
      event.target.name == "lastPercentage" ||
      // event.target.name == "admissionNo" ||
      event.target.name == "admissionFee" ||
      event.target.name == "examFee" ||
      event.target.name == "concession" ||
      event.target.name == "totalFee"||
      event.target.name =="admissionPaid"
    ) {
      return setStudent({
        ...student,
        [event.target.name]: parseFloat(event.target.value),
      });
    }

    setStudent({
      ...student,
      [event.target.name]: event.target.value,
    });
  };

  const Submit = () => {
    if (
      name=="" ||
      admissionNo==""  ||
      isNaN(rollNo)||
      isNaN(gender) || 
      isNaN(admissionPaid) ||
      paymentMode==""||
      stream==""  ||
      isNaN(standard)  ||
      paymentMethod=="" ||
      session==""  ||
      DOB =="" ||
      address =="" ||
      isNaN(mobileNo)||
      gaurdian==""  ||
      section==""  ||
      isNaN(admissionFee)||
      isNaN(programFee)||
      isNaN(examFee)||
      isNaN(otherFee) ||
      isNaN(concession) ||
      isNaN(totalFee) ||
      isNaN(paidAmount)
    ) {
    
      return Toastify("error", " All required fields not filled! ");
    }
    
    let snap_shot = "";
    let IDProof = "";
    var formData = new FormData();
    formData.append("file", Img);
    formData.append("upload_preset", "uc_upload");
    formData.append("cloud_name", "uc");

    fetch("https://api.cloudinary.com/v1_1/dzoknbcnl/image/upload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        snap_shot = data.url;
        console.log(data.url, "done 1!");
        formData.append("file", image);
        fetch("https://api.cloudinary.com/v1_1/dzoknbcnl/image/upload", {
          method: "post",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data.url, "done 2!");
          });

        dispatch(
          _id != undefined
            ? updateStudent(
                _id,
                {
                  ...student,
                  IDProof: data.url,
                  snap_shot: snap_shot,
                  paidAmount:admissionPaid,
                  installments: installmentTable,
                },
                history
              )
            : AddNewStudent(
                {
                  ...student,
                  IDProof: data.url,
                  snap_shot: snap_shot,
                  paidAmount:admissionPaid,
                  installments: installmentTable,
                },
                history,
                auth.token
              )
        );

        dispatch(
          _id != undefined 
          ? add_to_cashBook({

              date :  moment().format('YYYY-MM-DD'), 
              receipts :  admissionPaid - studentDetails.oneStudent.paidAmount , 
              department : auth?.user?.adminType?._id 

          }) : add_to_cashBook({
             
              date :  moment().format('YYYY-MM-DD'), 
              receipts : admissionPaid , 
              department : auth?.user?.adminType?._id 
          })
        )

        setStudent({
          ...initState,
        });
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  return (
    <>
      <div className={classo.root}>
        <center className="profile">
          <Paper className={classo.image}>
            <img
              style={{ width: "100%", height: "100%" }}
              src={profile}
              // alt="PIC"
            />
          </Paper>
          <Button
            variant="contained"
            style={{
              marginRight: "10px",
              backgroundColor: "royalblue",
              color: "white",
            }}
          >
            Take Snapshot
          </Button>
          <input
            accept="image/*"
            id="contained-button-file"
            multiple
            name="image"
            value={student.image_temp}
            onChange={(e) => {
              Update(e.target.files[0]);
            }}
            type="file"
            style={{ display: "none" }}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Click here to upload
            </Button>
          </label>
        </center>
      </div>
      <form className={classes.root}>
        {/* frist line */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} md={4} lg={4}>
            <TextField
              variant="outlined"
              fullWidth
              name="rollNo"
              value={rollNo}
              onChange={handleChange}
              size="small"
              type="number"
              placeholder="*Roll No:"
              label="*Roll No:"
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <TextField
              variant="outlined"
              fullWidth
              name="admissionNo"
              value={admissionNo}
              onChange={handleChange}
              size="small"
              // type="string"
              placeholder="*Admission No:"
              label="*Admission No:"
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <TextField
              variant="outlined"
              fullWidth
              name="bioCode"
              onChange={handleChange}
              value={bioCode}
              size="small"
              placeholder="Biometric Code:"
              label="Biometric Code:"
            />
          </Grid>
        </Grid>

        {/* second line */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} md={4} lg={4}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              placeholder="*Name:"
              label="*Name:"
              name="name"
              onChange={handleChange}
              value={name}
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <DatePic
              name="DOB"
              onChange={handleChange}
              value={DOB}
              label="*Date Of Birth"
            />
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <DatePicker
                  disableFuture
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                  value={new Date()}
                  onChange={handleChange}
                  fullWidth
                />
            </MuiPickersUtilsProvider> */}
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="gender">*Gender:</InputLabel>
              <Select
                id="gender"
                name="gender"
                onChange={handleChange}
                value={gender}
                label="*Gender:"
              >
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
                <MenuItem value={2}>Others</MenuItem>
              </Select> 
            </FormControl>
          </Grid>
        </Grid>

        {/* third line */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} md={4} lg={4}>
            <TextField
              id="outlined-multiline-static"
              label="*Address"
              multiline
              rows={4}
              name="address"
              onChange={handleChange}
              value={address}
              placeholder="*Address"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4} className={classes.twoInputs}>
            <TextField
              variant="outlined"
              fullWidth
              type="number"
              size="small"
              name="mobileNo"
              onChange={handleChange}
              value={mobileNo}
              placeholder="*Mobile No:"
              label="*Mobile No."
            />
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="gaurdian"
              onChange={handleChange}
              value={gaurdian}
              placeholder="*Father/Guardian Name:"
              label="*Father/Guardian Name:"
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4} className={classes.twoInputs}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Email Id"
              label="Email ID"
            />
            <TextField
              variant="outlined"
              fullWidth
              name="motherName"
              value={motherName}
              onChange={handleChange}
              size="small"
              placeholder="Mother Name:"
              label="Mother Name:"
            />
          </Grid>
        </Grid>

        {/* fourth line */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} md={4} lg={4}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="caste">Caste:</InputLabel>
              <Select
                id="Caste"
                value={caste}
                name="caste"
                onChange={handleChange}
                label="Caste:"
              >
                <MenuItem value={0}>General</MenuItem>
                <MenuItem value={1}>OBC</MenuItem>
                <MenuItem value={2}>SC</MenuItem>
                <MenuItem value={3}>ST</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="religion">Religion:</InputLabel>
              <Select
                id="religion"
                name="religion"
                value={religion}
                onChange={handleChange}
                label="Religion:"
              >
                <MenuItem value={0}>Hinduism</MenuItem>
                <MenuItem value={1}>Islam</MenuItem>
                <MenuItem value={2}>Christianity</MenuItem>
                <MenuItem value={3}>Buddhism</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <DatePic label="Date Of Addmission" value={moment().format('YYYY-MM-DD')}/>
          </Grid>
        </Grid>

        {/* fifth line */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} md={4} lg={4}>

            <Sort
              name="session"
              onChange={handleChange}
              value={session}
              Session={true}
              size="small"
              reg = { true }
            />

          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <DatePic
              name="sessionStart"
              value={sessionStart}
              onChange={handleChange}
              label="*Session Start Date:"
            />
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <DatePic
              name="sessionEnd"
              value={sessionEnd}
              onChange={handleChange}
              label="*Session End Date:"
            />
          </Grid>
        </Grid>

        {/* sixth line */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} md={4} lg={4}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="stream">*Stream:</InputLabel>
              <Select
                id="Stream"
                value={stream}
                name="stream"
                onChange={handleChange}
                label="Stream"
              >
                <MenuItem value={auth.user.adminType._id}>
                  {auth.user.adminType.departmentName}
                </MenuItem>
                {/* <MenuItem value={1}>SCIENCE</MenuItem> */}
                {/* <MenuItem value={2}>COMMERCE</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="class">*Class:</InputLabel>
              <Select
                id="Class"
                value={standard}
                name="standard"
                onChange={handleChange}
                label="Class"
              >
                {auth?.user?.adminType?.classes?.map((item) => {
                  return <MenuItem value={item.class}>{item.class}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="Section">*Section:</InputLabel>
              <Select
                id="section"
                name={"section"}
                value={section}
                onChange={handleChange}
                label="Section"
              >
                {auth?.user?.adminType?.classes?.map((item) => {
                  if (item.class == standard) {
                    return item.sections.map((sec) => (
                      <MenuItem
                        style={{ textTransform: "uppercase" }}
                        value={sec}
                      >
                        {sec}
                      </MenuItem>
                    ));
                  }
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* seventh line */}
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} md={4} lg={4}>
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              name="image"
              // value={image}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
            />
            <label htmlFor="raised-button-file">
              <Button variant="outlined" component="span" fullWidth>
                ID Proof Copy
              </Button>
            </label>
          </Grid>
          <Grid item sm={12} md={4} lg={4}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="lastPercentage"
              value={lastPercentage}
              onChange={handleChange}
              placeholder="Last Percentage:"
              label="Last Percentage:"
            />
          </Grid>
          {/* <Grid item sm={12} md={4} lg={4}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="specialSubject">
                Special Subject: (Press Ctrl for multiple selection):
              </InputLabel>
              <Select
                id="SpecialSubject"
                name="specialSubject"
                value={specialSubject}
                onChange={handleChange}
                label="Special Subject: (Press Ctrl for multiple selection):"
                multiple="true"
              >
                <MenuItem value={"ARTS"}>ARTS</MenuItem>
                <MenuItem value={"SCIENCE"}>SCIENCE</MenuItem>
                <MenuItem value={"COMMERCE"}>COMMERCE</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>

        {/* eighth grid */}
        <Grid container spacing={3} className={classes.sixColGrid}>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="admissionFee"
              value={admissionFee}
              className={classes.inputDisAbled}
              disabled={!auth?.user?.isSuperAdmin}
              onChange={handleChange}
              placeholder="*Admission Fees:"
              label="*Admission Fees:"
            />
            
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              className={classes.inputDisAbled}
              name="programFee"
              disabled={!auth?.user?.isSuperAdmin}
              value={programFee}
              onChange={handleChange}
              placeholder="*Program Fees:"
              label="*Program Fees:"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="examFee"
              value={examFee}
              onChange={handleChange}
              placeholder="Exam Fees:"
              label="Exam Fees:"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="otherFee"
              value={otherFee}
              onChange={handleChange}
              placeholder="Other Fees:"
              label="Other Fees:"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="concession"
              value={concession}
              disabled={!auth?.user?.isSuperAdmin}
              onChange={handleChange}
              placeholder="Concession:"
              label="Concession:"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="totalFee"
              value={totalFee}
              // disabled
              onChange={handleChange}
              placeholder="Total Fees:"
              label="Total Fees:"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="admissionPaid"
              value={admissionPaid}
              onChange={handleChange}
              placeholder="*Paid Admission Amount:"
              label="*Paid Admission Amount:"
            />
          </Grid>
          
          {/* <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="paidAmount"
              value={paidAmount}
              onChange={handleChange}
              placeholder="*Paid Amount:"
              label="*Paid Amount:"
            />
          </Grid> */}
          <Grid item xs={12} md={4} lg={2}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="paymentMethod">*Payment Method:</InputLabel>
              <Select
                id="PaymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={handleChange}
                label="*Payment Method:"
              >
                <MenuItem value="FULL PAYMENT">FULL PAYMENT</MenuItem>
                <MenuItem value="INSTALLMENT">INSTALLMENT</MenuItem>
                <MenuItem value="MONTHLY PAYMENT">MONTHLY PAYMENT</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <FormControl variant="outlined" fullWidth size="small">
              <InputLabel id="PaymentMode">Payment Mode:</InputLabel>
              <Select
                id="PaymentMode"
                defaultValue={"cash"}
                value={paymentMode}
                name={"paymentMode"}
                onChange={handleChange}
                label="Payment Mode:"
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="bank">Bank</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="number"
              name="receiptNo"
              value={receiptNo}
              onChange={handleChange}
              placeholder="*Receipt No:"
              label="*Receipt No:"
            />
          </Grid>
        </Grid>

        <Button
          onClick={() => {
            Submit();
          }}
          variant="contained"
          color="primary"
        >
          {!studentDetails.wait?`Submit`:"Wait ...."}
        </Button>
        {student.paymentMethod=="INSTALLMENT"?<Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ marginLeft: "20vw" }}
        >
          Installments
        </Button>:null}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className={classes.modalC}>
            <div className={classes.headingC}>
              <h3>Installments</h3>
            </div>
            <div className={classes.TableC}>
              <div className={classes.tableTop}>
                <div className={classes.title}>Month</div>
                <div className={classes.title}>Year</div>
                <div className={classes.title}>Due Date</div>
                <div className={classes.title}>Amount</div>
              </div>

              <div className={classes.Inputs}>
                {installmentTable.map((item,index)=>{
                  return(<div style={{display:"flex"}}>
                <TextField
                  className={classes.innerInput}
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="number"
                  name="month"
                  value={item.month}
                  onChange={(e)=>{handleInstallment(e,index)}}
                  placeholder="*Paid Amount:"
                  label="Month:"
                />
                <TextField
                  className={classes.innerInput}
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="number"
                  name="year"
                  value={item.year}
                  onChange={(e)=>{handleInstallment(e,index)}}
                  placeholder="*Paid Amount:"
                  label="Year:"
                />
                <div className={classes.innerInput}>
                <DatePic
                  name="sessionStart"
                  name="due_date"
                  value={item.due_date}
                  onChange={(e)=>{handleInstallment(e,index)}}
                  label="Due Date:"
                  placeholder="*Due date"
                  size="small"
                />
                </div>

                      <TextField
                        className={classes.innerInput}
                        variant="outlined"
                        fullWidth
                        size="small"
                        type="number"
                        name="amount"
                        value={item.amount}
                        onChange={(e) => {
                          handleInstallment(e, index);
                        }}
                        placeholder="*Paid Amount:"
                        label="Amount"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={classes.btnC}>
              <Button
                onClick={() => {
                  addNew();
                }}
                type="button"
                variant="contained"
                color="primary"
                size="small"
              >
                Add New
              </Button>
              <Button
                onClick={() => {
                  removeOld();
                }}
               type="button" variant="contained" color="secondary"
               size="small"
               >
                Remove From Bottom
              </Button>
              <Button type="button" variant="contained" color="default" size="small">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </form>
    </>
  );
}

export default StudentRegistration;