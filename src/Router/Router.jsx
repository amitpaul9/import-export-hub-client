import { createBrowserRouter } from "react-router";
import Root from "../Components/Root/Root";
import Login from "../Components/Login/Login";
import Registration from "../Components/Registration/Registration";
import Home from "../Components/Home/Home";
import AddExports from "../Components/AddExports/AddExports";
import PrivateRouter from "../Routes/PrivetRouter.jsx"
import ProductsDetails from "../ProductsDetails/ProductsDetails.jsx";
import AllProducs from "../AllProducts/AllProducs.jsx";
import MyExports from "../MyExports/MyExports.jsx";
import MyImports from "../MyImports/MyImports.jsx";
import ErrorPage from "../ErrorPage/ErrorPage.jsx";
import DashboardLayout from "../Components/Dashboard/DashboardLayout/DashboardLayout.jsx";
import DashboardHome from "../Components/DashboardHome/DashboardHome.jsx";
import ProfilePage from "../Components/ProfilePage/ProfilePage.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/products-details/:id",
        loader: ({ params }) => fetch(`https://import-export-hub-server-lake.vercel.app/products/${params.id}`),
        element: <PrivateRouter><ProductsDetails></ProductsDetails></PrivateRouter>
      },
      {
        path: "/allproducts",
        Component: AllProducs
      },


    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
    errorElement: <h1 className="text-center text-5xl text-red-900">404 not found</h1>,
    children: [
      {
        index: true,
        Component: DashboardHome
      }
      , {
        path: "/dashboard/myimports",
        element: <PrivateRouter><MyImports></MyImports></PrivateRouter>
      },
      {
        path: "myexports",
        element: <PrivateRouter><MyExports></MyExports></PrivateRouter>
      },
      {
        path: "addtoexport",
        element: <PrivateRouter><AddExports></AddExports></PrivateRouter>
      },
      {
        path: "profile",
        element: <PrivateRouter><ProfilePage></ProfilePage></PrivateRouter>
      }
    ]
  }
]);
