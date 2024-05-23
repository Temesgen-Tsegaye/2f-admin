import * as React from 'react';
import Switch   from '@mui/material/Switch';
import  {toggleStatus} from "@/lib/channel/server_actions"

const label = { inputProps: { 'aria-label': 'Switch demo' } };
import { usePathname,useSearchParams,useRouter } from 'next/navigation';
export default function SwitchSatus({checked,id}:{checked:boolean,id:number}) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  return (
    <div>
    
      <Switch {...label} checked={checked}  onChange={()=>toggleStatus(id,checked)}  />
      
    </div>
  );
}
