import React,{ useState, useEffect, useRef } from 'react'
import Sort from '../../components/shared/Sort'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, Typography, TextField } from '@material-ui/core';
import Table from '../shared/Table'
import Search from '../../components/shared/search'

import { useSelector, useDispatch } from 'react-redux';

import {     
     AddNewNotice, getAllNotice, deleteNotice, filterNotice, clearNotice
} from '../../redux/actions'
import { Toastify } from '../../App';

const useStyles = makeStyles((theme) =>
({
    root:
    {
        width: '95%',
        margin: '2rem auto'
    },
    Grid:
    {
        margin: '2rem auto'
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: '20px auto',
        marginTop: '50px'
    },

}));
const columns = [
    { id: 'Title', label: 'Title', minWidth: 140 },
    { id: 'Class', label: 'Class', minWidth: 100 },
    {
      id: 'Section',
      label: 'Section',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'Subject',
      label: 'Subject',
      minWidth: 100,
      align: 'left'
    },
    {
      id: 'Upload_file',
      label: 'Upload_file',
      minWidth: 100,
      align: 'left',
      format: (value) => value.toFixed(2)
    },
    {
      id: 'Delete',
      label: 'Delete',
      minWidth: 100,
      align: 'left',
      format: (value) => value.toFixed(2)
    },
   
  ];

function StudentAttend() {
    const classes = useStyles();

    const [ notice , setNotice ] = useState({
        Type:'',
        Class:'',
        Section:'',
        Subject:'',
        Title:'',
        Upload_file:null     
    })

    const [ deleteId, setDeleteId ] = useState(null)
    const searchRef = useRef()

    const dispatch = useDispatch()
    const notices = useSelector(state => state.notice)
    const auth = useSelector(state=>state.auth)

    const {
      Type, Class, Section, Subject, Title, Upload_file
    } = notice

    const handleChange = (e) => {
        
       const { name, files, value } = e.target

       if( name==='Upload_file' ){

            if( files[0].type.split('/')[0] != 'image' ){
     
                  Toastify("error",'Please upload an image!')
                  return
            }
           
            setNotice({
              ...notice,
              [name] : files[0]
            })
            return;
       }

       setNotice({
            ...notice,
            [name] : value
       })
    }

    const handleSubmit = () =>{

       dispatch( AddNewNotice({
        ...notice,
        Class : Class==='all' ? Class : auth.user?.adminType?.classes[Class]?.class
       }))
    }

    useEffect(()=>{
        dispatch(getAllNotice())
    },[])

    const handleOperation = async ( row, type )=>{

      if(type==='Delete'){
          
          await dispatch( deleteNotice(row._id) )
          setDeleteId(row._id)
      }
   }

   const handleFilter = (e) => {

    if (searchRef.current.value !== "") {
        dispatch( filterNotice(e.target.value) );
    } else {
        dispatch( clearNotice() );
    }
  }

    return (
        <div className={classes.root}>
            <Grid container className={classes.Grid} spacing={3}>
                <Grid lg={4} item>
                    <FormControl variant="outlined" size="small" className={classes.formControl} fullWidth>
                        <InputLabel id="Type">Type</InputLabel>
                        <Select
                            id="Type"
                            name='Type'
                            value={Type}
                            onChange={handleChange}
                            label="Type"
                        >
                            <MenuItem value={1}>
                                Notice
                            </MenuItem>
                            <MenuItem value={2}>
                                Homework
                             </MenuItem>
                            <MenuItem value={3}>
                              information
                            </MenuItem>
                            <MenuItem value={4}>
                              other
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid lg={4} item>
                    <Sort Class="true" size="small" name='Class' all={true} value={Class} onChange={handleChange}/>
                </Grid>
                <Grid lg={4} item>
                    <Sort Section="true" size="small" name='Section' all={true} classIndex={Class} value={Section} onChange={handleChange}/>
                </Grid>
            </Grid>
            <Grid container className={classes.Grid} spacing={3}>
                <Grid lg={4} item>
                    <Sort Subject="true" size="small" name='Subject' all={true} classIndex={Class} value={Subject} onChange={handleChange}/>
                </Grid>
                <Grid lg={4} item>
                    <TextField 
                         id="outlined-basic" 
                         label="Title" 
                         size="small" 
                         variant="outlined" 
                         name='Title' 
                         value={Title} 
                         onChange={handleChange}
                         fullWidth
                     />
                </Grid>
                <Grid lg={4} alignContent="center" item>
                
                <TextField
                    required 
                    id="upload"
                    type="file"
                    inputProps={{accept:"application/pdf"}}
                    variant="outlined"
                    size="small"
                    name='Upload_file' 
                    onChange={handleChange}
                    fullWidth
                    required
                />
                </Grid>
            </Grid>

            <Grid container className={classes.Grid} alignItems="center">

                <Grid xs={4} lg={3} md={3} justifyContent="flex-end">
              
                     <Button variant="contained" color="primary" onClick={handleSubmit}>
              
                           Submit
                      </Button>
                 </Grid>
            </Grid>
            
            <div className={classes.filters}>
            
                <Typography>Total no. of Notice : {notices.notices?.length}</Typography>
                <Search placeholder={"Search by title..."} handleChange={handleFilter} searchRef={searchRef} />
            </div>
            
            <Table columns={columns} data={
                   notices.searchNotice ? notices.searchNotice : notices.notices
             } pagination={true} setDeleteId={setDeleteId} handleOperation={handleOperation}/>
        </div>
    )
}

export default StudentAttend
