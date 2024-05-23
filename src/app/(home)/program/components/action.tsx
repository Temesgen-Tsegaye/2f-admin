"use client"
import React from 'react'
import { Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Content } from './Container';
import EditModal from './modal';
import { ToastContainer, toast } from 'react-toastify';

import { deleteChannel } from '@/lib/program/server_actions';
export default function Action( {id,title,description,status}:Partial<Content>) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      
    
      <EditModal  id={id} title={title} description={description} open={open} handelClose={handleClose} />
     <VisibilityIcon/> <CreateIcon onClick={()=>handleOpen()}/><DeleteIcon onClick={()=>deleteChannel(id || 0).then(()=>toast("deleted")).catch((e)=>toast.error('Error'))}/>
    </Box>
  )
}
