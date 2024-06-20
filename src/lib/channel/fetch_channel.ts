import { prisma } from "@/config/prisma-client";
import { empty } from "@prisma/client/runtime/library";
import { equal } from "assert";
import { channel } from "diagnostics_channel";
import { queryBuilderType } from "@/utils/types";
import { globalFilterQueryBuilder,buildSorting,columnQueryBuilder } from "@/utils/filtering";

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

