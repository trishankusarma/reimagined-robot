import React from 'react'
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

function Copyright({goTop}) {
  return (
    <Typography variant='body2' align='center'>
      {'Copyright © '}
      {new Date().getFullYear()} RAMANUJAN ACADEMY
      <button
        onClick={goTop}
        style={{
          float: 'right',
          marginRight: '2rem',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        <KeyboardArrowUpIcon
          style={{
            backgroundColor: 'rgba(255, 255, 255, .7)',
            borderRadius: '50rem'
          }}
        />
      </button>
    </Typography>
  );
}

const Footer = () => {
  const goTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
    return (
      <div style={{
  bottom: '0'
}}>
       <Box style={{backgroundColor: 'rgb(0, 0, 0, .7)', color: '#fff', padding: '.8rem 0', }} mt={8}>
        <Copyright goTop={goTop} />
      </Box>

      </div>
    );
}

export default Footer
