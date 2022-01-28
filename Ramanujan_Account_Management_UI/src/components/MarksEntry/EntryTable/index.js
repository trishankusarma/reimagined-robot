import React from 'react'
import Table from '../../shared/Table/index'

function Hosteltable(props) {

  const columns = [
    { id: 'name', label: 'Name', minWidth: 200 },
    {
      id: 'rollNo',
      label: 'Roll No',
      minWidth: 150,
      align: 'left'
    }
  ];

    return (
        <div>
            <Table columns={ [ ...columns , ...props?.subjects] } pagination={true} subjects={true} {...props}/>
        </div>
    )
}

export default Hosteltable
