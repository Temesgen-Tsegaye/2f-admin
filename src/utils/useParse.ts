import { useSearchParams } from "next/navigation";

export default function useParse(dafaultFilterModes:{defaultFilterMode:string}) {
  const searchParams = useSearchParams();

  let parsed = {
    paginationInitial: {pageIndex:0,pageSize:5},
    globalFilterInitial: '',
    columnFiltersInitial: [],
    filterMode:dafaultFilterModes,
  };

  const params = new URLSearchParams(searchParams);

  params.forEach((value, key) => {
    if (key === "page") {
      try {
        parsed.paginationInitial = JSON.parse(value);
      } catch (error) {
        console.error("Error parsing paginationInitial state from URL", error);
      }
    } else if (key === "globalFilter") {
      parsed.globalFilterInitial = value;
    } else {
      const [filterValue, filterType, filterMode] = value.split("@@@@");
      let parsedValue;
        parsed.filterMode[key]=filterMode
      if (filterType === "date-range" || filterType === "datetime-range" || filterType === "time-range") {
        parsedValue = JSON.parse(filterValue);
      } else if (filterType === "date" || filterType === "datetime" || filterType === "time") {
        parsedValue = new Date(filterValue);
      } else if (filterType === "multiSelect") {
        parsedValue = filterValue.split(',');
      } else {
        parsedValue = filterValue;
        console.log(key,filterValue,'hello')
      }

      parsed.columnFiltersInitial.push({
        id: key,
        value: parsedValue,
       
      });
    }
  });

  console.log(parsed, 'parsed');

  return parsed;
}
