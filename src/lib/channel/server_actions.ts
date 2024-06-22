"use server"
import { prisma } from "@/config/prisma-client"
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { io } from "@/utils/socket/io.js";
import { Console } from "console";
import {auth}  from '@/auth'
export async function toggleStatus(id:number,status:boolean){
       
    const updatedChannel = await prisma.channel.update({
        where: {
          id: id,
        },
        data: {
          status:!status,
        },
      });

    await  revalidatePath('/channel');
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
                name:name,
                country:'UK',
                createdAt:new Date(),
                updatedAt:new Date(),
                date:new Date(),
                fans:0,
                type:'TV',
                status:true,
                

              
             }  
        }
          )
       

          revalidatePath('/channel')


}


export async function deleteChannel (id:number){
  const session=  await auth()
  console.log(session?.user?.id,'sessionn',id)
    const deleteUser = await prisma.channel.delete({
        where: {
          id,
        },
      })


      revalidatePath('/channel')
}