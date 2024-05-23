"use client";

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { VictoryPie, VictoryLabel } from "victory";
import { Prisma } from "@prisma/client";




const colorLegend = [
  { name: "Recommended", color: "#8D1FB4" },
  { name: "Popular", color: "#008000" },
  { name: "Featured", color: "#1484E6" },
  { name: "Favorite", color: "#16C138" },
  { name: "Watch later", color: "#E10070" },
];

function convert(id:number){
      if(id==1){
        return  "Recommended"
      }else if (id==2){
        return "Popular"
      }else if (id==3){
      return  "Featured"
      }else if(id==4){
        return "Favorite"
      }else if(id==5){
        
        return "Watch later"
}}

export default function PiChart({pie}:{pie:(Prisma.PickEnumerable<Prisma.ContentGroupByOutputType, "categoryId"[]> & {
  _count: {
      id: number;
  };
})[]}) {
  const mappedData = pie.map((item) => {
    // Handle potential missing categoryId or non-numeric value
    const categoryName = convert(item.categoryId)
  
    return {
      ...item, 
      categoryName,
    };
  }).map(item => ({
    x: `Category ${item.categoryName}`, // Or you can map category IDs to their names if you have a mapping
    y: item._count.id
}));
  return (
    <Paper
      elevation={3}
      sx={{ width: "60%", position: "relative", height: "20rem",display:"flex",justifyContent:"center",alignItems:"center" }}
    >
      <Box
        sx={{
          borderRadius: "10px",
          bgcolor: "black",
          padding: "1rem",
          width: "40%",
          fontWeight: 600,
          position: "absolute",
          top: "-1.7rem",
          left:0,
          color: "white",
          textAlign: "center",
        }}
      >
        Program on Category
      </Box>
      <Box sx={{display:"flex",justifyContent:"center",alignItems:'center', width:"100%",height:"100%"}}>
      <Box>
        <Box style={{ width: "60%", paddingRight: "20px", display: "flex",position:"relative" }}>
      
          <VictoryPie
            data={mappedData}
            colorScale={colorLegend.map(item => item.color)}
            labels={({ datum }) => ""}
            labelComponent={<></>}
            padAngle={5}
            innerRadius={150}
            width={500}
            height={500}
           

          >

          </VictoryPie>
        </Box>
      </Box>
      <Box style={{ width: "50%" }}>
  {colorLegend.map((item, index) => (
    <Box
      key={index}
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "5px",
      }}
    >
      <Box
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: item.color,
          marginRight: "5px",
        }}
      ></Box>
      <Typography variant="body2" style={{ marginRight: "5px" }}>{item.name}</Typography>
      <Typography variant="body2">{mappedData.find(data => data.x === `Category ${item.name}`)?.y || 0}</Typography>
    </Box>
  ))}
</Box>
      {/* <Box style={{ width: "50%" }}>
        {colorLegend.map((item, index) => (
          <Box
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <Box
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: item.color,
                marginRight: "5px",
              }}
            ></Box>
            <span>{item.name}</span>
          </Box>
        ))}
      </Box> */}
      </Box>
    

      
    </Paper>
  );
}
