import { useSearchParams } from "next/navigation";
import { parse } from "path";

export default function useParse(dafaultFilterModes:{[key:number|string]:string}) {
  const searchParams = useSearchParams();

  let parsed = {
    paginationInitial: {pageIndex:0,pageSize:5},
    globalFilterInitial: '',
    columnFiltersInitial: [],
    filterMode:dafaultFilterModes,
    sorting:[]
  };

  const params = new URLSearchParams(searchParams);

  params.forEach((value, key) => {
    if (key === "page") {
      try {
        parsed.paginationInitial = JSON.parse(value);
      } catch (error) {
      }
    } else if (key === "globalFilter") {
      parsed.globalFilterInitial = value;
    } else if(key==="sorting") {
        parsed.sorting=JSON.parse(value)
    } else {
    parsed.columnFiltersInitial=JSON.parse(value);
    const extractedObject= Object.fromEntries(
    parsed.columnFiltersInitial.map(({ id, filterMode }) => [id, filterMode])
    );

    parsed.filterMode={
      ...parsed.filterMode,
      ...extractedObject
    }

  }

     
    
  });


  return parsed;
}
