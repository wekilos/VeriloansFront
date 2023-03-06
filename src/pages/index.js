import { lazy } from "react";

export const Login = lazy(() => import("./login/login"));
export const Home = lazy(() => import("./home/home"));
export const Customers = lazy(() => import("./customers/customers"));
export const Loans = lazy(() => import("./loans/loans"));
export const Stores = lazy(() => import("./stores/stores"));
export const Employees = lazy(() => import("./employees/employee"));
export const Products = lazy(() => import("./products/products"));
