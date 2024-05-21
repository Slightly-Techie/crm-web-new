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
import Logo from "@/components/ui/logo";
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

export default function LoginForm() {
  const router = useRouter();
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

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
        <div className="w-full h-full">
          <div className="h-full flex flex-col justify-center items-center">
            <h1 className="text-7xl">Slightly Techie Network 🚀</h1>
          </div>
        </div>
      </div>
      <div className="py-8 lg:py-0 lg:col-span-1 w-full flex items-center">
        <div className="w-full">
          <div className="max-w-md mx-auto px-6">
            <div className="w-full">
              <div className="mb-5 w-fit">
                <Logo />
              </div>
              <div>
                <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Log In to CRM
                </h4>
                <p className="text-sm text-neutral-600 mt-2">
                  Don&apos;t have an account?{" "}
                  <span className="font-semibold text-black dark:text-white">
                    <Link href={`signup`}>Sign Up</Link>
                  </span>
                </p>
              </div>
              <br />
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} autoFocus />
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
                  <br />
                  <Link href={`/forgot-password`}>
                    <p className="text-sm text-neutral-600 underline underline-offset-4 hover:text-white ease-in duration-200">
                      Forgot Password?
                    </p>
                  </Link>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
