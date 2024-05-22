"use server"
import { prisma } from "@/config/prisma-client"
import { revalidatePath } from 'next/cache';
export async function toggleStatus(id:number,status:boolean){
       
    const updatedChannel = await prisma.channel.update({
        where: {
          id: id,
        },
        data: {
          status:!status,
        },
      });

      revalidatePath('/channel');
}