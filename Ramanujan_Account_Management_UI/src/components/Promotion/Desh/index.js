import React,{ useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField} from '@material-ui/core';
import Sort from '../../../components/shared/Sort'
import Promotiontable from '../Table';

const useStyles = makeStyles((theme) =>
({
    root:
    {
        width: '95%',
        margin: '2rem auto'
    },
    // Grid:
    // {
    //     margin:'.5rem auto'
    // },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin:'20px auto',
        marginTop:'50px'
      },
    //   TextField:{
    //       width:'360px'
    //   }

}));


function StudentAttend({students, setSelectionModel, selectionModel, choose, setChoose, promote, setPromote, handleSubmit}) {
    const classes = useStyles();

    const {
       standard, section, session, programFee, admissionFee, examFee, otherFee, totalFee
    } = promote

    const {session_1, class_1 , section_1 } = choose

    const handleChange_1 = (e)=>{
        
        const { name, value } = e.target

        setChoose({
            ...choose,
            [name] : value
        })
    }

    const handleChange = (e)=>{
         
        const { name, value } = e.target

        setPromote({

            ...promote,
            [name] : value
        })        
    }

    useEffect(() => {
        
        setPromote({
             
            ...promote,
            totalFee : parseInt( programFee ? programFee : 0 ) + parseInt( admissionFee ? admissionFee : 0 ) + parseInt( examFee ? examFee : 0 ) + parseInt( otherFee ? otherFee : 0 )
        })
    }, [programFee, admissionFee, examFee, otherFee])

    return (
        <div className={classes.root}>
        
            <Grid container className={classes.Grid} spacing={3} style={{margin:'1rem 0'}}>
               <Grid lg={4} item>
                    <Sort Session="true" size="small" name='session_1' all={true} value={session_1} onChange={handleChange_1}/>
                </Grid>
                <Grid lg={4} item>
                    <Sort Class="true" size="small" name='class_1' all={true} value={class_1} onChange={handleChange_1}/>
                </Grid>
                <Grid lg={4} item>
                    <Sort classIndex={class_1} Section="true" size="small" name='section_1' all={true} value={section_1} onChange={handleChange_1}/>
                </Grid>
            </Grid>
    
          <Promotiontable style={{marginTop:'10px'}} rows={students} setSelectionModel={setSelectionModel} selectionModel={selectionModel}/>

          <Grid container className={classes.Grid}  alignItems="center" spacing={5} style={{marginTop:'1rem'}}>
             <Grid lg={4} item>
                 <Sort Class="true" size="small" name='standard' all={false} value={standard} onChange={handleChange}/>
             </Grid>
             <Grid lg={4} item>
                 <Sort classIndex={standard} Section="true" size="small" name='section' all={false} value={section} onChange={handleChange}/>
             </Grid>
             <Grid lg={4} item>
                 <Sort Session="true" size="small" name='session' all={false} value={session} onChange={handleChange}/>
             </Grid>
            </Grid>
            <Grid container className={classes.Grid}  alignItems="center" container spacing={5}>
             <Grid lg={4} item>
                <TextField fullWidth variant="outlined" size="small" className={classes.TextField} label="program fees" name='programFee' value={programFee} onChange={handleChange}/>
             </Grid>
            <Grid lg={4} item>
                <TextField fullWidth variant="outlined" size="small"  className={classes.TextField} label="Admission fees" name='admissionFee' value={admissionFee} onChange={handleChange}/>
             </Grid>
             <Grid lg={4} item>
             <TextField fullWidth variant="outlined" size="small"  className={classes.TextField} label="Exam fees" name='examFee' value={examFee} onChange={handleChange}/>
             </Grid>
            </Grid>
            <Grid container className={classes.Grid}  alignItems="center" spacing={5}>
             <Grid lg={4} item>
                <TextField fullWidth variant="outlined" size="small"  className={classes.TextField} label="Other fees" name='otherFee' value={otherFee} onChange={handleChange}/>
             </Grid>
             <Grid lg={4} item>
             <TextField fullWidth variant="outlined" size="small"  className={classes.TextField} label="Total fees" name='totalFee' value={totalFee} onChange={handleChange}/>
             </Grid>
             <Grid lg={4} item>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={handleSubmit}
                > 
                    Promote
                </Button>
             </Grid>
            </Grid>
        </div>
    )
}

export default StudentAttend
