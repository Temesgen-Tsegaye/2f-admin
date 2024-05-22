import { prisma } from "@/config/prisma-client";


export async function fetchChannels(){
    
    const channels=await prisma.channel.findMany()
    
    return channels

}