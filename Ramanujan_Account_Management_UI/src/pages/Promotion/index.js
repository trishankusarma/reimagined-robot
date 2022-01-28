import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import Promotion from '../../components/Promotion/Desh/index'
import { useSelector } from 'react-redux';
import axios from "../../helpers/axios";
import { Toastify } from '../../App';

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

export default function Expenditure() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [ students, setStudents ] = useState(null);
  const [ filteredStudents, setFilteredStudents ] = useState(null)

  const [ selectionModel, setSelectionModel] = useState([]);

  const auth = useSelector(state => state.auth)

  const [ choose, setChoose ] = useState({
    class_1 : "all",
    section_1 : "all",
    session_1 : "all"
  })

  const [ promote, setPromote ] = useState({

    standard : '',
    section : '',
    session : '',
    programFee : '',
    admissionFee : '',
    examFee : '',
    otherFee : '',
    totalFee : ''
  })

  useEffect(async ()=>{
           
     try {
         
      const res = await axios().get(`/student/allDepartmentStudents/${auth.user?.adminType?._id}`);

      console.log("res.data", res.data);
      setStudents(res.data?.map((student)=> student ? { ...student, id: student._id } : null ) );

     } catch (error) {
       
       Toastify('error', 'Something went wrong')
     }

  },[])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e)=>{

    console.log({
      ...promote,
      standard : auth?.user?.adminType?.classes[ promote.standard ]?.class
   },'promote',selectionModel,'selectionModel')

    try {
      
        const res = await axios().patch('/student/promoteStudents',{

            selectedStudents : selectionModel,
            promote : {
               ...promote,
               standard : auth?.user?.adminType?.classes[ promote.standard ]?.class
            }
        })

        console.log('res.data',res.data)
    
        if(res.status===200){
          
            setStudents(
                
                 students.map((item)=>{
                     
                      const isPromoted = selectionModel.filter((id)=>id == item.id)

                      if(isPromoted){
                           
                           return {
                              ...item,
                              standard: auth?.user?.adminType?.classes[ promote.standard ]?.class, 
                              section: promote.section, 
                              session: promote.session
                           }
                      }
                      return item
                 })
            )

            Toastify('success', 'Students Promoted!!')
        }else
            Toastify('error','Something went wrong')

    } catch (error) {

        Toastify('error','Something went wrong')
    }
  }

  useEffect(()=>{
         
    if(choose.class_1===null || choose.section_1===null) return

    console.log( students )

    setFilteredStudents(
         students?.filter((row)=>((
               choose.class_1=='all' || row.standard==auth?.user?.adminType?.classes[ choose.class_1 ]?.class)
            && ( choose.section_1=='all' || row.section==choose.section_1 ) 
            && ( choose.session_1=='all' || row.session==choose.session_1  )
        ))
    )
 
  },[choose.class_1, choose.section_1, choose.session_1, students])

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
          <Promotion 
               students={filteredStudents ? filteredStudents : students} 
               setSelectionModel={setSelectionModel} 
               selectionModel={selectionModel} 
               choose={choose} 
               setChoose={setChoose} 
               promote={promote} 
               setPromote={setPromote} 
               handleSubmit={handleSubmit}
           />
          <Footer />
      </main>
    </div>
  );
}
