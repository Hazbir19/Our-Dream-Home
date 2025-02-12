import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import HomePage from "../Pages/HomePage";
import Dashboard from "../Pages/Dashboard";
import Allproperty from "../Pages/Allproperty";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/allproperty",
        element: <Allproperty></Allproperty>,
      },
    ],
  },
]);

export default router;
