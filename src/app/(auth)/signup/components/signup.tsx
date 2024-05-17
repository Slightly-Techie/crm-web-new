"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "This is a required field.",
  }),
  password: z.string().min(1, {
    message: "This is a required field.",
  }),
});

export default function SignUpForm() {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Use this to toggle the sign up flow
  const isActive = false;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmittingForm(true);
  }
  return (
    <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block relative p-8">
        <div className="bg-[#121212] w-full h-full rounded-3xl"></div>
      </div>
      <div className="lg:col-span-1 w-full flex items-center">
        <div className="w-full">
          {isActive ? (
            <div className="max-w-md mx-auto px-6">
              <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Welcome to CRM
              </h4>
              <p className="text-sm text-neutral-600 mt-2">
                Already have an account?{" "}
                <span className="font-semibold text-black dark:text-white">
                  <Link href={`/login`}>Log In</Link>
                </span>
              </p>
              <br />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 w-full"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} autoFocus />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Sign Up
                  </Button>
                </form>
              </Form>
            </div>
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
