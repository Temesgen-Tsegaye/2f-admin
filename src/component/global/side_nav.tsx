import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
export default function SideNav() {
  return (
    <Box  sx={{width:'15%',display:'flex',flexDirection:'column',gap:'2rem',bgcolor:'red',height:'100vh'}} >
      <Box sx={{display:'flex',alignItems:'center',paddingX:'2rem',alignSelf:'baseline'}}> <Image width={50} height={50}  style={{height:''}} alt='aa' src='/maple.svg'/>
      <Typography sx={{fontWeight:'bold'}}>T-movie</Typography></Box>

      <Box sx={{display:"flex",justifyContent:'center',flexDirection:'column',paddingX:'2rem',fontWeight:'bold'}}>
      <Link href="#"><Box sx={{display:'flex',gap:'1rem'}}> <Image src="/dashh.svg" width={20} height={20} style={{backgroundColor:'black'}}  alt='aa' color='black'/>Dash Board</Box> </Link>
      <Link href="#"><Box sx={{display:'flex',gap:'1rem'}}> <Image src="/channel.svg" width={20} height={20}   alt='aa' color='black'/>Channel</Box> </Link>
      <Link href="#"><Box sx={{display:'flex',gap:'1rem'}}> <Image src="/pro.svg" width={20} height={20}   alt='aa'/>Program</Box> </Link>


      </Box>
    </Box >
  )
}
