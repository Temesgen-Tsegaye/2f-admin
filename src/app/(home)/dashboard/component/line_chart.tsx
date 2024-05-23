"use client";

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

// const data = {
//   Cats: [
//     { x: 1, y: 35 },
//     { x: 2, y: 40 },
//     { x: 3, y: 45 },
//   ],
//   Dogs: [
//     { x: 1, y: 20 },
//     { x: 2, y: 25 },
//     { x: 3, y: 30 },
//   ],
//   Birds: [
//     { x: 1, y: 55 },
//     { x: 2, y: 60 },
//     { x: 3, y: 65 },
//   ],
// };

const colorLegend = [
  { name: "Cats", color: "tomato" },
  { name: "Dogs", color: "orange" },
  { name: "Birds", color: "gold" },
];

export default function LineChart({count}:{count:number}) {
  return (
    <Paper
      elevation={3}
      sx={{
        width: "80%",
        position: "relative",
        height: "25rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
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
          left: 0,
          color: "white",
          textAlign: "center",
        }}
      >
        Program with Type
      </Box>
      <Box
        sx={{
          borderRadius: "10px",
          bgcolor: "black",
          padding: "0.5rem",
          width: "20%",
          fontWeight: 400,
          position: "absolute",
          top: "2rem",
          right: "2rem",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box>{count}</Box>
        <Box>Overall Program</Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: "70%",
            paddingRight: "20px",
            display: "flex",
            position: "relative",
          }}
        >
          {/* <VictoryChart domainPadding={20} width={600} height={400}>
            <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
            <VictoryAxis tickFormat={(x) => `Day ${x}`} />
            {Object.keys(data).map((key, index) => (
              <VictoryLine
                key={key}
                data={data[key]}
                style={{
                  data: { stroke: colorLegend[index].color },
                }}
              />
            ))}
          </VictoryChart> */}
        </Box>
        {/* <Box sx={{ width: "30%" }}>
          {colorLegend.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <Box
                sx={{
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
