"use client"
import React from 'react'
import { Box, Typography,Paper } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { MdDashboard } from "react-icons/md";
export default function SideNav() {
       const [selected,setSeected]=useState("dashboard")
  return (
    <Paper elevation={3}  sx={{width:'20vw',display:'flex',flexDirection:'column',gap:'1rem',height:'100vh'}} >
      <Paper elevation={3} sx={{display:'flex', gap:"1rem",alignItems:'center',paddingX:'2rem', paddingY:"0.5rem",alignSelf:'baseline',width:'100%'}}> <Image width={50} height={50}  style={{height:''}} alt='aa' src='/maple.svg'/>
      <Typography sx={{fontWeight:'bold'}}>T-movie</Typography></Paper>

      <Box sx={{display:"flex",justifyContent:'center',flexDirection:'column',fontWeight:'bold',gap:"2rem"}}>
      <Link onClick={()=>setSeected("dashboard")} href="/dashboard"><Box sx={{padding:"1rem",bgcolor:`${selected=="dashboard"?"#181A41":"white"}`,color:`${selected=="dashboard"?"white":"#181A41"}`,display:'flex',gap:'1rem'}}> <MdDashboard style={{width:"20px",height:"20px"}} /> Dash Board</Box> </Link>
      <Link onClick={()=>setSeected("cha")} href="/channel"><Box sx={{padding:"1rem",bgcolor:`${selected=="cha"?"#181A41":"white"}`,color:`${selected=="cha"?"white":"#181A41"}`,display:'flex',gap:'1rem'}}> <Image src="/channel.svg" width={20} height={20}   alt='aa' />Channel</Box> </Link>
      <Link onClick={()=>setSeected("pro")} href="/program"><Box sx={{padding:"1rem",bgcolor:`${selected=="pro"?"#181A41":"white"}`,color:`${selected=="pro"?"white":"#181A41"}`,display:'flex',gap:'1rem'}}> <Image src="/pro.svg" width={20} height={20}   alt='aa'/>Program</Box> </Link>
      <Link onClick={()=>setSeected("use")} href="/users"><Box sx={{padding:"1rem",bgcolor:`${selected=="use"?"#181A41":"white"}`,color:`${selected=="use"?"white":"#181A41"}`,display:'flex',gap:'1rem'}}> <Image src="/pro.svg" width={20} height={20}   alt='aa'/>Users</Box> </Link>
      <Link onClick={()=>setSeected("rol")} href="/roles"><Box sx={{padding:"1rem",bgcolor:`${selected=="rol"?"#181A41":"white"}`,color:`${selected=="rol"?"white":"#181A41"}`,display:'flex',gap:'1rem'}}> <Image src="/pro.svg" width={20} height={20}   alt='aa'/>Roles</Box> </Link>


      </Box>
    </Paper >
  )
}
