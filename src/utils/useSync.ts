import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PaginationState } from '@tanstack/table-core';
export default function useSync(pagination:PaginationState,columnFilters:any) {

    const router=useRouter()
    const searchParams = useSearchParams()
    const pathName=usePathname()

    React.useEffect(() => {
        const params = new URLSearchParams(searchParams);
        const columnFilterIds = columnFilters.map((item) => item.id);
        params.forEach((value, key) => {
            if (!columnFilterIds.includes(key)) {
                params.delete(key);
                router.replace(`${pathName}?${params.toString()}`);

            }
        });
       
    
        params.set('page', pagination.pageIndex.toString());
      
        for(let item of columnFilters){
          if(typeof item.value=='string'){

              params.set(`${item.id}`,`${item.value}@@@@${item.filterValue}@@@@${item.filterMode}`)
          }else{
            params.set(`${item.id}`,`${item.value.join(',')}@@@@${item.filterValue}@@@@${item.filterMode}`)

          }
        //   params.set('page','0')
      
        }
       router.push(`${pathName}?${params.toString()}`);
  
      }, [pagination.pageIndex,pagination.pageSize,columnFilters]);

}
