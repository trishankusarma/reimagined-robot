import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useDispatch,useSelector} from "react-redux"
import {sendNotification} from "../../redux/actions";
const SectionFour = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
  });
const dispatch = useDispatch()

  const { title, message, } = formData;
  
  const notification = useSelector(state => state.notification)

  const auth = useSelector(state => state.auth)

  const sendNotificationBtn=()=>{
         dispatch(sendNotification([...notification.personSelected,...notification.selectedNotification],formData.message,formData.title,auth?.user?.adminType?._id))
  }
  const changeHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
      <form>
        <TextField
          variant='outlined'
          fullWidth
          size='small'
          name='title'
          value={title}
          onChange={changeHandler}
          placeholder='Title'
          label='Title'
        />
        <TextField
          id='outlined-multiline-static'
          label='Message'
          multiline
          rows={4}
          style={{ marginTop: '1rem' }}
          placeholder='Message'
          name='message'
          value={message}
          onChange={changeHandler}
          variant='outlined'
          fullWidth
        />
        <Button
          variant='contained'
          color='primary'
          style={{ marginTop: '1rem' }}
          onClick={()=>{
            if(notification?.wait){
              return;
            }
            sendNotificationBtn()}}
        >
          {notification?.wait?"Wait....":"Send"}
        </Button>
      </form>
    );
}

export default SectionFour
