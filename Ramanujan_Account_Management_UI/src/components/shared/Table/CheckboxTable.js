import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useDispatch} from "react-redux"
import {notificationSelect} from "../../../redux/actions"
export default function CheckboxTable({rows, columns}) {
  const dispatch = useDispatch()
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(values)=>{
          dispatch(notificationSelect(values,rows))
        }}
        disableSelectionOnClick
      />
    </div>
  )
}
