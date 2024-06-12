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
  status:'checkbox',
  type:'select',
  country:'multiSelect',
  fans:'range',
  date:'date'
}

const ChannelTable=({data,count}:{data:{id:number,name:string,status:boolean,type:string}[],count:number}) => {
  
     console.log(data,'data')  

  const [globalFilter, setGlobalFilter] = useState('');
  const searchParams=useSearchParams()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex:searchParams.get('page')?JSON.parse(searchParams.get('page')).pageIndex:0,
    pageSize:searchParams.get('page')?JSON.parse(searchParams.get('page')).pageSize:5,
  });

  const [columnFilters, setColumnFilters] = useState([]);
   console.log(columnFilters,'columnFilters')
  const [columnFilterFns, setColumnsFilterMode] = useState({})
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
        filterVariant:'select',
        filterSelectOptions:['A','B','C','D'],
       
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
