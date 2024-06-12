import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationState } from "@tanstack/table-core";
export default function useSync(
  pagination: PaginationState,
  columnFilters: any,
  globalFilter: string
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  console.log(columnFilters,'columnFilters')
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const columnFilterIds = columnFilters.map((item) => item.id);
    params.forEach((value, key) => {
      if (!columnFilterIds.includes(key)) {
        params.delete(key);
        router.replace(`${pathName}?${params.toString()}`);
      }
    });

    params.set("page",JSON.stringify(pagination));
    if(!globalFilter){
        params.delete('globalFilter')
    }
    if(globalFilter){
        params.forEach((value, key) => {
             
              params.delete(key);
              router.replace(`${pathName}?${params.toString()}`);
            
          });
        params.set('globalFilter',globalFilter)
        params.set('page',JSON.stringify(pagination))
        router.push(`${pathName}?${params.toString()}`);

      return
    }
    // params.set("filter",JSON.stringify(columnFilters));


    for (let item of columnFilters) {
      if (item.filterValue == "date") {
        params.set(
          `${item.id}`,
          `${item.value.$d}@@@@${item.filterValue}@@@@${item.filterMode}`
        );
      } else if (typeof item.value == "string") {
        params.set(
          `${item.id}`,
          `${item.value}@@@@${item.filterValue}@@@@${item.filterMode}`
        );
      } else {
        params.set(
          `${item.id}`,
          `${item.value.join(",")}@@@@${item.filterValue}@@@@${item.filterMode}`
        );
      }
      //   params.set('page','0')
    }
    router.push(`${pathName}?${params.toString()}`);
  }, [pagination.pageIndex, pagination.pageSize,globalFilter,columnFilters]);
}
