import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import AddVisa from "../pages/addVisa/AddVisa";
import AllVisa from "../pages/allVisa/AllVisa";
import AddedVisas from "../pages/addedVisas/AddedVisas";
import VisaAplication from "../pages/visaAplication/VisaAplication";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/addedvisa",
        element: <AddedVisas></AddedVisas>,
      },
      {
        path: "/allvisa",
        element: <AllVisa></AllVisa>,
      },
      {
        path: "/addvisa",
        element: <AddVisa></AddVisa>,
      },
      {
        path: "/visaaplication",
        element: <VisaAplication></VisaAplication>,
      },
      {
        path: "/signin",
        element: <SignIn></SignIn>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
