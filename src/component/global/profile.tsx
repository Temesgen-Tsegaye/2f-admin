"use client"
import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CgProfile } from "react-icons/cg";
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
import { signOut } from '@/auth';
import { useRouter } from 'next//navigation';
export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);
          const session=useSession()
          const router=useRouter()
  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>

<CgProfile onClick={handleClick}/>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}

        sx={{padding:"0.5rem"}}
      >
        <Box sx={{padding:"0.5rem",display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <CgProfile/>
        <Box sx={{fontWeight:500}}>User name</Box>
        <Box>{session.data?.user?.name}</Box>
        <button onClick={()=>router.push('/api/auth/signout')  } style={{backgroundColor:"red",color:"white",padding:"0.5rem",borderRadius:"5px"}}>Log out</button>
        </Box>
       

  
      </Popover>
    </div>
  );
}
