import React, { Suspense } from 'react'
import { Box } from '@mui/material'
import Container from './component/container'
import {fetchCount,fetchPiChart,fetchProgramCount}  from "@/lib/dashboard/fetch"
export default async  function page() {


    const [counts, pieChartData,programCount] = await Promise.all([
        fetchCount(),
        fetchPiChart(),
        fetchProgramCount()
    ]);
  return (
    <Box  sx={{overflowY:'scroll',height:"90vh",padding:'2rem'}}>
        <Suspense fallback={<h1>Loading ...</h1>}>
        <Container  progCount={programCount} counts={counts} pie={pieChartData}/>

        </Suspense>
    </Box>
  )
}
