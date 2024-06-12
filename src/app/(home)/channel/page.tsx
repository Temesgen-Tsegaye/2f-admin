import React, { Suspense } from "react";
import Container from "@/app/(home)/channel/components/Container";
import { Channel } from "./components/Container";
import { fetchChannels } from "@/lib/channel/fetch_channel";
import { Loading } from "@/component/global/table_loading";
import { Box } from "@mui/material";
import page from "../dashboard/page";
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 5;
  const data= await fetchChannels(searchParams,searchParams?.page)
  
  
  return (
    <Box sx={{padding:'1rem',height:'90vh',width:'100%',overflowX:'scroll', overflowY:'scroll'}} >
      <Suspense key={query+currentPage}   fallback={<Loading/>}>
        <Container  channels={data.channels} count={data.count}   />
      </Suspense>
    </Box >
  );
}
