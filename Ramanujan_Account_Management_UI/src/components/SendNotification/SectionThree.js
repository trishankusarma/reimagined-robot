import React, {useState} from 'react';
import CheckboxTable from '../shared/Table/CheckboxTable';
import { useSelector } from 'react-redux';

const columns = [
  {
    field: 'idNo',
    headerName: 'ID No.',
    width: 150,
    align: 'center',
    editable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 240,
    editable: false
  }
];

const SectionThree = () => {

  const notification = useSelector(state => state.notification)
  const [rows,rowSetup]=useState([])

  React.useEffect(()=>{
    let newList=[]
    for(let i =0;i<notification.stuffList.length;i++){

      newList.push({
        _id:notification.stuffList[i]._id,
        saveTo:"Stuff",
        id: i+1, 
        idNo:notification.stuffList[i].idNo,
        name: notification.stuffList[i].name,
        mobileNo:notification.stuffList[i].mobileNo,
        email:notification.stuffList[i].email
      })
    }

    rowSetup(newList)
  },[notification.stuffList])

  return (
    <>
      <CheckboxTable rows={rows} columns={columns} />
    </>
  );
};

export default SectionThree;
