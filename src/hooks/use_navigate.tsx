import React from "react";
import { useForm } from "react-hook-form";
import ProfileForm from "@/app/(auth)/signup/components/forms/profile_form";
import SkillsForm from "@/app/(auth)/signup/components/forms/skills_form";
import SocialForm from "@/app/(auth)/signup/components/forms/social_form";
import CreatePasswordForm from "@/app/(auth)/signup/components/forms/create_password_form";
import { NewUserFields } from "@/types";

function useNavigateForms() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewUserFields>({ mode: "onSubmit" });
  const [currentFormIndex, setCurrentFormIndex] = React.useState(0);
  const Forms = [
    {
      category: "Profile",
      element: <ProfileForm register={register} errors={errors} />,
    },
    {
      category: "Skills",
      element: <SkillsForm register={register} errors={errors} />,
    },
    {
      category: "Social",
      element: <SocialForm register={register} errors={errors} />,
    },
    {
      category: "Create Password",
      element: (
        <CreatePasswordForm register={register} errors={errors} watch={watch} />
      ),
    },
  ];

  const currentForm = Forms[currentFormIndex];

  const next = () => {
    if (currentFormIndex === 3) return;
    setCurrentFormIndex((prev) => prev + 1);
  };

  const previous = () => {
    if (currentFormIndex === 0) return;
    setCurrentFormIndex((prev) => prev - 1);
  };

  const resetForm = () => {
    setCurrentFormIndex(0);
  };

  return {
    next,
    previous,
    resetForm,
    currentForm,
    handleSubmit,
    currentFormIndex,
  };
}

export default useNavigateForms;
