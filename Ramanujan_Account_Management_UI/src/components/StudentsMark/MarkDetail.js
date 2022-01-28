import React from 'react';
import Table from '../shared/Table';
import { FormControl, Select, MenuItem, Button, TextField } from '@material-ui/core';
import Modal from './Modal'

const columns = [
  { id: 'admissionNo', label: 'Enrollment Id', minWidth: 100 },
  {
    id: 'name',
    label: 'Name',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'AddMarks',
    label: 'Add Mark',
    minWidth: 100,
    align: 'left'
  },
  { id: 'Print', label: 'Print', minWidth: 100 }
];

const MarkDetail = ({rows, auth, classIndex, subjectMarks, setSubjectMarks, handleSubmit, setSelectedId, open , handleOpen, handleClose , setOpen}) => {

    const handleChange = (e,idx)=>{

         console.log(subjectMarks)

         const { name, value } = e.target
        
         setSubjectMarks(
            subjectMarks.map((subject,index)=>index===idx ? {...subject, [name]:value } : subject )
         )
    }
    
    const subjectsData = subjectMarks && auth?.user?.adminType?.classes[classIndex]?.subjects?.map((item,index) => {
      return{
              name: <TextField variant="outlined" type="text" size="small" name='name' value={subjectMarks[index].name} />,
              marks: <TextField variant="outlined" type="number" size="small" name='marks' value={subjectMarks[index].marks} onChange={(e)=>handleChange(e,index)}/>,
              Pass_Mark:<TextField variant="outlined" type="number" size="small" name='Pass_Mark' value={subjectMarks[index].Pass_Mark} onChange={(e)=>handleChange(e,index)}/>,
              Mark_Obtain:<TextField variant="outlined" type="number" type="number" name='Mark_Obtain' size="small" value={subjectMarks[index].Mark_Obtain} onChange={(e)=>handleChange(e,index)}/>,
              Is_Fourth:<Select          
                             label="Is_Fourth"
                             name='Is_Fourth'
                             value={subjectMarks[index].Is_Fourth}
                             onChange={(e)=>handleChange(e,index)}
                           >
                                <MenuItem value={true}>
                                      Yes
                                </MenuItem>
            
                                <MenuItem value={false}>
                                      No
                                </MenuItem>
                        </Select>,
              remarks: <TextField 
                            variant="outlined" 
                            type="text" 
                            size="small" 
                            name='remarks'
                            value={subjectMarks[index].remarks}
                            onChange={(e)=>handleChange(e,index)}
                        />,
      };
    })

  return (
    <div style={{ width: '96%', margin: '0 auto' }}>
     
      <Modal rows={subjectsData} open={open} auth={auth} setOpen={setOpen} handleClose={handleClose} handleOpen={handleOpen}  handleSubmit={handleSubmit}/>
      
      <Table data={rows} columns={columns} pagination={true} handleOpen={handleOpen} setSelectedId={setSelectedId}/>
      <br />

      <Button variant='contained' color='primary' size='small'>
        Print Overall Marksheet
      </Button>
    </div>
  );
};

export default MarkDetail;
