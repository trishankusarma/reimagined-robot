import React,{ useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DrawerMenu from '../../../components/shared/DrawerMenu';
import Navbar from '../../../components/shared/Navbar';
import Footer from '../../../components/shared/Footer';
import StudentAttend from '../../../components/Report/StudentAttend';
import moment from 'moment';
import axios from "../../../helpers/axios";
import { Toastify } from '../../../App';

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

export default function StudentAtt() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [ students, setStudents ] = useState(null);

  const [ filterStudents, setFilterStudents ] = useState(null);

  const auth = useSelector(state => state.auth)

  const [ basicDetails, setBasicDetails ] = useState({
    From_Date : moment().format('YYYY-MM-DD'),
    To_Date : moment().format('YYYY-MM-DD'),
    Session : null,
    Class : null,
    Section : null,
    Student : null
})

const {
   Session, Class, Section
} = basicDetails

const handleChange = (e) => {

    const { name, value } = e.target

    setBasicDetails({
        ...basicDetails,
        [ name ] : value
    });
};

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(async ()=>{
           
    try {
        
     const res = await axios().get(`/student/allDepartmentStudents/${auth.user?.adminType?._id}`);

     console.log("res.data", res.data);
     setStudents(res.data?.map((student)=> student ? { ...student, id: student._id } : null ) );

    } catch (error) {
      
      Toastify('error', 'Something went wrong')
    }

 },[])

  useEffect(() => {

      if(  Section===null ||  Class===null || Session===null || !students ) return

       setFilterStudents(
           
           students.filter((item)=>item.standard==auth?.user?.adminType?.classes[ Class ].class && item.section==Section && item.session==Session)
       )
  }, [ Session, Class, Section ])

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
        <StudentAttend 
              students={ filterStudents ? filterStudents :  students} 
              auth={auth} 
              basicDetails={basicDetails} 
              handleChange={handleChange}
        />
        <Footer />
      </main>
    </div>
  );
}
