import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { NewUserFields } from "@/types";
import { REGEXVALIDATION } from "@/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SkillsFields = "years_of_experience" | "bio" | "skills";

type TSkillsType = Pick<NewUserFields, SkillsFields>;

type SkillsFormType = {
  register: UseFormRegister<NewUserFields>;
  errors: FieldErrors<TSkillsType>;
};

function SkillsForm({ register, errors }: SkillsFormType) {
  return (
    <div>
      <>
        <div className="my-4">
          <Label className=" text-[#000] dark:text-[#f1f3f7] font-bold">
            How long have you been a techie?
          </Label>
          <Input
            {...register("years_of_experience", {
              required: true,
            })}
            type="number"
            min={0}
            placeholder="Enter your years of experience"
          />
        </div>
        <div className=" my-4">
          <Label
            className=" text-[#000] dark:text-[#f1f3f7] font-bold"
            htmlFor=""
          >
            What languages/tools do you use?
          </Label>
          <Input
            {...register("skills", {
              required: "This field must be specified",
              pattern: REGEXVALIDATION.listSeparatedByComma,
            })}
            type="text"
            placeholder="e.g JavaScript, Django, NodeJs, Python"
          />
          {errors.skills && (
            <small className="mt-5 text-red-500">
              Valid technologies or languages must be provided and they must be
              separated by a comma
            </small>
          )}
        </div>
        <div className="my-4">
          <Label className=" text-[#000] dark:text-[#f1f3f7] font-bold">
            How has the experience as a techie been?
          </Label>
          <Textarea
            {...register("bio", {
              required: true,
              pattern: REGEXVALIDATION.shouldNotBeEmptyString,
            })}
            className="resize-none"
            // ref={textareaRef}
            cols={30}
            rows={3}
            placeholder="Enter your experience as a techie"
          />
          {errors.bio && (
            <small className="mt-5 text-red-500">
              Add a brief message about your experience.
            </small>
          )}
        </div>
      </>
    </div>
  );
}

export default SkillsForm;
