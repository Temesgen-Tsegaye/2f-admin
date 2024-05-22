"use client"
import { useMemo, useState } from 'react';
import {
MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  MRT_TablePagination,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToolbarAlertBanner,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_TableContainer,
} from 'material-react-table';
import { IconButton, Box, Button, Typography, Tooltip } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import AddChannel from './add_channel';
import SwitchSatus from './switch';
import Action from './action';
import Stack from "@mui/material";

export interface Channel {
    id:number,
    name: string;
    status:boolean
  }
  const data: Channel[] = [
  {
    id:1,
    name:"HBO",
    status:true
  },
  {
    id:1,
    name:"HBO",
    status:true
  },
  {
    id:1,
    name:"HBO",
    status:true
  }
  ];
  



export default function App({data}:{data:Channel[]}) {

  const  [open,setOpen]=useState(false)
  const handleClose = () => setOpen(false);
    const columns = useMemo<MRT_ColumnDef<Channel>[]>(
        () => [
          {
            accessorKey: 'name', //simple recommended way to define a column
            header: 'Name',
            muiTableHeadCellProps: { style: { color: 'green' } }, //custom props
            enableHiding: false, //disable a feature for this column
          },
          {
            accessorKey: 'status', 
            header: 'Status',
            muiTableHeadCellProps: { style: { color: 'green' } }, 
            enableHiding: false, 
            Cell:({cell})=><Box><SwitchSatus checked={cell.row.original.status} id={cell.row.original.id}/></Box>
          },
          {
            accessorKey: 'action', 
            header: 'Action',
            muiTableHeadCellProps: { style: { color: 'green' } }, 
            enableHiding: false, 
            Cell:({cell})=> <Action id={cell.row.original.id} name={cell.row.original.name} status={cell.row.original.status} />
          },
        //   {
        //     accessorFn: (originalRow) => parseInt(originalRow.age), //alternate way
        //     id: 'age', //id required if you use accessorFn instead of accessorKey
        //     header: 'Age',
        //     Header: <i style={{ color: 'red' }}>Age</i>, //optional custom markup
        //     Cell: ({ cell }) => <i>{cell.getValue<number>().toLocaleString()}</i>, //optional custom cell render
        //   },
        ],
        [],
      );

  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    initialState: { showGlobalFilter: true },

    
  });

 
  return (

    <Box sx={{ border: '', padding: '16px' }}>

      <AddChannel  open={open} handelClose={handleClose} />
          <Box
        sx={(theme) => ({
          display: 'flex',
          backgroundColor: 'inherit',
          borderRadius: '4px',
          gap: '16px',
          justifyContent: 'space-between',
          padding: '24px 16px',
       
        })}
      >
        <MRT_GlobalFilterTextField table={table} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MRT_ToggleFiltersButton table={table} />
          <Tooltip title="Print">
            <IconButton onClick={() => window.print()}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
          <Box>
          <Button
            sx={{bgcolor:"#181A41"}}
            variant="contained"
            onClick={()=>setOpen(true)}
          >
            Add Channel
          </Button>
        </Box>
        </Box>

          
        
      </Box>
      <MRT_TableContainer table={table} />
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <MRT_TablePagination table={table} />
        </Box>
        <Box sx={{ display: 'grid', width: '100%' }}>
          <MRT_ToolbarAlertBanner stackAlertBanner table={table} />
        </Box>
      </Box>

    </Box>
  )
}
