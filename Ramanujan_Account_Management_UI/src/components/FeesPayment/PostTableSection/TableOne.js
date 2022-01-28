import React from 'react';
import styled from 'styled-components';
import Table from '../../shared/Table';
import {Link} from "react-router-dom";
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

const colTablePrev = [
  { id: 'date', label: 'Payment Date', minWidth: 100, align: 'left' },
  { id: 'particular', label: 'Particular', minWidth: 300, align: 'left' },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100,
    align: 'left'
  },
  {
    id: 'printPrev',
    label: 'Print',
    minWidth: 50,
    align: 'left'
  },
  {
    id: 'downloadPrev',
    label: 'Download',
    minWidth: 50,
    align: 'left'
  }
];
function createPrev(
  date,
  particular,
  amount,
  printPrev,
  downloadPrev,
) {
  return {
    date,
    particular,
    amount,
    printPrev,
    downloadPrev
  };
}

// const rowTablePrev = [
//   createPrev(
//     '07-09-2002',
//     '3rd semester Fee',
//     '10000.00',
    
//   ),
// ]

export default function TableOne (props) {
  const [rows,setRows]=React.useState([])
  console.log(props?.data?.studentFeeInfo?._id,"Asd")
  console.log(JSON.parse(localStorage.getItem("user")).adminType.departmentName)
  const dispatch=useDispatch();
  React.useEffect(()=>{
    let data =[];
    
    if(props?.data?.previousPayment?.previousPayment?.length==rows.length){
      return         
    }else{
      for(let i = 0;i<props?.data?.previousPayment?.previousPayment?.length;i++){
          data.push(createPrev(
            props?.data?.previousPayment?.previousPayment[i]?.date,
            props?.data?.previousPayment?.previousPayment[i]?.particular, 
            props?.data?.previousPayment?.previousPayment[i]?.amount,
            <Link target="_blank" to={JSON.parse(localStorage.getItem("user")).adminType.departmentName=="Hostel"?`/feePaymentHostelSlip/${props?.data?.studentFeeInfo?._id}?prev=true&index=${i}`:`/fee-payment/reciept/${props?.data?.studentFeeInfo?._id}?prev=true&index=${i}`} >Print</Link>,
            <SButton onClick={async ()=>{

              const data =await axios().delete(`/fee/prev/${props?.data?.previousPayment?._id}/${props?.data?.previousPayment?.previousPayment[i]?._id}`)
              const result =props?.data?.previousPayment?.previousPayment.filter(data=>data._id!=props?.data?.previousPayment?.previousPayment[i]?._id)
              if(data.status==200){
                dispatch(DeletePrevPayment(result));
              }      
            }} >Delete</SButton>,
          ))
      }

      setRows(data);
    }
  },[props.data?.previousPayment?.previousPayment])
  return (
        <Table data={rows} columns={colTablePrev} pagination={false} />
  );
};

