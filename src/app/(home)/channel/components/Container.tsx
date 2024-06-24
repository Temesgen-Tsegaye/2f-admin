"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Box } from "@mui/material";
import AddChannel from "./add_channel";
import SwitchSatus from "./switch";
import Action from "./action";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import  DataTable  from "./table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Can } from "@/utils/can";

export interface Channel {
  id: number;
  name: string;
  status: boolean;
  country:string;
  fans:number;
  date:object;
  createdAt:object;
  updatedAt:object;
  createdby:number
  
}

export default function Container({
  channels,
  count,
}: {
  channels: Channel[];
  count: number | undefined;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
 
  return (
    <Paper sx={{padding:'1rem',width:'100%', }}  elevation={3}>
      <Box
        sx={{

          display: "flex",
          justifyContent: "space-between",
          alignItems:'center',
          height: "4rem",
      
        }}
      >
        <Can I="create" a="Channel">
        <Button sx={{bgcolor:"#000222",color:"white", ':hover': {
          backgroundColor: '#000222', 
        },}} onClick={()=>setOpen(true)}>Add Channel</Button>
        </Can>
         
      </Box>
        <AddChannel open={open} handelClose={handleClose} count={count || 0} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataTable data={channels} count={count||0}  />
          </LocalizationProvider>

      <Box sx={{display:'flex',justifyContent:'center',marginTop:'2rem'}}>
      </Box>
    </Paper>
  );
}
