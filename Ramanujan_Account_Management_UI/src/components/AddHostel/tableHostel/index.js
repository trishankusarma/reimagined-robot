import React from 'react'
import Table from '../../shared/Table/index'

const columns = [
    { id: 'Select', label: 'Select', minWidth: 70 },
    { id: 'Name', label: 'Name', minWidth: 200 },
    {
      id: 'Address',
      label: 'Address',
      minWidth: 150,
      align: 'left'
    },
    {
      id: 'Capacity',
      label: 'Capacity',
      minWidth: 70,
      align: 'left'
    },
    {
      id: 'Occupancy_Allowed',
      label: 'For',
      minWidth: 50,
      align: 'left'
    },
    {
      id: 'noOfRooms',
      label: 'Rooms',
      minWidth: 50,
      align: 'left',
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

function Hosteltable(props) {
    return (
        <div>
            <Table columns={columns} pagination={true} {...props}/>
        </div>
    )
}

export default Hosteltable
