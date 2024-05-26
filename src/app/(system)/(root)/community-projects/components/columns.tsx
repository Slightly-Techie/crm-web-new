"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IProject } from "@/types/types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StatusCheck from "./status_check";

export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: "name",
    header: "Project Name",
  },

  {
    accessorKey: "project_type",
    header: "Project Type",
    cell: ({ row }) => {
      const value = row.getValue("project_type") as string;

      return <StatusCheck project_type={value} />;
    },
  },

  {
    accessorKey: "project_priority",
    header: "Priority",
    cell: ({ row }) => {
      const value = row.getValue("project_priority") as string;

      return <StatusCheck priority={value} />;
    },
  },
  // {
  //   header: "More",
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const reference = row.original;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Link href={`/app/student/reference/${reference.id}`}>
  //               View request details
  //             </Link>
  //           </DropdownMenuItem>
  //           <DropdownMenuItem>
  //             <Link href={`/app/student/reference/${reference.id}#lecturer`}>
  //               View lecturer's Details
  //             </Link>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
