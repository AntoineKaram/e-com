import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import RootLayout from "./pages/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProductListing />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
    ],
  },
]);
const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
