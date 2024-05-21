import React from 'react'
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { NewUserFields } from "@/types";

type SkillsFields = "years_of_experience" | "bio" | "skills";

type TSkillsType = Pick<NewUserFields, SkillsFields>;

type SkillsFormType = {
  register: UseFormRegister<NewUserFields>;
  errors: FieldErrors<TSkillsType>;
};

function SkillsForm({ register, errors }: SkillsFormType) {
  return (
    <div>SkillsForm</div>
  )
}

export default SkillsForm