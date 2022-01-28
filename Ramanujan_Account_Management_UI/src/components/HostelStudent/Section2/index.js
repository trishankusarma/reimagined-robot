import React,{useRef} from 'react';
import Table from '../../shared/Table/index';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Search from "../../shared/search";
import ReactToPrint from "react-to-print";

const columns = [
    {
      id: 'hostel',
      label: 'Hostel',
      minWidth: 140,
      align: 'left'
    },   
    {
        id: 'room',
        label: 'Room No',
        minWidth: 100,
        align: 'left',
      },  
    {
      id: 'name',
      label: 'Name',
      minWidth: 150,
      align: 'left'
    },
    {
      id: 'rollNo',
      label: 'Roll_No',
      minWidth: 70,
      align: 'left'
    },
    {
      id: 'enrollment_no',
      label: 'Enroll No',
      minWidth: 100,
      align: 'left',
    },
    {
        id: 'mobileNo',
        label: 'Mobile No',
        minWidth: 140,
        align: 'left',
    },
    {
      id: 'gender',
      label: 'Sex',
      minWidth: 70,
      align: 'left',
  },
    { id: 'Edit', label: 'Edit', minWidth: 70 },
    { id: 'Delete', label: 'Delete', minWidth: 70 },
   
  ];

  const useStyles = makeStyles((theme) => ({
    root:
    {
        width: '96%',
        margin: '1rem auto'
    },
    filters: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width:'100%',
        margin:'1rem auto',
        marginTop:'5rem'
      },
      table:
      {
          width:'98%',
          margin:'1rem auto'
      }
}));


function Section2(props) {
    const classes = useStyles();
    const componentRef=useRef();
    return (
        <div className={classes.root}>
        <div className={classes.filters}>

        <ReactToPrint
          trigger={() => (
            <Button variant="contained" color="primary">
              print
            </Button>
          )}
          content={() => componentRef.current}
        />
            <Search placeholder={"Search by name.."} handleChange={props.handleFilter} searchRef={props.searchRef}/>

          </div>
          <div ref={componentRef}>      
        <div className={classes.table}>
        <Table columns={columns} pagination={true} {...props}/>
        </div>
        </div> 
        </div>
    )
}

export default Section2
