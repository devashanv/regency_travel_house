import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Destination from "./pages/Destination.jsx";
import Careers from "./pages/Careers.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import DestinationPackages from "./pages/DestinationPackages.jsx";
import Sustainability from "./pages/Sustainability.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import LoginA from "./pages/Auth/LoginA.jsx";

import Register from "./pages/Auth/Register.jsx";
import Tours from "./pages/Users/Tours.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AllBookings from "./pages/Admin/AllBookings.jsx";
import Settings from "./pages/Users/Settings.jsx";
import Notifications from "./pages/Users/Notifications.jsx";
import UserDashboard from "./pages/Users/Userdashboard.jsx";
import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AllPackages from "./pages/Admin/AllPackages.jsx";
import AllDestinations from "./pages/Admin/AllDestinations.jsx";
import AllItineraries from "./pages/Admin/AllItineraries.jsx";
import AllCustomers from "./pages/Admin/AllCustomers.jsx";
import AllQuotes from "./pages/Admin/AllQuotes.jsx";
import AdminRegister from "./pages/Admin/AdminRegister.jsx";
import AllLoyaltiesPoints from "./pages/Admin/AllLoyaltiesPoints.jsx";
import AdminImages from "./pages/Admin/AdminImages.jsx";
import Wishlist from "./pages/Users/Wishlists.jsx";
import Transactions from "./pages/Users/Transactions.jsx";
// import Destination1 from "./pages/Destination1.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx"
import ResetPassword from "./pages/Auth/ResetPassword.jsx"
import ADResetPasswordModal from "./pages/Admin/AdResetPassword.jsx";
import SpecialPackages from "./pages/SpecialPackages.jsx";
import TermsAndPolicy from "./pages/TermsAndPolicy.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
    {
    path: "/logina",
    element: <LoginA />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/destination",
    element: <Destination />,
  },
  {
    path: "/destination-packages",
    element: <DestinationPackages />,
  },
    {
    path: "/special-packages",
    element: <SpecialPackages />,
  },
  {
    path: "/career",
    element: <Careers />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
  },
  {
    path: "/sustainability",
    element: <Sustainability />,
  },
  {
    path: "/mydashboard",
    element: <UserDashboard />,
  },
  {
    path: "/mytours",
    element: <Tours />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/addash",
    element: <AdminDashboard />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/cheeckbookings",
    element: <AllBookings />,
  },
  {
    path: "/adlogin",
    element: <AdminLogin />,
  },
  {
    path: "/allPackages",
    element: <AllPackages />,
  },
  {
    path: "/checkDestinations",
    element: <AllDestinations />,
  },
  {
    path: "/checkItineraries",
    element: <AllItineraries />,
  },
  {
    path: "/checkCustomers",
    element: <AllCustomers />,
  },
  {
    path: "/checkQuotes",
    element: <AllQuotes />,
  },
  {
    path: "/regstaff",
    element: <AdminRegister />,
  },
  {
    path: "/checkPoints",
    element: <AllLoyaltiesPoints />,
  },
  {
    path: "/destination/:id",
    element: <Destination />,
  },
  {
    path: "/admin/images",
    element: <AdminImages />,
  },
  {
    path: "/myfavourite",
    element: <Wishlist />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },

  { path: "/forgot-password", 
    element: <ForgotPassword /> 
  },
  { path: "/reset-password", 
    element: <ResetPassword /> 
  },

  {  path:"/reset-password/staff",
    element:<ADResetPasswordModal />
  },
  {
    path:"/terms-and-policy",
    element:<TermsAndPolicy />
  }
  

]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
