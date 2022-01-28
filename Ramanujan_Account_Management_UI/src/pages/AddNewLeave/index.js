import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AddNewLeave from "../../components/AddNewLeave";
import DrawerMenu from "../../components/shared/DrawerMenu";
import Navbar from "../../components/shared/Navbar";
import Footer from "../../components/shared/Footer";
import moment from "moment";
import axios from "../../helpers/axios";
import { Toastify } from "../../App";
import { useHistory } from "react-router-dom";
import queryString from "query-string"
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
}));

export default function Addnew() {
  const classes = useStyles();
  const history=useHistory()
  const  {id,modelOf}=queryString.parse(history.location.search)
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState();
  const [date, setDate] = React.useState();
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(async() => {
     try{
      let data
      if(modelOf=="Stuff") {
         data = await axios().get(`/stuff/get/${id}`)
      }else{
        data =await axios().get(`/student/oneStudentsCollege/${id}`)
      }
     setInfo(data.data.data);
     }
     catch(err){
       console.log(err);
       Toastify("error",err);
     }
     setDate(moment(info?.DOB).format('l'))
  }, []);

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
        <AddNewLeave name={info?.name} rollNo={modelOf=="Stuff"?info?.idNo:info?.rollNo} mobileNo={info?.mobileNo} DOB={date} />
        <Footer />
      </main>
    </div>
  );
}
