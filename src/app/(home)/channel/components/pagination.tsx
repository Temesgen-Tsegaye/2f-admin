"use client"
import * as React from 'react';
import { Pagination as Pa } from '@mui/material';

import { usePathname, useSearchParams ,useRouter} from 'next/navigation';
export default function Pagination({count}:{count:number}) {

    const [page,setPage]=React.useState(1)
    const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;
  const createPageURL = (event: React.ChangeEvent<unknown>, page: number) => {
    // setPage(Number(page))

    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
   
  };
  return (
    
      <Pa count={count} variant="outlined" page={page} shape="rounded" onChange={createPageURL} />
  );
}
