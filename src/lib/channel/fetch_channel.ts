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
      return splitted[0]?{ [search]: { contains: splitted[0] } }:null;
    } else if (splitted[2] === "startsWith") {

      return splitted[0]?{ [search]: { startsWith: splitted[0] } }:null;
    } else if (splitted[2] === "endsWith") {
      return splitted[0]?{ [search]: { endsWith: splitted[0] } }:null;
    } else if (splitted[2] == "equals") {
      return splitted[0]?{ [search]: { equals: splitted[0] } }:null;
    } else if (splitted[2] == "notEquals") {
      return splitted[0]?{ [search]: { not: splitted[0] } }:null;
    } else if (splitted[2] == "between") {
      let subSplit = splitted[0].split(",");
      return subSplit.length? {
        [search]: {
          gt: subSplit[0],
          lt: subSplit[1],
        },
      }:null;
    } else if (splitted[2] == "betweenInclusive") {
      let subSplit = splitted[0].split(",");
      return subSplit.length? {
        [search]: {
          gte: subSplit[0],
          lte: subSplit[1],
        },
      }:null;
    } else if (splitted[2] == "greaterThan") {
      return splitted[0]? { [search]: { gt: splitted[0] } }:null;
    } else if (splitted[2] == "greaterThanOrEqual") {
      return splitted[0]? { [search]: { gte: splitted[0] } }:null;
    } else if (splitted[2] == "lessThan") {
      return splitted[0]?{ [search]: { lt: splitted[0] } }:null;
    } else if (splitted[2] == "lessThanOrEqual") {
      return splitted[0]?{ [search]: { lte: splitted[0] } }:null;
    }
  } else if (splitted[1] === "multiSelect") {
    if (splitted[2] === "contains") {
      let subSplit = splitted[0].split(",");
      let searchArray = subSplit.map((item) => {
        return item?{ [search]: { contains: item } }:null;
      });
      return { OR: searchArray };
    } else if (splitted[2] === "startsWith") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return item? { [search]: { startsWith: item } }:null;
      });
      return { OR: searchArry };
      // return { [search]: { startsWith: splitted[0] } };
    } else if (splitted[2] === "endsWith") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return item? { [search]: { endsWith: item } }:null;
      });
      return { OR: searchArry };
      // return { [search]: { endsWith: splitted[0] } };
    } else if (splitted[2] == "equals") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return item? { [search]: { equals: item } }:null;
      });
      return { OR: searchArry };
      // return { [search]: { equals: splitted[0] } };
    } else if (splitted[2] == "notEquals") {
      let subSplit = splitted[0].split(",");
      // let searchArray = subSplit.map(item => {
      //   return { NOT: { [search]: {equals:item} } };
      // });
      return subSplit.length?{ NOT: { [search]: { in: subSplit } } }:null;
    } else if (splitted[2] == "greaterThan") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return item?{ [search]: { gt: item } }:null;
      });
      return { OR: searchArry };
      // return { [search]: { gt: splitted[0] } };
    } else if (splitted[2] == "greaterThanOrEqual") {
      let subSplit = splitted[0].split(",");
      return subSplit.length? { [search]: { in: subSplit } }:null;
    } else if (splitted[2] == "lessThan") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return item? { [search]: { lt: item } }:null;
      });
      return { OR: searchArry };
      // return { [search]: { lt: splitted[0] } };
      // return { [search]: { lt: splitted[0] } };
    } else if (splitted[2] == "lessThanOrEqual") {
      let subSplit = splitted[0].split(",");
      let searchArry = subSplit.map((item) => {
        return item?{ [search]: { lte: item } }:null;
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
      return subSplit.length?{
        [search]: {
          gte: Number(subSplit[0]),
          lte: Number(subSplit[1]),
        },
      }:null;
    }
  } else if (splitted[1] === "date") {
    if (splitted[2] === "contains") {
      return  splitted[0]?{ [search]: { contains: new Date(splitted[0]).getTime() } }:null;
    } else if (splitted[2] === "startsWith") {
      return splitted[0]?{ [search]: { startsWith: new Date(splitted[0]) } }:null;
    } else if (splitted[2] === "endsWith") {
      return splitted[0]? { [search]: { endsWith: splitted[0] } }:null;
    } else if (splitted[2] == "equals") {
      return { [search]: { equals: new Date(splitted[0]) } };
    } else if (splitted[2] == "notEquals") {
      return splitted[0]?{ [search]: { not: new Date(splitted[0]) } }:null;
    } else if (splitted[2] == "between") {
      let subSplit = splitted[0].split(",");
      return subSplit.length? {
        [search]: {
          gt: subSplit[0],
          lt: subSplit[1],
        },
      }:null;
    } else if (splitted[2] == "betweenInclusive") {
      let subSplit = splitted[0].split(",");
      return subSplit.length? {
        [search]: {
          gte: subSplit[0],
          lte: subSplit[1],
        },
      }:null;
    } else if (splitted[2] == "greaterThan") {
      return splitted[0]? { [search]: { gt: new Date(splitted[0]) } }:null;
    } else if (splitted[2] == "greaterThanOrEqual") {
      return splitted[0]? { [search]: { gte: new Date(splitted[0]) } }:null;
    } else if (splitted[2] == "lessThan") {
      return splitted[0]? { [search]: { lt: new Date(splitted[0]) } }:null;
    } else if (splitted[2] == "lessThanOrEqual") {
      return splitted[0]? { [search]: { lte: new Date(splitted[0]) } }:null;
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
