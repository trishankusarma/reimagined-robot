// usestate remaining
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Divider,
} from "@material-ui/core";
import axios from "../../helpers/axios";
import { Toastify } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { salarySlip_InfoSet } from "../../redux/actions";
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: "96vw",
    margin: ".5rem auto",
  },
}));

const SectionOne = () => {
  const [stuffinfo, setStuffInfo] = React.useState([]);
  const auth = useSelector(state => state.auth)
  React.useEffect(async () => {
    try {
      let res = await axios().get(`/stuff/getAllStuff/${auth?.user?.adminType?._id}`);
      setStuffInfo(res.data.data);
      console.log(res.data.data, "res.data.data");
    } catch (e) {
      console.log(e);
      Toastify("error", e);
    }
  }, []);
  const classes = useStyles();
  
  const [formData, setFormData] = useState({
    employee: {},
    employeeName: {},
    month: "",
    year: "",
  });
  const { employee, month, year,employeeName } = formData;

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    if (e.target.name === "employee") {
      setFormData({ ...formData,
         [e.target.name]: e.target.value,
         employeeName:e.target.value.name
         });
      dispatch(salarySlip_InfoSet(e.target.value, month, year));

    }else if (e.target.name === "month"){

      setFormData({ ...formData, [e.target.name]: e.target.value });
      dispatch(salarySlip_InfoSet(employee,e.target.value, year));
      
    }else if(e.target.name === "year"){

      setFormData({ ...formData, [e.target.name]: e.target.value });
      dispatch(salarySlip_InfoSet(employee,month,e.target.value));

    }
  };

  return (
    <div>
      <Grid container spacing={3} className={classes.gridContainer}>
        <Grid item sm={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="employee">Employee Name:</InputLabel>
            <Select
              id="employeeName"
              name="employee"
              value={employeeName.name}
              onChange={changeHandler}
              label="Employee Name:"
            >
              {stuffinfo.map((item) => {
                return <MenuItem value={item}>{item.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={6} lg={3}>
          <FormControl variant="outlined" fullWidth size="small">
            <InputLabel id="month">Select Month:</InputLabel>
            <Select
              name="month"
              value={month}
              onChange={changeHandler}
              id="Section"
              label="Select Month:"
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
        <Grid item sm={12} md={6} lg={3}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            name="year"
            value={year}
            onChange={changeHandler}
            placeholder="Year:"
            label="Year:"
          />
        </Grid>
      </Grid>

      <Divider />

      {employee?.name ? (
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} md={6} lg={3}>
            <Typography variant="p">Employee Code: {employee.idNo}</Typography>
          </Grid>
          <Grid item sm={12} md={6} lg={3}>
            <Typography variant="p">Employee Name: {employee.name}</Typography>
          </Grid>
          <Grid item sm={12} md={6} lg={3}>
            <Typography variant="p">
              Designation: {employee.designation.departmentName}
            </Typography>
          </Grid>
          <Grid item sm={12} md={6} lg={3}>
            <Typography variant="p">
              Joining Date: {employee.joining_Date.split('T')[0]}
            </Typography>
          </Grid>
          <Grid item sm={12} md={6} lg={3}>
            <Typography variant="p" style={{ display: "block" }}>
              Address/Contacts:
            </Typography>{" "}
            <Typography variant="p" style={{ display: "block" }}>
              {employee.address}
            </Typography>{" "}
            <Typography variant="p" style={{ display: "block" }}>
              Phone: {employee.mobileNo}
            </Typography>
            <Typography variant="p" style={{ display: "block" }}>
              Email:{employee.email}
            </Typography>
          </Grid>
        </Grid>
      ) : null}

      <Divider />
    </div>
  );
};

export default SectionOne;
