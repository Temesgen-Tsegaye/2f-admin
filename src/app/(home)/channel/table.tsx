"use client"
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef, 
} from 'material-react-table';
import SwitchSatus from './switch';
import Action from './action';
import { Box } from '@mui/material';
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
            Cell:({cell})=><Box><SwitchSatus checked={cell.row.original.status}/></Box>
          },
          {
            accessorKey: 'action', 
            header: 'Action',
            muiTableHeadCellProps: { style: { color: 'green' } }, 
            enableHiding: false, 
            Cell:({cell})=> <Action/>
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

  //pass table options to useMaterialReactTable
  const table = useMaterialReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: false ,//enable some features
    enableColumnOrdering: false, //enable a feature for all columns
    enableGlobalFilter: true, //turn off a feature
  });

  //note: you can also pass table options as props directly to <MaterialReactTable /> instead of using useMaterialReactTable
  //but the useMaterialReactTable hook will be the most recommended way to define table options
  return <MaterialReactTable table={table} />;
}
