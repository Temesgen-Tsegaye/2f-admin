import { PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()

import {buildAbility} from '../../utils/caslPrisma.js'
import { accessibleBy } from "@casl/prisma"
// import {auth} from '@/auth.js'


// const permission=[{action:'create',subject:'Channel',condition:{careatedBy:auth.user?.id}},{action:'read',subject:'Channel'},{action:'update',subject:'Channel'},{action:'delete',subject:'Channel'}]
export async function createChannel(io,socket){

 

      socket.on("addChannel", async (data) => {
        console.log(data,'dd')
                     console.log(buildAbility(data.role).can('create','Channel'))
               if(buildAbility(data.role).can('create','Channel')){
                await prisma.channel.create({
                    data:{
                        country:'UK',
                        createdAt:new Date(),
                        updatedAt:new Date(),
                        date:new Date(),
                        fans:0,
                        type:'TV',
                        status:true,
                        name:data.name
        
                      
        
        
                    }
                })
                 console.log(await prisma.channel.count(),'cou')
                 io.emit("addChannel", await prisma.channel.count())

               }else{
                io.emit('addChannel',-2)
               }
       
 
    })
    

 



}