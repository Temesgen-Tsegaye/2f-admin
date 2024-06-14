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
type UserApiResponse = {
  data: Array<Channel>;
  
    totalRowCount: number;
  };


type Channel = {
 id:number
  name: string;
  status: boolean;
  type:string
  date:object
 
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

}

const ChannelTable=({data,count}:{data:{id:number,name:string,status:boolean,type:string}[],count:number}) => {
  
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
  const [globalFilter, setGlobalFilter] = useState(globalFilterInitial);
  const searchParams=useSearchParams()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex:paginationInitial.pageIndex,
    pageSize:paginationInitial.pageSize,
   });

  const [columnFilters, setColumnFilters] = useState(
    columnFiltersInitial
  );

  
  const [columnFilterFns, setColumnsFilterMode] = useState(filterMode)
  useSync(pagination,columnFilters.map((item)=>({...item,filterValue:mapper[item.id],filterMode:columnFilterFns[item.id]})),globalFilter);
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
        Cell: ({ row }) => new Date(row.original.date).toUTCString(),
       
      },
      {
        accessorKey: 'date',
        header: 'Date time',
        filterVariant:'datetime',
        Cell: ({ row }) => new Date(row.original.date).toUTCString()
       
      },
      {
        accessorKey: 'createdAt',
        header: 'Date Range',
        filterVariant:'datetime-range',
        Cell: ({ row }) => new Date(row.original.date).toUTCString()
       
      },
      {
        accessorKey: 'updatedAt',
        header: 'Time',
        filterVariant:'time-range',
        Cell: ({ row }) => new Date(row.original.date).toUTCString()
       
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
    initialState: { showColumnFilters: true, },
    onColumnFilterFnsChange:setColumnsFilterMode,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange:setPagination,
    rowCount:count,
    state: {
      globalFilter,
      pagination,
      columnFilters,
      columnFilterFns,      
    },
  });

  return <MaterialReactTable  table={table} />;
};

export default ChannelTable;
