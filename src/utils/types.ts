export type User = {
    id: number;
    phoneNumber: string;
    password: string;
};



export type queryBuilderType={
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


  export const prismaMapperPrimitive = {
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
  
 export  const prismaMapperObject = {
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