import React from 'react'
import { Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
export default function Action() {
  return (
    <Box>
     <VisibilityIcon/> <CreateIcon/><DeleteIcon/>
    </Box>
  )
}
