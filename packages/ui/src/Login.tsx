import { useState, Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeLoginSchema, LoginSchema, oAuthTypes } from "@repo/types/types";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Login = ({
  signIn,
  oauth,
}: {
  signIn: (values: TypeLoginSchema) => void;
  oauth: (Provider: oAuthTypes) => void;
}) => {
  const [ShowPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: TypeLoginSchema) => {
    signIn(data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" ui-flex ui-flex-col ui-gap-3 ui-text-BlackRussian ui-mt-5 selection:ui-bg-blue-400">
        <label className="ui-text-white ui-self-start selection:ui-bg-black">
          Email
        </label>
        <input type="email" {...register("email")} />
        {errors.email && (
          <p className="ui-text-red-500 ui-self-start">
            {" "}
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
          Login
        </button>
      </form>
      <button
        onClick={() => oauth("google")}
        className="ui-mt-2 ui-p-2 ui-w-full ui-flex ui-items-center ui-justify-center ui-bg-blue-500 ui-text-white ui-rounded">
        <FaGoogle />
      </button>
      <button
        onClick={() => oauth("github")}
        className="ui-mt-2 ui-p-2  ui-flex ui-w-full ui-items-center ui-justify-center ui-bg-blue-500 ui-text-white ui-rounded">
        <FaGithub />
      </button>
    </div>
  );
};

export default Login;
