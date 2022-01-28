import React from 'react';
import { Typography } from '@material-ui/core';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  text-align: center;
  background-color: #333;
  color: #fff;
  font-weight: 600;
  padding: 1rem 0;
  margin-top: 2rem;
  margin-bottom: 0;
  border: 1px solid #fff;
`;

const CashbookHeading = ({text}) => {
  return (
    <Div>
      <Typography variant='h5'>RAMANUJAN ACADEMY</Typography>
      <Typography variant='p' paragraph>
        GORESWAR ROAD, BAIHATA CHARIALI, KAMRUP (Assam)
      </Typography>
      <Typography variant='h5'>Account Statement Summary</Typography>
      <Typography variant='p'>{text}</Typography>
    </Div>
  );
};

export default CashbookHeading;
