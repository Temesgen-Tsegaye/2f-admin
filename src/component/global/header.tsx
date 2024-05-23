import React from 'react'
import { Box } from '@mui/material'
import { FaBell } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Path from './path';
import Profile from './profile'
export default function Header() {
  return (
    <Box sx={{color:'white',  width:'85vw',height:'10vh',display:'flex',justifyContent:'space-between',alignItems:'center',paddingLeft:'4rem',paddingRight:"2rem",
   bgcolor:'#000222' }}>
      <Path/>
      <Box sx={{display:'flex',justifyContent:'space-between',width:'5vw'}}><FaBell/> <Profile/> </Box>
    </Box>
  )
}
