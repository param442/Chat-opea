import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeSignupSchema, SignupSchema } from "@repo/types/types";
type Inputs = {
  example: string;
  exampleRequired: string;
};

const Signup = ({ Signup }: { Signup: (values: TypeSignupSchema) => void }) => {
  const [ShowPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm<TypeSignupSchema>({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit = (data: TypeSignupSchema) => {
    alert("mail sent");
    Signup(data);
  };

  return (
    <div>
      <form
        className=" ui-flex ui-flex-col ui-gap-3 ui-text-BlackRussian ui-mt-5 selection:ui-bg-blue-400"
        onSubmit={handleSubmit(onSubmit)}>
        <label className="ui-text-white ui-self-start selection:ui-bg-black">
          Name
        </label>
        <input type="text" {...register("name")} />
        {errors.name && (
          <p className="ui-text-red-500 ui-self-start">{errors.name.message}</p>
        )}
        <label className="ui-text-white ui-self-start selection:ui-bg-black">
          Email
        </label>
        <input type="email" {...register("email")} />
        {errors.email && (
          <p className="ui-text-red-500 ui-self-start">
            {errors.email.message}
          </p>
        )}
        <label className="ui-text-white ui-self-start selection:ui-bg-black">
          Password
        </label>
        <input
          type={ShowPassword ? "text" : "password"}
          {...register("password")}
        />
        {errors.password && (
          <p className="ui-text-red-500 ui-self-start">
            {errors.password.message}
          </p>
        )}
        <span className="ui-flex ui-gap-2 ui-text-white ui-items-center ">
          <p>Show Password</p>
          <input
            checked={ShowPassword}
            onChange={() => setShowPassword(!ShowPassword)}
            type="checkbox"
            className=" ui-cursor-pointer"
          />
        </span>
        <button
          type="submit"
          className="ui-mt-2 ui-p-2 ui-bg-blue-500 ui-text-white ui-rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
