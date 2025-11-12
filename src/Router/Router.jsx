import { createBrowserRouter } from "react-router";
import Root from "../Components/Root/Root";
import Login from "../Components/Login/Login";
import Registration from "../Components/Registration/Registration";
import Home from "../Components/Home/Home";
import AddExports from "../Components/AddExports/AddExports";
import PrivateRouter from "../Routes/PrivetRouter.jsx"


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Registration>s</Registration>
      },
      {
        path: "/addtoexport",
        element: <PrivateRouter><AddExports></AddExports></PrivateRouter>
      }

    ]
  },
]);
