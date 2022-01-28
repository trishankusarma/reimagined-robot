import React, { useEffect, useState } from 'react';
import Table from '../shared/Table';
import { Button, formatMs, Grid, makeStyles, Paper, Select, MenuItem , InputLabel,FormControl} from '@material-ui/core';
import Sort from '../shared/Sort'
import { useSelector } from 'react-redux';

const columns = [
    { id: 'name', label: 'Subject', minWidth: 200 },
    {
        id: 'Mark_Obtain',
        label: 'Marks obtained',
        minWidth: 150,
        align: 'left'
    },
    {
        id: 'Pass_Mark',
        label: 'Pass marks',
        minWidth: 70,
        align: 'left'
    },
    {
        id: 'marks',
        label: 'Total marks',
        minWidth: 50,
        align: 'left'
    },
    {
        id: 'Is_Fourth',
        label: 'Main Subject',
        minWidth: 50,
        align: 'left',
    },
    {
        id: 'remarks',
        label: 'Details',
        minWidth: 50,
        align: 'left',
    },
];

const useStyles = makeStyles({
    root: {
        width: '96%',
        margin: '1rem auto',
    },
    paper: {
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        // width: 300,
        // height: 200,
        margin: '2rem auto'
    }
});

const formatGender = (value)=>{
    
    switch (value) {
      case 0:
        return 'Male'
    
      case 1:
        return 'Female'
      
      case 2:
        return 'Others'
        
      default:
        break;
    }
}

function Evaluate({ studentDetails , marksData }) {
    const classes = useStyles();
    const auth = useSelector(state => state.auth)

    const [ filterDetails, setFilterDetails  ] = useState({
         
        Class :'all',
        exam : null
    })

    const { 
       Class, exam
    } = filterDetails

    const [ rows, setRows ] = useState([])
    const [ exams, setExams ] = useState([]);
 
    const handleChange = (e)=>{
        
        const { name, value } = e.target;

        setFilterDetails(
            {
                ...filterDetails,
                [name]:value
            }
        )
    }

    useEffect(()=>{
        
        if(!marksData) return

        setExams(
            marksData.map((item)=>{
                
                if(Class==='all' || item.Class===auth.user?.adminType?.classes[Class]?.class)
                    return item.Exam
            })
        )
    },[marksData, Class])

    useEffect(()=>{

         if(!marksData  || !exam || Class===null) return

         let list = []

         marksData.map((item)=>{
               
              if( ( Class==='all' || item.Class===auth.user?.adminType?.classes[Class]?.class ) && item.Exam===exam){
                   list = [
                       ...list,
                       ...item.subjects
                   ]
              }
         }) 
         setRows(list)
    },[ Class,  exam])

    console.log( rows, 'rows' )

    return (
        <div className={classes.root}>
            <div>
                <Grid container spacing={5}>
                    <Grid xs={4} lg={4} md={4} item>
                        <Paper className={classes.paper}>
                            <p style={{fontSize:'1.4rem', padding:'.3rem'}}>General Details</p>
                            <p style={{fontSize:'.9rem', padding:'.2rem'}}>Name: { studentDetails?.name } <br />

                                Roll No: { studentDetails?.rollNo }  <br />

                                Class:  { studentDetails?.standard } { studentDetails?.stream?.departmentName }  <br />

                                Section: { studentDetails?.section}  <br />

                                Session: { studentDetails?.session }</p> <br />
                        </Paper>
                    </Grid>
                    <Grid xs={4} lg={4} md={4} item>
                        <Paper className={classes.paper}>
                        <p style={{fontSize:'1.4rem', padding:'.3rem'}}>persional Details</p>
                            <p style={{fontSize:'.9rem', padding:'.2rem'}}>DOB: {studentDetails?.DOB?.split('T')[0]} <br />

                            Gender: { formatGender( studentDetails?.gender ) }  <br />

                            Father Name: { studentDetails?.Father_Name } <br />

                            Mother Name: { studentDetails?.motherName } <br />
                            </p>
                        </Paper>
                    </Grid>
                    <Grid xs={4} lg={4} md={4} item>
                        <Paper className={classes.paper}>
                        <p style={{fontSize:'1.4rem', padding:'.3rem'}}>Contact Details</p>
                            <p style={{fontSize:'.9rem', padding:'.2rem'}}>Address: { studentDetails?.address }<br />

                            Phone: { studentDetails?.mobileNo }<br />

                            Email: { studentDetails?.email }<br />
                            </p>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
            <div>
            <Grid container spacing={2}>
                <Grid item lg={4}>
                <Sort Class="true" size="small" all={true} name='Class' value={Class} onChange={handleChange}/>
                </Grid>
                <Grid item lg={4}>
                <FormControl fullWidth variant="outlined" size="small">
                <InputLabel id="Exam:">Choose Exam:</InputLabel>
                <Select
                   id="Exam:"
                    name='exam'
                    value={exam}
                    onChange={handleChange}
                    label="Choose Exam: "
                    >
                    {exams.map((item, index) => {
                            return <MenuItem value={item}>{item}</MenuItem>;
                    })}
                </Select>
                </FormControl>
                </Grid>
            </Grid>
            </div>
            <div>
                <Table data={rows} columns={columns} pagination={true} />
            </div>
            <Button color="primary" variant="contained" style={{margin:'2rem auto'}}>print</Button>

        </div>
    )
}

export default Evaluate
