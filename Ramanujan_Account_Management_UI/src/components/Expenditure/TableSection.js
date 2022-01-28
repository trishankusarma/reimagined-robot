import React,{ useRef, useState } from 'react';
import Table from '../shared/Table'
import Search from '../shared/search'
import styled from 'styled-components'
import {useDispatch,useSelector} from "react-redux"
import { expenditureDelete, expenditureValueSetup,expenditureEdit, getAllExpenditure } from '../../redux/actions'
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
  { id: 'particulars', label: 'Particulars', minWidth: 450 },
  { id: 'amount', label: 'Amount', minWidth: 150 },
  {
    id: 'remarks',
    label: 'Remarks',
    minWidth: 200,
    align: 'left'
  },
  {
    id:"paymentMode",
    label:"Payment Mode",
    minWidth:50,
    align:"left"
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
  },
];

function createData(
  date,
    particulars,
    amount,
    remarks,
    paymentMode,
    deteleRow,
    edit,
) {
  return {
    date,
    particulars,
    amount,
    remarks,
    paymentMode,
    deteleRow,
    edit,
    
  };
}



const TableSection = ( ) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth) 
  const admin = useSelector(state => state.admin) 
  const  [rows,setRows]=React.useState([]);
 
  const [ searchExpenditures, setSearchExpenditures ] = useState(null)
  const searchRef = useRef()

  const deleteExpenditure=(id,department)=>{
      dispatch(expenditureDelete(department,id))
  }
  const editExpenditure=(data,department)=>{

    dispatch(expenditureValueSetup(data,department))
  }

  const handleFilter = (e)=>{
      
    if (searchRef.current.value !== "") {
      
        RegExp.quote = function allowSpecialSymbols(str) {
            return str.replace(/([.?*+^$[\]\\(){}|-])/g, "");
        };

        const reg = new RegExp(RegExp.quote(`${e.target.value}`), "gi");

        setSearchExpenditures(

            rows.filter((item)=>item.particulars.match(reg) || item.remarks.match(reg) || item.paymentMode.match(reg) )
        )
    } else {
        setSearchExpenditures(null)
    }
  }

  React.useEffect(() => {
    let data =[]
    if( !admin.expenditures || admin.expenditures.length==rows.length){
       return 
      }
      else {
    for(let i = 0 ;i <admin.expenditures.length;i++){
        data.push(createData(
          admin.expenditures[i].date.split("T")[0],
          admin.expenditures[i].particulars,
          (-1)*parseInt(admin.expenditures[i].amount),
          admin.expenditures[i].remarks,
          admin.expenditures[i].paymentMode,
          <SButton 
          
              disabled={!auth?.user?.isSuperAdmin}
                onClick={()=>{
                deleteExpenditure(admin?.expenditures[i]._id,auth.user.adminType._id)
              }
          } >Delete</SButton>,
          <SButton
              
              disabled={!auth?.user?.isSuperAdmin}
              onClick={()=>{
                editExpenditure(admin?.expenditures[i],auth.user.adminType._id)
              }
          }
          >Edit</SButton>,
        ))
    }
    setRows(data);
  }
  },[admin?.expenditures])
console.log(admin?.expenditures[0])
    return (
      <div style={{ width: '96%', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            width: '96%',
            justifyContent: 'flex-end',
            margin: '0 auto',
            marginBottom: '1rem'
          }}
        >
            <Search placeholder={"Search here"} searchRef={searchRef} handleChange={handleFilter}/>
        </div>
        <Table data={ searchExpenditures ? searchExpenditures : rows} columns={columns} pagination={true} />
        *Amount tend to be negative for expenses and +ve for income
      </div>
    );
}

export default TableSection
