"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { createContent } from "@/lib/program/server_actions";
import { toast } from "react-toastify";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {Channel} from "@/app/(home)/channel/components/Container"

export default function AddContent({
  open,
  handelClose,
  channel
}: {
  open: boolean;
  handelClose: () => void;
  channel:Channel[]
}) {
  const [content, setContent] = React.useState({
    videoUrl: "",
    title: "",
    duration: 0,
    categoryId: 0,
    description:"",
    coverImage:"",
    channelId: 0,
    typeId: 0,
  });

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
            width: "40vw",
            
            bgcolor: "white",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            paddingX: "2rem",
            paddingY:"1rem",
            gap: "1rem",
          }}
        >
          <Typography sx={{fontWeight:700,fontSize:"1.5rem"}}>Add Content</Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
              <Box sx={{width:"40%"}}>
                <label htmlFor="video">Video Url</label>
                <TextField
                  id="video"
                  name="videoUrl"
                  onChange={(e) =>
                    setContent({ ...content, [e.target.name]: e.target.value })
                  }
                  style={{
                    width: "100%",
                  }}
                  variant="filled"
                  inputProps={{
                    style: {
                      height: "0.8rem",
                      padding:"6px"
                    },
                  }}
                />
              </Box>
             

              <Box sx={{width:"40%"}}>
                <label htmlFor="title">Title</label>
                <TextField
                  id="title"
                  name="title"
                  onChange={(e) =>
                    setContent({ ...content, [e.target.name]: e.target.value })
                  }
                  style={{
                    width: "100%",
                  }}
                  variant="filled"
                  inputProps={{
                    style: {
                      height: "0.8rem",
                      padding:"6px"
                    },
                  }}
                />
              </Box>
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
              <Box sx={{width:"40%"}}>
                <label htmlFor="descrition">Description</label>
                <TextField
                  id="descrition"
                  name="description"
                  onChange={(e) =>
                    setContent({ ...content, [e.target.name]: e.target.value })
                  }
                  style={{
                    width: "100%",
                  }}
                  variant="filled"
                  inputProps={{
                    style: {
                      height: "0.8rem",
                      padding:"6px"
                    },
                  }}
                />
              </Box>
             

              <Box sx={{width:"40%"}}>
                <label htmlFor="imgUrl">Cover Image Url</label>
                <TextField
                  id="imgUrl"
                  name="coverImage"
                  onChange={(e) =>
                    setContent({ ...content, [e.target.name]: e.target.value })
                  }
                  style={{
                    width: "100%",
                  }}
                  variant="filled"
                  inputProps={{
                    style: {
                      height: "0.8rem",
                      padding:"6px"
                    },
                  }}
                />
              </Box>
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
              <Box sx={{width:"40%"}}>
                <label htmlFor="duration">Duration</label>
                <TextField
                  id="duration"
                  name="duration"
                  onChange={(e) =>
                    setContent({ ...content, [e.target.name]: e.target.value })
                  }
                  style={{
                    width: "100%",
                  }}
                  variant="filled"
                  inputProps={{
                    style: {
                      height: "0.8rem",
                      padding:"6px"
                    },
                  }}
                />
              </Box>

              <Box sx={{width:"40%"}}>
                <label htmlFor="category" className="block">Category</label>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="category"
                  name="categoryId"
                  value={content.categoryId}
                  sx={{height:"30%",width:"100%"}}
                  onChange={(e) =>
                    setContent({ ...content, [e.target.name]: e.target.value })
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Recomended</MenuItem>
                  <MenuItem value={2}>Popular</MenuItem>
                  <MenuItem value={3}>Featured</MenuItem>
                  {/* <MenuItem value={3}>Favorite</MenuItem>
          <MenuItem value={3}>Watch later</MenuItem> */}
                </Select>
              </Box>
            </Box>
            <Box sx={{display:'flex',justifyContent:'space-between'}}>
              <Box sx={{width:"40%"}}>
                <label htmlFor="channel">Channel</label>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="channel"
                  name="channelId"
                  sx={{height:"30%",width:"100%"}}
                  value={content.channelId}
                  onChange={(e) =>
                    setContent({ ...content, [e.target.name]: e.target.value })
                  }
                >

                  
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                   {channel.map((item)=><MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>)}
             
                </Select>
              </Box>

              <Box sx={{width:"40%"}}>
                <label htmlFor="type">Type</label>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="type"
                  name="typeId"
                  value={content.typeId}
                  sx={{height:"30%",width:"100%"}}
                  onChange={(e) =>
                    setContent({ ...content, [e.target.name]: e.target.value })
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={1}>Live Tv</MenuItem>
                  <MenuItem value={2}>Movies</MenuItem>
                  <MenuItem value={3}>Tv Shows</MenuItem>
                  <MenuItem value={3}>Sports</MenuItem>
                
                </Select>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: "2rem",
                width: "100%",
              }}
            >
              <Button
                variant="outlined"
                sx={{ bgcolor: "white", width: "30%", color: '#181A41"' }}
                onClick={() => handelClose()}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                sx={{ bgcolor: "#181A41", width: "30%" }}
                onClick={() =>
                  createContent(content)
                    .then(() => toast.success("Added"))
                    .catch(() => toast.error("error"))
                }
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
