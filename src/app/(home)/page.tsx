"use client"
import Image from "next/image";

import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
export default  function Home() {
 const router=useRouter()
 router.push('/dashboard')
  return (
   <>
   </>
  );
}
