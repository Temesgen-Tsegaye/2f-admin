import React from 'react'
import {
    MRT_GlobalFilterTextField,
      MRT_ShowHideColumnsButton,
      MRT_TablePagination,
      MRT_ToggleDensePaddingButton,
      MRT_ToggleFiltersButton,
      MRT_ToolbarAlertBanner,
      useMaterialReactTable,
      type MRT_ColumnDef,
      MRT_TableContainer,
    } from 'material-react-table';
export default function Aa({table}) {
  return (
    <div>
      <MRT_GlobalFilterTextField  table={table}/>

    </div>
  )
}
