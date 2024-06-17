import { prisma } from "@/config/prisma-client";
import { empty } from "@prisma/client/runtime/library";
import { equal } from "assert";
import { channel } from "diagnostics_channel";
type queryBuilderType={
  id: string;
  filterValue:
    | "text"
    | "autoComplete"
    | "select"
    | "multi-select"
    | "range"
    | "range-slider"
    | "date"
    | "datetime"
    | "date-range"
    | "datetime-range"
    | "time"
    | "time-range"
    | "checkbox";
  value: string | string[] | null | undefined;
  filterMode:
    | "fuzzy"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "equals"
    | "notEquals"
    | "between"
    | "betweenInclusive"
    | "greaterThan"
    | "lessThan"
    | "greaterThanOrEqual"
    | "lessThanOrEqual"
    | "empty"
    | "notEmpty";
}
const prismaMapperPrimitive = {
  fuzzy: "contains",
  contains: "contains",
  startsWith: "startsWith",
  endsWith: "endsWith",
  equals: "equals",
  notEquals: "not",
  greaterThan: "gt",
  greaterThanOrEqual: "gte",
  lessThan: "lt",
  lessThanOrEqual: "lte",
  empty: "hello",
  notEmpty: "hello",
  between: "hello",
  betweenInclusive: "hello",
} as const;

const prismaMapperObject = {
  fuzzy: "contains",
  contains: "contains",
  startsWith: "startsWith",
  endsWith: "endsWith",
  equals: "equals",
  notEquals: "not",
  greaterThan: "gt",
  greaterThanOrEqual: "gte",
  lessThan: "lt",
  lessThanOrEqual: "lte",
  empty: "hello",
  notEmpty: "hello",
  between: ["gt", "lt"],
  betweenInclusive: ["gte", "lte"],
} as const;

export async function fetchChannels(queryParams: {
  globalFilter?: string;
  filter?: string;
  sorting?: string;
  page?: string;
}) {
  if (queryParams.globalFilter) {
    const query = globalFilterQueryBuilder(queryParams.globalFilter, [
      "name",
      "type",
      "country",
    ]);

    const contents = await prisma.channel.findMany({
      where: query,
      // skip: currentPage * 5,
      // take: 5,
    });

    return {
      channels: contents,
      count: await prisma.channel.count({ where: query }),
    };
  }

  let query = {};
  const sortingQuery = buildSorting(queryParams.sorting);

  if (queryParams.filter) {
    let parsedFilter:queryBuilderType[] = JSON.parse(queryParams.filter);
    for (let items of parsedFilter) {
      const subQuery = columnQueryBuilder(items);
      query = {
        ...query,
        ...subQuery,
      };
    }
  }
console.log(query,'query')
  const contents = await prisma.channel.findMany({
    where: query,
    skip: queryParams.page?JSON.parse(queryParams.page).pageIndex:0,
    take:queryParams.page?JSON.parse(queryParams.page).pageSize:5,
    orderBy: sortingQuery,
  });


  return {
    channels: contents,
    count: await prisma.channel.count({ where: query }),
  };
}

//search name of fild so id, value  ohter filds

function columnQueryBuilder(items: {
  id: string;
  filterValue:
    | "text"
    | "autoComplete"
    | "select"
    | "multi-select"
    | "range"
    | "range-slider"
    | "date"
    | "datetime"
    | "date-range"
    | "datetime-range"
    | "time"
    | "time-range"
    | "checkbox";
  value: string | string[] | null | undefined;
  filterMode:
    | "fuzzy"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "equals"
    | "notEquals"
    | "between"
    | "betweenInclusive"
    | "greaterThan"
    | "lessThan"
    | "greaterThanOrEqual"
    | "lessThanOrEqual"
    | "empty"
    | "notEmpty";
}) {

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

function globalFilterQueryBuilder(globalFilter: string, fields: string[]) {
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

function buildSorting(sortingQuery: string | undefined) {
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





//DATE time and datetime range,empty and not empty