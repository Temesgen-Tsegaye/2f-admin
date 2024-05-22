import React, { Suspense } from "react";
import App from "./components/table";
import { Channel } from "./components/table";
import { fetchChannels } from "@/lib/channel/fetch_channel";
import { Loading } from "@/component/global/table_loading";
const data: Channel[] = [
  {
    id: 1,
    name: "HBO",
    status: true,
  },
  {
    id: 1,
    name: "HBO",
    status: true,
  },
  {
    id: 1,
    name: "HBO",
    status: true,
  },
];

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
  
  return (
    <div>
      <Suspense   key={query + currentPage} fallback={<Loading />}>
        <App  data={data.channels}  length={data.count} />
      </Suspense>
    </div>
  );
}
