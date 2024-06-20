import React, { Suspense } from "react";
import Container from "./components/Container";
import { Loading } from "@/component/global/table_loading";
import { Box } from "@mui/material";
import page from "../dashboard/page";
import { fetchRoles } from "@/lib/role/fetch_roles";
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    filter: string;
    sorting: string;
    globalFilter: string;
  };
}) {
             const data=await fetchRoles(searchParams||{})
  
  
  return (
    <Box sx={{padding:'1rem',height:'90vh',width:'100%',overflowX:'scroll', overflowY:'scroll'}} >
    <Container roles={data.roles} count={data.count} />
    </Box >
  );
}
