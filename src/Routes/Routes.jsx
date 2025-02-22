import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import HomePage from "../Pages/HomePage";
import Dashboard from "../Pages/Dashboard";
import Allproperty from "../Pages/Allproperty";
import LoginPage from "../Pages/LoginPage";
import Register from "../Pages/Register";
import Myprofile from "../User/Myprofile";
import Wishlist from "../User/Wishlist";
import PropertyBrougt from "../User/PropertyBrougt";
import Myreview from "../User/Myreview";
import PrivateRouter from "../Private/PrivateRouter";

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
        path: "/allproperty",
        element: (
          <>
            <Allproperty></Allproperty>
          </>
        ),
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRouter>
            <Myprofile></Myprofile>,
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/wishList",
        element: (
          <PrivateRouter>
            <Wishlist></Wishlist>,
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/propertyBrougth",
        element: (
          <PrivateRouter>
            <PropertyBrougt></PropertyBrougt>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myReview",
        element: (
          <PrivateRouter>
            <Myreview></Myreview>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
