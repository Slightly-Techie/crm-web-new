"use client";
import { useState } from "react";
import { SearchIcon } from "lucide-react";
import StatusCheck from "./components/status_check";
import Link from "next/link";
import useEndpoints from "@/hooks/use_endpoints";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/spinner";
import PageTitle from "../components/pagetitle";

function CommunityProjectsPage() {
  const [isAdmin] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");
  const { getProjects } = useEndpoints();

  const {
    data: Projects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const projectList = Projects?.data.items;

  const filteredItems = projectList?.filter((item) => {
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
            {isLoading && <Spinner />}

            {Projects &&
              (filteredItems?.length! > 0 ? (
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Project name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Project type
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Project Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems?.map((item) => {
                      return (
                        <tr
                          key={item.name}
                          className="dark:bg-[#121212] text-black dark:text-white border-b w-full"
                        >
                          <td className="px-6 py-3">{item.name}</td>
                          <td className="px-6 py-3">
                            {<StatusCheck project_type={item.project_type} />}
                          </td>
                          <td className="px-6 py-3">
                            {<StatusCheck priority={item?.project_priority} />}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <h1 className="text-center text-2xl text-[#777777]">
                  Sorry, this project does not exist.
                </h1>
              ))}

            {isError && <h1>Data Failed to load</h1>}
          </div>
        </section>
      </section>
    </main>
  );
}

export default CommunityProjectsPage;
