"use client"
import { AbilityContext } from '@/utils/can'
import { buildAbility } from '@/utils/caslPrisma' 
import { useSession } from 'next-auth/react'
import { subject } from '@casl/ability'

export  function AbilityContextProvider({ children,ability }:{children:React.ReactNode,ability:any}) {

      
  
 
  return (
    <AbilityContext.Provider value={ability}>

        {children}
    </AbilityContext.Provider>
  )
}