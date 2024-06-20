"use server"
import { prisma } from "@/config/prisma-client"
import { duration } from "@mui/material";
import { revalidatePath } from 'next/cache';
import { title } from "process";


export async function updateRole(id:number,title:string,description:string){
      
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

export async function createRole(name:string){

          console.log(name,'name')
          const created=await prisma.role.create({
             data:{
               name,
                



             }  
        }
          )

                 console.log(created)
          revalidatePath('/roles')


}


export async function deleteRole (id:number){
    
    const deleteUser = await prisma.content.delete({
        where: {
          id,
        },
      })


      revalidatePath('/roles')
}