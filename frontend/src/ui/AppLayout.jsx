import { Outlet } from "react-router";

import Navbar from "./Navbar";

function AppLayout() {
  return (
    <div class="min-h-screen bg-stone-50 text-stone-800">
      <Navbar />
      <main class="max-w-5xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
