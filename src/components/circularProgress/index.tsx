import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './circularProgress.css';

export default function CircularLoading() {
  return (
    <div className='loading-container'>
        <Box sx={{ display: 'flex' }}>
            <CircularProgress color='inherit'/>
        </Box>
    </div>
  );
}