import React, { Suspense } from 'react'
import App from './table'
import { Channel } from './table';
import {fetchChannels} from "@/lib/channel/fetch_channel"
import  {Loading} from "@/component/global/table_loading"
  const data: Channel[] = [
    {
      id:1,
      name:"HBO",
      status:true
    },
    {
      id:1,
      name:"HBO",
      status:true
    },
    {
      id:1,
      name:"HBO",
      status:true
    }
    ];
    



export default  async  function Page() {
          const data=await fetchChannels()
  return (
    <div>
        <Suspense   fallback={<Loading/>}>
        <App  data={data}/>

        </Suspense>
    </div>
  )
}
