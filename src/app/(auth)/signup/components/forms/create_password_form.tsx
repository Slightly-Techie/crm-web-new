import { NewUserFields } from "@/types";
import React from "react";
import { FieldErrors, RegisterOptions, UseFormWatch } from "react-hook-form";

type PasswordFields = "password" | "password_confirmation";

type TPasswordType = Pick<NewUserFields, PasswordFields>;

type PasswordFormType = {
  register: (name: PasswordFields, options?: RegisterOptions) => {};
  errors: FieldErrors<TPasswordType>;
  watch: UseFormWatch<NewUserFields>;
};

function CreatePasswordForm({ register, errors, watch }: PasswordFormType) {
  return <div>CreatePasswordForm</div>;
}

export default CreatePasswordForm;
