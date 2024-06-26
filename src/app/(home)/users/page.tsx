import React, { Suspense } from "react";
import Container from "./components/Container";
import { Loading } from "@/component/global/table_loading";
import { Box } from "@mui/material";
import page from "../dashboard/page";
import { fetchUsers } from "@/lib/users/fetch_users";
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
             const data=await fetchUsers(searchParams||{})
           throw new Error()
  
  return (
    <Box sx={{padding:'1rem',height:'90vh',width:'100%',overflowX:'scroll', overflowY:'scroll'}} >
    <Container users={data.users} count={data.count} />
    </Box >
  );
}
