"use client"
import React from 'react'
import { Box } from '@mui/material'
import { usePathname } from 'next/navigation'
export default function Path() {
       const path=usePathname()
       let formattedPath = path.slice(1);
       formattedPath = formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);

  return (
    <Box>
      {formattedPath}
    </Box>
  )
}
