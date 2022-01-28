import React,{useState} from 'react'
import DatePicker from '../../Datepicker'
import { makeStyles } from '@material-ui/core/styles';
import { Grid,FormControl,InputLabel,Select,MenuItem, Button,TextField} from '@material-ui/core';
import TeacherSalary from '../TeacherSalaryTable';
import Search from '../../shared/search'

const useStyles = makeStyles((theme) =>
({
    root:
    {
        width: '95%',
        margin: '2rem auto'
    },
    Grid:
    {
        margin:'2rem auto'
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin:'20px auto',
        marginTop:'50px'
      },

}));


function StaffSalary(props) {
    const classes = useStyles();
    const {data}=props
    const [Student, setStudent] = React.useState('');

    console.log(data,"data")
    const handleChange = (event) => {
        setStudent(event.target.value);
      };
      const [formData, setFormData] = useState({
        month: "",
        year: "",
      });
      const {month, year } = formData;
      const changeHandler = (event) => {

        setFormData({
          ...formData,
          [event.target.name]:event.target.value});
      };

    return (
        <div className={classes.root}>
            <Grid container  spacing={4}>
            <Grid item sm={12} md={4} lg={4}>
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
        <Grid item sm={12} md={4} lg={4}>
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
                <Grid lg={4} item>
                <FormControl variant="outlined" size="small" className={classes.formControl} fullWidth>
                        <InputLabel id="Student">Staff Name</InputLabel>
                        <Select
                            id="Student"
                            value={Student}
                            onChange={handleChange}
                            label="Student Name"
                        >
                            {data?.data?.data?.map(item=>{
                                return(<MenuItem value={11}>
                                        {item?.stuff_id?.name}
                                    </MenuItem>)
                            })}
                         
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            
            <Grid container className={classes.Grid}  alignItems="center">
              <Grid xs={4} lg={3} md={3}  justifyContent="flex-end"><Button variant="contained" color="secondary">Print</Button></Grid>
            </Grid>

          <TeacherSalary data={data?.data} style={{marginTop:'10px'}}/>
        </div>
    )
}

export default StaffSalary
