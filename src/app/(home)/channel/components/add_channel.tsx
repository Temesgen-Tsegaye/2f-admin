"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { updateName } from "@/lib/channel/server_actions";
import { createChannel } from "@/lib/channel/server_actions";
import { toast } from "react-toastify";
import { socket } from "@/utils/socket/socket-client";
import { Can } from "@/utils/can";
export default function AddChannel({
  open,
  handelClose,
  count
 
}: {
  
  open: boolean;
  handelClose: () => void;
  count:number
}) {
  const [name, setName] = React.useState("");
 

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
            <Typography  variant="h5">Add Channel</Typography>
       

          <Box sx={{width:"100%",display:"flex",flexDirection:'column',gap:'1rem'}}>
          <label htmlFor="">Name</label>
          <TextField
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
             style={{
                width:"100%",
            
             }}
            variant="filled"
            inputProps={{
                style:{
                    height:'0.5rem'
                }
            }}
          />
          <Box sx={{display:'flex',justifyContent:'end',gap:'2rem',width:'100%'}}>
          <Button
            variant="outlined"
            sx={{ bgcolor: "white",width:"30%",color:'#181A41"'}}
            onClick={() =>handelClose()}
          >
            Cancel
          </Button>

<Button
            variant="contained"
            sx={{ bgcolor: "#181A41",width:"30%"}}
            onClick={(()=>socket.emit('addChannel',{name,role:'user'}))}
          >
            Add
          </Button>

         
          </Box>
         

          </Box>
       
        
        </Box>
      </Modal>
    </div>
  );
}
