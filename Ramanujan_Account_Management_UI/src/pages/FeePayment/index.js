import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';
import PreSection from '../../components/FeesPayment/PreSection';
import PostSection from '../../components/FeesPayment/PostSection';
import PostTableSection from '../../components/FeesPayment/PostTableSection';
import {useSelector,useDispatch} from "react-redux";
import {searchFeePayment} from "../../redux/actions"
import querySearch from "query-string";
import { useHistory } from 'react-router';
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
  }
}));


export default function FeePayment() {
  const history=useHistory()
  const dispatch = useDispatch()
  const classes = useStyles();
  const cash = useSelector(state => state.cash)
  const auth = useSelector(state => state.auth)
  const [open, setOpen] = React.useState(false);
React.useEffect(()=>{
  console.log(history.location.search.split("=")[1]!=undefined)
  if(history.location.search.split("=")[1]!=undefined){
    let departmentName =JSON.parse(localStorage.getItem("user")).adminType.departmentName

      dispatch(searchFeePayment(auth?.user?.adminType?._id,history.location.search.split("=")[1]),departmentName)
  }
},[])
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        <PreSection />
        <Divider />
        {cash.studentFeeInfo?
        (<>
        <PostSection />
        <Divider />
        <PostTableSection /></>
        )
        :null}
        <Footer />
      </main>
    </div>
  );
}
