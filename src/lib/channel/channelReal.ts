import { PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()

// const {buildAbility}=require('../../utils/caslPrisma.ts').
import  {buildAbility} from '../../utils/caslPrisma'

import { accessibleBy } from "@casl/prisma"
// import {auth} from '@/auth.js'


 export async function createChannel(io:any,socket:any){

 

      socket.on("addChannel", async (data:any) => {
               if(buildAbility(data.role).can('create','Channel')){
                // await prisma.channel.create({
                //     data:{
                //         country:'UK',
                //         createdAt:new Date(),
                //         updatedAt:new Date(),
                //         date:new Date(),
                //         fans:0,
                //         type:'TV',
                //         status:true,
                //         name:data.name
        
                      
        
        
                //     }
                // })
                 io.emit("addChannel", await prisma.channel.count())

               }else{
                io.emit('addChannel',-2)
               }
       
 
    })
    

 



}

