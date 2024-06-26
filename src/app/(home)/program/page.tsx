import React, { Suspense } from "react";
import Container from "@/app/(home)/program/components/Container";
import { fetchPrograms } from "@/lib/program/fetch_rograms";
import { Box } from "@mui/material";
import { fetchChannels } from "@/lib/channel/fetch_channel";
import { Loading } from "@/component/global/table_loading";
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
  const data= await fetchPrograms(query,currentPage);
  const channelData=await fetchChannels("",1)
  
  return (
    <Box sx={{padding:'1rem',height:'100%'}} >
      <Suspense key={query+currentPage}   fallback={<Loading/>}>
        {/* <Container channel={channelData.channels} content={data.content} count={data.count}   /> */}
      </Suspense>
    </Box >
  );
}
