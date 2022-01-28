import React from 'react'
import Table from '../../shared/Table/index'
  
const columns = [
    { id: 'session', label: 'academic session', minWidth: 70 },
    { id: 'admissionFees', label: 'Admission fees', minWidth: 200 },
    {
      id: 'programFees',
      label: 'program fees',
      minWidth: 150,
      align: 'left'
    },
    {
      id: 'monthDuration',
      label: 'Duration',
      minWidth: 70,
      align: 'left'
    },
    {
      id:'Edit',
      label:'Edit',
      minWidth:50,
      align:'center'
    },
    {
      id:'Delete',
      label:'Delete',
      minWidth:50,
      align:'center'
    }
];

function Sessiontable(props) {

    console.log( props )
    return (
        <div>
            <Table columns={columns} pagination={true} {...props}/>
        </div>
    )
}

export default Sessiontable
