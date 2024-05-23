"use client";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Box } from "@mui/material";

import AddContent from "./add_content";
import SwitchSatus from "./switch";
import Action from "./action";
import Pagination from "@/app/(home)/channel/components/pagination";
import { DataTable } from "./table";
import Search from "./search";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
export interface Content {
  id: number;
  title: string;
  duration: number;
  description: string;
  channelId: number;
  typeId: number;
  categoryId: number;
  videoUrl: string;
  coverImageUrl: string;
  status:boolean
}

export default function Container({
  content,
  count,
}: {
  content: Content[];
  count: number | undefined;
}) {
 

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const columns: ColumnDef<Content>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "duration",
      header: "Duration",
    },
    {
      accessorKey: "description",
      header: "Desciption",
    },
    {
      accessorKey: "status",
      header: "Status",
      enableHiding: false,
      cell: ({ row }) => (
        <Box>
          <SwitchSatus checked={row.original.status} id={row.original.id} />
        </Box>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",

      cell: ({ row }) => (
        <Action
          id={row.original.id}
          title={row.original.title}
          description={row.original.description}
          status={row.original.status}
        />
      ),
    },
  ];

  return (
    <Paper
      sx={{ height: "100%", padding: "2rem", width: "100%" }}
      elevation={3}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "4rem",
        }}
      >
        <Search />
        <Button
          sx={{
            bgcolor: "#000222",
            color: "white",
            ":hover": {
              backgroundColor: "#000222",
            },
          }}
          onClick={() => setOpen(true)}
        >
          Add Content
        </Button>
      </Box>
      <AddContent open={open} handelClose={handleClose} />

      <DataTable data={content} columns={columns} />

      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Pagination count={count || 0} />
      </Box>
    </Paper>
  );
}
