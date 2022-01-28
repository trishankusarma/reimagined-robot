import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 360,
  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  return (
    <div className={classes.root}>
      <FormControl
        variant="outlined"
        size={props.size}
        className={classes.formControl}
        fullWidth
      >
        <InputLabel id="Class">Class: </InputLabel>
        <Select
          id="Class"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          label="Class: "
        >
          <MenuItem value={"all"}>All</MenuItem>
          {auth?.user?.adminType?.classes.map((item) => {
            return <MenuItem value={item}>{item}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </div>
  );
}
