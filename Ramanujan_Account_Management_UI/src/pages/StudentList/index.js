import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import DrawerMenu from "../../components/shared/DrawerMenu";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import Table from "../../components/StudentList/StudentTable";
import Search from "../../components/shared/search";
import Sort from "../../components/shared/Sort";
import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudent , DeleteStudent } from "../../redux/actions";


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflowX: "hidden",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    maxWidth: "100vw",
    idth: "100vw",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  btnC: {
    width: "60%",
    margin: "2rem auto",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "96%",
    margin: "2rem auto",
    marginTop: "5rem",
  },
  button: {
    width: "95%",
    margin: "2rem auto",
    display: "flex",
    justifyContent: "space-between",
  },
  sort: {
    width: "96%",
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
  },
}));

function createData(
  name,
  code,
  Entrollment,
  Address,
  Mobile,
  Session,
  classN,
  Email,
  caste,
  Religion,
  Delete,
  Edit,
  Receipt,
  Id_card,
  Pass,
  Action
) {
  return {
    name,
    code,
    Entrollment,
    Address,
    Mobile,
    Session,
    classN,
    Email,
    caste,
    Religion,
    Delete,
    Edit,
    Receipt,
    Id_card,
    Pass,
    Action,
  };
}

export default function Expenditure() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const student = useSelector((state) => state.student);
  const componentRef=useRef();
  const searchRef = useRef();
  const [ rows, setRows ] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRowChange=(value)=>{
    setRowsPerPage(value);
    
    setPage(0);
  }
  const handlePerPage=(newPage)=>{
    setPage(newPage);
  }
  const [filter, setFilter] = React.useState({
    class: "all",
    section: "all",
    session: "all",
    gender: "all",
  });

  const [ filterStudents , setFilterStudents ] = React.useState(null)
  const [ searchStudents , setSearchStudents ] = React.useState(null)

  const Delete= (id)=>{
    dispatch(DeleteStudent(id,auth.user.adminType._id)) 
    
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    let conditions = null;
    dispatch(getAllStudent(auth?.user?.adminType?._id, conditions));
  }, []);

  useEffect(() => {

    if( !rows ) return
      
    setFilterStudents(

       rows.filter((item)=>( filter.class=='all' || item?.classN?.split(' ')[0]==auth?.user?.adminType?.classes[filter.class].class ) 
                                         && ( filter.gender=='all' || item.gender==filter.gender )
                                         && ( filter.section=='all' || item.classN.split(' ')[1]==filter.section )
                                         && ( filter.session=='all' || item.Session==filter.session )
       )
    )
     
  }, [ filter.class , filter.section , filter.gender, filter.session, rows ])

  const handleFilter = (e)=>{

    console.log(searchRef.current.value);
      
    if (searchRef.current.value !== "") {

        RegExp.quote = function allowSpecialSymbols(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
        };

        const reg = new RegExp(RegExp.quote(`${searchRef.current.value}`), "gi");

        setSearchStudents(

            filterStudents.filter((item)=>item.name.match(reg) || item.Entrollment == searchRef.current.value || item.Mobile == searchRef.current.value )
        )

        console.log( searchStudents , "searchStudents" )
    } else {
        setSearchStudents(null)
    }
  }

  React.useEffect(async () => {

       
      setRows( await student.studentList.map( (data)=> createData(

                data?.name,
                data?.rollNo,
                data?.admissionNo,
                data?.address,
                data?.mobileNo,
                data?.session,
                `${data?.standard} ${data?.section}`,
                data?.email,
                data?.caste,
                data?.religion,
                <Button onClick={() => {
                  Delete(data?._id);
                } } color="primary" size="small">
                  Delete
                </Button>,
                <Link to={`/StudentEdit/${data?._id}`} color="primary" size="small">
                  Edit
                </Link>,
                <Link to={`/StudentList/reciept/${data?._id}`}>
                  Reciept
                </Link>,
                <Link to={`/StudentList/idproff/${data?._id}`}>
                  Id card
                </Link>,
                <Link to={`/StudentList/passCer/${data?._id}`}>
                  Pass certificate
                </Link>,
                <Button
                  color="primary"
                  size="small"
                >
                  <Link to={`/evaluate?_id=${data?._id}`}>
                    Evaluate
                  </Link>
                </Button>
        )
       )
       );

  }, [student.studentList]);

  // console.log("rows" , rows , "search", searchStudents , "filter" , filterStudents)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerMenu handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div>
          <div className={classes.button}>
          <Button onClick={()=>{
            let data = searchStudents ? searchStudents : filterStudents ? filterStudents : rows
            localStorage.setItem("studentData",JSON.stringify( data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)));
            localStorage.setItem("studentDataClass",JSON.stringify(filter));
            window.open("https://accounts.ramanujanacademy.co.in/StudentListTable","_blank")
          }} variant="contained" color="primary" size="small">
              print This
            </Button>
          {/* <ReactToPrint
          trigger={() => (
          
          )}
          content={() => componentRef.current}
        /> */}
            <Link to="/admission" style={{textDecoration:'none'}}>
            <Button color="primary" variant="contained">
              add new student
            </Button>
            </Link>
          </div>
          <div className={classes.sort}>
            <Sort
              all={"all"}
              name="class"
              value={filter.class}
              onChange={handleChange}
              Class={true}
              size="small"
            />
            <Sort
              all={"all"}
              classIndex={filter.class}
              Section={true}
              name="section"
              onChange={handleChange}
              value={filter.section}
              size="small"
            />
            <Sort
              all={"all"}
              name="session"
              onChange={handleChange}
              value={filter.session}
              Session={true}
              size="small"
            />
            {/* <Sort
              all={"all"}
              name="gender"
              onChange={handleChange}
              value={filter.gender}
              Gender={true}
              size="small"
            /> */}
          </div>
          <div className={classes.filters}>
            
            <Typography>Total no. of Enrollment : {rows?.length}</Typography>

            <Search placeholder={"Search here"} searchRef={searchRef} handleChange={handleFilter} typo={2}/>
          </div>
          <div ref={componentRef}>
          <Table
          handleRowChange={handleRowChange}
          handlePerPage={handlePerPage}
           data={
              searchStudents ? searchStudents : filterStudents ? filterStudents : rows
          } />
            </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
