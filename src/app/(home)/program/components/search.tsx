import React from 'react'
import { TextField,Box } from '@mui/material'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { FaSearch } from 'react-icons/fa';
import InputAdornment from '@mui/material/InputAdornment';
export default function Search() {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
   
        const params = new URLSearchParams(searchParams);
          params.set('page', '1');
        if (term) {
          params.set('query', term);
        } else {
          params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
      },1000);
      
  return (
    <Box>


    <TextField
    

    InputProps={{

        startAdornment: (
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          ),
        style:{
        padding:"0.5rem",
        height:'2rem'
        }
    }}
      defaultValue={searchParams.get('query')?.toString()}
       onChange={(e) => {
         handleSearch(e.target.value);
       }}/>
      
    </Box>
  )
}
