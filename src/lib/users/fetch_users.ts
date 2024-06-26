import { prisma } from "@/config/prisma-client";

import { queryBuilderType } from "@/utils/types";
import { globalFilterQueryBuilder,buildSorting,columnQueryBuilder } from "@/utils/filtering";

export async function fetchUsers(queryParams: {
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

    const users = await prisma.user.findMany({
      where: query,
      include: {
        role:{
          select:{
           id:true,
           name:true
           }
        },
      
      }
      
    });

    return {
      users,
      count: await prisma.user.count({ where: query }),
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
  const users = await prisma.user.findMany({
    where: query,
    skip: queryParams.page?JSON.parse(queryParams.page).pageIndex:0,
    take:queryParams.page?JSON.parse(queryParams.page).pageSize:5,
    orderBy: sortingQuery,
    include: {
      role: true,
    }
  });


  return {
    users,
    count: await prisma.user.count({ where: query }),
  };
}

