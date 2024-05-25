import { ReactNode } from "react";
import Sidebar from "@/components/sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full min-h-screen max-w-screen-2xl mx-auto grid lg:grid-cols-[20vw_auto] text-primary-dark dark:bg-primary-dark dark:text-primary-light ">
      <Sidebar />
      <section className="w-full h-full">
        <section className=" pt-[7vh] lg:pt-0 w-full border-r dark:border-r-neutral-700 h-screen overflow-y-auto">
          {children}
        </section>
      </section>
    </main>
  );
}
