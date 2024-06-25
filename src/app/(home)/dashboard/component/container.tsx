"use client"
import React, { useState } from 'react'
import { Box, Paper } from '@mui/material'
import Card from './card'
import PiChart from './pi_chart'
import LineChart from './line_chart'
import { Prisma } from '@prisma/client'
import { socket } from '@/utils/socket/socket-client'
export default function Container({counts,pie,progCount}:{progCount:number, counts:{
    userCount: number;
    programCount: number;
    channelCount: number;
},pie:(Prisma.PickEnumerable<Prisma.ContentGroupByOutputType, "categoryId"[]> & {
    _count: {
        id: number;
    };
})[]})
{

const [realCounts,setRealCounts]=useState(counts.channelCount)


React.useEffect(() => {
  const handleAddChannel = (count: number) => {
    setRealCounts(count);
  };
  socket.on('addChannel', handleAddChannel);

  return () => {
    socket.off('addChannel', handleAddChannel);
  };
}, []);



  return (
    <Paper sx={{height:"300vh",padding:"3rem",display:'flex',flexDirection:"column",gap:'3rem'}} elevation={3}>
<Box sx={{display:"flex",justifyContent:'space-between'}}>
     {[
        {name:"user",count:counts.userCount},
        {name:"Program",count:counts.programCount},
        {name:"Channel",count:realCounts},

     ].map((item)=><Card key={item.name} name={item.name} count={item.count}/>)}
</Box>
<PiChart pie={pie}/>
<LineChart count={progCount}/>

    </Paper>
  )
}
