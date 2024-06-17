"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { updateName } from "@/lib/channel/server_actions";
import { toast } from "react-toastify";
export default function EditModal({
  open,
  handelClose,
  name,
  id,
}: {
  id: number;
  name: string;
  open: boolean;
  handelClose: () => void;
}) {
  const [newName, setName] = React.useState("");
  

  

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
            bgcolor: "whitesmoke",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent:"center",
            alignItems:"center",
            padding:"2rem",
            gap:"1rem"
          }}
        >
            <Typography sx={{fontWeight:'bold',fontSize:"1rem"}}>Update Channel Name</Typography>
          <TextField
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
             style={{
                width:"100%",
            
             }}
            variant="outlined"
            inputProps={{
                style:{
                    height:'1rem'
                }
            }}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: "#181A41",width:"100%"}}
            onClick={() => updateName(id, newName).then(()=>toast.success("Updated!")).catch(()=>toast.error("Error!"))}
          >
            Update
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
