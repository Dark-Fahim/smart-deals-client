import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './layouts/Root.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AllProducts from './pages/AllProducts.jsx';
import AuthProviders from './providers/AuthProviders.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import MyProducts from './pages/MyProducts.jsx';
import MyBids from './pages/MyBids.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import CreateProduct from './pages/CreateProduct.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: "/register",
        Component: Register
      },
      {
        path: '/all-products',
        Component: AllProducts
      },
      {
        path: "/my-products",
        element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
      },
      {
        path: "/my-bids",
        element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
      },
      {
        path: '/create-product',
        element: <PrivateRoute><CreateProduct></CreateProduct></PrivateRoute>
      },
      {
        path: '/product/:id',
        loader: ({params}) =>  fetch(`https://smart-deals-server-three-alpha.vercel.app/products/${params.id}`),
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </StrictMode>,
)
