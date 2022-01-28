import React,{ useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Sort from '../shared/Sort'
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    width: '96vw',
    margin: '.5rem auto'
  }
}));

const ExamDetail = ({ examDetail , startNewExam, handleChange }) => {
    const classes = useStyles();

    const { 
      Exam,
      Session,
      Class,
      Section

    } = examDetail

    return (
      <div>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item sm={12} lg={3}>
             <TextField
                label="Exam Name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                name='Exam'
                value={Exam}
                onChange={handleChange}
              />
          </Grid>
          <Grid item sm={12} lg={3}>
            <Sort size='small' Session='true' name='Session' value={Session} onChange={handleChange}/>
          </Grid>
          <Grid item sm={12} lg={3}>
            <Sort size='small' Class='true' all={true}  name='Class' value={Class} onChange={handleChange}/>
          </Grid>
          <Grid item sm={12} lg={3}>
            <Sort size='small' Section='true'  name='Section' value={Section} onChange={handleChange} classIndex={Class}/>
          </Grid>

          {
            localStorage.getItem('examName') ? 
            
            <Button
                onClick = {startNewExam}
                variant='contained'
             >  
                Select New Exam
            </Button> :
            
            null
          }

        </Grid>
      </div>
    );
}

export default ExamDetail
