"use client"
import Image from "next/image";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
export default async  function Home() {
 const router=useRouter()
 router.push('/dashboard')
  return (
   <>
   </>
  );
}
