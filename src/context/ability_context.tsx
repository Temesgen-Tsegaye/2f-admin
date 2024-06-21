"use client"
import { AbilityContext } from '@/utils/can'
import { buildAbility } from '@/utils/caslPrisma' 
import { useSession } from 'next-auth/react'

export  function AbilityContextProvider({ children }:{children:React.ReactNode}) {

       const session=useSession()
  const ability=buildAbility(session.data?.user?.role)
  console.log(session.data?.user,'role')
  return (
    <AbilityContext.Provider value={ability}>

        {children}
    </AbilityContext.Provider>
  )
}