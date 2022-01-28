import React from 'react'
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import ReportIcon from '@material-ui/icons/Report';
import BookIcon from '@material-ui/icons/Book';

const drawerWidth = 240;

const drawerMenuData = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    to: '/dashboard'
  },
  {
    title: 'Student Fee Payment',
    icon: <DashboardIcon />,
    to: '/fee-payment'
  },
  {
    title: 'Add Session',
    icon: <DesktopMacIcon />,
    to: '/addSession'
  },
  {
    title: 'Attendence',
    icon: <DesktopMacIcon />,
    to: '/enterAttend'
  },
  {
    title: 'Reports',
    icon: <ReportIcon />,
    to: '/ReportDesh'
  },
  {
    title: 'Leave Application',
    icon: <BookIcon />,
    to: '/leavedash'
  },
  {
    title: 'Payment & Expenditure',
    icon: <BookIcon />,
    to: '/expenditure'
  },
  {
    title: 'Send Notification',
    icon: <DashboardIcon />,
    to: '/send-notification'
  },
  // {
  //   title: 'Enquiry',
  //   icon: <BookIcon />,
  //   to: '/enquiry'
  // },
  {
    title: 'Settings',
    icon: <BookIcon />,
    to: '/settings'
  }
];

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
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#333'
  },
  mr1: {
    marginRight: '1rem'
  },
  drawerLink: {
    textDecoration: 'none',
    color: 'rgba(255, 255, 255, .8)',
    fontSize: '.7rem'
  }
}));

export default function Index({ handleDrawerClose, open }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon style={{ color: 'rgba(255, 255, 255, .8)' }} />
          ) : (
            <ChevronRightIcon style={{ color: 'rgba(255, 255, 255, .8)' }} />
          )}
        </IconButton>
      </div>
      <Divider />
      <div
        style={{ textAlign: 'center', margin: '.5rem 0' }}
        className='logoSection'
      >
        <div className='logoC'>
          <img
            src='https://picsum.photos/200'
            width='100'
            height='100'
            alt='LOGO'
          />
        </div>
        <Typography style={{ color: 'rgba(255, 255, 255, .8)' }}>
          Super Admin
        </Typography>
      </div>
      <Divider />
      <List>
        {drawerMenuData.map((datam) => (
          <Link className={classes.drawerLink} to={datam.to}>
            <ListItem button key={datam.text}>
              <ListItemIcon style={{ color: 'rgba(255, 255, 255, .8)' }}>
                {datam.icon}
              </ListItemIcon>
              <ListItemText
                style={{ fontSize: '.8rem !important' }}
                primary={datam.title}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
}
