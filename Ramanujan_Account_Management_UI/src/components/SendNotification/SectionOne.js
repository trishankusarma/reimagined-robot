import React, {useState} from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Sort from '../shared/Sort'
import {useSelector,useDispatch} from "react-redux"
import {updateNotificationStudents, updateNotificationStuff} from "../../redux/actions"

const SectionOne = () => {
   const dispatch = useDispatch()   
   const auth = useSelector(state => state.auth)

  const [formData, setFormData] = useState({
    student: '',
    standard: 'all',
    section: 'all',
    session: 'all'
  });

  const { student, standard, section, session } = formData;

 React.useEffect( async ()=>{

  await dispatch(updateNotificationStuff( auth.user?.adminType?._id  ))
  
  if(formData.standard!=="" && formData.section!=="" && formData.session!==""  ){

      console.log( formData )
      
      await dispatch(updateNotificationStudents({
             standard : standard=='all' ? 'all' : auth?.user?.adminType?.classes[ standard ]?.class,
             section,
             session 
         },auth.user?.adminType?._id )
      )
    }
   
 },[formData])

  const changeHandler = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
    
    
    return (
      <div>
        <FormControlLabel
          control={
            <Checkbox
              name='student'
              value={student}
              onChange={changeHandler}
              color='primary'
            />
          }
          label='Students'
        />
        <div style={{margin:"0 0 .3rem 0"}}>
        <Sort 
           Session="true" 
           size="small"
           name='session'
           value={session}
           all={true}
           onChange={changeHandler}
         />
        </div>

        <Sort
          name='standard'
          value={standard}
          onChange={changeHandler}
          Class={true}
          all={true}
          size="small"
        />
        
        <div style={{ height: '.5rem' }} />
        <Sort
          name='section'
          value={section}
          onChange={changeHandler}
          Section={true}
          classIndex = { standard }
          all ={true}
          size="small"
        />
      </div>
    );
}

export default SectionOne
