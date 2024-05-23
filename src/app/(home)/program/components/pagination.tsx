"use client"
import * as React from 'react';
import { Pagination as Pa } from '@mui/material';

import { usePathname, useSearchParams ,useRouter} from 'next/navigation';
export default function Pagination({count}:{count:number}) {
    const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

 
  const createPageURL = (event: React.ChangeEvent<unknown>, page: number) => {

    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    replace(`${pathname}?${params.toString()}`);
   
  };
  return (
    
      <Pa count={Math.ceil(count/5)} variant="outlined" page={Number(searchParams.get("page"))} shape="rounded" onChange={createPageURL} />
  );
}
