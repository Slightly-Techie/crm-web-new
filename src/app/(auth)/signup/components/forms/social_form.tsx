import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { REGEXVALIDATION } from "@/constants";
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
  return (
    <div>
      <>
        <div className=" my-4">
          <Label>Twitter Profile Link</Label>
          <Input
            {...register("twitter_profile", {
              pattern: REGEXVALIDATION.twitter,
            })}
            placeholder="eg. twitter.com/username"
            type="text"
          />
          {errors.twitter_profile && (
            <small>Provide a valid profile link</small>
          )}
        </div>
        <div className=" my-4">
          <Label>GitHub Profile Link</Label>
          <Input
            {...register("github_profile")}
            placeholder="eg. github.com/username"
            type="text"
          />
          {errors.github_profile && (
            <small>Provide your github username </small>
          )}
        </div>
        <div className=" my-4">
          <Label htmlFor="">Portfolio Link</Label>
          <Input
            {...register("portfolio_url", {})}
            placeholder="eg. www.username.com"
            type="text"
          />
          {errors.portfolio_url && (
            <small>Provide your portfolio username </small>
          )}
        </div>
        <div className="my-4">
          <Label htmlFor="">LinkedIn Profile Link</Label>
          <Input
            {...register("linkedin_profile", {
              pattern: REGEXVALIDATION.linkedIn,
            })}
            placeholder="eg. www.linkedin.com/in/name"
            type="text"
          />
          {errors.linkedin_profile && (
            <small>Provide a valid linkedin profile</small>
          )}
        </div>
      </>
    </div>
  );
}

export default SocialForm;
