import React from 'react'
import { Paper, Typography,Box } from '@mui/material'
import Image from 'next/image'
export default function Card({name,count}:{name:string,count:number}) {
  return (
    <Paper sx={{width:'30%',padding:"1rem"}}>
      <Box sx={{display:"flex",justifyContent:'space-between'}}><Typography sx={{fontWeight:600}}>System {name}</Typography>  <Image style={{
        backgroundColor:"#181A41",
        padding:"0.4rem",
        borderRadius:"5px"
      }} width={50} height={50} alt='per' 
      src="/dashBoard.png"/> </Box>

      <Box sx={{marginTop:"2rem"}}>
    <Typography sx={{fontWeight:600}}>{count}</Typography>
      </Box>
    </Paper>
  )
}
