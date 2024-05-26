"use client";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import StatusCheck from "./components/status_check";
import Link from "next/link";
import useEndpoints from "@/hooks/use_endpoints";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/spinner";
import PageTitle from "../components/pagetitle";
import { IProject } from "@/types/types";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const projects: IProject[] = [
  {
    id: "1",
    name: "Project 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    project_priority: "LOW PRIORITY",
    project_type: "PAID",
    project_tools: ["react", "nextjs", "tailwind"],
  },
  {
    id: "2",
    name: "Project 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    project_priority: "HIGH PRIORITY",
    project_type: "COMMUNITY",
    project_tools: ["react", "nextjs", "tailwind"],
  },
  {
    id: "3",
    name: "Project 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    project_priority: "MEDIUM PRIORITY",
    project_type: "COMMUNITY",
    project_tools: ["react", "nextjs", "tailwind"],
  },
];

function CommunityProjectsPage() {
  const [isAdmin] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const { getProjects } = useEndpoints();

  // const {
  //   data: Projects,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ["projects"],
  //   queryFn: () => getProjects(),
  //   refetchOnWindowFocus: false,
  //   retry: 3,
  // });

  // const projectList = Projects?.data.items;

  const filteredItems = projects?.filter((item) => {
    const projectMatch = item?.name
      ?.toLowerCase()
      .includes(query.toLowerCase());
    return projectMatch;
  });

  return (
    <main>
      <PageTitle title="Community Projects" />
      <section className="pt-[7vh]">
        <section className="flex justify-between items-center w-full my-2 p-5">
          <section className="w-3/5 flex items-center py-2 px-3 gap-2 border rounded-md">
            <input
              type="text"
              className="w-full bg-transparent border-none placeholder-st-gray-500 text-black dark:text-white focus:outline-none"
              placeholder="Search by keyword"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchIcon size={16} />
          </section>
          {isAdmin && (
            <Link
              href={"/admin/add-project"}
              className="border dark:border-none bg-primary-dark text-primary-light hover:bg-st-edgeDark dark:bg-white dark:text-st-surfaceDark hover:dark:bg-neutral-100 px-4 py-2 rounded text-sm"
            >
              Add Project
            </Link>
          )}
        </section>
        <section className="p-5">
          <div className="relative overflow-x-auto">
            {/* {isLoading && <Spinner />} */}

            {projects &&
              (filteredItems?.length! > 0 ? (
                <DataTable columns={columns} data={filteredItems} />
              ) : (
                <h1 className="text-center text-2xl text-[#777777]">
                  Sorry, this project does not exist.
                </h1>
              ))}

            {/* {isError && <h1>Data Failed to load</h1>} */}
          </div>
        </section>
      </section>
    </main>
  );
}

export default CommunityProjectsPage;
