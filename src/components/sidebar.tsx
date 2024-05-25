"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import Image from "next/image";
import useEndpoints from "@/hooks/use_endpoints";
import { ITechie } from "@/types/types";
import { usePathname } from "next/navigation";
import { AlignJustifyIcon } from "lucide-react";
import {
  UserIcon,
  HomeIcon,
  BellIcon,
  HourglassIcon,
  BarChartIcon,
  TargetIcon,
  LogOutIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// import ThemeSwitcher from "@/components/theme/theme";
import { signOut, useSession } from "next-auth/react";

const Navlinks = [
  {
    title: "DASHBOARD",
    links: [
      //   {
      //     id: "d1",
      //     name: "Overview",
      //     link: "/",
      //     icon: <HomeIcon size={14} />,
      //   }, intentionally omitted because the overview page is not supposed to be the feed page
      {
        id: "d3",
        name: "Feed",
        link: "/",
        icon: <BarChartIcon size={14} />,
      },
      {
        id: "d2",
        name: "Applicants",
        link: "/admin/applicants",
        icon: <HourglassIcon size={14} />,
      },
    ],
  },
  {
    title: "COMMUNITY",
    links: [
      {
        id: "c1",
        name: "Techies",
        link: "/techies",
        icon: <UserIcon size={14} />,
      },
      // {
      //   id: "c2",
      //   name: "Leaderboard",
      //   link: "/leaderboard",
      //   icon: <BsBarChart size={20} />,
      // },
      {
        id: "c3",
        name: "Announcements",
        link: "/announcements",
        icon: <BellIcon size={14} />,
      },
      {
        id: "c4",
        name: "Community Projects",
        link: "/community-projects",
        icon: <TargetIcon size={14} />,
      },
      // {
      //   id: "c5",
      //   name: "Marketplace",
      //   link: "/marketplace",
      //   icon: <BsCart2 size={20} />,
      // },
      // {
      //   id: "c6",
      //   name: "Points System",
      //   link: "/points-system",
      //   icon: <LuPuzzle size={20} />,
      // },
    ],
  },
];

function Sidebar() {
  const { getUserProfile } = useEndpoints();
  const session = useSession();
  const [navToggle, setNavToggle] = useState<boolean>(false);
  const [user, setUser] = useState<undefined | ITechie>();
  const { data: role } = useQuery({
    queryKey: ["user_profile"],
    enabled: session.status === "authenticated",
    queryFn: () => getUserProfile().then((res) => res?.data?.role?.name),
    refetchOnWindowFocus: false,
  });

  const pathname = usePathname();

  const isActive = (href: string) => {
    if (pathname !== "/" && href === "/") {
      return false;
    }
    return pathname?.startsWith(href);
  };

  return (
    <header>
      <nav className="hidden xl:block xl:w-[20vw] sticky top-0 h-screen p-4 z-[50] border-l border-r border-r-neutral-700 border-l-neutral-700 bg-primary-dark text-white">
        <section className="flex flex-col justify-between items-center h-full">
          {/* Top Section */}
          <section className="w-full">
            <Link href={"/"}>
              <button className="bg-gray-600 p-2 mx-auto rounded-sm text-[white]">
                <h1 className="font-bold text-lg">ST</h1>
              </button>
            </Link>
            <section>
              {Navlinks.map((link) => {
                return (
                  <section key={link.title} className="my-5">
                    <p className="text-complementary font-bold text-xs mb-3 text-[#9EA1AB]">
                      {link.title}
                    </p>
                    <section className="flex flex-col gap-1">
                      {link.links.map((item) => {
                        const active = isActive(item.link);
                        if (role === "user" && item.name === "Applicants") {
                          return <></>;
                        }
                        return (
                          <Link href={item.link} key={item.id}>
                            <section
                              className={`${
                                active ? "bg-neutral-800" : ""
                              } flex hover:bg-neutral-900 rounded-lg p-2 items-center text-white gap-3`}
                            >
                              {item.icon}
                              <p className=" text-white text-sm">{item.name}</p>
                            </section>
                          </Link>
                        );
                      })}
                    </section>
                  </section>
                );
              })}
            </section>
          </section>
          {/* Bottom Section */}
          <section className="w-full">
            {/* <ThemeSwitcher /> */}
            {/* <br /> */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <section className="flex gap-3 items-center mb-5">
                  <Image
                    className="w-10 h-10 aspect-square object-cover shrink-0 rounded-full"
                    width={1000}
                    height={1000}
                    src={
                      user?.profile_pic_url
                        ? user?.profile_pic_url
                        : `https://avatars.dicebear.com/api/initials/${user?.first_name} ${user?.last_name}.svg`
                    }
                    alt="profile"
                    placeholder="blur"
                    blurDataURL={`https://avatars.dicebear.com/api/initials/${user?.first_name} ${user?.last_name}.svg`}
                    priority={true}
                  />
                  <section>
                    <p className=" text-left font-semibold text-sm text-white">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-complementary text-sm text-st-subTextDark">
                      {user?.email}
                    </p>
                  </section>
                </section>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <section className="text-white flex flex-col justify-center gap-5 p-2 z-100 bg-black">
                  <a href="/techie/me" className="flex items-center gap-3">
                    <UserIcon size={14} />
                    <p className="font-bold text-sm">Profile</p>
                  </a>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3"
                  >
                    <LogOutIcon size={14} />
                    <p className="font-bold text-sm">Log Out</p>
                  </button>
                </section>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </section>
      </nav>
      {/* Navbar- Mobile */}
      <section className="block lg:hidden fixed top-0 left-0 z-50 w-full bg-primary-dark h-[7vh]">
        <section className="flex justify-between items-center p-5 w-full h-full">
          <Link href={"/"}>
            <button className="bg-gray-600 p-1 mx-auto rounded-sm text-white">
              <h1 className="font-bold text-xs">ST</h1>
            </button>
          </Link>
          <section
            className="border p-1 rounded"
            onClick={() => setNavToggle(!navToggle)}
          >
            <AlignJustifyIcon size={14} />
          </section>
        </section>
      </section>
      {/* Mobile Nav Toggle */}
      <section
        className={
          navToggle
            ? "fixed z-[50] mt-[7vh] ease duration-500 h-[93vh] top-0 left-0 w-screen bg-white dark:bg-primary-dark p-5"
            : "fixed z-[50] mt-[7vh] ease duration-500 h-[93vh] top-0 left-[-100vw] w-screen bg-white dark:bg-primary-dark p-5"
        }
      >
        <section className="flex flex-col justify-between h-full">
          {/* Top Section */}
          <section>
            {Navlinks.map((link) => {
              return (
                <section key={link.title} className="my-5">
                  <p className="text-complementary font-bold text-sm mb-3">
                    {link.title}
                  </p>
                  <section className="flex flex-col gap-y-5">
                    {link.links.map((item) => {
                      return (
                        <Link href={item.link} key={item.id}>
                          <section className="flex items-center gap-3">
                            {item.icon}
                            <p className=" text-sm">{item.name}</p>
                          </section>
                        </Link>
                      );
                    })}
                  </section>
                </section>
              );
            })}
          </section>
          {/* Bottom Section */}
          <section className="w-full">
            <br />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <section className="flex gap-3 items-center mb-5">
                  {user && (
                    <Image
                      className="w-10 h-10 aspect-square object-cover shrink-0 rounded-full"
                      width={1000}
                      height={1000}
                      src={
                        (user?.profile_pic_url === ""
                          ? `https://api.dicebear.com/7.x/initials/jpg?seed=${user?.first_name} ${user?.last_name}`
                          : `${user?.profile_pic_url}`) ||
                        `https://api.dicebear.com/7.x/initials/jpg?seed=${user?.first_name} ${user?.last_name}`
                      }
                      alt={user?.username as string}
                      placeholder="blur"
                      blurDataURL={`https://api.dicebear.com/7.x/initials/jpg?seed=${user?.first_name} ${user?.last_name}`}
                      priority={true}
                    />
                  )}
                  <section>
                    <p className="font-semibold text-sm">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-complementary text-sm">{user?.email}</p>
                  </section>
                </section>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <section className="text-white flex flex-col justify-center gap-5 p-2">
                  <section className="flex items-center gap-3">
                    <UserIcon size={14} />
                    <p className="font-bold text-sm">Profile</p>
                  </section>
                  <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <LogOutIcon size={14} />
                    Log Out
                  </button>
                </section>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
        </section>
      </section>
    </header>
  );
}

export default Sidebar;
