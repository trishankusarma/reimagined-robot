import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
}));

export default function DatePickers({ label, name , value , onChange }) {
  const classes = useStyles();
  return (
    <form className={classes.container} noValidate>
    {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  margin="normal"
                  id="date-picker"
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Date of birth"
                  views={["year", "month", "date"]}
                  value={value}
                  onChange={onChange}
                  fullWidth
                />
            </MuiPickersUtilsProvider> */}
      <TextField
        id="date"
        label={label}   
        type="date"
        variant="outlined"
        size="small"
        defaultValue={new Date()}
        name={name}
        value={value}
        onChange={onChange}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
    </form>
  );
}

// import * as React from 'react';
// import Stack from '@material-ui/material/Stack';
// import TextField from '@material-ui/material/TextField';
// import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
// import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
// import DesktopDatePicker from '@material-ui/lab/DesktopDatePicker';

// export default function MaterialUIPickers() {
//   const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

//   const handleChange = (newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Stack spacing={3}>
//         <DesktopDatePicker
//           label="Date desktop"
//           inputFormat="MM/dd/yyyy"
//           value={value}
//           onChange={handleChange}
//           renderInput={(params) => <TextField {...params} />}
//         />
//       </Stack>
//     </LocalizationProvider>
//   );
// }
