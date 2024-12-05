import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spiner=()=> {
  return (
    <div className='m 0 auto'>
    <Box sx={{ display: 'flex' }} >
      <CircularProgress />
    </Box>
    </div>
  );
}
export default Spiner;