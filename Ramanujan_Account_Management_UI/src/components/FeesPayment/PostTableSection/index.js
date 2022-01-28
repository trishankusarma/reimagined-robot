import React from 'react';
import { makeStyles,Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TableOne from './TableOne'
import TableTwo from './TableTwo';
import {useSelector} from "react-redux";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '70vw',
    marginLeft: '2vw'
  },
  tableC: {
    marginTop: '4rem',
    marginBottom: '2rem'
  },
  submitBtn: {
    textDecoration: 'none',
    padding: '.7rem 1.5rem',
    background: 'blue',
    color: '#fff',
    borderRadius: '7px'
  }
}));

const PostTableSection = () => {
  const classes = useStyles();
  const cash = useSelector(state => state.cash)
  const auth = useSelector(state => state.auth)
  return (
    <div className={classes.root}>
{console.log(cash?.studentFeeInfo,"cash?.studentFeeInfo")}
      <div style={{border:'1px solid black', padding:'1rem', margin:'2rem 0 0 0'}}>
      <Grid container spacing={5}>
                <Grid lg={2} md={2} item>date = {cash?.studentFeeInfo?.createdAt?.split('T')[0]?cash?.studentFeeInfo?.createdAt?.split('T')[0]:cash?.studentFeeInfo?.Admission_Date?.split('T')[0]}</Grid>
                <Grid lg={2} md={2} item> amount = {cash?.studentFeeInfo?.paidAmountPermatent?cash?.studentFeeInfo?.paidAmountPermatent:cash?.studentFeeInfo?.admissionPaidPermatent}</Grid>
                <Grid lg={2} md={4} item>Admission status</Grid>
                <Grid lg={2} md={2} item><Link target="_blank" to={JSON.parse(localStorage.getItem("user")).adminType.departmentName=="Hostel"?`/HostelList/reciept/${cash?.studentFeeInfo?._id}`:`/StudentList/reciept/${cash?.studentFeeInfo?._id}`}>Print</Link></Grid>
                {/* <Grid lg={2} md={2} item><SButton>Delete</SButton></Grid> */}
        </Grid>
      </div>

      <div className={classes.tableC}>
        <Typography variant='h5'>Previous Payments</Typography>
        <TableOne data ={cash} />
      </div>
      <div className={classes.tableC}>
        <Typography variant='h5'>Other Payments</Typography>
        <TableTwo  data ={cash}/>
      </div>
      
   {cash?.studentFeeInfo?<Link className={classes.submitBtn} to={`/OtherPayment?rollNo=${auth?.user?.adminType?.departmentName=="Hostel"?cash?.studentFeeInfo?.student?.admissionNo:cash?.studentFeeInfo?.admissionNo}`} >
        Add New Payment
      </Link>:null}
    </div>
  );
};

export default PostTableSection;
