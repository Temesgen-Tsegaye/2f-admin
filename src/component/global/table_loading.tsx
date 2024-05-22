import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
export  function Loading() {
  return (
    <Box >
  
      <Skeleton  sx={{width:'80%',height:'80%',bgcolor:'red',color:'green'}} variant="rectangular"  />
    </Box>
  );
}
