import React from 'react';
import styled from 'styled-components';
import Table from '../../shared/Table';
import {useHistory,Link} from "react-router-dom";
import axios from '../../../helpers/axios';
import {useDispatch} from "react-redux"
import {DeleteOtherPayment,DeletePrevPayment} from "../../../redux/actions"

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

const colTableOther = [
  { id: 'date', label: 'Payment Date', minWidth: 100, align: 'left' },
  { id: 'particular', label: 'Particular', minWidth: 300, align: 'left' },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'printOther',
    label: 'Print',
    minWidth: 50,
    align: 'left'
  },
  {
    id: 'downloadOther',
    label: 'Download',
    minWidth: 50,
    align: 'left'
  }
];
function createOther(date, particular, amount, printOther,downloadOther) {
  return {
    date,
    particular,
    amount,
    printOther,
    downloadOther
  };
}



export default function TableTwo(props) {
  const [rows,setRows]=React.useState([])
  const dispatch = useDispatch()
  React.useEffect(()=>{
    let data =[];
    if(props?.data?.previousPayment?.otherPayment?.length==rows.length){
      return         
    }else{
      for(let i = 0;i<props?.data?.previousPayment?.otherPayment?.length;i++){
          data.push(createOther(
            props?.data?.previousPayment?.otherPayment[i]?.date,
            props?.data?.previousPayment?.otherPayment[i]?.particular,
            props?.data?.previousPayment?.otherPayment[i]?.amount,
            <Link target="_blank" to={`/OtherPayment/reciept/${props?.data?.studentFeeInfo?._id}?other=true&index=${i}`}>Print</Link>,
            <SButton onClick={()=>{
              axios().delete(`/fee/other/${props?.data?.previousPayment?._id}/${props?.data?.previousPayment?.otherPayment[i]?._id}`)
              const result =props?.data?.previousPayment?.otherPayment.filter(data=>data._id!=props?.data?.previousPayment?.otherPayment[i]?._id)
              if(data.status==200){
                dispatch(DeleteOtherPayment(result));
              } 
            }}
            >Delete </SButton>
          ))
      }
      setRows(data);
    }

  },[props.data])
  return (
    <Table data={rows} columns={colTableOther} pagination={false} />
  );
}
