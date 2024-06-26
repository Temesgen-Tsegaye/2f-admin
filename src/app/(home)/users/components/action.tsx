"use client"
import React from 'react'
import { Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
// import { Content } from './Container';
import UpdateRole from './update';
import { ToastContainer, toast } from 'react-toastify';

import { deleteChannel } from '@/lib/program/server_actions';
import { FaEdit } from 'react-icons/fa';
export default function Action( {user_id,role_id}:{user_id:number,role_id:number}) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      
    
      <UpdateRole  user_id={user_id} role_id={role_id}   open={open} handelClose={handleClose} />
     <FaEdit className='text-2xl text-blue-500' onClick={()=>handleOpen()}/>
    </Box>
  )
}
