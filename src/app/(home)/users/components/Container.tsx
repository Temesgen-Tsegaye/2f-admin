"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Box } from "@mui/material";
import AddRole from "./add_role";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import  DataTable  from "./table";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
export interface Users {
  
    id: number;
    phonenumber: string;
    password: string;
    name: string;
    email: string;
    roleid: number;

}

export default function Container({
  users,
  count,
}: {
  users: Users[] ;
  count: number | undefined;
}) {


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
         <Button sx={{bgcolor:"#000222",color:"white", ':hover': {
          backgroundColor: '#000222', 
        },}} onClick={()=>setOpen(true)}>Add Role</Button>
      </Box>
        <AddRole open={open} handelClose={handleClose} count={count || 0} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataTable data={users} count={count||0}  />
          </LocalizationProvider>

      <Box sx={{display:'flex',justifyContent:'center',marginTop:'2rem'}}>
      </Box>
    </Paper>
  );
}
