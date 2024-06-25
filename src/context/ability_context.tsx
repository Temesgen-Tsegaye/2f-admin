"use client"
import { AbilityContext } from '@/utils/can'
import { buildAbility } from '@/utils/caslPrisma.ts' 
import { useSession } from 'next-auth/react'
import { subject } from '@casl/ability'


export  function AbilityContextProvider({ children}:{children:React.ReactNode}) {
   const session=useSession()
  const ability=buildAbility(session.data?.user)
  //  console.log(ability.can('create',subject('Channel',{hello:'tt'})),'abilitynews2')
  //  console.log(ability.can('create','Channel'),'abilitynews22')
      // console.log(ability.rules,'rule')
      // console.log(ability.can('delete',subject('Channel',{createdby:Number(session.data?.user.id)})),'abilitynewss')
  //  console.log(ability.can('read','Channel','name'),'') 
  return (
    <AbilityContext.Provider value={ability}>

        {children}
    </AbilityContext.Provider>
  )
}