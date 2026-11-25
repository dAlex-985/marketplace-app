import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import { useLogin } from "./useLogin";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    login(data);
  }

  return (
    <div className="p-8 w-full max-w-md bg-white border border-stone-200 rounded-2xl shadow-xs">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Welcome back</h1>
        <p className="text-sm text-stone-500 mt-1.5">
          Log in to your GreenMarket account
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="mb-5 px-3.5 py-2.5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl"
        >
          {error.response?.data?.message || "Invalid email or password"}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            className="block text-sm font-medium text-stone-700 mb-1.5"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 transition-colors"
            id="email"
            type="email"
            placeholder="anna@example.com"
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-xs text-red-600 mt-1.5" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label
              className="text-sm font-medium text-stone-700"
              htmlFor="password"
            >
              Password
            </label>
            <button
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"
              type="button"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              {...register("password", { required: "Password is required" })}
              className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-white border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 transition-colors"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              disabled={isPending}
            />

            <button
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((cur) => !cur)}
            >
              {showPassword ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-600 mt-1.5" role="alert">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Log in"}
        </button>
      </form>

      <p className="text-center text-sm text-stone-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          to="/signup"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
