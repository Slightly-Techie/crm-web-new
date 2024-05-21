"use client";
import { NEW_USER_DATA as INITIAL_USER_DATA } from "@/constants";
import useNavigateForms from "@/hooks/use_navigate";
import usePostNewSignUp from "@/hooks/use_signup";
import { NewUserFields } from "@/types";
import { getSkillsArray } from "@/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SubmissionStatus from "./forms/submit_status";

let NEW_USER_DATA: Partial<NewUserFields> = INITIAL_USER_DATA;

export default function SignUpForm() {
  const {
    handleSubmit,
    next,
    previous,
    resetForm,
    currentForm,
    currentFormIndex,
  } = useNavigateForms();
  const { createNewUser, status, setStatus, errMessage } = usePostNewSignUp();

  // Use this to toggle the sign up flow
  const isActive = true;

  const onSubmit = (data: Partial<NewUserFields>) => {
    NEW_USER_DATA = { ...NEW_USER_DATA, ...data };
    if (currentFormIndex === 3) {
      const { years_of_experience, skills } = NEW_USER_DATA;
      const validatedSkills = getSkillsArray(skills);
      NEW_USER_DATA = {
        ...NEW_USER_DATA,
        stack_id:
          Number(NEW_USER_DATA.stack_id) === -1 ? 1 : NEW_USER_DATA.stack_id,
        years_of_experience: Number(years_of_experience),
        skills: validatedSkills,
      };
      createNewUser(NEW_USER_DATA);
      return;
    }
    next();
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block relative p-8">
        <div className="w-full h-full">
          <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-7xl">Slightly Techie Network 🚀</h1>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1 w-full flex items-center">
        <div className="w-full">
          {isActive ? (
            // <div className="max-w-md mx-auto px-6">
            //   <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            //     Welcome to CRM
            //   </h4>
            //   <p className="text-sm text-neutral-600 mt-2">
            //     Already have an account?{" "}
            //     <span className="font-semibold text-black dark:text-white">
            //       <Link href={`/login`}>Log In</Link>
            //     </span>
            //   </p>
            //   <br />
            //   <Form {...form}>
            //     <form
            //       onSubmit={form.handleSubmit(onSubmit)}
            //       className="space-y-8 w-full"
            //     >
            //       <FormField
            //         control={form.control}
            //         name="email"
            //         render={({ field }) => (
            //           <FormItem>
            //             <FormLabel>Email</FormLabel>
            //             <FormControl>
            //               <Input type="text" {...field} autoFocus />
            //             </FormControl>
            //             <FormMessage />
            //           </FormItem>
            //         )}
            //       />
            //       <FormField
            //         control={form.control}
            //         name="password"
            //         render={({ field }) => (
            //           <FormItem>
            //             <FormLabel>Password</FormLabel>
            //             <FormControl>
            //               <Input type="password" {...field} />
            //             </FormControl>
            //             <FormMessage />
            //           </FormItem>
            //         )}
            //       />
            //       <Button type="submit" className="w-full">
            //         Sign Up
            //       </Button>
            //     </form>
            //   </Form>
            // </div>
            <div className="p-8 w-full md:w-[30rem] lg:w-5/6 mx-auto my-auto flex flex-col gap-4 justify-center h-full">
              <section className=" text-[#000] dark:text-[#f1f3f7]  text-[1.5rem] font-bold flex items-center gap-4">
                {currentFormIndex !== 0 && (
                  <button
                    onClick={previous}
                    type="button"
                    className="px-2 py-2 bg-[#fff] border border-[#333] hover:bg-[#333] dark:bg-[#F1F3F7] dark:hover:bg-[#ffffff] text-[#f1f3f7]  dark:text-[#000] rounded-full"
                  >
                    <ArrowLeft />
                  </button>
                )}
                <div>
                  <h3>Welcome to CRM🎉</h3>
                  <p className="text-[#777] text-[20px] font-normal">
                    Create your account
                  </p>
                </div>
              </section>
              <form onSubmit={handleSubmit(onSubmit)}>
                {currentForm.element}
                <section className="flex gap-4 mb-8">
                  {currentFormIndex <= 3 && (
                    <button className="px-8 py-2 bg-[#001] hover:bg-[#333] dark:bg-[#F1F3F7] dark:hover:bg-[#ffffff] text-[#f1f3f7] dark:text-[#000] rounded-lg w-full">
                      {currentFormIndex === 3 ? "Submit" : "Proceed"}
                    </button>
                  )}
                </section>
              </form>
            </div>
          ) : status !== "progress" ? (
            <SubmissionStatus
              status={status}
              message={
                status === "success" ? NEW_USER_DATA.first_name : errMessage
              }
              resetForm={() => {
                resetForm();
                setStatus("progress");
              }}
            />
          ) : (
            <div className="max-w-[550px] mx-auto px-6">
              <h2>Hey there! 👋</h2>
              <br />
              <h4>
                We appreciate your interest in joining our organization.
                <br />
                Right now, applications are taking little break.
              </h4>
              <br />
              <p>
                Don't worry though, we're constantly cooking up exciting
                opportunities! Keep an eye on our{" "}
                <span>
                  <Link
                    href={`https://twitter.com/_slightlyTechie`}
                    className="text-yellow-400"
                  >
                    twitter page
                  </Link>
                </span>{" "}
                and our{" "}
                <span>
                  <Link
                    href={`https://www.slightlytechie.com`}
                    className="text-yellow-400"
                  >
                    official website
                  </Link>
                </span>{" "}
                for updates on when applications will swing back open. We can't
                wait to welcome you aboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
