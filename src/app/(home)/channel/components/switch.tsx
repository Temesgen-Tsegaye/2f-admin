import * as React from 'react';
import Switch   from '@mui/material/Switch';
import  {toggleStatus} from "@/lib/channel/server_actions"

const label = { inputProps: { 'aria-label': 'Switch demo' } };
import { usePathname,useSearchParams,useRouter } from 'next/navigation';
export default function SwitchSatus({checked,id,setS,s}:{checked:boolean,id:number,s:boolean,setS:React.Dispatch<React.SetStateAction<boolean>>}) {

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router=useRouter()

  return (
    <div>
    
      <Switch {...label} checked={checked}  onChange={()=>toggleStatus(id,checked).then(()=>router.refresh())}  />
      
    </div>
  );
}
