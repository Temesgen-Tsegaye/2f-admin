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
  
  const searchParams=useSearchParams()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: Number(searchParams.get('page'))||0,
    pageSize: 5,
  });

  const [columnFilters, setColumnFilters] = useState([]);
  const [columnFilterFns, setColumnsFilterMode] = useState({})
    console.log(columnFilters,'fil')
  // useSync(pagination,columnFilters.map((item)=>({...item,filterValue:mapper[item.id],filterMode:columnFilterFns[item.id]})));
  useSync(pagination,columnFilters.map((item)=>({...item,filterValue:mapper[item.id],filterMode:columnFilterFns[item.id]})));
  // useSync(pagination,columnFilters)
  const columns = useMemo<MRT_ColumnDef<Channel>[]>(
    () => [

      {
        accessorKey: 'name',
        header: 'Name',
        filterVariant:'text'
      },

      {
        accessorKey:'status',
        header: 'Status',
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
        Cell: ({ row }) => new Date(row.original.date).toLocaleDateString()
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
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange:setPagination,
    rowCount:count,
    state: {
      
      pagination,
      columnFilters,
      columnFilterFns,      
    },
  });

  return <MaterialReactTable table={table} />;
};

export default ChannelTable;
