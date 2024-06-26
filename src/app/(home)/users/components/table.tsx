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
import useParse from '@/utils/useParse';
import { useSearchParams } from 'next/navigation';
import { Users } from "./Container"
import { Can } from '@/utils/can';
import { Button } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import Action from './action';



const mapper = {
    name: 'text',
    status: 'checkbox',
    type: 'select',
    country: 'multiSelect',
    fans: 'range',
    date: 'date',
    createdAt: 'datetime-range',
    updatedAt: 'time-range',

} as const

const ChannelTable = ({ data=[], count }: { data: Users[], count: number }) => {
   console.log(data,'userJOIN')
    const { columnFiltersInitial, globalFilterInitial, paginationInitial, filterMode } = useParse({
        name: 'equals',
        status: 'equals',
        type: 'equals',
        country: 'equals',
        fans: 'between',
        date: 'between',
        createdAt: 'between',
        updatedAt: 'between',
    })
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState(globalFilterInitial);
    const searchParams = useSearchParams()
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: paginationInitial.pageIndex,
        pageSize: paginationInitial.pageSize,
    });

    const [columnFilters, setColumnFilters] = useState<{ id: string, value: any }[]>(
        columnFiltersInitial
    );


    const [columnFilterFns, setColumnsFilterMode] = useState(filterMode)

    const memoizedColumnFilters = useMemo(
        () => columnFilters.map((item) => ({ ...item, filterValue: mapper[item.id as keyof typeof mapper], filterMode: columnFilterFns[item.id] })),
        [columnFilters, columnFilterFns]
    );
useSync(pagination, sorting, memoizedColumnFilters, globalFilter);
const columns = useMemo<MRT_ColumnDef<Users>[]>(
        () => [
              {
                accessorKey:'phonenumber',
                header:'Phone Number'
              },
              {
                accessorKey:'name',
                header:'Name'
              },
              {
                accessorKey:'email',
                header:'Email'
              },
             
              {
                accessorKey:'password',
                header:'Password'
              },
              {
                accessorKey:'role',
                header:'Role',
                Cell:({row})=>row.original.role.name
              },

              {
                id: 'Actions',
                header: 'Actions',
                // Cell: ({ row }) => <Can I={"delete"} a={subject("Channel", { createdby:row.original.createdby })}><Button sx={{bgcolor:'red',color:'white'}} onClick={() =>deleteChannel(row.original.id).then(()=>toast.success('Channel Deleted'))}>Delete</Button></Can>
                Cell: ({ row }) => <Action user_id={row.original.id} role_id={row.original.role.id} />
               
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
        onColumnFilterFnsChange: setColumnsFilterMode,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        rowCount: count,
        state: {
            globalFilter,
            pagination,
            columnFilters,
            columnFilterFns,
            sorting
        },
    });

    return <MaterialReactTable table={table} />;
};

export default ChannelTable;
