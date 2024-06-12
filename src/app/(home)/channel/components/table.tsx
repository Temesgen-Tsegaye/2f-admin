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
  status:'text',
  type:'select',
  country:'multiSelect',
  fans:'range',
  date:'date'
}

const ChannelTable=({data,count}:{data:{id:number,name:string,status:boolean,type:string}[],count:number}) => {
  

  const [globalFilter, setGlobalFilter] = useState('');
  console.log(globalFilter,'glob')
  const searchParams=useSearchParams()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: Number(searchParams.get('page'))||0,
    pageSize: 5,
  });

  const [columnFilters, setColumnFilters] = useState([]);
  const [columnFilterFns, setColumnsFilterMode] = useState({})
    console.log(columnFilters,'fil')
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
        filterFn:'contains',
        filterVariant:'text'

      },
      {
        accessorKey: 'type',
        header: 'Type',
        filterVariant:'select',
        filterSelectOptions:['A','B','C','D'],
       
      },
      {
        accessorKey: 'country',
        header: 'Type',
        filterVariant:'multi-select',
        filterSelectOptions:['UK','USA','Mexico','France'],
    
      },
      {
        accessorKey: 'fans',
        header: 'No of Fans',
        filterVariant:'range',
    
      },
      {
        accessorKey: 'date',
        header: 'Date',
        filterVariant:'date',
        Cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
       
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
