import { NavLink } from "react-router";

function Button({
  children,
  to,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary:
      "bg-white text-stone-700 border border-stone-300 hover:bg-stone-50",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <NavLink to={to} className={styles}>
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}

export default Button;
