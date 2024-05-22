import React from 'react'
import App from './table'
import { Channel } from './table';
import {fetchChannels} from "@/lib/channel/fetch_channel"
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
        
        <App  data={data}/>
    </div>
  )
}
