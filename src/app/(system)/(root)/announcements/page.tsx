"use client";
import Spinner from "@/components/spinner";
// import { useFetchAnnouncements } from "@/services/AnnouncementServices";
import { getTimeElapsedOrDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import PageTitle from "../components/pagetitle";
import { useState } from "react";
import useEndpoints from "@/hooks/use_endpoints";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Search } from "lucide-react";

const filteredItems = [
  {
    id: 1,
    title: "Announcement 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    created_at: "2021-10-10T10:10:10.000Z",
  },
];

function Page() {
  //   const { isFetching, Announcements } = useFetchAnnouncements(10);
  const [currentLimit] = useState(10);
  const isFetching = false;
  //   const paginatedData = Announcements && Announcements.slice(0, currentLimit);
  // const showMore = () => {
  //   if (paginatedData.length === Announcements.length) {
  //     setCurrentLimit((prevLimit) => prevLimit - 3);
  //     return;
  //   }
  //   setCurrentLimit((prevLimit) => prevLimit + 3);
  // };
  const [isAdmin] = useState<boolean>(true);
  const [query, setQuery] = useState<string>("");

  //   const filteredItems = paginatedData?.filter((item) => {
  //     const projectMatch = item?.title
  //       ?.toLowerCase()
  //       .includes(query.toLowerCase());
  //     return projectMatch;
  //   });

  const session = useSession();

  const { getUserProfile } = useEndpoints();

  const { data: role } = useQuery({
    queryKey: ["user_profile"],
    enabled: session.status === "authenticated",
    queryFn: () => getUserProfile().then((res) => res?.data?.role?.name),
    refetchOnWindowFocus: false,
  });

  return (
    <section>
      <PageTitle title="Announcements" />
      <section className="flex flex-col lg:flex-row w-full h-full pt-[7vh]">
        {/* Left */}
        <section className="lg:w-[70%] h-screen overflow-y-auto border-r dark:border-r-neutral-700">
          <section className="flex justify-between items-center w-full p-5 ">
            <section className="w-[50%] flex items-center py-2 px-3 gap-2 border rounded-md">
              <input
                type="text"
                className="w-full bg-transparent border-none placeholder-st-gray-500 text-black dark:text-white focus:outline-none "
                placeholder="Search by keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search size={16}/>
            </section>
            {/* Add Filter and Sort Dropdowns */}
            {role === "admin" && (
              <Link
                href={"/admin/announcements"}
                className=" border dark:border-none bg-primary-dark text-white dark:bg-st-surfaceDark px-4 py-2 rounded text-sm"
              >
                Create Announcement
              </Link>
            )}
          </section>
          <section className="p-5">
            {isFetching ? (
              <Spinner />
            ) : filteredItems?.length > 0 ? (
              filteredItems?.map((item) => {
                return (
                  <section
                    key={item.id}
                    className="border dark:border-none bg-neutral-100 dark:bg-st-cardDark my-3 p-5 rounded-lg"
                  >
                    <section className="flex justify-between items-center">
                      <h2 className="font-bold text-lg">{item.title}</h2>
                      <span className="text-[#9F9F9F] text-[13px]">
                        {getTimeElapsedOrDate(item.created_at!)}
                      </span>
                    </section>
                    <p className="text-[#9F9F9F]">{item.content}</p>
                  </section>
                );
              })
            ) : (
              <h1 className="text-center text-2xl text-[#777777]">
                Sorry, this announcement does not exist.
              </h1>
            )}
          </section>
        </section>
        {/* Right */}
        <section className="lg:w-[30%] my-2 p-5">
          <h1 className="font-semibold md:text-xl">Techie of the Month</h1>
          <hr className="my-5 border dark:border-neutral-700" />
        </section>
      </section>
    </section>
  );
}

export default Page;
