"use client"
import React from 'react'
import { Box } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Channel } from './table';
import EditModal from './modal';
import { deleteChannel } from '@/lib/channel/server_actions';
export default function Action( {id,name,status}:Channel) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <EditModal  id={id} name={name} open={open} handelClose={handleClose} />
     <VisibilityIcon/> <CreateIcon onClick={()=>handleOpen()}/><DeleteIcon onClick={()=>deleteChannel(id)}/>
    </Box>
  )
}
