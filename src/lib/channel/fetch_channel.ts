import { prisma } from "@/config/prisma-client";
import { empty } from "@prisma/client/runtime/library";
import { equal } from "assert";
import { channel } from "diagnostics_channel";
import { queryBuilderType } from "@/utils/types";
import { globalFilterQueryBuilder,buildSorting,columnQueryBuilder } from "@/utils/filtering";
import  {accessibleBy} from "@casl/prisma"
import { buildAbility } from "@/utils/caslPrisma";
import {auth}  from '@/auth'

export async function fetchChannels(queryParams: {
  globalFilter?: string;
  filter?: string;
  sorting?: string;
  page?: string;
}) {

  const session=await auth()
  const ability=buildAbility(session?.user)
  console.log(ability.rules,'rules')

 
// const selected={

  

// }
  
//   const [read]=ability.rules.filter((rule)=>rule.action=='read')
//   console.log(read,'read')
//   if(read.fields.length){
//      for(let items of read.fields){
//        selected[items]=true
//   }
//  }

  if (queryParams.globalFilter) {
    const query = globalFilterQueryBuilder(queryParams.globalFilter, [
      "name",
      "type",
      "country",
    ]);



    const contents = await prisma.channel.findMany({

      where:{
        AND:[accessibleBy(ability).Channel,{...query}]
      },
      // select: {
      //   ...selected
      // }
      
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
  const contents = await prisma.channel.findMany({
    where:{
      AND:[accessibleBy(ability).Channel,{...query}]
    },
    skip: queryParams.page?JSON.parse(queryParams.page).pageIndex:0,
    take:queryParams.page?JSON.parse(queryParams.page).pageSize:5,
    orderBy: sortingQuery,
    // select: {
    //   ...selected
    // }
  });


  return {
    channels: contents,
    count: await prisma.channel.count({ where: query }),
  };
}

