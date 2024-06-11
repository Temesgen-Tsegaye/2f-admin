"use server"
import { prisma } from "@/config/prisma-client"
import { duration } from "@mui/material";
import { revalidatePath } from 'next/cache';
import { title } from "process";
export async function toggleStatus(id:number,status:boolean){
       
    const updatedChannel = await prisma.content.update({
        where: {
          id: id,
        },
        data: {
          status:!status,
        },
      });

    await  revalidatePath('/channel');
}

export async function updateContent(id:number,title:string,description:string){
      
    const updatedChannel = await prisma.content.update({
        where: {
          id: id,
        },
        data: {
          title:title,
          description:description
          
        },
      });
       
      revalidatePath('/channel');

}

export async function createContent(content:{
    videoUrl: string;
    title: string;
    duration: number;
    categoryId: number;
    description: string;
    coverImage: string;
    channelId: number;
    typeId: number;
}){


          const created=await prisma.content.create({
             data:{
                title:content.title,
                duration: Number(content.duration),
                categoryId:content.categoryId,
                channelId:content.channelId,
                typeId:content.typeId,
                description:content.description,
                coverImageUrl:content.coverImage,
                videoUrl:content.videoUrl,
                status:true,
                



             }  
        }
          )


          revalidatePath('/channel')


}


export async function deleteChannel (id:number){
    
    const deleteUser = await prisma.content.delete({
        where: {
          id,
        },
      })


      revalidatePath('/channel')
}