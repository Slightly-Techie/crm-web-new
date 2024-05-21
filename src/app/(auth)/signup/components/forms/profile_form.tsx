import { NewUserFields } from '@/types';
import { FieldErrors, UseFormRegister } from "react-hook-form";


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
  return (
    <div>ProfileForm</div>
  )
}

export default ProfileForm