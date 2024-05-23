import { prisma } from "@/config/prisma-client";

export async function fetchChannels(query:string,currentPage:number=1){

    
let channels
let count

const offset = (currentPage - 1) * 5   //5 page size
console.log(offset,'off')
if(!query){
//pure pagination
 channels = await prisma.channel.findMany({
    skip: offset,
    take: 5,
  })
count=await prisma.channel.count()
}else{

    //pagination + query
    channels=await prisma.channel.findMany({
        skip: offset,
        take: 5,
        where:{
            name:{
                contains:query
            }
        }
    })
    await prisma.channel.count({
        where: {
          name: { contains: query },
        },
      });
}

    return {
    channels,
    count
    }

}








