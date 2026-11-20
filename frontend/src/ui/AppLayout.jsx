import { Outlet } from "react-router";

import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6 h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
