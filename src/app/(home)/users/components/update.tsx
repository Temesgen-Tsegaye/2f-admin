"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Select, TextField } from "@mui/material";
import { updateUser } from "@/lib/users/user_actions";
import { toast } from "react-toastify";
import MenuItem from '@mui/material/MenuItem';
export default function UpdateRole({
  open,
  handelClose,
  user_id,
  role_id
 
}: {
  
  open: boolean;
  handelClose: () => void;
  user_id:number
  role_id:number
}) {
  const [role, setRole] = React.useState(role_id)
 

  return (
    <div>
    
      <Modal
        open={open}
        onClose={handelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            width: "30vw",
            height: "45vh",
            bgcolor: "white",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
        
            alignItems:"center",
            padding:"2rem",
            gap:"3rem"
          }}
        >
            <Typography  variant="h5">Update Role</Typography>
       
       <Select
            defaultValue={role_id}
            onChange={(e) => setRole(Number(e.target.value) ||3)}
            sx={{
              width: "100%",
            }}
          className="bg-white text-black outline-none rounded-md border border-gray-300 py-2 text-sm hover:bg-gray-50 active:bg-gray-100"
        >
            <option
              className="text-black bg-gray-50 hover:bg-gray-100"
              value={2}
            >
              Admin
            </option>
            <option
              className="text-black bg-gray-50 hover:bg-gray-100"
              value={4}
            >
              User
            </option>
            <option
              className="text-black bg-gray-50 hover:bg-gray-100"
              value={3}
            >
              Member
            </option>
            <option
              className="text-black bg-gray-50 hover:bg-gray-100"
              value={1}
            >
              super_admin
            </option>
          </Select>

          <Button onClick={()=>updateUser(user_id,role).then(()=>toast("updated")).catch((e)=>toast.error('Error'))}>Update</Button>
         

         
       
        
        </Box>
      </Modal>
    </div>
  );
}
