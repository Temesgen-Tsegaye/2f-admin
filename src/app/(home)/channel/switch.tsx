import * as React from 'react';
import Switch   from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function SwitchSatus({checked}:{checked:boolean}) {
  return (
    <div>
    
      <Switch {...label} checked={checked}  />
      
    </div>
  );
}
