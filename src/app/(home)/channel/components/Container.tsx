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
export interface Channel {
  id: number;
  name: string;
  status: boolean;
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
  const columns: ColumnDef<Channel>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "status",
      header: "Status",
      enableHiding: false,
      cell: ({ row }) => (
        <Box>
          <SwitchSatus checked={row.original.status} id={row.original.id} />
        </Box>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",

      cell: ({ row }) => (
        <Action
          id={row.original.id}
          name={row.original.name}
          status={row.original.status}
        />
      ),
    },
  ];

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
         <Button sx={{bgcolor:"#000222",color:"white", ':hover': {
          backgroundColor: '#000222', 
        },}} onClick={()=>setOpen(true)}>Add Channel</Button>
      </Box>
        <AddChannel open={open} handelClose={handleClose} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataTable data={channels} count={count} columns={columns} />
          </LocalizationProvider>

      <Box sx={{display:'flex',justifyContent:'center',marginTop:'2rem'}}>
      </Box>
    </Paper>
  );
}
