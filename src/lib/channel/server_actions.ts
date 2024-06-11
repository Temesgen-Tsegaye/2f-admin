"use server"
import { prisma } from "@/config/prisma-client"
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
export async function toggleStatus(id:number,status:boolean){
       
    const updatedChannel = await prisma.channel.update({
        where: {
          id: id,
        },
        data: {
          status:!status,
        },
      });

    await  revalidatePath('/channel?page=2');
}

export async function updateName(id:number,name:string){
      
    const updatedChannel = await prisma.channel.update({
        where: {
          id: id,
        },
        data: {
          name:name,
        },
      });
       
      revalidatePath('/channel');

}

export async function createChannel(name:string){

          const created=await prisma.channel.create({
             data:{
                name:name
             }  
        }
          )


          revalidatePath('/channel')


}


export async function deleteChannel (id:number){
    
    const deleteUser = await prisma.channel.delete({
        where: {
          id,
        },
      })


      revalidatePath('/channel')
}