import React, { useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaginationState } from "@tanstack/table-core";
export default function useSync(
  pagination: PaginationState,
  sorting: any,
  columnFilters: {id:string,filterValue:string,filterMode:string,value:any}[],
  globalFilter: string
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const filterdFilter = useMemo(
    () =>
      columnFilters.filter((item) => {
        if (item.filterValue !== undefined) {
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
      }),
    [columnFilters]
  );
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);

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

    params.set("filter", JSON.stringify(filterdFilter));

    router.push(`${pathName}?${params.toString()}`);
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    sorting,
    globalFilter,
    filterdFilter,
  ]);
}
