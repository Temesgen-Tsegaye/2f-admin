"use client"
import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'material-react-table';
import useSync from '@/utils/useSync';
import  useParse from '@/utils/useParse';
import { useSearchParams } from 'next/navigation';
import {Channel} from "./Container"
import {deleteChannel} from "@/lib/channel/server_actions"
import { Button } from '@mui/material';
import  {toast} from 'react-toastify'
type UserApiResponse = {
  data: Array<Channel>;
  
    totalRowCount: number;
  };




  

const mapper={
  name:'text',
  status:'checkbox',
  type:'select',
  country:'multiSelect',
  fans:'range',
  date:'date',
  createdAt:'datetime-range',
  updatedAt:'time-range',

} as const

const ChannelTable=({data,count}:{data:Channel[],count:number}) => {
  
    const {columnFiltersInitial,globalFilterInitial,paginationInitial,filterMode}=useParse({
      name:'equals',
      status:'equals',
      type:'equals',
      country:'equals',
      fans:'between',
      date:'between',
      createdAt:'between',
      updatedAt:'between',
    })

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState(globalFilterInitial);
  const searchParams=useSearchParams()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex:paginationInitial.pageIndex,
    pageSize:paginationInitial.pageSize,
   });

  const [columnFilters, setColumnFilters] = useState<{id:string,value:any}[]>(
    columnFiltersInitial
  );

  
  const [columnFilterFns, setColumnsFilterMode] = useState(filterMode)

  const memoizedColumnFilters = useMemo(
    () => columnFilters.map((item) => ({ ...item, filterValue: mapper[item.id as keyof typeof mapper], filterMode: columnFilterFns[item.id] })),
    [columnFilters, columnFilterFns]
  );
  useSync(pagination,sorting,memoizedColumnFilters,globalFilter);
  const columns = useMemo<MRT_ColumnDef<Channel>[]>(
    () => [
     
      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant:'text',
        filterFn:'contains',    
   
      },

      {
        accessorKey:'status',
        header: 'Status',
        Cell: ({ cell }) => {
          return <div>{cell.getValue()?'true':'false'}</div>;
        },
      
        filterVariant:'checkbox'

      },
      {
        accessorKey: 'type',
        header: 'Type',
        filterVariant:'autocomplete',
        filterSelectOptions:["News","Tech","Food","Fashion"],
       
      },
      {
        accessorKey: 'country',
        header: 'Country',
        filterVariant:'multi-select',
        filterSelectOptions:['UK','USA','Mexico','France'],
    
      },
      {
        accessorKey: 'fans',
        header: 'No of Fans',
        filterVariant:'range-slider',
        muiFilterSliderProps: {
          marks: true,
          max: 2000, 
          min: 0, 
          step: 50,
          
        },
    
      },
      {
        accessorKey: 'date',
        header: 'Date',
        filterVariant:'date',
        Cell: ({ row }) => new Date(`${row.original.date}`).toUTCString(),
       
      },
      {
        accessorKey: 'date',
        header: 'Date time',
        filterVariant:'datetime',
        Cell: ({ row }) => new Date(`${row.original.date}`).toUTCString()
       
      },
      {
        accessorKey: 'createdAt',
        header: 'Date Range',
        filterVariant:'datetime-range',
        Cell: ({ row }) => new Date(`${row.original.date}` ).toUTCString()
       
      },
      {
        accessorKey: 'updatedAt',
        header: 'Time',
        filterVariant:'time-range',
        Cell: ({ row }) => new Date(`${row.original.date}`).toUTCString()
       
      },
      {
        id: 'Actions',
        header: 'Actions',
        Cell: ({ row }) => <Button sx={{bgcolor:'red',color:'white'}} onClick={() =>deleteChannel(row.original.id).then(()=>toast.success('Channel Deleted'))}>Delete</Button>
       
      },
     

    ],
    [],
  );
  

  
  







  
    
  const table = useMaterialReactTable({
    columns,
    data,
    manualPagination: true,
    enableColumnFilterModes: true,
    manualFiltering: true,
    manualSorting: true,
    initialState: { showColumnFilters: true, },
    onColumnFilterFnsChange:setColumnsFilterMode,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange:setPagination,
    onSortingChange: setSorting,
    rowCount:count,
    state: {
      globalFilter,
      pagination,
      columnFilters,
      columnFilterFns,  
      sorting    
    },
  });

  return <MaterialReactTable  table={table} />;
};

export default ChannelTable;
