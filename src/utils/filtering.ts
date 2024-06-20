import  {prismaMapperObject,prismaMapperPrimitive,queryBuilderType}  from "./types"

export function columnQueryBuilder(items:queryBuilderType) {
  
    if (items.filterValue === "checkbox") {
      if (items.value == "" || items.value == null || items.value == undefined) {
        return {};
      } else {
        return { [items.id]: { equals: items.value === "true" ? true : false } };
      }
    } else if (
      items.filterValue === "select" ||
      items.filterValue === "text" ||
      items.filterValue === "autoComplete"
    ) {
      if (items.value == "" || items.value == null || items.value == undefined ) {
        return {};
      } else {
        if (typeof items.value === "string") {
          return {
            [items.id]: {
              [prismaMapperPrimitive[items.filterMode]]: items.value,
            },
          };
        } else {
          return items.value.includes("")?{
            
            [items.id]: {
              [prismaMapperObject[items.filterMode][0]]: items.value[0],
              [prismaMapperObject[items.filterMode][1]]: items.value[1],
            },
          }:{}
        }
      }
    } else if (items.filterValue === "multi-select") {
      if (items.value == "" || items.value == null || items.value == undefined) {
        return {};
      } else {
        if (typeof items.value !== "string") {
          const filterArray = items.value.map((item) => {
            return {
              [items.id]: { [prismaMapperPrimitive[items.filterMode]]: item },
            };
          });
          return items.filterMode !== "notEquals"
            ? { OR: filterArray }
            : { NOT: { [items.id]: { in: items.value } } };
        }
      }
    } else if (
      items.filterValue === "range" ||
      items.filterValue == "range-slider"
    ) {
      if (!items.value?.length) {
        return {};
      } else {
        return {
          [items.id]: {
            [prismaMapperObject[items.filterMode][0]]: Number(items.value[0]),
            [prismaMapperObject[items.filterMode][1]]: Number(items.value[1]),
          },
        };
      }
    } else if (
      (items.filterValue === "date" ||
        items.filterValue === "datetime" ||
        items.filterValue === "time") &&
      typeof items.value === "string"
    ) {
      if (items.value == "" || items.value == null || items.value == undefined) {
        return {};
      } else {
        return {
          [items.id]: {
            [prismaMapperPrimitive[items.filterMode]]: new Date(
              items.value
            ).getTime(),
          },
        };
      }
    } else if (
      typeof items.value === "object" &&
      (items.filterValue === "date-range" ||
        items.filterValue === "datetime-range" ||
        items.filterValue === "time-range")
    ) {
      if (
        items.value?.filter(
          (item) => item !== "" && item !== undefined && item !== null
        ).length === 2
      ) {
        return {
          [items.id]: {
            [prismaMapperObject[items.filterMode][0]]: new Date(
              items.value[0]
            ).getTime(),
            [prismaMapperObject[items.filterMode][1]]: new Date(
              items.value[1]
            ).getTime(),
          },
        };
      }
    }
  }
  
  export function globalFilterQueryBuilder(globalFilter: string, fields: string[]) {
    const orConditions = fields.map((field) => ({
      [field]: {
        contains: globalFilter,
      },
    }));
  
    const queryObject = {
      OR: orConditions,
    };
  
    return queryObject;
  }
  
 export  function buildSorting(sortingQuery: string | undefined) {
    let parsedSorting = [];
    if (sortingQuery) {
      parsedSorting = JSON.parse(sortingQuery);
    }
  
    if (
      !(
        parsedSorting[0] == undefined ||
        parsedSorting[0] == "" ||
        parsedSorting[0] == null
      )
    ) {
      let query = [
        { [parsedSorting[0]?.id]: parsedSorting[0]?.desc ? "desc" : "asc" },
      ];
      return query;
    }
  }