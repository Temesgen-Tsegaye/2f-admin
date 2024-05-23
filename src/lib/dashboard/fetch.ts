"use server"
import { prisma } from "@/config/prisma-client";



export async function fetchCount(){
     
    const [userCount, programCount, channelCount] = await Promise.all([
        prisma.user.count(),
        prisma.content.count(),
        prisma.channel.count()
    ]);

return  {
    userCount,
    programCount,
    channelCount
}
}

export async function fetchPiChart(){

    const movieCountByCategory = await prisma.content.groupBy({
        by: ['categoryId'],
        _count: {
          id: true, 
        },
      });

      return movieCountByCategory
}

export async function fetchProgramCount(){
     return await prisma.content.count()

}
