import { BrowserRouter, Routes, Route } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Marketplace from "./pages/Marketplace";
import AppLayout from "./ui/AppLayout";
import Product from "./pages/Product";
import CreateProduct from "./pages/CreateProduct";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthLayout from "./ui/AuthLayout";
import AccountDetails from "./features/users/AccountDetails";

import Products from "./features/users/Products";
import Sales from "./features/users/Sales";
import Purchases from "./features/users/Purchases";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Marketplace />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/products/new" element={<CreateProduct />} />
            <Route path="/account" element={<Account />}>
              <Route index element={<AccountDetails />} />
              <Route path="products" element={<Products />} />
              <Route path="sales" element={<Sales />} />
              <Route path="purchases" element={<Purchases />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
