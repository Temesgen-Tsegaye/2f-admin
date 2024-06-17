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
    filter: string;
    sorting: string;
    globalFilter: string;
  };
}) {

  const data= await fetchChannels(searchParams||{});
  
  
  return (
    <Box sx={{padding:'1rem',height:'90vh',width:'100%',overflowX:'scroll', overflowY:'scroll'}} >
        <Container  channels={data.channels} count={data.count}   />
    </Box >
  );
}
