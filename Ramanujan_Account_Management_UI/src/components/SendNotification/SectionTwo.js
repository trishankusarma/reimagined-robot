import React from 'react'
import CheckboxTable from './CheckBoxTableStudent';
import {useSelector} from "react-redux"

const columns = [
  {
    field: 'rollNo',
    headerName: 'Roll No./ID No.',
    width: 200,
    align: 'center',
    editable: false
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    editable: false
  }
];

const SectionTwo = () => {
  const notification = useSelector(state => state.notification)
  const [rows,rowSetup]=React.useState([])
  
  React.useEffect(()=>{
    let newList=[]
    for(let i =0;i<notification.studentList.length;i++){
      newList.push({
        _id:notification.studentList[i]._id,
        saveTo:"StudentCollege",
        id: i+1, 
        rollNo:notification.studentList[i].rollNo,
        name: notification.studentList[i].name,
        mobileNo:notification.studentList[i].mobileNo,
        email:notification.studentList[i].email
      })
    }

    rowSetup(newList)
  },[notification.studentList])
    return (
      <div style={{ height: '100%'}}>
        <CheckboxTable rows={rows} columns={columns} />
      </div>
    )
}

export default SectionTwo
