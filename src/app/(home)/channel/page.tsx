import React, { Suspense } from "react";
import Container from "@/app/(home)/channel/components/Container";
import { Channel } from "./components/Container";
import { fetchChannels } from "@/lib/channel/fetch_channel";
import { Loading } from "@/component/global/table_loading";
import { Box } from "@mui/material";
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
  const data= await fetchChannels(searchParams,currentPage);
  
  
  return (
    <Box sx={{padding:'1rem',height:'90vh',width:'100%',overflowX:'scroll', overflowY:'scroll'}} >
      <Suspense key={query+currentPage}   fallback={<Loading/>}>
        <Container  channels={data.channels} count={data.count}   />
      </Suspense>
    </Box >
  );
}
