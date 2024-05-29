"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
});

function ForgotPasswordForm() {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center h-full max-w-md mx-auto p-5">
        <div className="w-full">
          <div className="mb-5 w-fit">
            <Logo />
          </div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Forgot your password?
          </h3>
          <p className="text-sm text-neutral-600 mt-2">
            Not a problem! It happens to the best of us.
          </p>
          <br />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      A verification code will be sent for you to reset your
                      password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <br />
              <Link href={`/login`}>
                <p className="text-sm text-neutral-600 underline underline-offset-4 hover:text-primary ease-in duration-200">
                  I remember my password
                </p>
              </Link>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
