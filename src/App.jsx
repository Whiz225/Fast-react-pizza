import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './features/ui/AppLayout';
import Home from './features/ui/Home';
import Menu, { loader as menuLoader } from './features/pages/menu/Menu';
import Cart from './features/pages/cart/Cart';
import Order, { loader as orderLoader } from './features/pages/order/Order';
import CreateOrder, {
  action as createOrderAction,
} from './features/pages/order/CreateOrder';
import { action as UpdateOrderAction } from './features/pages/order/UpdateOrder';
import Error from './features/ui/Error';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },

      {
        path: 'menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: 'cart', element: <Cart /> },
      {
        path: 'order/new',
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },

      {
        path: 'order/:orderId',
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
