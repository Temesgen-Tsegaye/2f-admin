import { PrismaClient} from "@prisma/client"
const prisma=new PrismaClient()
export async function createChannel(io,socket){



      socket.on("addChannel", async (data) => {
      console.log(data,'da')

        await prisma.channel.create({
            data:{
                country:'UK',
                createdAt:new Date(),
                updatedAt:new Date(),
                date:new Date(),
                fans:0,
                type:'TV',
                status:true,
                name:data

              


            }
        })
         console.log(await prisma.channel.count(),'cou')
         io.emit("addChannel", await prisma.channel.count())
    })
    

 



}