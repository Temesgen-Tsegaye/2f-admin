import React, { Suspense } from "react";
import App from "./components/table";
import { Channel } from "./components/table";
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
  const data= await fetchChannels(query,currentPage);
  console.log(data,'ddd')
  
  
  return (
    <div>
      <Suspense key={query+currentPage}   fallback={<Loading />}>
        <App  data={data}   />
      </Suspense>
    </div>
  );
}
