import { PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()

const {buildAbility}=require('../../utils/caslPrisma.cts')
console.log(buildAbility,'abili')
import { accessibleBy } from "@casl/prisma"
// import {auth} from '@/auth.js'


 async function createChannel(io:any,socket:any){

 

      socket.on("addChannel", async (data:any) => {
        console.log(data,'dd')
                     console.log(buildAbility(data.role).can('create','Channel'))
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
                 console.log(await prisma.channel.count(),'cou')
                 io.emit("addChannel", await prisma.channel.count())

               }else{
                io.emit('addChannel',-2)
               }
       
 
    })
    

 



}

module.exports=createChannel