import { prisma } from "@/config/prisma-client";
import { channel } from "diagnostics_channel";

export async function fetchChannels(search: object, page:any) {

       
      
     if(page){
      console.log(JSON.parse(page),'pagepage')
     }
    
             
  if (search.globalFilter) {
    const query = globalFilterQueryBuilder(search.globalFilter, [
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
  for (let items in search) {
    const subQuery = columnQueryBuilder(items, search[items]);
    query = {
      ...query,
      ...subQuery,
    };
  }
  const contents = await prisma.channel.findMany({
    where: query,
    skip: page ?JSON.parse(page).pageIndex * 5:0,
    take: page? JSON.parse(page).pageSize:5,
  });

  return {
    channels: contents,
    count: await prisma.channel.count({ where: query }),
  };
}

function columnQueryBuilder(search: string, value: string) {
  let splitted = value.split("@@@@");
  if (splitted[1] === "text" || splitted[1] === "select") {
    if(splitted[2] === "fuzzy"){ 

  

    }else if (splitted[2] === "contains") {
      return { [search]: { contains: splitted[0] } };
    } else if (splitted[2] === "startsWith") {

      return  { [search]: { startsWith: splitted[0] } };
    } else if (splitted[2] === "endsWith") {
      return { [search]: { endsWith: splitted[0] } };
    } else if (splitted[2] == "equals") {
      return { [search]: { equals: splitted[0] } };
    } else if (splitted[2] == "notEquals") {
      return { [search]: { not: splitted[0] } };
    } else if (splitted[2] == "between") {
      let subSplit = splitted[0].split(",");
      return {
        [search]: {
          gt: subSplit[0],
          lt: subSplit[1],
        },
      };
    } else if (splitted[2] == "betweenInclusive") {
      let subSplit = splitted[0].split(",");
      return {
        [search]: {
          gte: subSplit[0],
          lte: subSplit[1],
        },
      };
    } else if (splitted[2] == "greaterThan") {
      return { [search]: { gt: splitted[0] } };
    } else if (splitted[2] == "greaterThanOrEqual") {
      return { [search]: { gte: splitted[0] } };
    } else if (splitted[2] == "lessThan") {
      return { [search]: { lt: splitted[0] } };
    } else if (splitted[2] == "lessThanOrEqual") {
      return { [search]: { lte: splitted[0] } };
    }
  } else if (splitted[1] === "multiSelect") {
    if (splitted[2] === "contains") {
      let subSplit = splitted[0].split(",");
      let searchArray = subSplit.map((item) => {
        return { [search]: { contains: item } };
      });
      return { OR: searchArray };
    } else if (splitted[2] === "startsWith") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return { [search]: { startsWith: item } };
      });
      return { OR: searchArry };
      // return { [search]: { startsWith: splitted[0] } };
    } else if (splitted[2] === "endsWith") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return { [search]: { endsWith: item } };
      });
      return { OR: searchArry };
      // return { [search]: { endsWith: splitted[0] } };
    } else if (splitted[2] == "equals") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return { [search]: { equals: item } };
      });
      return { OR: searchArry };
      // return { [search]: { equals: splitted[0] } };
    } else if (splitted[2] == "notEquals") {
      let subSplit = splitted[0].split(",");
      // let searchArray = subSplit.map(item => {
      //   return { NOT: { [search]: {equals:item} } };
      // });
      return { NOT: { [search]: { in: subSplit } } };
    } else if (splitted[2] == "greaterThan") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return { [search]: { gt: item } };
      });
      return { OR: searchArry };
      // return { [search]: { gt: splitted[0] } };
    } else if (splitted[2] == "greaterThanOrEqual") {
      let subSplit = splitted[0].split(",");
      return { [search]: { in: subSplit } };
    } else if (splitted[2] == "lessThan") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return { [search]: { lt: item } };
      });
      return { OR: searchArry };
      // return { [search]: { lt: splitted[0] } };
      // return { [search]: { lt: splitted[0] } };
    } else if (splitted[2] == "lessThanOrEqual") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return { [search]: { lte: item } };
      });
      return { OR: searchArry };
    }
  } else if (splitted[1] === "range") {
    if (splitted[2] == "between") {
      let subSplit = splitted[0].split(",");
      return {
        [search]: {
          gt: Number(subSplit[0]),
          lt: Number(subSplit[1]),
        },
      };
    } else if (splitted[2] == "betweenInclusive") {
      let subSplit = splitted[0].split(",");
      return {
        [search]: {
          gte: Number(subSplit[0]),
          lte: Number(subSplit[1]),
        },
      };
    }
  } else if (splitted[1] === "date") {
    if (splitted[2] === "contains") {
      return { [search]: { contains: new Date(splitted[0]).getTime() } };
    } else if (splitted[2] === "startsWith") {
      return { [search]: { startsWith: new Date(splitted[0]) } };
    } else if (splitted[2] === "endsWith") {
      return { [search]: { endsWith: splitted[0] } };
    } else if (splitted[2] == "equals") {
      return { [search]: { equals: new Date(splitted[0]) } };
    } else if (splitted[2] == "notEquals") {
      return { [search]: { not: new Date(splitted[0]) } };
    } else if (splitted[2] == "between") {
      let subSplit = splitted[0].split(",");
      return {
        [search]: {
          gt: subSplit[0],
          lt: subSplit[1],
        },
      };
    } else if (splitted[2] == "betweenInclusive") {
      let subSplit = splitted[0].split(",");
      return {
        [search]: {
          gte: subSplit[0],
          lte: subSplit[1],
        },
      };
    } else if (splitted[2] == "greaterThan") {
      return { [search]: { gt: new Date(splitted[0]) } };
    } else if (splitted[2] == "greaterThanOrEqual") {
      return { [search]: { gte: new Date(splitted[0]) } };
    } else if (splitted[2] == "lessThan") {
      return { [search]: { lt: new Date(splitted[0]) } };
    } else if (splitted[2] == "lessThanOrEqual") {
      return { [search]: { lte: new Date(splitted[0]) } };
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
