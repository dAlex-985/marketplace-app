import { Link } from "react-router";
import Logo from "./Logo";

function AuthNavbar() {
  return (
    <header className="bg-white border-b border-stone-200">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <Logo />
        <Link
          className="flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
          to="/"
        >
          <span aria-hidden="true">&larr;</span>
          <span>Back to listings</span>
        </Link>
      </nav>
    </header>
  );
}

export default AuthNavbar;
