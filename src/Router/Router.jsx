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
      },
      {
        path: "/products-details/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <PrivateRouter><ProductsDetails></ProductsDetails></PrivateRouter>
      },
      {
        path: "/allproducts",
        Component: AllProducs
      },
      {
        path: "/myimports",
        element: <PrivateRouter><MyImports></MyImports></PrivateRouter>
      },
      {
        path: "myexports",
        element: <PrivateRouter><MyExports></MyExports></PrivateRouter>
      }

    ]
  },
]);
