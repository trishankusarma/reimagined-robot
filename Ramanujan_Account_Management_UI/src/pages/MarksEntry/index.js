import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import MarksEnrty from '../../components/MarksEntry';
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import axios from '../../helpers/axios'
import { Toastify } from '../../App';
import { useSelector } from 'react-redux';

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
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ students, setStudents ] = useState(null);
  const [ filterStudents, setFilterStudents ] = useState(null)

  const [ exams, setExams ] = useState(null)
  const [ subjects, setSubjects ] = useState([])

  const auth = useSelector(state => state.auth)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const[ basicReqs, setBasicReqs] = useState({
    Session:null,
    Class:null,
    Section:null,
    Exam:null
  })

  const {
    Session,  Class,  Section, Exam
} = basicReqs

  const handleChange = (e)=>{

      const { name, value } = e.target

      setBasicReqs({
          ...basicReqs,
          [ name ] : value 
      })
  }

  useEffect( async () => {

    if( Session===null ||   Class===null || Section===null ) return
    
    try {
        
      const res = await axios().post(`/student/getAllStudentExam`,{
          Session,  
          Class : auth.user?.adminType?.classes[Class]?.class,  
          Section
      })

      if(res.status===200){

        setSubjects(
            
          auth?.user?.adminType?.classes[ Class ]?.subjects.map((item)=>{
              return{
                id: item,
                label: item,
                minWidth: 150,
                align: 'left'
              }
          })
        )
           
        setExams(
            res.data.map((item)=>item.Exam )
         )

        setStudents(
          res.data.map(( item )=>{

            let Subjects = item.subjects?.map((sub)=>{
                
              return{
                   key : sub.name,
                   value : `${sub.Mark_Obtain} ${sub.Is_Fourth ? 'Fourth' : ''}`,
             }})

             Subjects = Subjects.reduce((obj, item) => (obj[item.key] = item.value, obj) ,{});
            
            return{

               Exam : item.Exam,
                
               name: item.Student_id?.name,
               rollNo: item.Student_id?.rollNo,

               ...Subjects,
            }
         })
        )

      }else{
        Toastify('error','Something went wrong!!')
      }
    } catch (error) {

       console.log(error)
       
       Toastify('error','Something went wrong!!')
    }

  }, [ Session,  Class,  Section ])

  useEffect(() => {
    
     if( !students || Exam===null ) return

      setFilterStudents(
           students.filter((item)=>item.Exam === Exam )
      )
  }, [Exam])

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

            <MarksEnrty handleChange={handleChange} basicReqs={ basicReqs} exams={ exams} students={ Exam===null ? null : filterStudents ? filterStudents : null } subjects={subjects}/>
            <Footer />
      </main>
    </div>
  );
}
