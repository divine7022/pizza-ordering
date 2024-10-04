import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home";
import Error from "./ui/Error";

// we exported Menu as a default export so we are not wraping it in a {} and we are renaming of the normal export loader as menuLoader.
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./features/order/CreateOrder";
import { action as UpdateOrderAction } from "./features/order/UpdateOrder";
import AppLayout from "./ui/AppLayout";

// this is inbuilt function where we define our Routs and we do that by passing an array of objects , where each object is one Route.
// declaring this router outside of the jsx and using this js array used to specfy the path and element.

// chidren property is used to create a nested routes.
// here the AppLayout contains a header which is always visable in the ui(fixed) , in that Home component, Menu, cart, order component are will change acc to the url. so we are wraping all the component under the AppLayout component.
// since this one dosn't have any path it technically called in react router : layout route.
// this(AppLayout) is the parent route of the other route.

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    // these are the nested routes which is a childeren of the parent route AppLayout(we are rendeing it by using the ** <Outlet /> ** provide by the React-router )
    children: [
      {
        path: "/", // means root path
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // here we are not changing a name of the *loader* . but the *loader* is the property given by the react-router.
        loader: menuLoader,
        errorElement: <Error />, //this is written here to show the error componet where the error happened in that Rout. and the property error element is given by the React-router V6.4
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },

      // adding an path to check out an existing order(we can use find params with colon (:) and param name)
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
        action: UpdateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// the hadder and the cart view will be the part of a layout will always be visable . the only thing that is the part in the middle( it can be the menu , cart, fomr to create new order)

// React Router is not only responsible for matching componet to url's in the browser. But to also provide the data that is nessary for each page.
// * in this case for provide the menu data(from the api) using the menuLoader to the < Menu /> page(component) . and this is very usefull coz the url's pages and the data required to that pages are very often tightly coupled together.(if we use a useLoaderData() custom hook) , [it is usefull to get both the, page and data all in one place ] all nicely integerated with react router.

// ---> ERROR HANDLING :
// if the error happens in menu we can insterd of redering menu we can rendere the error element.
// let us specify this error in the parent Rout(i,e AppLayout ) becaues these errors that happen in the nested Routes they will bubble up to the parent route( then it will give a error element the perticular element where error accured.)
