import React from 'react'
import EntryTable from './EntryTable'
import Sort from '../shared/Sort'
import { Grid, makeStyles ,FormControl,InputLabel,Select,MenuItem} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: "96%",
        margin: "1rem auto",
        height:'74vh'
    },
}));

function MarksEnrty({ handleChange , basicReqs, exams, subjects, students }) {
    const classes = useStyles()

    const {
        Session,  Class,  Section,  Exam
    } = basicReqs

    return (
        <div className={classes.root}>
            <div >
                <Grid container spacing={1}>
                    <Grid item lg={3}>
                          <Sort Session="true" size="small" name='Session' value={Session} onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={3}>
                         <Sort Class="true" size="small"  name='Class' value={Class} onChange={handleChange}/>
                    </Grid>
                    <Grid item lg={3}>
                         <Sort Section="true" size="small"  name='Section' value={Section} classIndex={Class} onChange={handleChange}/>
                    </Grid>

                    <Grid item lg={3}>
                    
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel id="exam">select Exam</InputLabel>
                            <Select
                                label="select Exam"
                                id="exam"
                                name='Exam'
                                value={Exam}
                                onChange={handleChange}
                            >
                            
                               { 
                                !exams || exams.length===0  ? <MenuItem>Nothing to show</MenuItem> :
                                exams.map((item) => {
                                    return <MenuItem value={item}>{item}</MenuItem>
                                })}  

                            </Select>
                        </FormControl>

                    </Grid>
                </Grid>
            </div>

            <EntryTable  data={students} subjects={subjects}/>

        </div>
    )
}

export default MarksEnrty
