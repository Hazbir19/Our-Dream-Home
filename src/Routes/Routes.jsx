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
import AdminProfile from "../Admin/AdminProfile";
import ManageProperties from "../Admin/ManageProperties";
import ManageUser from "../Admin/ManageUser";
import ManageReview from "../Admin/ManageReview";
import RoleBasedProfile from "../Components/RoleBasedProfile";
import AgentProfile from "../AgentPage/AgentProfile";
import AddProperty from "../AgentPage/AddProperty";
import PropertyDetails from "../Pages/PropertiseDetails";
import MyAddedProperties from "../AgentPage/MyAddPropertise";
import MakeOffer from "../Components/MakeOffer";
import RequestedProperty from "../AgentPage/RequestedProperty";
import PaymentPage from "../Components/PaymentPage";
import MySoldProperties from "../AgentPage/MySoldPropertise";
import ErrorPage from "../Pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    errorElement: <ErrorPage></ErrorPage>,
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
      //Admin router
      {
        index: true,
        element: (
          <PrivateRouter>
            <RoleBasedProfile></RoleBasedProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/admin-profile",
        element: (
          <PrivateRouter>
            <AdminProfile></AdminProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/manageProperty",
        element: (
          <PrivateRouter>
            <ManageProperties />,
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/manageUser",
        element: (
          <PrivateRouter>
            <ManageUser></ManageUser>,
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/manageReview",
        element: (
          <PrivateRouter>
            <ManageReview />
          </PrivateRouter>
        ),
      },
      //user Router
      {
        path: "/dashboard/my-profile",
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
      // Agent Router
      {
        path: "/dashboard/agent-profile",
        element: (
          <PrivateRouter>
            <AgentProfile></AgentProfile>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/addProperty",
        element: (
          <PrivateRouter>
            <AddProperty></AddProperty>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/myAddPropertise",
        element: (
          <PrivateRouter>
            <MyAddedProperties></MyAddedProperties>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/propertyDetails/:id",
        element: (
          <PrivateRouter>
            <PropertyDetails></PropertyDetails>
          </PrivateRouter>
        ),
      },

      {
        path: "/dashboard/makeoffer/:propertyId",
        element: (
          <PrivateRouter>
            <MakeOffer></MakeOffer>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/reqested-property",
        element: (
          <PrivateRouter>
            <RequestedProperty></RequestedProperty>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/mySoldProperty",
        element: (
          <PrivateRouter>
            <MySoldProperties></MySoldProperties>
          </PrivateRouter>
        ),
      },
      {
        path: "/dashboard/paymentPage/:id",
        element: (
          <PrivateRouter>
            <PaymentPage></PaymentPage>
          </PrivateRouter>
        ),
      },
    ],
  },
]);

export default router;
