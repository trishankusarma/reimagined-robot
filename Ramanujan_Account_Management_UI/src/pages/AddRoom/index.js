import React,{ useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddRoom from '../../components/AddHostelRoom';
import DrawerMenu from '../../components/shared/DrawerMenu';
import Navbar from '../../components/shared/Navbar';
import Footer from '../../components/shared/Footer';

import { getAllRooms , createNewRoom, editRoom, deleteRoom } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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

export default function AddHostelRoom() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [ editId, setEditId ] = useState(null)
  const [ deleteId, setDeleteId ] = useState(null)

  const [ oneRow, setOneRow ] = useState(null)
  const [ newRow, setNewRow ] = useState(null)

  const dispatch = useDispatch()
  const hostel = useSelector(state => state.hostel)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { _id } = useParams()

  useEffect(() => {
      
     dispatch( getAllRooms(_id) )
  }, [])

  useEffect(() => {
       
    if(!deleteId)return  

    dispatch( deleteRoom(deleteId) )
    setDeleteId(null)

  }, [deleteId])

  const handleEdit= async ()=>{
      
      await dispatch( editRoom( editId, oneRow ) )
      
      setEditId(null)
      setOneRow(null)
  }

  const addRoom = ()=>{
      
      setNewRow({
          hostel: _id, 
          roomNo: null, 
          floorNo: null, 
          capacity: null, 
          occupied: null
      })
  }
  
  const handleAdd = async ()=>{
     
      await dispatch( createNewRoom(_id, newRow) )

      setNewRow(null)
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
        
        <AddRoom 
            rooms={ newRow ? [ ...hostel.oneHostel, newRow ] : hostel.oneHostel} 
            editId={editId} 
            setEditId={setEditId} 
            deleteId={deleteId} 
            setDeleteId={setDeleteId} 
            oneRow={oneRow} 
            setOneRow={setOneRow}
            handleEdit={handleEdit}
            addRoom = {addRoom}
            newRow = {newRow}
            setNewRow = { setNewRow }
            handleAdd = { handleAdd }
          />    

        <Footer />
      </main>
    </div>
  );
}
