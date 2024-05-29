import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NEW_USER_DATA, REGEXVALIDATION } from "@/constants";
import { getStacks } from "@/services";
import { NewUserFields } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Oval } from "react-loader-spinner";

type ProfileFields =
  | "email"
  | "phone_number"
  | "stack_id"
  | "first_name"
  | "last_name"
  | "username";

type TProfileType = Pick<NewUserFields, ProfileFields>;

type ProfileFormType = {
  register: UseFormRegister<NewUserFields>;
  errors: FieldErrors<TProfileType>;
};

function ProfileForm({ register, errors }: ProfileFormType) {
  const [selectValue, setSelectValue] = useState(NEW_USER_DATA.stack_id);

  const {
    data: STACKS,
    isSuccess: stackSuccess,
    isLoading: stackLoading,
  } = useQuery({
    queryKey: ["stacks"],
    queryFn: getStacks,
    refetchOnWindowFocus: false,
    retry: 3,
    // onSuccess({ data }) {
    //   setSelectValue(data[0].id);
    // },
  });
  return (
    <div className="w-full">
      <div className="my-4">
        <Label>First Name</Label>
        <Input
          type="text"
          placeholder="Enter your first name"
          {...register("first_name", {
            required: true,
            pattern: REGEXVALIDATION.shouldNotBeEmptyString,
          })}
        />
        {errors.first_name && (
          <small className="mt-5 text-red-500">
            First name must be provided
          </small>
        )}
      </div>
      <div className=" my-4">
        <Label>Last Name</Label>
        <Input
          type="text"
          placeholder="Enter your last name"
          {...register("last_name", {
            required: true,
            pattern: REGEXVALIDATION.shouldNotBeEmptyString,
          })}
        />
        {errors.last_name && (
          <small className="mt-5 text-red-500">
            Last name must be provided
          </small>
        )}
      </div>
      <div className=" my-4">
        <Label>Username</Label>
        <Input
          type="text"
          placeholder="Enter your username"
          {...register("username", {
            required: true,
            pattern: REGEXVALIDATION.shouldNotBeEmptyString,
          })}
        />
        {errors.username && (
          <small className="mt-5 text-red-500">Username must be provided</small>
        )}
      </div>
      <div className=" my-4">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="Enter your email"
          {...register("email", {
            required: true,
            pattern: REGEXVALIDATION.email,
          })}
        />
        {errors.email && (
          <small className="mt-5 text-red-500">Email must be valid</small>
        )}
      </div>
      <div className="my-4">
        <Label>Phone Number</Label>
        <Input
          type="text"
          {...register("phone_number", {
            required: true,
            pattern: REGEXVALIDATION.phoneNumberMultiple,
          })}
          placeholder="Confirm your Phone Number"
        />
        {errors.phone_number && (
          <small className="mt-5 text-red-500">
            Provide your Phone number(s)
          </small>
        )}
      </div>
      <div className="my-4">
        <Label>What type of techie are you?</Label>
        <Select
          {...register("stack_id")}
          onValueChange={(e) => setSelectValue(parseInt(e))}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your stack" />
          </SelectTrigger>
          <SelectContent>
            {stackSuccess &&
              STACKS?.data.map((stack) => (
                <SelectItem value={String(stack.id)} key={stack.id}>
                  {stack.name}
                </SelectItem>
              ))}
            <SelectItem value={"other"}>Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.stack_id && (
          <small className="mt-5 text-red-500">
            Provide your Phone number(s)
          </small>
        )}
      </div>
      {selectValue === -1 && (
        <div className="my-4">
          <Label className="text-[#000] dark:text-white">
            If &apos;Other&apos;, please specify
          </Label>
          <Input
            {...register("stack")}
            className="w-full border-[1px] mt-2 px-2 text-[#000] dark:text-white border-[#33333380] Input__transparent py-2 focus:outline-none focus:border-[1px] focus:bor333-[#fff] dark:border-[#8a8a8a]"
            type="text"
          />
        </div>
      )}
    </div>
  );
}

export default ProfileForm;
