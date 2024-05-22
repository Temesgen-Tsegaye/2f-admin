import React from 'react'
import { Box } from '@mui/material'
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
export default function Header() {
  return (
    <Box sx={{color:'white',  width:'85vw',height:'10vh',display:'flex',justifyContent:'space-between',alignItems:'center',paddingLeft:'4rem',
   bgcolor:'#000222' }}>
      <Box>Dash Board</Box>
      <Box sx={{display:'flex',justifyContent:'space-between',width:'5vw'}}><FaBell/> <CgProfile/></Box>
    </Box>
  )
}
