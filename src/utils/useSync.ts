import React,{useEffect,useMemo} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationState } from "@tanstack/table-core";
export default function useSync(
  pagination: PaginationState,
  sorting:any,
  columnFilters: any,
  globalFilter: string
) {



  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  useEffect(() => {
    console.log('Sorting changed:', sorting);
  }, [sorting]);

  useEffect(() => {
    console.log('Global filter changed:', globalFilter);
  }, [globalFilter]);

  useEffect(() => {
    console.log('Pagination changed:', pagination);
  }, [pagination]);

  useEffect(() => {
    console.log('Column filters changed:', columnFilters);
  }, [columnFilters]);

 


  const filterdFilter = useMemo(() => columnFilters.filter((item) => {
     if(item.filterValue!==undefined){

       if (
      item.filterValue == "date-range" ||
      item.filterValue == "datetime-range" ||
      item.filterValue == "time-range" 
    ) {
      if (
        (item.value[0] !== null &&
          item.value[0] !== undefined &&
          item.value[0] !== "") ||
        (item.value[1] !== undefined &&
          item.value[1] !== null &&
          item.value[1] !== "")
      ) {
        return item;
      }
    } else if (
      item.filterValue == "date" ||
      item.filterValue == "datetime" ||
      item.filterValue == "time"
    ) {
      if (item.value?.$d) {
        return item;
      }
    } else if (typeof item.value === "string") {
      if (!(item.value === "")) {
        return item;
      }
    } else if (!(item.value?.length === 0)) {
      return item;

    }
  }
  }), [columnFilters]);
  React.useEffect(() => {

    const params = new URLSearchParams(searchParams);

    const columnFilterIds = filterdFilter.map((item) => item.id);
    params.forEach((value, key) => {
      if (!columnFilterIds.includes(key)) {
        params.delete(key);
        // router.replace(`${pathName}?${params.toString()}`);
      }
    });

    params.set("page", JSON.stringify(pagination));
  
    params.set("sorting", JSON.stringify(sorting));
    
    if (!globalFilter) {
      params.delete("globalFilter");
    }
    if (globalFilter) {
      params.forEach((value, key) => {
        params.delete(key);
      });

      params.set("globalFilter", globalFilter);
      params.set("page", JSON.stringify(pagination));
      router.push(`${pathName}?${params.toString()}`);

      return;
    }
    // params.set("filter",JSON.stringify(columnFilters));

    for (let item of filterdFilter) {
      if (item.filterValue == "date-range") {
        params.set(
          `${item.id}`,
          `${JSON.stringify(item.value)}@@@@${item.filterValue}@@@@${
            item.filterMode
          }`
        );
      } else if (item.filterValue == "time-range") {
        params.set(
          `${item.id}`,
          `${JSON.stringify(item.value)}@@@@${item.filterValue}@@@@${
            item.filterMode
          }`
        );
      } else if (item.filterValue == "datetime-range") {
        params.set(
          `${item.id}`,
          `${JSON.stringify(item.value)}@@@@${item.filterValue}@@@@${
            item.filterMode
          }`
        );
      } else if (
        item.filterValue == "date" ||
        item.filterValue == "datetime" ||
        item.filterValue == "time"
      ) {
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
          `${item.value?.join(",")}@@@@${item.filterValue}@@@@${
            item.filterMode
          }`
        );
      }
    }
    router.push(`${pathName}?${params.toString()}`);
  }, [pagination.pageIndex, pagination.pageSize,sorting, globalFilter, filterdFilter]);
}
