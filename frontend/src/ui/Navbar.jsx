import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav class="flex justify-between bg-white border-b border-stone-200 items-center px-6 py-4">
      <p>Logo</p>
      <ul class="flex gap-2">
        <li>
          <NavLink to="/">Catalog</NavLink>
        </li>
        <li>
          <NavLink to="/account">My account</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink
            class="bg-fuchsia-500 text-fuchsia-100 px-3 py-2 rounded-3xl"
            to="/signup"
          >
            Create account
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
