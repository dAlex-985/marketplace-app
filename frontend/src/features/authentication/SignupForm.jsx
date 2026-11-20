import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { signup } = useSignup();

  function onSubmit(data) {
    signup(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 px-36 py-18"
    >
      <div className="flex flex-col">
        <label>Name</label>
        <input
          type="text"
          className="border border-stone-300 rounded-md px-3 py-1"
          placeholder="name"
          {...register("name", { required: "Name is required." })}
        />
      </div>
      <div className="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          className="border border-stone-300 rounded-md px-3 py-1"
          placeholder="email"
          {...register("email", { required: "Name is required" })}
        />
      </div>
      <div className="flex flex-col">
        <label>Password</label>
        <input
          type="password"
          className="border border-stone-300 rounded-md px-3 py-1"
          placeholder="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <p
            className="bg-red-500 text-red-100 px-2 py-1 mt-1 rounded-md text-sm"
            role="alert"
          >
            {errors.password.message}
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <label>Confirm password</label>
        <input
          type="password"
          className="border border-stone-300 rounded-md px-3 py-1"
          placeholder="Confirm password"
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value) => {
              return (
                getValues().password === value || "Passwords do not match."
              );
            },
          })}
        />
        {errors.passwordConfirm && (
          <p
            className="bg-red-500 text-red-100 px-2 py-1 mt-1 rounded-md text-sm"
            role="alert"
          >
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupForm;
