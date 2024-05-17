import React from "react";
import LoginForm from "./components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Slightly Techie Network | Sign In",
  description: "Sign in to your CRM account",
};

function LoginPage() {
  return <LoginForm />;
}

export default LoginPage;
