import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Search from '../../components/shared/search';
import Footer from '../../components/shared/Footer';
import StaffAttendenceTable from '../../components/Attendence/StaffAttendence';
import { Link } from 'react-router-dom';

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
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '96%',
    margin: '1rem auto',
    marginTop: '5rem'
  },
  button: {
    width: '95%',
    margin: '1rem auto',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  attendenceBtnC: {
    float: 'right',
    margin: '1rem 2rem'
  }
}));

export default function StaffAttendence() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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
        <div style={{height:'75vh'}}>
          <div className={classes.button}>
          <Link to="/enterAttend" style={{textDecoration:'none', cursor:"pointer"}}>
            <Button color='primary' variant='contained' size='small'>
              Enter Attendance
            </Button>
            </Link>
            <span style={{ margin: '0 5px' }}>--OR--</span>
            <Button color='secondary' variant='contained' size='small'>
              Upload Excelsheet
            </Button>
          </div>
          <div className={classes.filters}>
            <Typography style={{ color: 'transparent', userSelect: 'none' }}>
              .
            </Typography>
            <Search placeholder={'Search here'} />
          </div>

          <StaffAttendenceTable />
          <div className={classes.attendenceBtnC}>
            <Button color='default' variant='contained' size='small'>
              Previous
            </Button>
            <Button
              color='default'
              variant='contained'
              size='small'
              style={{ marginLeft: '2rem' }}
            >
              Next
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}
