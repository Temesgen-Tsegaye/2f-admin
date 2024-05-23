import { prisma } from "@/config/prisma-client";
export async function fetchPrograms(query:string,currentPage:number=1){

    
let content
let count

const offset = (currentPage - 1) * 5   //5 page size
console.log(offset,'off')
if(!query){
//pure pagination
 content = await prisma.content.findMany({
    skip: offset,
    take: 5,
  })
count=await prisma.content.count()
}else{

    //pagination + query
    content=await prisma.content.findMany({
        skip: offset,
        take: 5,
        where:{
            title:{
                contains:query
            }
        }
    })
    await prisma.content.count({
        where: {
          title:{ contains: query },
        },
      });
}

    return {
    content,
    count
    }

}

