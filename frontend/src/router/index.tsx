import { createBrowserRouter } from "react-router-dom";
import { Home, Daftar, Payment, Login, SignUp, Tambah } from "../pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/signup",
    element: <SignUp />,
  },

  {
    path: "/home",
    element: <Home />,
  },

  {
    path: "/daftar",
    element: <Daftar />,
  },

  {
    path: "/tambah",
    element: <Tambah />,
  },

  {
    path: "/payment",
    element: <Payment />,
  },
]);

export default router;
