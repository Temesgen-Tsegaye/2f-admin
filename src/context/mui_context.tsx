import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';


import React from 'react'

export default function MuiContext({children}:{children:React.ReactNode}) {
  return (
    
      <AppRouterCacheProvider>
        {children}
      </AppRouterCacheProvider>
    
  )
}
