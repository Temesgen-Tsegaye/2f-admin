"use server"
import { prisma } from "@/config/prisma-client"
import { duration } from "@mui/material";
import { revalidatePath } from 'next/cache';
import { title } from "process";


export async function updateUser(id:number,title:string,description:string){
      
    const updatedChannel = await prisma.content.update({
        where: {
          id: id,
        },
        data: {
          title:title,
          description:description
          
        },
      });
       
      revalidatePath('/users');

}

export async function createUser(name:string,email:string,phonenumber:string){

          const created=await prisma.user.create({
             data:{
               password:'1',
               phonenumber,
               email,
               name,
               roleid:1,
               
                



             }  
        }
          )

          revalidatePath('/users')


}


export async function deleteUser (id:number){
    
    const deleteUser = await prisma.content.delete({
        where: {
          id,
        },
      })


      revalidatePath('/users')
}