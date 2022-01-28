import React,{ useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import Section1 from '../../components/HostelStudent/Section1';
import Section2 from '../../components/HostelStudent/Section2';
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getAllHostels, addAdmission, getAllHostelers, editAdmission, deleteAdmission, filterHostelStudents, clearHostelStudents } from '../../redux/actions'
import axios from '../../helpers/axios'
import { Toastify } from '../../App';
import moment from "moment"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    maxWidth: '100vw',
    idth: '100vw',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  btnC: {
    width: '60%',
    margin: '2rem auto'
  }
}));

export default function AddHostelName() {
  var valueDate = new Date().getFullYear();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const [ editId , setEditId ] = useState(null)
  const [ deleteId, setDeleteId ] = useState(null)

  const dispatch = useDispatch()
  const Hostel = useSelector(state => state.hostel)
  const auth = useSelector(state => state.auth)
  const searchRef = useRef('')

  const handleFilter = (e) => {

    if (searchRef.current.value !== "") {
        dispatch( filterHostelStudents(e.target.value) );
    } else {
        dispatch( clearHostelStudents() );
    }
  }

  const initialState = {
    hostel: null,
    room: "",
    enrollment_no: "",
    Admission_Date: moment().format('YYYY-MM-DD'),
    Admission_Fee: 0,
    Monthly_Fees: 0,
    electricity_Fees: 0,
    food_Fees: 0,
    sport_Fees: 0,
    Extra_Curricular_Activity_Fees: 0,
    Security_Deposit: 0,
    Concession_Discount: 0,
    Total:0,
    Total_paid: 0,
    Year: valueDate,
    month: "",
    payment_mode:1,
    admission_paid:0,
  }

  const [formData, setFormData] = useState(initialState);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOperation = async ( row, type )=>{

    if(type==='Edit'){

        setEditId(row._id)
        const res = await axios().get(`/hostel/student/getonestudent/${row._id}`)

        console.log(res.data ,`/hostel/student/getonestudent/${row._id}`)

        if(res.status===200){
            setFormData({
              ...res.data,
              Admission_Date : res.data?.Admission_Date?.split('T')[0],
              Admission_Fee: res.data?.admissionFee,
              Monthly_Fees: res.data.data?.programFees,
              Concession_Discount: res.data?.concession,
              Total:0,
              Total_paid: res.data?.admissionPaid,
            })

            localStorage.setItem('previousPaid' , res.data?.admissionPaid );
          }else
            Toastify('error','Something went wrong!')

    }else if(type==='Delete'){
        
        setDeleteId(row._id)
        dispatch( deleteAdmission(row._id) )
    }
 }

 const clearAll = ()=>{
    
    setEditId(null)
    setDeleteId(null)
    setFormData(initialState)
 } 

  useEffect(async () => {
      await dispatch( getAllHostels(1) )
      await dispatch( getAllHostelers() )
  }, [])

  const handleSubmit = async (e)=>{
     
    if(!formData) return
     
    e.preventDefault()

    if(editId){
        
        dispatch( editAdmission({
          ...formData,
          hostel : Hostel?.hostels[ formData.hostel ]?.hostel?.Name,
        } , editId , localStorage.getItem('previousPaid')) )
        return;
    }
   
    dispatch( addAdmission({
      ...formData,
          hostel : Hostel?.hostels[ formData.hostel ]?.hostel?.Name,
          department : auth.user.adminType._id
    }) )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerMenu handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        <div className={classes.drawerHeader} />
         <div>
             <Grid container>
                 <Grid xs={12} sm={12} md={4} lg={4}  item>
                   <Section1 hostels={Hostel.hostels} formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} editId={editId} clearAll={clearAll}/>
                 </Grid>
                 <Grid xs={12} sm={12} md={8} lg={8} item>

                     <Section2 

                          data={ Hostel.searchAdmittedStudents ? Hostel.searchAdmittedStudents : Hostel.admittedStudents } 

                          hostelStudent={true} 
                          handleOperation={handleOperation} 
                          handleFilter={handleFilter} 
                          searchRef={searchRef} 
                      />
                 </Grid>
             </Grid>
         </div>
        <Footer />
      </main>
    </div>
  );
}
