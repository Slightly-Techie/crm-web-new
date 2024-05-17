import { Metadata } from "next";
import ForgotPasswordForm from "./components/forgot-password";

export const metadata: Metadata = {
  title: "Slightly Techie Network | Forgot Password",
  description: "Recover your account",
};

function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}

export default ForgotPasswordPage;
