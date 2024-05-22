import * as React from 'react';
import Switch   from '@mui/material/Switch';
import  {toggleStatus} from "@/lib/channel/server_actions"

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function SwitchSatus({checked,id}:{checked:boolean,id:number}) {
  return (
    <div>
    
      <Switch {...label} checked={checked}  onChange={()=>toggleStatus(id,checked)}  />
      
    </div>
  );
}
