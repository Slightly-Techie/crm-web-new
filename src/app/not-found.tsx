"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  const router = useRouter();
  const goBack = (): void => {
    return router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-neutral-50">
            404 - Page Not Found
          </h2>
          <p className="mt-2 text-center font-normal text-gray-600 dark:text-neutral-400">
            The page you are looking for does not exist. It might have been
            moved or deleted.
          </p>
        </div>
        <div className="mt-5">
          <Button
            onClick={goBack}
            className="group w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md transition-all ease duration-100"
          >
            <ArrowLeftIcon height={16} width={16} className="mr-2" />
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
