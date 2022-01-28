import React,{useRef} from 'react';
import Table from '../shared/Table';
import Search from '../shared/search';
import styled from 'styled-components'
import {useDispatch,useSelector} from "react-redux";
import {eventDelete,eventEdit,getAllEvent,eventValueSetup} from "../../redux/actions"
import Grid from '@material-ui/core/Grid';
import { TextField, Button } from '@material-ui/core';
import ReactToPrint from 'react-to-print';

const SButton = styled.button`
  background: transparent;
  border: none;
  color: #428bca;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    color: #2a6496;
  }
`;

const columns = [
  {
    id: 'date',
    label: 'Date',
    minWidth: 150,
    align: 'left'
  },
  {
    id: 'organizer',
    label: 'Organizer',
    minWidth: 150,
    align: 'left'
  },
  { id: 'event', label: 'Event', minWidth: 150 },
 
  { id: 'budgetAllocated', label: 'Budget Allocated', minWidth: 250 },
  {
    id: 'budgetUsed',
    label: 'Budget Used',
    minWidth: 200,
    align: 'left'
  },
  {
    id: 'remarks',
    label: 'Remarks',
    minWidth: 200,
    align: 'left'
  },
  {
    id: 'deteleRow',
    label: 'Detele',
    minWidth: 50,
    align: 'left'
  },
  {
    id: 'edit',
    label: 'Edit',
    minWidth: 50,
    align: 'left'
  }
];

function createData(date,organizer,event, budgetAllocated, budgetUsed, remarks, deteleRow, edit) {
  return {
    date,
    organizer,
    event,
    budgetAllocated,
    budgetUsed,
    remarks,
    deteleRow,
    edit
  };
}



const SectionTwo = () => {
  const [rows,setRows]=React.useState([])
  const [filterRows,setFilterRows]=React.useState(null)

  const dispatch = useDispatch()  
  const componentRef = useRef();

  const searchRef = useRef()

  const auth = useSelector(state => state.auth) 
  const admin = useSelector(state => state.admin) 
  const deleteExpenditure=(id,department)=>{
    dispatch(eventDelete(department,id))
}

const editExpenditure=(data,department)=>{

  dispatch(eventValueSetup(data,department))
}

React.useEffect(() => {
console.log(admin.events,"admin.events")
  let data =[]
  if(admin.events.length==rows.length){
     return 
    }
    else {
  for(let i = 0 ;i <admin.events.length;i++){
      data.push(createData(
        admin.events[i].date.split("T")[0],
        admin.events[i].organizer,
        admin.events[i].event,
        admin.events[i].budgetAllocated,
        admin.events[i].budgetUsed,
        admin.events[i].remarks,
        <SButton 
        
        disabled={!auth?.user?.isSuperAdmin}
        onClick={()=>{
          deleteExpenditure(admin.events[i]._id,auth.user.adminType._id)
        }
        } >Delete</SButton>,
        <SButton

        disabled={!auth?.user?.isSuperAdmin}
        onClick={()=>{
          editExpenditure(admin.events[i],auth.user.adminType._id)
        }
        }
        >Edit</SButton>,
      ))
  }
  setRows(data);
}
},[admin.events])

const handleFilter = (e)=>{
      
  if (searchRef.current.value !== "") {
    
      RegExp.quote = function allowSpecialSymbols(str) {
          return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
      };

      const reg = new RegExp(RegExp.quote(`${e.target.value}`), "gi");

      setFilterRows(

          rows.filter((item)=>item.date===e.target.value || item.organizer.match(reg) || item.event.match(reg) || item.remarks.match(reg)  )
      )
  } else {
      setFilterRows(null)
  }
}

  return (
    <div>
      <div
        style={{
          display: 'flex',
          width: '96%',
          justifyContent: 'flex-end',
          margin: '0 auto',
          marginBottom: '1rem'
        }}
      >
        <Search placeholder={"Search.."} handleChange={handleFilter} searchRef={searchRef} />
      </div>
      <div  ref={componentRef} style={{width:'96%', margin:'auto'}}>
      <Table data={ filterRows ? filterRows : rows} columns={columns} pagination={true} />
      </div>
      <div style={{margin:'1% 2%'}}>
      <ReactToPrint
            trigger={() =><Button variant="contained" style={{backgroundColor:"#f5a142"}}>Print</Button>}
            content={() => componentRef.current}
        />             
       </div>
    </div>
  );
};

export default SectionTwo;
