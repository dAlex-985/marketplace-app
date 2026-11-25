import { Outlet } from "react-router";
import AuthNavbar from "./AuthNavbar";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col">
      <AuthNavbar />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
