import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGEXVALIDATION } from "@/constants";
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
  const [password, password_confirmation] = watch([
    "password",
    "password_confirmation",
  ]);

  const passwordMatch = password && password === password_confirmation;
  return (
    <div>
      <>
        <div className="my-4">
          <Label>Set A Password</Label>
          <Input
            {...register("password", {
              required: "This field must be specified",
              min: 8,
              max: 25,
              pattern: REGEXVALIDATION.password,
            })}
            placeholder="Enter your password"
            type="password"
          />
          {errors.password && (
            <small className="break-words">
              Password should be at least 8 characters and must contain an
              uppercase letter, lowercase letter, a number and a symbol
            </small>
          )}
        </div>
        <div className="my-4">
          <Label>Confirm Password</Label>
          <Input
            {...register("password_confirmation", {
              required: true,
              min: 8,
              max: 25,
              validate: (val: string) => {
                if (watch("password") !== val) {
                  return "Your passwords do no match";
                }
              },
            })}
            placeholder="Confirm your password"
            style={{
              borderColor: errors.password_confirmation
                ? "#b92828"
                : passwordMatch
                ? "#21c129"
                : "",
            }}
            type="password"
          />
          {errors.password_confirmation && (
            <small>Passwords do not match</small>
          )}
        </div>
      </>
    </div>
  );
}

export default CreatePasswordForm;
