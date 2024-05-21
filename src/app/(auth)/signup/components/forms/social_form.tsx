import { NewUserFields } from "@/types";
import React from "react";
import { FieldErrors, RegisterOptions } from "react-hook-form";

type SocialsFields =
  | "twitter_profile"
  | "linkedin_profile"
  | "github_profile"
  | "portfolio_url";

type TSocialsType = Pick<NewUserFields, SocialsFields>;

type SocialsFormType = {
  register: (name: SocialsFields, options?: RegisterOptions) => {};
  errors: FieldErrors<TSocialsType>;
};

function SocialForm({ register, errors }: SocialsFormType) {
  return <div>SocialForm</div>;
}

export default SocialForm;
