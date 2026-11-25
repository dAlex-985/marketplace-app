import { NavLink, Outlet } from "react-router";
import { useAccountDetails } from "../features/users/useAccountDetails";

function Account() {
  const { user } = useAccountDetails();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  const baseLinkClass =
    "block w-full px-3.5 py-2.5 rounded-xl text-sm transition-colors";

  const linkClass = ({ isActive }) =>
    isActive
      ? `${baseLinkClass} font-semibold text-emerald-700 bg-emerald-50`
      : `${baseLinkClass} font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8 items-start">
      <aside className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs">
        <div className="flex flex-col items-center text-center pb-6 mb-6 border-b border-stone-100">
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-700 text-4xl font-bold flex items-center justify-center mb-3.5">
            {initials}
          </div>
          <h2 className="text-lg font-bold text-stone-900">{user?.name}</h2>
          <p className="text-sm text-stone-500 mt-0.5">{user?.email}</p>
        </div>
        <nav>
          <ul className="flex flex-col gap-1.5">
            <li>
              <NavLink end className={linkClass} to="/account">
                Profile &amp; Security
              </NavLink>
            </li>
            <li>
              <NavLink to="products" className={linkClass}>
                My listings
              </NavLink>
            </li>
            <li>
              <NavLink to="purchases" className={linkClass}>
                Purchases
              </NavLink>
            </li>
            <li>
              <NavLink to="sales" className={linkClass}>
                Sales
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Account;
