import { NavLink, useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { useAccountDetails } from "../features/users/useAccountDetails";

import Button from "./Button";
import Logo from "./Logo";
import Searchbar from "./Searchbar";

function Navbar() {
  const { user, isError } = useAccountDetails();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = Boolean(user) && !isError;

  function handleLogout() {
    localStorage.removeItem("token");
    queryClient.setQueryData(["user"], null);
    navigate("/");
  }

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-sm font-medium text-stone-900 border-b-2 border-emerald-600 pb-1"
      : "text-sm font-medium text-stone-500 hover:text-stone-900 pb-1 transition-colors";

  return (
    <header className="bg-white border-b border-stone-200">
      <nav className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-8">
          <Logo />
          <Searchbar />
        </div>

        <ul className="flex gap-6 items-center">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Listings
            </NavLink>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <NavLink to="/account" end className={navLinkClass}>
                  My account
                </NavLink>
              </li>
              <li>
                <Button>
                  <Plus className="w-4 h-4" />
                  <span>Sell Item</span>
                </Button>
              </li>
            </>
          ) : (
            <li>
              <Button to="/signup">Create account</Button>
            </li>
          )}

          <li>
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="secondary">
                Logout
              </Button>
            ) : (
              <Button to="/login" variant="secondary">
                Login
              </Button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
