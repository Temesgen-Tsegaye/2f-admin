"use client"
import { AbilityContext } from '@/utils/can'
import { buildAbility } from '@/utils/caslPrisma.ts' 
import { useSession } from 'next-auth/react'
import { subject } from '@casl/ability'


export  function AbilityContextProvider({ children}:{children:React.ReactNode}) {
   const session=useSession()
      console.log(session,'useSession')
  const ability=buildAbility(session.data?.user)
  console.log(session.data?.user?.id,'createdBy')
   console.log(ability.rules,'abilitynews1')
   console.log(ability.can('create',subject('Channel',{hello:'tt'})),'abilitynews2')
   console.log(ability.can('create','Channel'),'abilitynews22')
      console.log(ability.can('delete',subject('Channel',{createdBy:Number(session.data?.user?.id)})),'abilitynews')
      console.log(ability.can('delete','Channel'),'abilitynews2')
 
  return (
    <AbilityContext.Provider value={ability}>

        {children}
    </AbilityContext.Provider>
  )
}