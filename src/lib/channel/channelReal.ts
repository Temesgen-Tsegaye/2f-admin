import { PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()

// const {buildAbility}=require('../../utils/caslPrisma.ts').
import  {buildAbility} from '../../utils/caslPrisma'

import { accessibleBy } from "@casl/prisma"
// import {auth} from '@/auth.js'


 export async function createChannel(io:any,socket:any){

 

      socket.on("addChannel", async (data:any) => {
        console.log(data,'dadadd')
              
                 io.emit("addChannel", await prisma.channel.count()+Number(data.name))

               
       
 
    })
    

 



}

