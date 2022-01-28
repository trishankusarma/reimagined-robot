import React,{ useState , useEffect, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import EnterAttendence from '../../components/EnterAttendence';
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import moment from 'moment'
import { useSelector } from 'react-redux';
import axios from "../../helpers/axios";
import { Toastify } from '../../App';
import queryString from 'query-string';

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
  const [open, setOpen] = useState(false);

  const searchRef = useRef()

  const { type } = queryString.parse( window.location.search )

  const [ preDetails , setPreDetails ] = useState({
      Class : null,
      Section : null,
      Date : moment().format('YYYY-MM-DD'),
      Session : null 
  })

  const handleChange = (e)=>{
      
     const { name , value } = e.target;

     setPreDetails({
         ...preDetails,
         [ name ] : value
     })
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [ data, setData ] = useState(null);

  const [ filterData, setFilterData ] = useState(null);

  const [ searchData, setSearchData ] = useState(null);

  const auth = useSelector(state => state.auth)

  useEffect( async () => {
    try {

      const link = 
        parseInt( type )===0 ? `/student/allDepartmentStudents/${auth.user?.adminType?._id}`
        : `/stuff/allDepartmentStuff/${auth.user?.adminType?._id}`
         
      const res = await axios().get(link);

      console.log(res.data)

      setData(res.data?.map((row)=> row ? { ...row, Mark: 'present' } : null ) );

     } catch (error) {
       
       Toastify('error', 'Something went wrong')
     }
  }, [])

  useEffect(() => {
     
     if( preDetails.Class===null || preDetails.Section===null || data===null || parseInt(type)!==0 || preDetails.Session===null ) return;

     setFilterData(
        data.filter((row)=>((preDetails.Class=='all' || row.standard==auth?.user?.adminType?.classes[ preDetails.Class ]?.class) 
                         && ( preDetails.Section=='all' || row.section==preDetails.Section ) 
                         && ( preDetails.Session=='all' || row.session==preDetails.Session ) 
        ))
     )

  }, [ preDetails.Class, preDetails.Section, preDetails.Session ])

  RegExp.quote = function allowSpecialSymbols(str) {

      return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
  };

  const handleSearch = (e) => {

    if(!data || parseInt( type ) !== 0 ) return

    if (searchRef.current.value !== "") {
  
      const reg = new RegExp(RegExp.quote(`${searchRef.current.value}`), "gi");

      const searchedResults = [];

      filterData ? filterData.map((item)=>{
            
            if(item.name.match(reg) || item.admissionNo.match(reg)){

                searchedResults.push(item)
            }   
      }) :  data.map((item)=>{
            
            if(item.name.match(reg) || item.admissionNo.match(reg)){

              searchedResults.push(item)
            } 
     })

     setSearchData( searchedResults )

    }else{
        setSearchData(null)
    }
  }

  const handleChangeMark = (e, _id)=>{
       
       const { value } = e.target;
       
       setData(data?.map((row)=> row._id===_id ? { ...row, Mark: value } : row ) );
  }

  const handleSubmit = async ()=>{
    
      let Data;

      if(
         ( parseInt( type )===0 && ( !preDetails.Date || preDetails.Class===null || preDetails.Section===null ) ) || ( parseInt( type )===1 && !preDetails.Date )
      ) return Toastify('warning',' Details not filled completely! ');

      {
        parseInt( type )===0 ? 
        
        Data = {
          date: preDetails.Date,
          class: auth?.user?.adminType?.classes[ preDetails.Class ].class,
          sec: preDetails.Section,
          
          department: `${auth.user?.adminType?._id}`,
  
          students: data.map((student)=>{
             return {
                 student_id : student._id,
                 present : student.Mark==='present' ? true : false
             }     
         })
        } : 

        Data = {
          date: preDetails.Date,
          
          department: `${auth.user?.adminType?._id}`,
  
          stuffs: data.map((row)=>{
             return {
                 stuff_id : row._id,
                 present : row.Mark==='present' ? true : false
             }     
         })
        }
      }

      try {
         
        const res = await axios().post( parseInt( type )===0 ? `/student/allStudentAttendence` : `/stuff/allStuffAttendence`, Data);

         if(res.status===200){

            if(res.data.error){

                parseInt( type ) === 0 ? 
                setData(
                  data?.map((row)=> {
                    
                     let student = res.data?.existing?.students?.find((r)=>r.student_id===row._id);

                     return{
                           ...row,
                           Mark : student.present ? 'present' : 'absent'
                     }
                  })
                ) :
                setData(
                    data?.map((row)=> {
                      
                      let stuff = res.data?.existing?.stuffs?.find((r)=>r.stuff_id===row._id);

                      return{
                            ...row,
                            Mark : stuff.present ? 'present' : 'absent'
                      }
                    })
                );
                return Toastify('warning', res.data.error)
            }
            
            Toastify('success', 'Successfully done!')
        }else{
            
            Toastify('error', 'Something went wrong')
        }

       } catch (error) {
         
         Toastify('error', 'Something went wrong')
       }
  }

  const getAttendence = async ()=>{

      if(
        !data ||
          ( parseInt( type )===0 && ( !preDetails.Date || preDetails.Class===null || preDetails.Section===null ) ) || ( parseInt( type )===1 && !preDetails.Date )
      ) return Toastify('warning',' Select the details! ');
      
      try {

         let query;

         parseInt( type)===0 ? 
         query =  {
              date: preDetails.Date,
              class: auth?.user?.adminType?.classes[ preDetails.Class ].class,
              sec: preDetails.Section,
              
              department: `${auth.user?.adminType?._id}`,
          } : 
          query = {

              date: preDetails.Date,
              department: `${auth.user?.adminType?._id}`,
          }
        
         const res = await axios().post(
              parseInt( type )===0 ? '/student/getAllStudentAttendence' : '/stuff/getStuffAttendence', 
         query)
         
         if(res.status===200){

          if(res.data.error){

              return Toastify('warning', res.data.error)
          }
          
           parseInt(type)===0 ? 
              setData(
                data?.map((row)=> {
                      
                    let student = res.data?.students?.find((r)=>r.student_id===row._id);

                    return{
                        ...row,
                        Mark : student.present ? 'present' : 'absent'
                    }
                })
              ) : 
              setData(
                data?.map((row)=> {
                      
                    let stuff = res.data?.stuffs?.find((r)=>r.stuff_id===row._id);

                    return{
                        ...row,
                        Mark : stuff.present ? 'present' : 'absent'
                    }
                })
              )
             
        }else{
            
          Toastify('error', ' Something went wrong!'); 
        }
      } catch (error) {
         Toastify('error', ' Something went wrong!'); 
      }
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
        <EnterAttendence 
             getAttendence={getAttendence} 
             preDetails={preDetails} 
             handleChange={handleChange} 
             data={ searchData ? searchData : filterData ? filterData : [] } 
             handleChangeMark={handleChangeMark} 
             handleSubmit={handleSubmit} 
             type={type}
             searchRef={searchRef}
             handleSearch={handleSearch}
         />
        <Footer />
      </main>
    </div>
  );
}
