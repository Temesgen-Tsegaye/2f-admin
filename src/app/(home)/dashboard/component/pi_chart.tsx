"use client";

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Prisma } from "@prisma/client";
import { socket } from "@/utils/socket/socket-client";







export default function PiChart({pie}:{pie:(Prisma.PickEnumerable<Prisma.ContentGroupByOutputType, "categoryId"[]> & {
  _count: {
      id: number;
  };
})[]}) 



{

   const [realCounts,setRealCounts]=React.useState(0)

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
    <Paper
      elevation={3}
      sx={{ width: "60%", position: "relative", height: "20rem",display:"flex",justifyContent:"center",alignItems:"center" }}
    >
     
  
  <div className="text-3xl">{realCounts}</div>

      
    </Paper>
  );
}
