import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {useDispatch} from "react-redux"
import {selectPerson} from "../../../redux/actions"
export default function CheckboxTable({rows, columns}) {
  const dispatch = useDispatch()
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        onSelectionModelChange={(values)=>{
          dispatch(selectPerson(values,rows))
        }}
        disableSelectionOnClick
      />
    </div>
  )
}
