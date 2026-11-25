import { useForm } from "react-hook-form";
import { useAccountDetails } from "./useAccountDetails";
import { useUpdateUser } from "./useUpdateUser";
import { useState } from "react";
import { useUpdatePassword } from "./useUpdatePassword";

function AccountDetails() {
  const { user } = useAccountDetails();
  const { updateUser, isPending } = useUpdateUser();
  const {
    updatePassword,
    error,
    isPending: isUpdatingPassword,
  } = useUpdatePassword();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ values: user });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset,
    getValues: getValuesPassword,
  } = useForm();

  function handleUpdate({ name, email, phone }) {
    updateUser({ name, email, phone });
  }

  function handleUpdatePassword(data) {
    updatePassword(data, { onSuccess: () => reset() });
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            Personal Information
          </h2>
          <p className="text-sm text-stone-500 mt-1">
            Manage your profile details and contact information
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="mt-6 flex flex-col gap-5"
        >
          <div>
            <label
              className="block text-sm font-medium text-stone-700 mb-1.5"
              htmlFor="name"
            >
              Full name
            </label>
            <input
              disabled={isPending}
              {...register("name", { required: "Please provide a name" })}
              className="w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15 transition-colors"
              id="name"
              type="text"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1.5" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-stone-700 mb-1.5"
              htmlFor="email"
            >
              Email
            </label>
            <input
              disabled={isPending}
              {...register("email", { required: "Email is required" })}
              className="focus:ring-2 focus:ring-emerald-600/15 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
              id="email"
              type="email"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1.5" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="flex-1">
              <label
                className="block text-sm font-medium text-stone-700 mb-1.5"
                htmlFor="phone"
              >
                Phone number
              </label>
              <input
                disabled={isPending}
                {...register("phone")}
                className="focus:ring-2 focus:ring-emerald-600/15 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
                id="phone"
                type="tel"
                placeholder="+421 123 456 789"
              />
            </div>
            <button
              disabled={isPending}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
              type="submit"
            >
              {isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-stone-900">Change Password</h2>
          <p className="text-sm text-stone-500 mt-1">
            Update your password to keep your account secure
          </p>
        </div>
        <form
          onSubmit={handleSubmitPassword(handleUpdatePassword)}
          className="mt-6 flex flex-col gap-5"
        >
          <div>
            <label
              className="block text-sm font-medium text-stone-700 mb-1.5"
              htmlFor="current-password"
            >
              Current password
            </label>
            <div className="relative">
              <input
                disabled={isUpdatingPassword}
                {...registerPassword("passwordCurrent", {
                  required: "This field is required",
                  minLength: { value: 8, message: "Use at least 8 characters" },
                })}
                className="focus:ring-2 focus:ring-emerald-600/15 w-full rounded-xl border border-stone-300 pl-3.5 pr-10 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
                id="current-password"
                type={showPassword ? "text" : "password"}
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
            {(passwordErrors.passwordCurrent || error?.response) && (
              <p className="text-xs text-red-600 mt-1.5" role="alert">
                {passwordErrors.passwordCurrent?.message ||
                  error?.response?.data?.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-stone-700 mb-1.5"
              htmlFor="new-password"
            >
              New password
            </label>
            <input
              disabled={isUpdatingPassword}
              {...registerPassword("password", {
                required: "This field is required",
                minLength: { value: 8, message: "Use at least 8 characters" },
              })}
              className="focus:ring-2 focus:ring-emerald-600/15 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
              id="new-password"
              type={showPassword ? "text" : "password"}
            />
            {passwordErrors.password && (
              <p className="text-xs text-red-600 mt-1.5" role="alert">
                {passwordErrors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="block text-sm font-medium text-stone-700 mb-1.5"
              htmlFor="confirm-password"
            >
              Confirm new password
            </label>
            <input
              disabled={isUpdatingPassword}
              type={showPassword ? "text" : "password"}
              {...registerPassword("passwordConfirm", {
                required: "This field is required",

                validate: (val) => {
                  return (
                    getValuesPassword().password === val ||
                    "The passwords don't match"
                  );
                },
              })}
              className="focus:ring-2 focus:ring-emerald-600/15 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-600 transition-colors"
              id="confirm-password"
            />
            {passwordErrors.passwordConfirm && (
              <p className="text-xs text-red-600 mt-1.5" role="alert">
                {passwordErrors.passwordConfirm.message}
              </p>
            )}
          </div>
          <button
            disabled={isUpdatingPassword}
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0 disabled:opacity-60 disabled:cursor-not-allowed place-self-end mt-2"
          >
            {isUpdatingPassword ? "Updating..." : "Update password"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default AccountDetails;
